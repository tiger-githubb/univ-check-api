import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Departement } from "./Departement.entity";
import { Subject } from "./Subject.entity";
import {User} from "./User.entity";

@Entity()
export class Programme {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nom: string;

    @ManyToOne(() => Departement, (departement) => departement.programmes)
    departement: Departement;

    @OneToMany(() => Subject, (subject) => subject.programme)
    subjects: Subject[];

    // Si besoin, association inverse avec Student
    @OneToMany(() => User, (student) => student.programme)
    students: User[];
}
