import { Request, Response } from "express";
import { DepartementService } from "../services/departement.service";

const departementService = new DepartementService();

export const createDepartement = async (req: Request, res: Response) => {
    try {
        const departement = await departementService.createDepartement(req.body);
        res.status(201).json(departement);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création du département", error });
    }
};

export const getDepartementById = async (req: Request, res: Response) => {
    try {
        const departement = await departementService.getDepartementById(req.params.id);
        if (!departement) return res.status(404).json({ message: "Département non trouvé" });
        res.json(departement);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du département", error });
    }
};

export const getAllDepartements = async (req: Request, res: Response) => {
    try {
        const order = (req.query.order === 'asc' || req.query.order === 'desc') ? req.query.order : 'desc';
        const departements = await departementService.getAllDepartements(order as 'asc' | 'desc');
        res.json(departements);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des départements", error });
    }
};

export const updateDepartement = async (req: Request, res: Response) => {
    try {
        const departement = await departementService.updateDepartement(req.params.id, req.body);
        if (!departement) return res.status(404).json({ message: "Département non trouvé" });
        res.json(departement);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du département", error });
    }
};

export const deleteDepartement = async (req: Request, res: Response) => {
    try {
        await departementService.deleteDepartement(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du département", error });
    }
};
