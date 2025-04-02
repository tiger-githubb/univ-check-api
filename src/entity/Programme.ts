import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Departement } from "./Departement";
import { Subject } from "./Subject";
import {User} from "./User";

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
