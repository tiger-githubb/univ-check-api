import { Router } from 'express';
import {
    createCourse,
    getCourseById,
    getAllCourses,
    updateCourse,
    deleteCourse
} from '../controllers/course.controller';

const courseRouter = Router();

courseRouter.post('/', createCourse);
courseRouter.get('/', getAllCourses);
courseRouter.get('/:id', getCourseById);
courseRouter.put('/:id', updateCourse);
courseRouter.delete('/:id', deleteCourse);

export default courseRouter;
