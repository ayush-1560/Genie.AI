
// Middleware to check if the user is authenticated

import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    // Check if the user is authenticated
    const { userId, has } = await req.auth;
    const hasPremiumPlan = await has({plan: 'premium'});

    const user = await clerkClient.users.getUser(userId);

    if(!hasPremiumPlan && user?.publicMetadata.free_usage) {
      req.free_usage = user.privateMetadata.free_usage
    }
    else{
        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
                free_usage: 0
            }
        })
        req.free_usage = 0;
    }
    // Proceed to the next middleware or route handler
    req.plan = hasPremiumPlan ? 'premium' : 'free';
    next();
  } catch (error) {
    
    res.json({ success: false, message: error.message });
  }
}
