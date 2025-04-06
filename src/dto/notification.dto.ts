import { IsNotEmpty, IsString } from 'class-validator';

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
    @IsString()
    status: "Envoyée" | "Confirmée";

    // Id du destinataire, généralement le responsable de l'université (User)
    @IsNotEmpty()
    @IsString()
    recipientId: string;
}
