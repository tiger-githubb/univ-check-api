import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { AcademicYear } from "./AcademicYear.entity";
import { Course } from "./Course.entity";
import {User} from "./User.entity";
import { ATimestamp } from "./abstract/timestamp";

@Entity()
export class ClassSession extends ATimestamp {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "date" })
    date: Date;

    @Column()
    heureDebut: string; // Stocker l'heure au format "HH:mm" par exemple

    @Column()
    heureFin: string;

    @ManyToOne(() => AcademicYear)
    academicYear: AcademicYear;

    @ManyToOne(() => Course, (course) => course.classSessions)
    course: Course;

    @ManyToOne(() => User, (professor) => professor.classSessions)
    professor: User;

    @ManyToOne(() => User, (rep) => rep.classSessions)
    classRepresentative: User;
}

export type IClassSession = ClassSession;
