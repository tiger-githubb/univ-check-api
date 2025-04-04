import { User } from "../entity/User.entity";

export abstract class UserFactory {
    static getUser(user: User): Partial<User> {
        if (!user) return {};
        // On ne retourne pas le mot de passe 
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    static getUserDeeply(user: User): Partial<User> {
        return {
            ...this.getUser(user),
            classSessions: user.classSessions,
            courses: user.courses,
            emargements: user.emargements,
            programme: user.programme,
        }
    }

    static getUsers(users: User[]): Partial<User>[] {
        return users.map(user => this.getUser(user));
    }
}