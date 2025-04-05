import { AppDataSource } from "../config/data-source";
import { Notification } from "../entity/Notification.entity";

export class NotificationService {
    private notificationRepository = AppDataSource.getRepository(Notification);

    async createNotification(data: Partial<Notification>): Promise<Notification> {
        const notification = this.notificationRepository.create(data);
        return await this.notificationRepository.save(notification);
    }

    async getNotificationById(id: string): Promise<Notification | null> {
        return await this.notificationRepository.findOne({
            where: { id },
            relations: { emargement: true, recipient: true}
        });
    }

    async getAllNotifications(): Promise<Notification[]> {
        return await this.notificationRepository.find({
            relations: { emargement: true, recipient: true}
        });
    }

    async updateNotification(id: string, data: Partial<Notification>): Promise<Notification | null> {
        await this.notificationRepository.update(id, data);
        return this.getNotificationById(id);
    }

    async deleteNotification(id: string): Promise<void> {
        await this.notificationRepository.delete(id);
    }
}
