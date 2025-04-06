import { Router } from 'express';
import {
    createAcademicYear,
    getAcademicYearById,
    getAllAcademicYears,
    updateAcademicYear,
    deleteAcademicYear
} from '../controllers/academicYear.controller';

const academicYearRouter = Router();

academicYearRouter.post('/', createAcademicYear);
academicYearRouter.get('/', getAllAcademicYears);
academicYearRouter.get('/:id', getAcademicYearById);
academicYearRouter.put('/:id', updateAcademicYear);
academicYearRouter.delete('/:id', deleteAcademicYear);

export default academicYearRouter;
