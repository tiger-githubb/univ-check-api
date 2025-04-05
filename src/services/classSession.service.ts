import { AppDataSource } from "../config/data-source";
import { ClassSession } from "../entity/ClassSession.entity";

export class ClassSessionService {
    private sessionRepository = AppDataSource.getRepository(ClassSession);

    async createClassSession(data: Partial<ClassSession>): Promise<ClassSession> {
        const session = this.sessionRepository.create(data);
        return await this.sessionRepository.save(session);
    }

    async getClassSessionById(id: string): Promise<ClassSession | null> {
        return await this.sessionRepository.findOne({
            where: { id },
            relations: {academicYear: true, course: true, professor: true, classRepresentative: true}
        });
    }

    async getAllClassSessions(): Promise<ClassSession[]> {
        return await this.sessionRepository.find({
            relations: {academicYear: true, course: true, professor: true, classRepresentative: true}
        });
    }

    async updateClassSession(id: string, data: Partial<ClassSession>): Promise<ClassSession | null> {
        await this.sessionRepository.update(id, data);
        return this.getClassSessionById(id);
    }

    async deleteClassSession(id: string): Promise<void> {
        await this.sessionRepository.delete(id);
    }
}
