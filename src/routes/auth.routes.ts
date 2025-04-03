import * as express from "express";
import { AuthController } from "../controllers/auth.controller";
import {createUser} from "../controllers/user.controllers";
const Router = express.Router();

Router.post("/signup", createUser);
Router.post("/signin", AuthController.signin);

export { Router as authRouter };
