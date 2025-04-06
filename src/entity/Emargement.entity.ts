import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ClassSession } from "./ClassSession.entity";
import {User} from "./User.entity";
import { ATimestamp } from "./abstract/timestamp";

/**
 * Emargement entity representing the attendance of a student in a class session.
 * It contains the status of the attendance and references to the class session and the professor.
 */

export enum EmargementStatus {
    PENDING = "PENDING",
    PRESENT = "PRESENT",
    ABSENT = "ABSENT",
    SUPERVISOR_CONFIRMED = "SUPERVISOR_CONFIRMED",
    CLASS_HEADER_CONFIRMED = "CLASS_HEADER_CONFIRMED"
}

@Entity()
export class Emargement extends ATimestamp {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({enum: EmargementStatus, default: EmargementStatus.PENDING})
    status: EmargementStatus; // "En attente", "Présent", "Signalé absent"

    @ManyToOne(() => ClassSession)
    classSession: ClassSession;

    @ManyToOne(() => User, (professor) => professor.emargements)
    professor: User;
}
