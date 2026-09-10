import { Request, Response } from 'express';
import Notification from '../../shared/models/Notification';

export const getMyNotifications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    
    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: userId },
      { isRead: true },
      { new: true }
    );
    
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Internal function to create a notification (not a route)
export const createNotification = async (userId: string, type: string, message: string, relatedProblemId?: string) => {
  return await Notification.create({
    user: userId,
    type,
    message,
    relatedProblem: relatedProblemId
  });
};
