import * as express from "express";
import { authentification } from "../middleware/authentification";
import { UserController } from "../controllers/user.controllers";
import { authorization } from "../middleware/authorization";
import { AuthController } from "../controllers/auth.controller";
const Router = express.Router();

Router.get(
  "/",
  authentification,
  authorization(["admin"]),
  UserController.getUsers
);
Router.get(
  "/profile",
  authentification,
  authorization(["user", "admin"]),
  AuthController.getProfile
);
Router.post("/", authentification, UserController.signup);
Router.patch(
  "/:id",
  authentification,
  authorization(["user", "admin"]),
  UserController.updateUser
);
Router.delete(
  "/:id",
  authentification,
  authorization(["admin"]),
  UserController.deleteUser
);
export { Router as userRouter };
