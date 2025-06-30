import { AppDataSource } from "../config/data-source";
import { CreateClassSessionDto } from "../dto/class-session.dto";
import { AcademicYear } from "../entity/AcademicYear.entity";
import { ClassSession } from "../entity/ClassSession.entity";
import { Course } from "../entity/Course.entity";
import { User } from "../entity/User.entity";

export class ClassSessionService {
    private readonly sessionRepository = AppDataSource.getRepository(ClassSession);
    private readonly academicYearRepository = AppDataSource.getRepository(AcademicYear);
    private readonly courseRepository = AppDataSource.getRepository(Course);
    private readonly userRepo = AppDataSource.getRepository(User);

    async createClassSession(data: Partial<CreateClassSessionDto>): Promise<ClassSession> {
        const academicYear = await this.academicYearRepository.findOneByOrFail({ id: data.academicYearId });
        const professor = await this.userRepo.findOneByOrFail({ id: data.professorId });
        const classRepresentative = await this.userRepo.findOneByOrFail({ id: data.classRepresentativeId });
        const course = await this.courseRepository.findOneByOrFail({ id: data.courseId });

        const { courseId, academicYearId, professorId, classRepresentativeId, ...rest } = data;
        const session = this.sessionRepository.create({
            ...rest,
            academicYear,
            course,
            professor,
            classRepresentative
        });
        
        return await this.sessionRepository.save(session);
    }

    async getClassSessionById(id: string): Promise<ClassSession | null> {
        return await this.sessionRepository.findOne({
            where: { id },
            relations: { academicYear: true, course: true, professor: true, classRepresentative: true }
        });
    }

    async getAllClassSessions(): Promise<ClassSession[]> {
        return await this.sessionRepository.find({
            order: { updatedAt: "DESC" },
            relations: { academicYear: true, course: true, professor: true, classRepresentative: true }
        });
    }

    async updateClassSession(id: string, data: Partial<CreateClassSessionDto>): Promise<ClassSession | null> {
        const session = await this.sessionRepository.findOneBy({ id });
        if (!session) return null;

        const { academicYearId, professorId, classRepresentativeId, courseId, ...rest } = data;

        // Si un nouvel ID d'année académique est fourni
        if (academicYearId) {
            session.academicYear = await this.academicYearRepository.findOneByOrFail({ id: academicYearId });
        }

        // Si un nouvel ID de professeur est fourni
        if (professorId) {
            session.professor = await this.userRepo.findOneByOrFail({ id: professorId });
        }

        // Si un nouvel ID de représentant de classe est fourni
        if (classRepresentativeId) {
            session.classRepresentative = await this.userRepo.findOneByOrFail({ id: classRepresentativeId });
        }

        // Si un nouvel ID de cours est fourni
        if (courseId) {
            session.course = await this.courseRepository.findOneByOrFail({ id: courseId });
        }

        // Mise à jour des autres champs simples
        Object.assign(session, rest);

        return await this.sessionRepository.save(session);
    }

    async deleteClassSession(id: string): Promise<void> {
        await this.sessionRepository.delete(id);
    }

    async getClassSessionsByTeacherAndPeriod(teacherId: string, week?: number, day?: string): Promise<ClassSession[]> {
        let query = this.sessionRepository
            .createQueryBuilder("session")
            .leftJoinAndSelect("session.academicYear", "academicYear")
            .leftJoinAndSelect("session.course", "course")
            .leftJoinAndSelect("session.professor", "professor")
            .leftJoinAndSelect("session.classRepresentative", "classRepresentative")
            .where("session.professor = :teacherId", { teacherId });

        if (week) {
            // Filter by ISO week number
            query = query.andWhere("DATEPART(ISO_WEEK, session.date) = :week", { week });
        }
        if (day) {
            // Filter by day of week (e.g., 'Monday')
            query = query.andWhere("DATENAME(WEEKDAY, session.date) = :day", { day });
        }
        query = query.orderBy("session.updatedAt", "DESC");
        return await query.getMany();
    }
}
