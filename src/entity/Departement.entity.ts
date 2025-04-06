import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Universite } from "./Universite.entity";
import { Programme } from "./Programme.entity";
import { ATimestamp } from "./abstract/timestamp";

@Entity()
export class Departement extends ATimestamp {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Universite, (universite) => universite.departements)
    university: Universite;

    @OneToMany(() => Programme, (programme) => programme.departement)
    programs: Programme[];
}
