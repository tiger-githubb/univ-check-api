import {connectDB} from "./config/data-source";
import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import { authRouter } from "./routes/auth.routes";
import * as swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import * as fs from "fs";

// Importer les routes
import organisationRouter from './routes/organisation.routes';
import universiteRouter from './routes/universite.routes';
import departementRouter from './routes/departement.routes';
import programmeRouter from './routes/programme.routes';
import academicYearRouter from './routes/academicYear.routes';
import courseRouter from './routes/course.routes';
import classSessionRouter from './routes/classSession.routes';
import userRouter from './routes/user.routes';
import emargementRouter from './routes/emargement.routes';
import notificationRouter from './routes/notification.routes';

dotenv.config();
const app = express();
const globalPath = '/api/v1';

// Middlewares
//app.use(cors());
app.use(express.json());


// Routes avec préfixe '/api'
app.use(`${globalPath}/auth`, authRouter);
app.use(`${globalPath}/users`, userRouter);
app.use(`${globalPath}/organizations`, organisationRouter);
app.use(`${globalPath}/universities`, universiteRouter);
app.use(`${globalPath}/departments`, departementRouter);
app.use(`${globalPath}/programs`, programmeRouter);
app.use(`${globalPath}/academic-years`, academicYearRouter);
app.use(`${globalPath}/courses`, courseRouter);
app.use(`${globalPath}/class-sessions`, classSessionRouter);
app.use(`${globalPath}/emargements`, emargementRouter);
app.use(`${globalPath}/notifications`, notificationRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(
    swaggerJSDoc({
        definition: JSON.parse(fs.readFileSync("./swagger.json", "utf8")),
        apis: ["./src/routes/*.ts"],
    })
));

// erreur custom
app.use(errorHandler);

// catch‑all (optionnel, renvoie 404)
app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "Not Found" });
});

// connexion DB (ne pas écouter ici !)
connectDB().catch(console.error);

export default app;