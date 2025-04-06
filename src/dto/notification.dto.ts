import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NotificationStatus } from '../entity/Notification.entity';

export class CreateNotificationDto {
    // Id de l'émargement qui déclenche la notification
    @IsNotEmpty()
    @IsString()
    emargementId: string;

    @IsNotEmpty()
    @IsString()
    message: string;

    // Status initial de la notification (par exemple "Envoyée")
    @IsNotEmpty()
    @IsEnum(NotificationStatus)
    @IsString()
    status: NotificationStatus;

    // Id du destinataire, généralement le responsable de l'université (User)
    @IsNotEmpty()
    @IsString()
    recipientId: string;
}
