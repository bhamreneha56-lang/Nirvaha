import { Router } from 'express';
import { requestOtp, verifyOtp, getMe, updateMe } from './controller';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();

router.post('/otp/request', requestOtp);
router.post('/otp/verify', verifyOtp);
router.get('/me', authMiddleware, getMe);
router.patch('/me', authMiddleware, updateMe);

export default router;
