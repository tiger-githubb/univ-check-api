import { Router } from 'express';
import {
    createUniversite,
    getUniversiteById,
    getAllUniversites,
    updateUniversite,
    deleteUniversite
} from '../controllers/universite.controller';

const universiteRouter = Router();

universiteRouter.post('/', createUniversite);
universiteRouter.get('/', getAllUniversites);
universiteRouter.get('/:id', getUniversiteById);
universiteRouter.put('/:id', updateUniversite);
universiteRouter.delete('/:id', deleteUniversite);

export default universiteRouter;
