import { Router } from 'express';
import {
    createProgramme,
    getProgrammeById,
    getAllProgrammes,
    updateProgramme,
    deleteProgramme
} from '../controllers/programme.controller';

const programmeRouter = Router();

programmeRouter.post('/', createProgramme);
programmeRouter.get('/', getAllProgrammes);
programmeRouter.get('/:id', getProgrammeById);
programmeRouter.put('/:id', updateProgramme);
programmeRouter.delete('/:id', deleteProgramme);

export default programmeRouter;
