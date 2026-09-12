import { Request, Response } from 'express';
import Feedback from '../../shared/models/Feedback';
import Problem from '../../shared/models/Problem';
import User from '../../shared/models/User';
import KarmaLedgerEntry from '../../shared/models/KarmaLedgerEntry';

export const addFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Problem ID
    const { rating, comment, isPostDeployment } = req.body;
    const userId = (req as any).user.id;

    const problem = await Problem.findById(id);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const feedback = await Feedback.create({
      problem: id,
      user: userId,
      rating,
      comment,
      isPostDeployment: isPostDeployment || false
    });

    // Award karma for feedback
    await User.findByIdAndUpdate(userId, { $inc: { karmaTotal: 5 } });
    await KarmaLedgerEntry.create({
      user: userId,
      points: 5,
      reason: 'Provided community feedback',
      relatedProblem: id
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const validateProblem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Problem ID
    const userId = (req as any).user.id;

    // In a real app, check if user already validated to prevent spam

    const problem = await Problem.findByIdAndUpdate(
      id,
      { $inc: { validationCount: 1 } },
      { new: true }
    );

    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    // Award karma for validation
    await User.findByIdAndUpdate(userId, { $inc: { karmaTotal: 2 } });
    await KarmaLedgerEntry.create({
      user: userId,
      points: 2,
      reason: 'Validated a problem',
      relatedProblem: id
    });

    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { scope, location } = req.query; // scope=district|village, location='Ranchi'
    
    const query: any = {};
    if (scope === 'district' && location) {
      query.district = location;
    } else if (scope === 'village' && location) {
      query.panchayat = location;
    }

    const leaderboard = await User.find(query)
      .sort({ karmaTotal: -1 })
      .limit(50)
      .select('name role district block panchayat karmaTotal');
      
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMyKarma = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId).select('karmaTotal');
    const ledger = await KarmaLedgerEntry.find({ user: userId }).sort({ timestamp: -1 });
    
    res.json({ total: user?.karmaTotal || 0, ledger });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getDemoAnalytics = async (req: Request, res: Response) => {
  try {
    const neha = await User.findOne({ name: 'Neha Dilip Bhamare' });
    if (!neha) return res.status(404).json({ error: 'User not found' });
    
    const validations = await KarmaLedgerEntry.countDocuments({ user: neha._id, reason: 'Validated a problem' });
    const ledger = await KarmaLedgerEntry.find({ user: neha._id }).sort({ createdAt: -1 }).limit(10);
    res.json({ karmaTotal: neha.karmaTotal, validations, ledger });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getCitizenStats = async (req: Request, res: Response) => {
  try {
    const total = await Problem.countDocuments();
    const underReview = await Problem.countDocuments({ status: { $in: ['submitted', 'verified'] } });
    const inProgress = await Problem.countDocuments({ status: { $in: ['assigned', 'in_progress'] } });
    const resolved = await Problem.countDocuments({ status: { $in: ['deployed', 'closed'] } });
    
    res.json({
      myChallenges: total,
      underReview,
      inProgress,
      resolved
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
