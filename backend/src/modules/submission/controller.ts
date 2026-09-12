import { Request, Response } from 'express';
import Problem from '../../shared/models/Problem';
import StatusHistory from '../../shared/models/StatusHistory';
import User from '../../shared/models/User';

// Generate a unique problem ID like "NRV-2026-000123"
const generateProblemId = async () => {
  const count = await Problem.countDocuments();
  const year = new Date().getFullYear();
  return `NIR-PROB-${year}-${String(count + 1).padStart(6, '0')}`;
};

export const createProblem = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userId = (req as any).user?.id; // Allow guest if not auth

    const problemIdReadable = await generateProblemId();
    
    const problem = await Problem.create({
      ...data,
      problemIdReadable,
      submittedBy: userId || null
    });

    // If duplicateOf provided, increment original problem's validationCount
    if (data.duplicateOf) {
      await Problem.findOneAndUpdate(
        { problemIdReadable: data.duplicateOf },
        { $inc: { validationCount: 1 } }
      );
    }

    await StatusHistory.create({
      problem: problem._id,
      changedBy: userId || null,
      fromStatus: null,
      toStatus: 'submitted',
      note: data.duplicateOf ? `Reported as duplicate of ${data.duplicateOf}` : 'Initial submission'
    });

    if (userId) {
      await User.findByIdAndUpdate(userId, { $inc: { karmaTotal: 10 } });
    }

    res.status(201).json(problem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getNearbyProblems = async (req: Request, res: Response) => {
  try {
    const { lat, lng, category, radius = 5000 } = req.query; // Default 5km radius
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const query: any = {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng as string), parseFloat(lat as string)]
          },
          $maxDistance: parseInt(radius as string)
        }
      }
    };

    if (category) {
      query.category = category;
    }

    const problems = await Problem.find(query).limit(20);
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMyProblems = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const problems = await Problem.find({ submittedBy: userId }).sort({ createdAt: -1 });
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProblemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let problem;
    if (id.startsWith('NIR-PROB-')) {
      problem = await Problem.findOne({ problemIdReadable: id }).populate('submittedBy', 'name role');
    } else {
      problem = await Problem.findById(id).populate('submittedBy', 'name role');
    }
    
    if (!problem) return res.status(404).json({ error: 'Problem not found' });
    
    const history = await StatusHistory.find({ problem: problem._id }).sort({ timestamp: -1 }).populate('changedBy', 'name');
    
    res.json({ problem, history });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProblemStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;
    const userId = (req as any).user?.id; // Admin user

    const problem = await Problem.findById(id);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const fromStatus = problem.status;
    problem.status = status;
    await problem.save();

    await StatusHistory.create({
      problem: id,
      changedBy: userId,
      fromStatus,
      toStatus: status,
      note
    });

    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllProblems = async (req: Request, res: Response) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
