import { Router } from 'express';
import {
    createClassSession,
    getClassSessionById,
    getAllClassSessions,
    updateClassSession,
    deleteClassSession,
    getClassSessionsByTeacherAndPeriod
} from '../controllers/classSession.controller';
import { authentification } from '../middleware/authentification';

const classSessionRouter = Router();

classSessionRouter.post('/', authentification, createClassSession);
classSessionRouter.get('/', getAllClassSessions);
classSessionRouter.get('/:id', authentification, getClassSessionById);
classSessionRouter.put('/:id', authentification, updateClassSession);
classSessionRouter.delete('/:id', authentification, deleteClassSession);
classSessionRouter.get('/by-teacher', authentification, getClassSessionsByTeacherAndPeriod);

export default classSessionRouter;
