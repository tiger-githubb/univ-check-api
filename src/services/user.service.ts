import { AppDataSource } from "../config/data-source";
import { CreateUserDto } from "../dto/user.dto";
import { User } from "../entity/User.entity";
import * as bcrypt from 'bcrypt';

export class UserService {
    private readonly userRepository = AppDataSource.getRepository(User);

    async createUser(data: CreateUserDto): Promise<User> {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const user = new User();
        user.name = data.name;
        user.phone = data.phone;
        user.email = data.email;
        user.role = data.role;
        user.password = data.password;
        return await this.userRepository.save(user);
    }

    async getUserById(id: string): Promise<User | null> {
        return await this.userRepository.findOne({ 
            relations: { 
                classSessions: {
                    academicYear: true, 
                    course: true, 
                    professor: true, 
                    classRepresentative: true,
                }
            }, 
            where: { id } 
        });
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async updateUser(id: string, data: Partial<User>): Promise<User | null> {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        await this.userRepository.update(id, data);
        return this.getUserById(id);
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email } });
    }
}
