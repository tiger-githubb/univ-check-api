import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Universite } from "./Universite.entity";
import { ATimestamp } from "./abstract/timestamp";

@Entity()
export class Organisation extends ATimestamp {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Universite, (universite) => universite.organisation)
    universites: Universite[];
}
