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

const userRouter = Router();

userRouter.post('/', authentification,createUser);
userRouter.get('/', authentification, authorization([RoleEnum.ADMIN]), getAllUsers);
userRouter.get('/email/:email', authentification, getUserByEmail);
userRouter.get('/:id', authentification, getUserById);
userRouter.put('/:id', authentification, authorization([RoleEnum.ADMIN, RoleEnum.USER]),updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
