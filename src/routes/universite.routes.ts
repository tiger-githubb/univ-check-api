import { Router } from 'express';
import {
    createUniversite,
    getUniversiteById,
    getAllUniversites,
    updateUniversite,
    deleteUniversite
} from '../controllers/universite.controller';
import { authentification } from '../middleware/authentification';
import { RoleEnum } from '../entity/User.entity';
import { authorization } from '../middleware/authorization';

const universiteRouter = Router();

universiteRouter.post('/', authentification, authorization([RoleEnum.ADMIN, RoleEnum.SUPERVISOR]), createUniversite);
universiteRouter.get('/', getAllUniversites);
universiteRouter.get('/:id', getUniversiteById);
universiteRouter.put('/:id', authentification, authorization([RoleEnum.ADMIN, RoleEnum.SUPERVISOR]), updateUniversite);
universiteRouter.delete('/:id', authentification, deleteUniversite);

export default universiteRouter;
