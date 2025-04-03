import { Router } from 'express';
import {
    createOrganisation,
    getOrganisationById,
    getAllOrganisations,
    updateOrganisation,
    deleteOrganisation
} from '../controllers/organisation.controller';

const organisationRouter = Router();

organisationRouter.post('/', createOrganisation);
organisationRouter.get('/', getAllOrganisations);
organisationRouter.get('/:id', getOrganisationById);
organisationRouter.put('/:id', updateOrganisation);
organisationRouter.delete('/:id', deleteOrganisation);

export default organisationRouter;
