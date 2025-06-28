import { AppDataSource } from "../config/data-source";
import { CreateSubjectDto } from "../dto/subject.dto";
import { Subject } from "../entity/Subject.entity";

export class SubjectService {
    private readonly subjectRepository = AppDataSource.getRepository(Subject);

    async createSubject(data: Partial<CreateSubjectDto>): Promise<Subject> {
        const subject = this.subjectRepository.create(data);
        return await this.subjectRepository.save(subject);
    }

    async getSubjectById(id: string): Promise<Subject | null> {
        return await this.subjectRepository.findOne({ where: { id } });
    }

    async getAllSubjects(order: 'asc' | 'desc' = 'desc'): Promise<Subject[]> {
        // If Subject does not have updatedAt, fallback to id (UUID) for deterministic order
        return await this.subjectRepository.find({ order: { id: order.toUpperCase() as 'ASC' | 'DESC' } });
    }

    async updateSubject(id: string, data: Partial<Subject>): Promise<Subject | null> {
        await this.subjectRepository.update(id, data);
        return this.getSubjectById(id);
    }

    async deleteSubject(id: string): Promise<void> {
        await this.subjectRepository.delete(id);
    }
}
