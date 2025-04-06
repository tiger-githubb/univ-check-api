import { Router } from 'express';
import {
    createAcademicYear,
    getAcademicYearById,
    getAllAcademicYears,
    updateAcademicYear,
    deleteAcademicYear
} from '../controllers/academicYear.controller';
import { authentification } from '../middleware/authentification';
import { RoleEnum } from '../entity/User.entity';
import { authorization } from '../middleware/authorization';

const academicYearRouter = Router();

academicYearRouter.post('/', authentification, authorization([RoleEnum.ADMIN, RoleEnum.SUPERVISOR]), createAcademicYear);
academicYearRouter.get('/', getAllAcademicYears);
academicYearRouter.get('/:id', getAcademicYearById);
academicYearRouter.put('/:id', authentification, authorization([RoleEnum.ADMIN, RoleEnum.SUPERVISOR]), updateAcademicYear);
academicYearRouter.delete('/:id', authentification, deleteAcademicYear);

export default academicYearRouter;
