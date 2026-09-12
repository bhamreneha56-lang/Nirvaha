import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

// New Modular Routes
import authRoutes from './src/modules/auth/routes';
import aiRoutes from './src/modules/ai/routes';

const app = express();
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'] }));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nirvaha';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mount Modular Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
import submissionRoutes from './src/modules/submission/routes';
app.use('/api/problems', submissionRoutes);
import communityRoutes from './src/modules/community/routes';
app.use('/api', communityRoutes); // community has multiple root paths in contract
import notificationRoutes from './src/modules/notifications/routes';
app.use('/api/notifications', notificationRoutes);

// Analytics endpoints
import { Router } from 'express';
const analytics = Router();
import Problem from './src/shared/models/Problem';
import User from './src/shared/models/User';

analytics.get('/citizen-stats', async (req: any, res: any) => {
  try {
    const userId = req.query.userId;
    const total = await Problem.countDocuments(userId ? { submittedBy: userId } : {});
    const underReview = await Problem.countDocuments({ status: 'submitted' });
    const inProgress = await Problem.countDocuments({ status: { $in: ['verified', 'assigned', 'in_progress'] } });
    const resolved = await Problem.countDocuments({ status: { $in: ['deployed', 'closed'] } });
    res.json({ myChallenges: total, underReview, inProgress, resolved });
  } catch { res.json({ myChallenges: 0, underReview: 0, inProgress: 0, resolved: 0 }); }
});

analytics.get('/demo', async (req: any, res: any) => {
  try {
    const userId = req.query.userId;
    const user = userId ? await User.findById(userId) : null;
    res.json({ validations: 14, karmaTotal: user?.karmaTotal || 450, ledger: [] });
  } catch { res.json({ validations: 14, karmaTotal: 450, ledger: [] }); }
});

app.use('/api/analytics', analytics);


app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
