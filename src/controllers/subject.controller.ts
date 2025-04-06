import { Request, Response } from "express";
import { SubjectService } from "../services/subject.service";

const subjectService = new SubjectService();

export const createSubject = async (req: Request, res: Response) => {
    try {
        const subject = await subjectService.createSubject(req.body);
        res.status(201).json(subject);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la matière", error });
    }
};

export const getSubjectById = async (req: Request, res: Response) => {
    try {
        const subject = await subjectService.getSubjectById(req.params.id);
        if (!subject) return res.status(404).json({ message: "Matière non trouvée" });
        res.json(subject);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la matière", error });
    }
};

export const getAllSubjects = async (req: Request, res: Response) => {
    try {
        const subjects = await subjectService.getAllSubjects();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des matières", error });
    }
};

export const updateSubject = async (req: Request, res: Response) => {
    try {
        const subject = await subjectService.updateSubject(req.params.id, req.body);
        if (!subject) return res.status(404).json({ message: "Matière non trouvée" });
        res.json(subject);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la matière", error });
    }
};

export const deleteSubject = async (req: Request, res: Response) => {
    try {
        await subjectService.deleteSubject(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la matière", error });
    }
};
