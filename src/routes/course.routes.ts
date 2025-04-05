import { Router } from 'express';
import {
    createCourse,
    getCourseById,
    getAllCourses,
    updateCourse,
    deleteCourse
} from '../controllers/course.controller';
import { authentification } from '../middleware/authentification';
import { RoleEnum } from '../entity/User.entity';
import { authorization } from '../middleware/authorization';

const courseRouter = Router();

courseRouter.post('/', authentification, authorization([RoleEnum.ADMIN, RoleEnum.SUPERVISOR]), createCourse);
courseRouter.get('/', getAllCourses);
courseRouter.get('/:id', getCourseById);
courseRouter.put('/:id', authentification, authorization([RoleEnum.ADMIN, RoleEnum.SUPERVISOR]), updateCourse);
courseRouter.delete('/:id', authentification, deleteCourse);

export default courseRouter;
