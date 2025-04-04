import { AppDataSource } from "../config/data-source";
import { Organisation } from "../entity/Organisation.entity";

export class OrganisationService {
    private organisationRepository = AppDataSource.getRepository(Organisation);

    async createOrganisation(data: Partial<Organisation>): Promise<Organisation> {
        const organisation = this.organisationRepository.create(data);
        return await this.organisationRepository.save(organisation);
    }

    async getOrganisationById(id: string): Promise<Organisation | null> {
        return await this.organisationRepository.findOne({
            where: { id },
            relations: { universites: true }
        });
    }

    async getAllOrganisations(): Promise<Organisation[]> {
        return await this.organisationRepository.find({ relations: { universites: true } });
    }

    async updateOrganisation(id: string, data: Partial<Organisation>): Promise<Organisation | null> {
        await this.organisationRepository.update(id, data);
        return this.getOrganisationById(id);
    }

    async deleteOrganisation(id: string): Promise<void> {
        await this.organisationRepository.delete(id);
    }
}
