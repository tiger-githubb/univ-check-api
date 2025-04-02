import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Emargement } from "./Emargement";
import {User} from "./User";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    timestamp: Date;

    @Column()
    message: string;

    @Column()
    status: string; // "Envoyée", "Confirmée", etc.

    @ManyToOne(() => Emargement)
    emargement: Emargement;

    @ManyToOne(() => User)
    recipient: User;
}
