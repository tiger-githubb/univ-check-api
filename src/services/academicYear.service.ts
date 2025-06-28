import { AppDataSource } from "../config/data-source";
import { CreateAcademicYearDto } from "../dto/academic-year.dto";
import { AcademicYear } from "../entity/AcademicYear.entity";

export class AcademicYearService {
    private readonly academicYearRepository = AppDataSource.getRepository(AcademicYear);

    async createAcademicYear(data: CreateAcademicYearDto): Promise<AcademicYear> {
        const academicYear = this.academicYearRepository.create(data);
        return await this.academicYearRepository.save(academicYear);
    }

    async getAcademicYearById(id: string): Promise<AcademicYear | null> {
        return await this.academicYearRepository.findOne({ where: { id } });
    }

    async getAllAcademicYears(order: 'asc' | 'desc' = 'desc'): Promise<AcademicYear[]> {
        return await this.academicYearRepository.find({ order: { updatedAt: order.toUpperCase() as 'ASC' | 'DESC' } });
    }

    async updateAcademicYear(id: string, data: Partial<CreateAcademicYearDto>): Promise<AcademicYear | null> {
        await this.academicYearRepository.update(id, data);
        return this.getAcademicYearById(id);
    }

    async deleteAcademicYear(id: string): Promise<void> {
        await this.academicYearRepository.delete(id);
    }
}
