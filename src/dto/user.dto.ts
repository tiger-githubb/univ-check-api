import { RoleEnum } from "../entity/User";

export class CreateUserDTO {
  name: string;
  email: string;
  phone: string;
  role: RoleEnum;
  password: string;
}
export type Payload = {
  id?: string;
  email: string;
};
