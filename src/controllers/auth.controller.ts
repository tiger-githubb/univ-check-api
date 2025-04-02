import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";
import { Payload } from "../dto/user.dto";

export class AuthController {
  static async search (data: Payload) {
    const { email, id } = data;
    let options = {email};
    if (id) options['id'] = id;
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOne({ where: options });
  }

  static async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: " email and password required" });
      }

      const user = await AuthController.search({email});

      const isPasswordValid = encrypt.comparepassword(user.password, password);
      if (!user || !isPasswordValid) {
        return res.status(404).json({ message: "User not found" });
      }
      const token = encrypt.generateToken({ id: user.id, email: user.email });

      return res.status(200).json({ token, ...user, password: undefined });
    } catch (error) {
      // console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfile(req: Request, res: Response) {
    if (!req["currentUser"]) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req["currentUser"].id },
    });
    return res.status(200).json({ ...user, password: undefined });
  }
}
