import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Emargement } from "./Emargement.entity";
import {User} from "./User.entity";
import { ATimestamp } from "./abstract/timestamp";

@Entity()
export class Notification extends ATimestamp {
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
