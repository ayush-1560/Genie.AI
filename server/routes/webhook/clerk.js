// /api/webhook/clerk.js

import crypto from 'crypto';
import { Clerk } from '@clerk/clerk-sdk-node';

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export const config = {
  api: {
    bodyParser: false, // raw body required for signature validation
  },
};

const getRawBody = (req) =>
  new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', (err) => reject(err));
  });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const rawBody = await getRawBody(req);
  const signature = req.headers['clerk-signature'];
  const secret = process.env.CLERK_WEBHOOK_SECRET;

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.error('❌ Signature mismatch');
    return res.status(401).send('Invalid signature');
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (err) {
    console.error('❌ Invalid JSON');
    return res.status(400).send('Invalid JSON');
  }

  console.log('📦 Clerk Webhook Event:', event);

  if (event.type === 'billing.subscription.updated') {
    const userId = event.data?.object?.user?.id;
    const plan = event.data?.object?.plan?.name;

    if (userId && plan) {
      try {
        await clerk.users.updateUser(userId, {
          publicMetadata: { plan: plan.toLowerCase() },
          privateMetadata: { hasPremium: plan.toLowerCase() === 'premium' },
        });

        console.log(`✅ Metadata updated for ${userId}`);
      } catch (err) {
        console.error('❌ Clerk update error:', err);
        return res.status(500).send('Error updating metadata');
      }
    }
  }

  return res.status(200).send('Webhook received');
}
