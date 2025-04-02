import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Universite } from "./Universite.entity";
import { Programme } from "./Programme.entity";

@Entity()
export class Departement {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nom: string;

    @ManyToOne(() => Universite, (universite) => universite.departements)
    universite: Universite;

    @OneToMany(() => Programme, (programme) => programme.departement)
    programmes: Programme[];
}
