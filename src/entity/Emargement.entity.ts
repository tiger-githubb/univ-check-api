import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { ClassSession } from "./ClassSession.entity";
import {User} from "./User.entity";

@Entity()
export class Emargement {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    timestamp: Date;

    @Column()
    status: string; // "En attente", "Présent", "Signalé absent"

    @ManyToOne(() => ClassSession)
    classSession: ClassSession;

    @ManyToOne(() => User, (professor) => professor.emargements)
    professor: User;
}
