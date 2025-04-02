// src/seed.ts
import "reflect-metadata";
import { connectDB, AppDataSource } from "./config/data-source";
import { UserService } from "./services/user.service";
import { CreateUserDto } from "./dto/user.dto";
import {RoleEnum, User} from "./entity/User.entity";

// Exemple d'utilisateur par défaut
const defaultUser: CreateUserDto = {
    name: 'Univ Admin',
    email: 'univ.admin@gmail.com',
    role: RoleEnum.ADMIN,
    phone: '+228 90000090',
    password: '_KUSO58AD@',
};

async function seedDefaultUser() {
    await connectDB();
    const userService = new UserService();
    const existingUser = await userService.getUserByEmail(defaultUser.email);

    if (existingUser) {
        console.log("Utilisateur par défaut déjà présent.");
    } else {
        const userData: Partial<User> = {
            name: defaultUser.name,
            email: defaultUser.email,
            phone: defaultUser.phone,
            password: defaultUser.password, // On pourra chiffrer ici ou dans le service
            role: defaultUser.role
        };

        const createdUser = await userService.createUser(userData);
        console.log("Utilisateur par défaut créé :", createdUser);
    }
    // On ferme la connexion à la BDD
    await AppDataSource.destroy();
}

seedDefaultUser().catch((error) => console.error("Erreur lors du seed :", error));
