import { AppDataSource } from "../config/data-source";
import { CreateDepartementDto } from "../dto/departement.dto";
import { Departement } from "../entity/Departement.entity";
import { Universite } from "../entity/Universite.entity";

export class DepartementService {
    private readonly departementRepository = AppDataSource.getRepository(Departement);
    private readonly universityRepository = AppDataSource.getRepository(Universite);

    async createDepartement(data: Partial<CreateDepartementDto>): Promise<Departement> {
        try {
            const university = await this.universityRepository.findOneByOrFail({ id: data.universityId});
    
            const {universityId, ...rest } = data;
            const departement = this.departementRepository.create({
                ...rest,
                university
            });
            return await this.departementRepository.save(departement);
        } catch (error) {
            throw error;
        }
    }

    async getDepartementById(id: string): Promise<Departement | null> {
        return await this.departementRepository.findOne({
            where: { id },
            relations: {university: true}
        });
    }

    async getAllDepartements(order: 'asc' | 'desc' = 'desc'): Promise<Departement[]> {
        return await this.departementRepository.find({ order: { updatedAt: order.toUpperCase() as 'ASC' | 'DESC' } , relations: {university: true}});
    }

    async updateDepartement(id: string, data: Partial<CreateDepartementDto>): Promise<Departement | null> {
        const departement = await this.departementRepository.findOneBy({ id });
        if (!departement) return null;

        const { universityId, ...rest } = data;

        // Si un nouvel ID d'université est fourni
        if (universityId) {
            departement.university = await this.universityRepository.findOneByOrFail({ id: universityId });
        }

        // Mise à jour des autres champs simples
        Object.assign(departement, rest);

        return await this.departementRepository.save(departement);
    }

    async deleteDepartement(id: string): Promise<void> {
        await this.departementRepository.delete(id);
    }
}
