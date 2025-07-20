import { clerkClient } from '@clerk/express';

export const auth = async (req, res, next) => {
  try {
    const { userId } = await req.auth();

    console.log("🔍 Checking auth for userId:", userId);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);
    const plan = user.publicMetadata?.plan || 'free';
    console.log("🛂 Current Plan:", plan);

    req.plan = plan;

    if (plan === 'free') {
      const freeUsage = user.privateMetadata?.free_usage ?? 0;
      req.free_usage = freeUsage;

      // ✅ First-time setup of `free_usage`
      if (user.privateMetadata?.free_usage === undefined) {
        await clerkClient.users.updateUserMetadata(userId, {
          privateMetadata: { free_usage: 0 },
        });
      }
    }

    next();
  } catch (error) {
    console.log("❌ Error in auth middleware:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
