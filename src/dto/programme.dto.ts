import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProgrammeDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    // L'id du département auquel appartient le programme
    @IsNotEmpty()
    @IsString()
    departementId: string;
}
