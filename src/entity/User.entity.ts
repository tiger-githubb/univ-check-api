import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { ATimestamp } from "./abstract/timestamp";
import {ClassSession} from "./ClassSession.entity";
import {Programme} from "./Programme.entity";
import {Subject} from "./Subject.entity";
import {Emargement} from "./Emargement.entity";

export enum RoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  SUPERVISOR = 'SUPERVISOR',
  DELEGATE = 'DELEGATE',
}

@Entity("users")
export class User extends ATimestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  // exclude
  @Column()
  password: string;

  @Column({ enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  @OneToMany(() => ClassSession, (session) => session.classRepresentative)
  classSessions: ClassSession[];

  @ManyToOne(() => Programme, (programme) => programme.students)
  programme: Programme;

  // Un professeur peut enseigner plusieurs matières
  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];

  @OneToMany(() => Emargement, (emargement) => emargement.professor)
  emargements: Emargement[];
}
