import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ATimestamp } from "./abstract/timestamp";

@Entity()
export class AcademicYear extends ATimestamp {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    periode: string; // Exemple : "2024-2025"
}
