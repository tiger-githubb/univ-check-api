import { AppDataSource } from "../config/data-source";
import { AcademicYear } from "../entity/AcademicYear.entity";

export class AcademicYearService {
    private academicYearRepository = AppDataSource.getRepository(AcademicYear);

    async createAcademicYear(data: Partial<AcademicYear>): Promise<AcademicYear> {
        const academicYear = this.academicYearRepository.create(data);
        return await this.academicYearRepository.save(academicYear);
    }

    async getAcademicYearById(id: string): Promise<AcademicYear | null> {
        return await this.academicYearRepository.findOne({ where: { id } });
    }

    async getAllAcademicYears(): Promise<AcademicYear[]> {
        return await this.academicYearRepository.find();
    }

    async updateAcademicYear(id: string, data: Partial<AcademicYear>): Promise<AcademicYear | null> {
        await this.academicYearRepository.update(id, data);
        return this.getAcademicYearById(id);
    }

    async deleteAcademicYear(id: string): Promise<void> {
        await this.academicYearRepository.delete(id);
    }
}
