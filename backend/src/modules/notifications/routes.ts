import { Router } from 'express';
import { getMyNotifications, markAsRead } from './controller';
import { authMiddleware } from '../../shared/middleware/auth';

const router = Router();

router.get('/', authMiddleware, getMyNotifications);
router.patch('/:id/read', authMiddleware, markAsRead);

export default router;
