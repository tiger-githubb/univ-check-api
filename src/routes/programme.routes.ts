import { Router } from 'express';
import {
    createProgramme,
    getProgrammeById,
    getAllProgrammes,
    updateProgramme,
    deleteProgramme
} from '../controllers/programme.controller';
import { authentification } from '../middleware/authentification';
import { RoleEnum } from '../entity/User.entity';
import { authorization } from '../middleware/authorization';

const programmeRouter = Router();

programmeRouter.post('/', authentification, authorization([RoleEnum.ADMIN, RoleEnum.SUPERVISOR]), createProgramme);
programmeRouter.get('/', getAllProgrammes);
programmeRouter.get('/:id', getProgrammeById);
programmeRouter.put('/:id', authentification, authorization([RoleEnum.ADMIN, RoleEnum.SUPERVISOR]), updateProgramme);
programmeRouter.delete('/:id', authentification, deleteProgramme);

export default programmeRouter;
