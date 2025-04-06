import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User.entity";
import * as bcrypt from 'bcrypt';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async createUser(data: Partial<User>): Promise<User> {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const user = this.userRepository.create(data);
        return await this.userRepository.save(user);
    }

    async getUserById(id: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id } });
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
