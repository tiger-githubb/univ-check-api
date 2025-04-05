import { Router } from 'express';
import {
    createOrganisation,
    getOrganisationById,
    getAllOrganisations,
    updateOrganisation,
    deleteOrganisation
} from '../controllers/organisation.controller';
import { authentification } from '../middleware/authentification';
import { RoleEnum } from '../entity/User.entity';
import { authorization } from '../middleware/authorization';

const organisationRouter = Router();

organisationRouter.post('/', authentification, authorization([RoleEnum.ADMIN, RoleEnum.SUPERVISOR]), createOrganisation);
organisationRouter.get('/', getAllOrganisations);
organisationRouter.get('/:id', getOrganisationById);
organisationRouter.put('/:id', authentification, authorization([RoleEnum.ADMIN, RoleEnum.SUPERVISOR]), updateOrganisation);
organisationRouter.delete('/:id', authentification, deleteOrganisation);

export default organisationRouter;
