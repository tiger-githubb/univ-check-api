import { Router } from 'express';
import {
    createNotification,
    getNotificationById,
    getAllNotifications,
    updateNotification,
    deleteNotification
} from '../controllers/notification.controller';
import { authentification } from '../middleware/authentification';

const notificationRouter = Router();

notificationRouter.post('/', authentification, createNotification);
notificationRouter.get('/', getAllNotifications);
notificationRouter.get('/:id', getNotificationById);
notificationRouter.put('/:id', authentification, updateNotification);
notificationRouter.delete('/:id', authentification, deleteNotification);

export default notificationRouter;
