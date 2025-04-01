import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
import { ATimestamp } from "./abstract/timestamp";
  
  @Entity('users')
  export class User extends ATimestamp {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ nullable: false })
    name: string;
  
    @Column({ nullable: false })
    email: string;
  
    @Column({ nullable: false })
    password: string;
  
    @Column({ default: "user" })
    role: string;
  }