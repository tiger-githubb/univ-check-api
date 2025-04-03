import { Request, Response } from "express";
import { NotificationService } from "../services/notification.service";

const notificationService = new NotificationService();

export const createNotification = async (req: Request, res: Response) => {
    try {
        const notification = await notificationService.createNotification(req.body);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la notification", error });
    }
};

export const getNotificationById = async (req: Request, res: Response) => {
    try {
        const notification = await notificationService.getNotificationById(req.params.id);
        if (!notification) return res.status(404).json({ message: "Notification non trouvée" });
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la notification", error });
    }
};

export const getAllNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await notificationService.getAllNotifications();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des notifications", error });
    }
};

export const updateNotification = async (req: Request, res: Response) => {
    try {
        const notification = await notificationService.updateNotification(req.params.id, req.body);
        if (!notification) return res.status(404).json({ message: "Notification non trouvée" });
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la notification", error });
    }
};

export const deleteNotification = async (req: Request, res: Response) => {
    try {
        await notificationService.deleteNotification(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la notification", error });
    }
};
