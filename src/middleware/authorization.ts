import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { RoleEnum, User } from "../entity/User.entity";

export const authorization = (roles: RoleEnum[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { id: req["currentUser"].id },
    });
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
