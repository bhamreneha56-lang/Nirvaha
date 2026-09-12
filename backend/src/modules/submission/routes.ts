import { Router } from 'express';
import { createProblem, getNearbyProblems, getMyProblems, getProblemById, updateProblemStatus, getAllProblems } from './controller';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();

// Guest or Auth allowed for creation (middleware needs to be optional or handled inside)
const optionalAuth = (req: any, res: any, next: any) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (token) {
    return authMiddleware(req, res, next);
  }
  next();
};

router.get('/', getAllProblems);
router.post('/', optionalAuth, createProblem);
router.get('/nearby', getNearbyProblems);
router.get('/mine', authMiddleware, getMyProblems);
router.get('/:id', getProblemById);
router.patch('/:id/status', authMiddleware, updateProblemStatus);

export default router;
