import * as express from "express";
import { AuthController } from "../controllers/auth.controller";
import {createUser} from "../controllers/user.controllers";
import { validateDto } from "../middleware/validation";
import { CreateUserDto, LoginDto } from "../dto/user.dto";
const Router = express.Router();

Router.post("/signup", validateDto(CreateUserDto), createUser);

Router.post("/signin", validateDto(LoginDto), AuthController.signin);

export { Router as authRouter };
