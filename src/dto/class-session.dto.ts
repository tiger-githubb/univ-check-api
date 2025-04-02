import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateClassSessionDto {
    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @IsNotEmpty()
    @IsString()
    heureDebut: string;

    @IsNotEmpty()
    @IsString()
    heureFin: string;

    @IsNotEmpty()
    @IsString()
    academicYearId: string; // ID de l'année académique

    @IsNotEmpty()
    @IsString()
    subjectId: string; // ID de la matière

    @IsNotEmpty()
    @IsString()
    professorId: string; // ID du professeur

    @IsNotEmpty()
    @IsString()
    classRepresentativeId: string; // ID du responsable de la session
}
