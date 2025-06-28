import { Router } from 'express';
import {
    createEmargement,
    getEmargementById,
    getAllEmargements,
    updateEmargement,
    deleteEmargement,
    setEmargementState,
    getEmargementsByTeacher
} from '../controllers/emargement.controller';
import { authentification } from '../middleware/authentification';

const emargementRouter = Router();

emargementRouter.post('/', authentification, createEmargement);
emargementRouter.get('/', authentification, getAllEmargements);
emargementRouter.get('/:id', authentification, getEmargementById);
emargementRouter.patch('/status/:id/:status', authentification, setEmargementState);
emargementRouter.put('/:id', authentification, updateEmargement);
emargementRouter.delete('/:id', authentification, deleteEmargement);
emargementRouter.get('/by-teacher', authentification, getEmargementsByTeacher);

export default emargementRouter;
