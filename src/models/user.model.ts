import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { ATimestamp } from "./abstract/timestamp";
import {ClassSession} from "./class_session.model";
import {Programme} from "./programme.model";
import {Subject} from "./subject.model";
import {Emargement} from "./emargement.model";

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
