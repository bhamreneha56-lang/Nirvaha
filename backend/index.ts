import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

// New Modular Routes
import authRoutes from './src/modules/auth/routes';

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nirvaha';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mount Modular Routes
app.use('/api/auth', authRoutes);
import submissionRoutes from './src/modules/submission/routes';
app.use('/api/problems', submissionRoutes);
import communityRoutes from './src/modules/community/routes';
app.use('/api', communityRoutes); // community has multiple root paths in contract
import notificationRoutes from './src/modules/notifications/routes';
app.use('/api/notifications', notificationRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
