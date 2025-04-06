import { Router } from 'express';
import {
    createNotification,
    getNotificationById,
    getAllNotifications,
    updateNotification,
    deleteNotification
} from '../controllers/notification.controller';

const notificationRouter = Router();

notificationRouter.post('/', createNotification);
notificationRouter.get('/', getAllNotifications);
notificationRouter.get('/:id', getNotificationById);
notificationRouter.put('/:id', updateNotification);
notificationRouter.delete('/:id', deleteNotification);

export default notificationRouter;
