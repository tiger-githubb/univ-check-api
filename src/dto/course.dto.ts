import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
    @IsNotEmpty()
    @IsString()
    nom: string;

    @IsNotEmpty()
    @IsInt()
    volumeHoraire: number;

    // On attend l'id du programme auquel la matière appartient
    @IsNotEmpty()
    @IsString()
    programmeId: string;
}
