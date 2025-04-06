import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Programme } from "./Programme.entity";
import { ClassSession } from "./ClassSession.entity";
import { ATimestamp } from "./abstract/timestamp";

@Entity()
export class Course extends ATimestamp {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column("int")
    volumeHoraire: number;

    @ManyToOne(() => Programme, (programme) => programme.courses)
    programme: Programme;

    @OneToMany(() => ClassSession, (session) => session.course)
    classSessions: ClassSession[];
}
