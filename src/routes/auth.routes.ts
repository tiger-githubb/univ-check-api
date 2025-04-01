import * as express from "express";
import { UserController } from "../controllers/user.controllers";
import { AuthController } from "../controllers/auth.controller";
const Router = express.Router();

Router.post("/signup", UserController.signup);
Router.post("/signin", AuthController.signin);

export { Router as authRouter };
