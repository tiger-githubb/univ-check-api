import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

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
    @IsUUID()
    academicYearId: string; // ID de l'année académique

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    courseId: string; // ID de la matière

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    professorId: string; // ID du professeur

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    classRepresentativeId: string; // ID du responsable de la session
}
