import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv";
import {AcademicYear} from "../entity/AcademicYear";
import {Organisation} from "../entity/Organisation";
import {Universite} from "../entity/Universite";
import {Departement} from "../entity/Departement";
import {Programme} from "../entity/Programme";
import {ClassSession} from "../entity/ClassSession";
import {Subject} from "../entity/Subject";
import {Emargement} from "../entity/Emargement";
import {Notification} from "../entity/Notification";
import { User } from "../entity/User"

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: NODE_ENV === "dev" ? true : false,
  logging: NODE_ENV === "dev" ? false : false,
  entities: [Organisation, Universite,Departement,Programme,AcademicYear, ClassSession, Subject,Emargement, Notification, User],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};