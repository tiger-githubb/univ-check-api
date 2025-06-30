import { AppDataSource } from "../config/data-source";
import { CreateProgrammeDto } from "../dto/programme.dto";
import { Departement } from "../entity/Departement.entity";
import { Programme } from "../entity/Programme.entity";

export class ProgrammeService {
    private readonly programmeRepository = AppDataSource.getRepository(Programme);
    private readonly departementRepository = AppDataSource.getRepository(Departement);

    async createProgramme(data: Partial<CreateProgrammeDto>): Promise<Programme> {
        const departement = await this.departementRepository.findOneByOrFail({ id: data.departementId})

        const { departementId, ...rest } = data;
        const programme = this.programmeRepository.create({
            ...rest,
            departement
        });
        return await this.programmeRepository.save(programme);
    }

    async getProgrammeById(id: string): Promise<Programme | null> {
        return await this.programmeRepository.findOne({
            relations: {
                departement: true,
                courses: true,
            },
            where: { id }
        });
    }

    async getAllProgrammes(order: 'asc' | 'desc' = 'desc'): Promise<Programme[]> {
        return await this.programmeRepository.find({ order: { updatedAt: order.toUpperCase() as 'ASC' | 'DESC' }, relations: {departement: true} });
    }

    async updateProgramme(id: string, data: Partial<CreateProgrammeDto>): Promise<Programme | null> {
        const programme = await this.programmeRepository.findOneBy({ id });
        if (!programme) return null;

        const { departementId, ...rest } = data;

        // Si un nouvel ID de département est fourni
        if (departementId) {
            programme.departement = await this.departementRepository.findOneByOrFail({ id: departementId });
        }

        // Mise à jour des autres champs simples
        Object.assign(programme, rest);

        return await this.programmeRepository.save(programme);
    }

    async deleteProgramme(id: string): Promise<void> {
        await this.programmeRepository.delete(id);
    }
}
