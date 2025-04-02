import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Departement } from "./Departement";
import { Organisation } from "./Organisation";
import {User} from "./User";

@Entity()
export class Universite {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nom: string;

    @ManyToOne(() => Organisation, (organisation) => organisation.universites)
    organisation: Organisation;

    @OneToMany(() => Departement, (departement) => departement.universite)
    departements: Departement[];

    @OneToOne(() => User, { cascade: true })
    @JoinColumn()
    responsableUniversite: User;
}
