import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const validateDto = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObject = plainToInstance(dtoClass, req.body); // Convertir le corps de la requête en instance de DTO
        const errors = await validate(dtoObject); // Valider l'objet

        if (errors.length > 0) {
            // Si des erreurs de validation sont trouvées
            return res.status(400).json({
                message: 'Bad Request',
                errors: errors.map((error) => ({
                    property: error.property,
                    constraints: error.constraints,
                })),
            });
        }

        // Si la validation est réussie, passer à la suite (contrôleur)
        next();
    };
};
