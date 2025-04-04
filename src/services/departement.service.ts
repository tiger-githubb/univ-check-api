import { AppDataSource } from "../config/data-source";
import { Departement } from "../entity/Departement.entity";

export class DepartementService {
    private departementRepository = AppDataSource.getRepository(Departement);

    async createDepartement(data: Partial<Departement>): Promise<Departement> {
        const departement = this.departementRepository.create(data);
        return await this.departementRepository.save(departement);
    }

    async getDepartementById(id: string): Promise<Departement | null> {
        return await this.departementRepository.findOne({
            where: { id },
            relations: {programs: true, university: true}
        });
    }

    async getAllDepartements(): Promise<Departement[]> {
        return await this.departementRepository.find({ relations: {programs: true,} });
    }

    async updateDepartement(id: string, data: Partial<Departement>): Promise<Departement | null> {
        await this.departementRepository.update(id, data);
        return this.getDepartementById(id);
    }

    async deleteDepartement(id: string): Promise<void> {
        await this.departementRepository.delete(id);
    }
}
