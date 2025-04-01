import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Payload } from "../dto/user.dto";
import { AuthController } from "../controllers/auth.controller";
dotenv.config();

export const authentification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const payload = <Payload>jwt.verify(token, process.env.JWT_SECRET);
  if (!payload) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = AuthController.search(payload);
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  req["currentUser"] = payload;
  next();
};
