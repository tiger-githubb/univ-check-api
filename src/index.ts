import {connectDB} from "./config/data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
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

const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf8"));
const swaggerOptions = {
    definition: swaggerDocument,
    apis: ["./src/routes/*.ts"], // ajouter des routes documentées ici
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
}).catch((error) => {
    console.error("Database connection error:", error);
});

app.use(errorHandler);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

