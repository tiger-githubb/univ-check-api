import "reflect-metadata"
import {DataSource} from "typeorm";
import * as dotenv from "dotenv";
import {AcademicYear} from "../entity/AcademicYear.entity";
import {Organisation} from "../entity/Organisation.entity";
import {Universite} from "../entity/Universite.entity";
import {Departement} from "../entity/Departement.entity";
import {Programme} from "../entity/Programme.entity";
import {ClassSession} from "../entity/ClassSession.entity";
import {Course} from "../entity/Course.entity";
import {Emargement} from "../entity/Emargement.entity";
import {Notification} from "../entity/Notification.entity";
import {User} from "../entity/User.entity";
import {parse} from "pg-connection-string";

dotenv.config()

const databaseURL = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const config = parse(databaseURL);

const isDev = process.env.NODE_ENV === "dev"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.host,
    username: config.user,
    password: config.password,
    database: config.database,
    synchronize: isDev,
    logging: isDev,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: [
        Organisation,
        Universite,
        Departement,
        Programme,
        AcademicYear,
        ClassSession,
        Course,
        Emargement,
        Notification,
        User,
    ],
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
