import { Router } from 'express';
import { requestOtp, verifyOtp, getMe, updateMe, register, loginWithPassword, anonymousLogin } from './controller';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();

router.post('/otp/request', requestOtp);
router.post('/otp/verify', verifyOtp);
router.post('/register', register);
router.post('/login', loginWithPassword);
router.post('/anonymous', anonymousLogin);
router.get('/me', authMiddleware, getMe);
router.patch('/me', authMiddleware, updateMe);

export default router;
