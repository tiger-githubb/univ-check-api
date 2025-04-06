import { AppDataSource } from "../config/data-source";
import { Programme } from "../entity/Programme.entity";

export class ProgrammeService {
    private programmeRepository = AppDataSource.getRepository(Programme);

    async createProgramme(data: Partial<Programme>): Promise<Programme> {
        const programme = this.programmeRepository.create(data);
        return await this.programmeRepository.save(programme);
    }

    async getProgrammeById(id: string): Promise<Programme | null> {
        return await this.programmeRepository.findOne({
            where: { id },
            relations: {courses: true}
        });
    }

    async getAllProgrammes(): Promise<Programme[]> {
        return await this.programmeRepository.find({ relations: {courses: true} });
    }

    async updateProgramme(id: string, data: Partial<Programme>): Promise<Programme | null> {
        await this.programmeRepository.update(id, data);
        return this.getProgrammeById(id);
    }

    async deleteProgramme(id: string): Promise<void> {
        await this.programmeRepository.delete(id);
    }
}
