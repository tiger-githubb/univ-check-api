// CourseService as SubjectService
import { AppDataSource } from "../config/data-source";
import { Course } from "../entity/Course.entity";

export class CourseService {
    private courseRepository = AppDataSource.getRepository(Course);

    async createCourse(data: Partial<Course>): Promise<Course> {
        const course = this.courseRepository.create(data);
        return await this.courseRepository.save(course);
    }

    async getCourseById(id: string): Promise<Course | null> {
        return await this.courseRepository.findOne({ where: { id } });
    }

    async getAllCourses(): Promise<Course[]> {
        return await this.courseRepository.find();
    }

    async updateCourse(id: string, data: Partial<Course>): Promise<Course | null> {
        await this.courseRepository.update(id, data);
        return this.getCourseById(id);
    }

    async deleteCourse(id: string): Promise<void> {
        await this.courseRepository.delete(id);
    }
}
