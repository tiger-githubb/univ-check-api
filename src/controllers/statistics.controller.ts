import { Request, Response } from "express";
import { StatisticsService } from "../services/statistics.service";
import { AdminStatQueryDto, BulkDepartement, StatisticsQueryDto } from "../dto/statistics.dto";

const statisticsService = new StatisticsService();

export const addBulkDepartments = async (req: Request, res: Response) => {
  try {
    const data = req.body as BulkDepartement[];
    const stats = await statisticsService.addBulkDepartments(data);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'enrégistrement multiple", error });
  }
};

export const getAdminStatistics = async (req: Request, res: Response) => {
  try {
    const param = req.query as unknown as AdminStatQueryDto;
    const stats = await statisticsService.getAdminStatistics(param);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des statistiques administratives", error });
  }
};

export const getStatistics = async (req: Request, res: Response) => {
  try {
    const param = req.query as unknown as StatisticsQueryDto;
    const stats = await statisticsService.getStatistics(param);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des statistiques métiers", error });
  }
};

export const getProfStatistics = async (req: Request, res: Response) => {
  try {
    const stats = await statisticsService.getProfStatistics(req.params.id);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des statistiques du prof", error });
  }
};
