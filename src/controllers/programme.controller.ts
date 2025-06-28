import { Request, Response } from "express";
import { ProgrammeService } from "../services/programme.service";

const programmeService = new ProgrammeService();

export const createProgramme = async (req: Request, res: Response) => {
    try {
        const programme = await programmeService.createProgramme(req.body);
        res.status(201).json(programme);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création du programme", error });
    }
};

export const getProgrammeById = async (req: Request, res: Response) => {
    try {
        const programme = await programmeService.getProgrammeById(req.params.id);
        if (!programme) return res.status(404).json({ message: "Programme non trouvé" });
        res.json(programme);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du programme", error });
    }
};

export const getAllProgrammes = async (req: Request, res: Response) => {
    try {
        const order = (req.query.order === 'asc' || req.query.order === 'desc') ? req.query.order : 'desc';
        const programmes = await programmeService.getAllProgrammes(order as 'asc' | 'desc');
        res.json(programmes);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des programmes", error });
    }
};

export const updateProgramme = async (req: Request, res: Response) => {
    try {
        const programme = await programmeService.updateProgramme(req.params.id, req.body);
        if (!programme) return res.status(404).json({ message: "Programme non trouvé" });
        res.json(programme);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du programme", error });
    }
};

export const deleteProgramme = async (req: Request, res: Response) => {
    try {
        await programmeService.deleteProgramme(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du programme", error });
    }
};
