import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RoleEnum } from "../entity/User.entity";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  role: RoleEnum;

  // Pour un enseignant, liste des sujets enseignés (optionnel)
  subjects?: string[];

  // Pour un étudiant, l'id du programme auquel il est inscrit (optionnel)
  programmeId?: string;
}

export type Payload = {
  id?: string;
  email: string;
};



export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}