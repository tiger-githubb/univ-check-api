import { AppDataSource } from "../config/data-source";
import { Universite } from "../entity/Universite.entity";

export class UniversiteService {
    private universiteRepository = AppDataSource.getRepository(Universite);

    async createUniversite(data: Partial<Universite>): Promise<Universite> {
        const universite = this.universiteRepository.create(data);
        return await this.universiteRepository.save(universite);
    }

    async getUniversiteById(id: string): Promise<Universite | null> {
        return await this.universiteRepository.findOne({
            where: { id },
            relations: { departements: true, responsable: true}
        });
    }

    async getAllUniversites(): Promise<Universite[]> {
        return await this.universiteRepository.find({
            relations: { departements: true, responsable: true}
        });
    }

    async updateUniversite(id: string, data: Partial<Universite>): Promise<Universite | null> {
        await this.universiteRepository.update(id, data);
        return this.getUniversiteById(id);
    }

    async deleteUniversite(id: string): Promise<void> {
        await this.universiteRepository.delete(id);
    }
}
