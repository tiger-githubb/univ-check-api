import {authentification} from "../middleware/authentification";
import {authorization} from "../middleware/authorization";
import {RoleEnum} from "../entity/User.entity";
import {Router} from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserByEmail,
    getUserById,
    updateUser
} from '../controllers/user.controllers';
import { validateDto } from "../middleware/validation";
import { CreateUserDto } from "../dto/user.dto";

const userRouter = Router();

userRouter.post(
    '/', 
    validateDto(CreateUserDto), 
    authentification, 
    authorization([RoleEnum.ADMIN, RoleEnum.SUPERVISOR]), 
    createUser
);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     description: Renvoie la liste de tous les utilisateurs
 *     responses:
 *       200:
 *         description: Succès
 */
userRouter.get('/', authentification, authorization([RoleEnum.ADMIN]), getAllUsers);
userRouter.get('/email/:email', authentification, getUserByEmail);
userRouter.get('/:id', authentification, getUserById);
userRouter.put('/:id', authentification, authorization([RoleEnum.ADMIN, RoleEnum.USER]), updateUser);
userRouter.delete('/:id', authentification, deleteUser);

export default userRouter;

