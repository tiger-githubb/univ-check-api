import { Router } from 'express';
import {
    createDepartement,
    getDepartementById,
    getAllDepartements,
    updateDepartement,
    deleteDepartement
} from '../controllers/departement.controller';

const departementRouter = Router();

departementRouter.post('/', createDepartement);
departementRouter.get('/', getAllDepartements);
departementRouter.get('/:id', getDepartementById);
departementRouter.put('/:id', updateDepartement);
departementRouter.delete('/:id', deleteDepartement);

export default departementRouter;
