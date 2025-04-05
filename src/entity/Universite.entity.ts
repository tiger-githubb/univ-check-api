import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Departement } from "./Departement.entity";
import { Organisation } from "./Organisation.entity";
import {User} from "./User.entity";
import { ATimestamp } from "./abstract/timestamp";

@Entity()
export class Universite extends ATimestamp {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Organisation, (organisation) => organisation.universites)
    organisation: Organisation;

    @OneToMany(() => Departement, (departement) => departement.university)
    departements: Departement[];

    @OneToOne(() => User, { cascade: true })
    @JoinColumn()
    responsable: User;
}
