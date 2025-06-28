import { AppDataSource } from "../config/data-source";
import { CreateUniversiteDto } from "../dto/universite.dto";
import { Organisation } from "../entity/Organisation.entity";
import { Universite } from "../entity/Universite.entity";
import { User } from "../entity/User.entity";

export class UniversiteService {
    private readonly universiteRepository = AppDataSource.getRepository(Universite);
    private readonly organisationRepo = AppDataSource.getRepository(Organisation);
    private readonly userRepo = AppDataSource.getRepository(User);

    async createUniversite(data: Partial<CreateUniversiteDto>): Promise<Universite> {
        const organisation = await this.organisationRepo.findOneByOrFail({ id: data.organisationId });
        const responsable = await this.userRepo.findOneByOrFail({ id: data.responsableId });

        const { organisationId, responsableId, ...rest } = data;
        const universite = this.universiteRepository.create({
            ...rest,
            organisation,
            responsable
        });
        return await this.universiteRepository.save(universite);
    }

    async getUniversiteById(id: string): Promise<Universite | null> {
        return await this.universiteRepository.findOne({
            where: { id },
            relations: { organisation: true, departements: true, responsable: true }
        });
    }

    async getAllUniversites(order: 'asc' | 'desc' = 'desc'): Promise<Universite[]> {
        return await this.universiteRepository.find({
            order: { updatedAt: order.toUpperCase() as 'ASC' | 'DESC' },
            relations: { organisation: true, departements: true, responsable: true }
        });
    }

    async updateUniversite(id: string, data: Partial<CreateUniversiteDto>): Promise<Universite | null> {
        const universite = await this.universiteRepository.findOneBy({ id });
        if (!universite) return null;
    
        const { organisationId, responsableId, ...rest } = data;
    
        // Si un nouvel ID d'organisation est fourni
        if (organisationId) {
            universite.organisation = await this.organisationRepo.findOneByOrFail({ id: organisationId });
        }
    
        // Si un nouvel ID de responsable est fourni
        if (responsableId) {
            universite.responsable = await this.userRepo.findOneByOrFail({ id: responsableId });
        }
    
        // Mise à jour des autres champs simples
        Object.assign(universite, rest);
    
        return await this.universiteRepository.save(universite);
    }

    async deleteUniversite(id: string): Promise<void> {
        await this.universiteRepository.delete(id);
    }
}
