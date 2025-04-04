import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUniversiteDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    // On attend l'id de l'organisation à laquelle l'université appartient
    @IsNotEmpty()
    @IsString()
    organisationId: string;

    // L'ID de l'utilisateur qui est le responsable de l'université
    @IsNotEmpty()
    @IsString()
    responsableId: string;
}
