import { Router } from 'express';
import {
    createSubject,
    getSubjectById,
    getAllSubjects,
    updateSubject,
    deleteSubject
} from '../controllers/subject.controller';

const subjectRouter = Router();

subjectRouter.post('/', createSubject);
subjectRouter.get('/', getAllSubjects);
subjectRouter.get('/:id', getSubjectById);
subjectRouter.put('/:id', updateSubject);
subjectRouter.delete('/:id', deleteSubject);

export default subjectRouter;
