import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Universite } from "./universite.model";

@Entity()
export class Organisation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nom: string;

    @OneToMany(() => Universite, (universite) => universite.organisation)
    universites: Universite[];
}
