import { AppDataSource } from "../config/data-source";
import { Subject } from "../entity/Subject.entity";

export class SubjectService {
    private subjectRepository = AppDataSource.getRepository(Subject);

    async createSubject(data: Partial<Subject>): Promise<Subject> {
        const subject = this.subjectRepository.create(data);
        return await this.subjectRepository.save(subject);
    }

    async getSubjectById(id: string): Promise<Subject | null> {
        return await this.subjectRepository.findOne({ where: { id } });
    }

    async getAllSubjects(): Promise<Subject[]> {
        return await this.subjectRepository.find();
    }

    async updateSubject(id: string, data: Partial<Subject>): Promise<Subject | null> {
        await this.subjectRepository.update(id, data);
        return this.getSubjectById(id);
    }

    async deleteSubject(id: string): Promise<void> {
        await this.subjectRepository.delete(id);
    }
}
