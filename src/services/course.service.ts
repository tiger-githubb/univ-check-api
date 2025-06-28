// CourseService as SubjectService
import { AppDataSource } from "../config/data-source";
import { CreateCourseDto } from "../dto/course.dto";
import { Course } from "../entity/Course.entity";
import { Programme } from "../entity/Programme.entity";

export class CourseService {
    private readonly courseRepository = AppDataSource.getRepository(Course);
    private readonly programRepository = AppDataSource.getRepository(Programme);

    async createCourse(data: Partial<CreateCourseDto>): Promise<Course> {
        const programme = await this.programRepository.findOneByOrFail({ id: data.programmeId})

        const { programmeId, ...rest } = data;
        const course = this.courseRepository.create({
            ...rest,
            programme
        });

        return await this.courseRepository.save(course);
    }

    async getCourseById(id: string): Promise<Course | null> {
        return await this.courseRepository.findOne({ where: { id }, relations: {programme: true} });
    }

    async getAllCourses(order: 'asc' | 'desc' = 'desc'): Promise<Course[]> {
        return await this.courseRepository.find({ order: { updatedAt: order.toUpperCase() as 'ASC' | 'DESC' }, relations: {programme: true}});
    }

    async updateCourse(id: string, data: Partial<CreateCourseDto>): Promise<Course | null> {
        const course = await this.courseRepository.findOneBy({ id });
        if (!course) return null;

        const { programmeId, ...rest } = data;

        // Si un nouvel ID de programme est fourni
        if (programmeId) {
            course.programme = await this.programRepository.findOneByOrFail({ id: programmeId });
        }

        // Mise à jour des autres champs simples
        Object.assign(course, rest);

        return await this.courseRepository.save(course);
    }

    async deleteCourse(id: string): Promise<void> {
        await this.courseRepository.delete(id);
    }
}
