import * as express from "express";
import { authentification } from "../middleware/authentification";
import { UserController } from "../controllers/user.controllers";
import { authorization } from "../middleware/authorization";
import { AuthController } from "../controllers/auth.controller";
import { RoleEnum } from "../entity/User.entity";
const Router = express.Router();

Router.get(
  "/",
  authentification,
  authorization([RoleEnum.ADMIN]),
  UserController.getUsers
);
Router.get(
  "/profile",
  authentification,
  // authorization([RoleEnum.USER, RoleEnum.DELEGATE, RoleEnum.ADMIN]),
  AuthController.getProfile
);
Router.post("/", authentification, UserController.signup);
Router.patch(
  "/:id",
  authentification,
  authorization([RoleEnum.USER, RoleEnum.ADMIN]),
  UserController.updateUser
);
Router.delete(
  "/:id",
  authentification,
  authorization([RoleEnum.ADMIN]),
  UserController.deleteUser
);
export { Router as userRouter };
