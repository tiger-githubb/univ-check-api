import { Router } from 'express';
import {
    createDepartement,
    getDepartementById,
    getAllDepartements,
    updateDepartement,
    deleteDepartement
} from '../controllers/departement.controller';
import { authentification } from '../middleware/authentification';

const departementRouter = Router();

departementRouter.post('/', authentification, createDepartement);
departementRouter.get('/', getAllDepartements);
departementRouter.get('/:id', getDepartementById);
departementRouter.put('/:id', authentification, updateDepartement);
departementRouter.delete('/:id', authentification, deleteDepartement);

export default departementRouter;
