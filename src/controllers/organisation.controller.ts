import { Request, Response } from "express";
import { OrganisationService } from "../services/organisation.service";

const organisationService = new OrganisationService();

export const createOrganisation = async (req: Request, res: Response) => {
    try {
        const organisation = await organisationService.createOrganisation(req.body);
        res.status(201).json(organisation);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'organisation", error });
    }
};

export const getOrganisationById = async (req: Request, res: Response) => {
    try {
        const organisation = await organisationService.getOrganisationById(req.params.id);
        if (!organisation) return res.status(404).json({ message: "Organisation non trouvée" });
        res.json(organisation);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'organisation", error });
    }
};

export const getAllOrganisations = async (req: Request, res: Response) => {
    try {
        const order = (req.query.order === 'asc' || req.query.order === 'desc') ? req.query.order : 'desc';
        const organisations = await organisationService.getAllOrganisations(order as 'asc' | 'desc');
        res.json(organisations);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des organisations", error });
    }
};

export const updateOrganisation = async (req: Request, res: Response) => {
    try {
        const organisation = await organisationService.updateOrganisation(req.params.id, req.body);
        if (!organisation) return res.status(404).json({ message: "Organisation non trouvée" });
        res.json(organisation);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'organisation", error });
    }
};

export const deleteOrganisation = async (req: Request, res: Response) => {
    try {
        await organisationService.deleteOrganisation(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'organisation", error });
    }
};
