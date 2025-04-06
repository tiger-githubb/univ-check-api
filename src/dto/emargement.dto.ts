import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { EmargementStatus } from '../entity/Emargement.entity';

export class CreateEmargementDto {
    // On attend l'id de la session à laquelle se rapporte l'émargement
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    classSessionId: string;

    // Id du professeur concerné (normalement celui qui se connecte pour émarger)
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    professorId: string;

    // Le status initial sera généralement "En attente"
    @IsNotEmpty()
    @IsEnum(EmargementStatus)
    @IsString()
    status: EmargementStatus;
}
