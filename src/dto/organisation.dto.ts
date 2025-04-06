import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganisationDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
