import { Request, Response } from "express";
import { ClassSessionService } from "../services/classSession.service";

const classSessionService = new ClassSessionService();

export const createClassSession = async (req: Request, res: Response) => {
    try {
        const session = await classSessionService.createClassSession(req.body);
        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la session de cours", error });
    }
};

export const getClassSessionById = async (req: Request, res: Response) => {
    try {
        const session = await classSessionService.getClassSessionById(req.params.id);
        if (!session) return res.status(404).json({ message: "Session de cours non trouvée" });
        res.json(session);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la session de cours", error });
    }
};

export const getAllClassSessions = async (req: Request, res: Response) => {
    try {
        const sessions = await classSessionService.getAllClassSessions();
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des sessions de cours", error });
    }
};

export const updateClassSession = async (req: Request, res: Response) => {
    try {
        const session = await classSessionService.updateClassSession(req.params.id, req.body);
        if (!session) return res.status(404).json({ message: "Session de cours non trouvée" });
        res.json(session);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la session de cours", error });
    }
};

export const deleteClassSession = async (req: Request, res: Response) => {
    try {
        await classSessionService.deleteClassSession(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la session de cours", error });
    }
};

export const getClassSessionsByTeacherAndPeriod = async (req: Request, res: Response) => {
    try {
        const { teacherId, week, day } = req.query;
        if (!teacherId) {
            return res.status(400).json({ message: "teacherId is required" });
        }
        const sessions = await classSessionService.getClassSessionsByTeacherAndPeriod(
            teacherId as string,
            week ? parseInt(week as string) : undefined,
            day ? day as string : undefined
        );
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des sessions de cours du professeur", error });
    }
};
