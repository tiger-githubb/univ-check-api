import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { encrypt } from "../helpers/encrypt";
import * as cache from "memory-cache";
import { User } from "../entity/user.entity";
import { CreateUserDTO } from "../dto/user.dto";

export abstract class UserFactory {
  static async create(data: CreateUserDTO) {
    const { name, email, phone, password, role } = data;

    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new User();
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.password = encryptedPassword;
    user.role = role;
    return user;
  }
}

export class UserController {
  static async seeder(data: CreateUserDTO): Promise<User> {
    const { email } = data;

    const userRepository = AppDataSource.getRepository(User);
    const existedUser = await userRepository.findOneBy({email});
    if (!existedUser) {
      return await userRepository.save(await UserFactory.create(data));
    }
  }
  static async signup(req: Request, res: Response) {
    const data = <CreateUserDTO>req.body;
    const { name, email, phone, password, role } = data;
    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: 'Bad request' })
    }

    const userRepository = AppDataSource.getRepository(User);
    const existedUser = await userRepository.findOneBy({email});
    if (existedUser) {
      return res.status(409).json({ message: 'Email allready exists !'})
    }
    const user = await userRepository.save(await UserFactory.create(data));

    const token = encrypt.generateToken({ id: user.id, email });

    return res
      .status(200)
      .json({ token, ...user, password: undefined });
  }

  static async getUsers(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find({select: {name: true, email: true, role: true, id: true}});

      cache.put("data", users, 6000);
      return res.status(200).json(users);
    }
  }
  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    user.name = name;
    user.email = email;
    await userRepository.save(user);
    res.status(200).json(user);
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    await userRepository.remove(user);
    res.status(200).json({ message: "ok" });
  }
}
