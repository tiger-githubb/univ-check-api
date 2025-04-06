import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Departement } from "./Departement.entity";
import { Course } from "./Course.entity";
import {User} from "./User.entity";
import { ATimestamp } from "./abstract/timestamp";

@Entity()
export class Programme extends ATimestamp {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Departement, (departement) => departement.programs)
    departement: Departement;

    @OneToMany(() => Course, (course) => course.programme)
    courses: Course[];

    // Si besoin, association inverse avec Student
    @OneToMany(() => User, (student) => student.programme)
    students: User[];
}
