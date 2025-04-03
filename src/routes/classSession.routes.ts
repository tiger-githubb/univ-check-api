import { Router } from 'express';
import {
    createClassSession,
    getClassSessionById,
    getAllClassSessions,
    updateClassSession,
    deleteClassSession
} from '../controllers/classSession.controller';

const classSessionRouter = Router();

classSessionRouter.post('/', createClassSession);
classSessionRouter.get('/', getAllClassSessions);
classSessionRouter.get('/:id', getClassSessionById);
classSessionRouter.put('/:id', updateClassSession);
classSessionRouter.delete('/:id', deleteClassSession);

export default classSessionRouter;
