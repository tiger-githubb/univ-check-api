import { Request, Response } from "express";
import { UniversiteService } from "../services/universite.service";

const universiteService = new UniversiteService();

export const createUniversite = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const universite = await universiteService.createUniversite(req.body);
        res.status(201).json(universite);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'université", error });
    }
};

export const getUniversiteById = async (req: Request, res: Response) => {
    try {
        const universite = await universiteService.getUniversiteById(req.params.id);
        if (!universite) return res.status(404).json({ message: "Université non trouvée" });
        res.json(universite);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'université", error });
    }
};

export const getAllUniversites = async (req: Request, res: Response) => {
    try {
        const order = (req.query.order === 'asc' || req.query.order === 'desc') ? req.query.order : 'desc';
        const universites = await universiteService.getAllUniversites(order as 'asc' | 'desc');
        res.json(universites);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des universités", error });
    }
};

export const updateUniversite = async (req: Request, res: Response) => {
    try {
        const universite = await universiteService.updateUniversite(req.params.id, req.body);
        if (!universite) return res.status(404).json({ message: "Université non trouvée" });
        res.json(universite);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'université", error });
    }
};

export const deleteUniversite = async (req: Request, res: Response) => {
    try {
        await universiteService.deleteUniversite(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'université", error });
    }
};
