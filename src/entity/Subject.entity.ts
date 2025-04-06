import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Programme } from "./Programme.entity";
import { ClassSession } from "./ClassSession.entity";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nom: string;

    @Column("int")
    volumeHoraire: number;

    @ManyToOne(() => Programme, (programme) => programme.subjects)
    programme: Programme;

    @OneToMany(() => ClassSession, (session) => session.subject)
    classSessions: ClassSession[];
}
