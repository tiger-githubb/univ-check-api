import { Request, Response } from "express";
import { CourseService } from "../services/course.service";

const courseService = new CourseService();

export const createCourse = async (req: Request, res: Response) => {
    try {
        const course = await courseService.createCourse(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la matière", error });
    }
};

export const getCourseById = async (req: Request, res: Response) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        if (!course) return res.status(404).json({ message: "Matière non trouvée" });
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la matière", error });
    }
};

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const order = (req.query.order === 'asc' || req.query.order === 'desc') ? req.query.order : 'desc';
        const courses = await courseService.getAllCourses(order as 'asc' | 'desc');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des cours", error });
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    try {
        const course = await courseService.updateCourse(req.params.id, req.body);
        if (!course) return res.status(404).json({ message: "Matière non trouvée" });
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la matière", error });
    }
};

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        await courseService.deleteCourse(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la matière", error });
    }
};
