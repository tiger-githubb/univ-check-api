import { Router } from 'express';
import {
    createEmargement,
    getEmargementById,
    getAllEmargements,
    updateEmargement,
    deleteEmargement
} from '../controllers/emargement.controller';

const emargementRouter = Router();

emargementRouter.post('/', createEmargement);
emargementRouter.get('/', getAllEmargements);
emargementRouter.get('/:id', getEmargementById);
emargementRouter.put('/:id', updateEmargement);
emargementRouter.delete('/:id', deleteEmargement);

export default emargementRouter;
