import { AppDataSource } from "../config/data-source";
import { CreateOrganisationDto } from "../dto/organisation.dto";
import { Organisation } from "../entity/Organisation.entity";

export class OrganisationService {
    private readonly organisationRepository = AppDataSource.getRepository(Organisation);

    async createOrganisation(data: Partial<CreateOrganisationDto>): Promise<Organisation> {
        const organisation = this.organisationRepository.create(data);
        return await this.organisationRepository.save(organisation);
    }

    async getOrganisationById(id: string): Promise<Organisation | null> {
        return await this.organisationRepository.findOne({
            where: { id },
            relations: { universites: true }
        });
    }

    async getAllOrganisations(order: 'asc' | 'desc' = 'desc'): Promise<Organisation[]> {
        return await this.organisationRepository.find({ order: { updatedAt: order.toUpperCase() as 'ASC' | 'DESC' }, relations: { universites: true } });
    }

    async updateOrganisation(id: string, data: Partial<Organisation>): Promise<Organisation | null> {
        await this.organisationRepository.update(id, data);
        return this.getOrganisationById(id);
    }

    async deleteOrganisation(id: string): Promise<void> {
        await this.organisationRepository.delete(id);
    }
}
