import { AppDataSource } from "../config/data-source";
import { Emargement } from "../entity/Emargement.entity";

export class EmargementService {
    private emargementRepository = AppDataSource.getRepository(Emargement);

    async createEmargement(data: Partial<Emargement>): Promise<Emargement> {
        const emargement = this.emargementRepository.create(data);
        return await this.emargementRepository.save(emargement);
    }

    async getEmargementById(id: string): Promise<Emargement | null> {
        return await this.emargementRepository.findOne({
            where: { id },
            relations: { classSession: true, professor: true}
        });
    }

    async getAllEmargements(): Promise<Emargement[]> {
        return await this.emargementRepository.find({
            relations: { classSession: true, professor: true}
        });
    }

    async updateEmargement(id: string, data: Partial<Emargement>): Promise<Emargement | null> {
        await this.emargementRepository.update(id, data);
        return this.getEmargementById(id);
    }

    async deleteEmargement(id: string): Promise<void> {
        await this.emargementRepository.delete(id);
    }
}
