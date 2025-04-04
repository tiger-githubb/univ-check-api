import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Emargement } from "./Emargement.entity";
import {User} from "./User.entity";
import { ATimestamp } from "./abstract/timestamp";

export enum NotificationStatus {
    SENT = "SENT",
    CONFIRMED = "CONFIRMED",
    RECEIVED = "RECEIVED",
    READ = "READ",
}
@Entity()
export class Notification extends ATimestamp {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    message: string;

    @Column({type: "enum", enum: NotificationStatus, default: NotificationStatus.SENT})
    status: NotificationStatus; // "Envoyée", "Confirmée", etc.

    @ManyToOne(() => Emargement)
    emargement: Emargement;

    @ManyToOne(() => User)
    recipient: User;
}
