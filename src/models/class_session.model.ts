import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { AcademicYear } from "./academic_year.model";
import { Subject } from "./subject.model";
import {User} from "./user.model";

@Entity()
export class ClassSession {
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

    @ManyToOne(() => Subject, (subject) => subject.classSessions)
    subject: Subject;

    @ManyToOne(() => User, (professor) => professor.classSessions)
    professor: User;

    @ManyToOne(() => User, (rep) => rep.classSessions)
    classRepresentative: User;
}
