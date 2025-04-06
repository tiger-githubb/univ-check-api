import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartementDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    // On attend l'id de l'université dans laquelle se trouve le département
    @IsNotEmpty()
    @IsString()
    universityId: string;
}
