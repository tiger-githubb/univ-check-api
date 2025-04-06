import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  statusCode?: number;
  data?: any;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  const data = err.data;

  console.error(`Error ${statusCode}: ${message}`, err); // Journalisation plus détaillée

  res.status(statusCode).json({
    message,
    ...(data && { data }), // Inclure les données supplémentaires si elles existent
    stack: process.env.NODE_ENV === "dev" ? err.stack : undefined, // Inclure la pile d'exécution en développement
  });
};