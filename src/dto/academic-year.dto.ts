import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAcademicYearDto {
    @IsNotEmpty()
    @IsString()
    periode: string; // ex: "2024-2025"
}
