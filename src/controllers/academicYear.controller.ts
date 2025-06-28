import { Request, Response } from "express";
import { AcademicYearService } from "../services/academicYear.service";

const academicYearService = new AcademicYearService();

export const createAcademicYear = async (req: Request, res: Response) => {
    try {
        const academicYear = await academicYearService.createAcademicYear(req.body);
        res.status(201).json(academicYear);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'année académique", error });
    }
};

export const getAcademicYearById = async (req: Request, res: Response) => {
    try {
        const academicYear = await academicYearService.getAcademicYearById(req.params.id);
        if (!academicYear) return res.status(404).json({ message: "Année académique non trouvée" });
        res.json(academicYear);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'année académique", error });
    }
};

export const getAllAcademicYears = async (req: Request, res: Response) => {
    try {
        const order = (req.query.order === 'asc' || req.query.order === 'desc') ? req.query.order : 'desc';
        const academicYears = await academicYearService.getAllAcademicYears(order as 'asc' | 'desc');
        res.json(academicYears);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des années académiques", error });
    }
};

export const updateAcademicYear = async (req: Request, res: Response) => {
    try {
        const academicYear = await academicYearService.updateAcademicYear(req.params.id, req.body);
        if (!academicYear) return res.status(404).json({ message: "Année académique non trouvée" });
        res.json(academicYear);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'année académique", error });
    }
};

export const deleteAcademicYear = async (req: Request, res: Response) => {
    try {
        await academicYearService.deleteAcademicYear(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'année académique", error });
    }
};
