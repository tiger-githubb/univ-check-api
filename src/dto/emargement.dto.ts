import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmargementDto {
    // On attend l'id de la session à laquelle se rapporte l'émargement
    @IsNotEmpty()
    @IsString()
    classSessionId: string;

    // Id du professeur concerné (normalement celui qui se connecte pour émarger)
    @IsNotEmpty()
    @IsString()
    professorId: string;

    // Le status initial sera généralement "En attente"
    @IsNotEmpty()
    @IsString()
    status: "En attente" | "Présent" | "Signalé absent";
}
