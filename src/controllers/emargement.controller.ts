import { Request, Response } from "express";
import { EmargementService } from "../services/emargement.service";
import { EmargementStatus } from "../entity/Emargement.entity";

const emargementService = new EmargementService();

export const createEmargement = async (req: Request, res: Response) => {
    try {
        const emargement = await emargementService.createEmargement(req.body);
        res.status(201).json(emargement);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'émargement", error });
    }
};

export const getEmargementById = async (req: Request, res: Response) => {
    try {
        const emargement = await emargementService.getEmargementById(req.params.id);
        if (!emargement) return res.status(404).json({ message: "Émargement non trouvé" });
        res.json(emargement);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'émargement", error });
    }
};

export const getAllEmargements = async (req: Request, res: Response) => {
    try {
        const emargements = await emargementService.getAllEmargements();
        res.json(emargements);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des émargements", error });
    }
};

export const updateEmargement = async (req: Request, res: Response) => {
    try {
        const emargement = await emargementService.updateEmargement(req.params.id, req.body);
        if (!emargement) return res.status(404).json({ message: "Émargement non trouvé" });
        res.json(emargement);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'émargement", error });
    }
};

export const setEmargementState = async (req: Request, res: Response) => {
    try {
        const emargement = await emargementService.setStatus(req.params.id, req.params.status as EmargementStatus);
        if (!emargement) return res.status(404).json({ message: "Émargement non trouvé" });
        res.json(emargement);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'état de l'émargement", error });
    }
};

export const deleteEmargement = async (req: Request, res: Response) => {
    try {
        await emargementService.deleteEmargement(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'émargement", error });
    }
};

export const getEmargementsByTeacher = async (req: Request, res: Response) => {
    try {
        const { teacherId } = req.query;
        if (!teacherId) {
            return res.status(400).json({ message: "teacherId is required" });
        }
        const emargements = await emargementService.getEmargementsByTeacher(teacherId as string);
        res.json(emargements);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des émargements du professeur", error });
    }
};
