import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export abstract class ATimestamp {
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}