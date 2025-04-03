import { Request, Response } from "express";
import * as cache from "memory-cache";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/user.dto";
import {User} from "../entity/User.entity";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body as CreateUserDto;
    // Vérifier si un utilisateur avec cet email existe déjà
    const existingUser = await userService.getUserByEmail(data.email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists!" });
    }
    const userData: Partial<User> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password, // On pourra chiffrer ici ou dans le service
      role: data.role
    };

    // Créer l'utilisateur
    const user = await userService.createUser(userData);
    // Renvoie l'utilisateur créé sans le mot de passe
    return res.status(201).json({ ...user, password: undefined });
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const cacheKey = "users-list";
    const cachedUsers = cache.get(cacheKey);
    if (cachedUsers) {
      console.log("Serving from cache");
      return res.status(200).json(cachedUsers);
    }
    console.log("Serving from DB");
    const users = await userService.getAllUsers();
    // Stocke les utilisateurs en cache pour 6000 ms (6 secondes)
    cache.put(cacheKey, users, 6000);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    // Récupère l'utilisateur existant
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    // Si l'email est mis à jour, vérifier qu'il n'est pas déjà utilisé
    if (email && email !== user.email) {
      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "Email already exists!" });
      }
    }
    const updatedUser = await userService.updateUser(id, req.body);
    // Vider le cache pour forcer l'actualisation
    cache.del("users-list");
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Vérifier que l'utilisateur existe
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    await userService.deleteUser(id);
    // Vider le cache après suppression
    cache.del("users-list");
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error });
  }
};
