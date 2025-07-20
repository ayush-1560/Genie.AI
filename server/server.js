import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware,requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import clerkWebhook from './routes/webhook/clerk.js';
const app = express();

await connectCloudinary();
app.use(cors());
app.use('/api/webhook', clerkWebhook);
app.use(express.json());
app.use(clerkMiddleware());
app.use('/api/ai',aiRouter);
app.use('/api/user',userRouter);
app.get('/',(req,res)=>{
    res.send('server is live');
});
app.get('/',(req,res)=>res.send('server is Live!'));
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('server is running on PORT',PORT);
});

