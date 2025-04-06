import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AcademicYear {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    periode: string; // Exemple : "2024-2025"
}
