import { Router } from 'express';
import { addFeedback, validateProblem, getLeaderboard, getMyKarma } from './controller';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();

// Hooked into /api
router.post('/problems/:id/feedback', authMiddleware, addFeedback);
router.post('/problems/:id/validate', authMiddleware, validateProblem);

router.get('/leaderboard', getLeaderboard);
router.get('/karma/mine', authMiddleware, getMyKarma);

export default router;
