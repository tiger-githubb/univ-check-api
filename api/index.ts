import {connectDB} from "../src/config/data-source";
const express = require("express");
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { errorHandler } from "../src/middleware/errorHandler";
import { authRouter } from "../src/routes/auth.routes";
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
import * as fs from "fs";
import path from "path";
import cors from "cors";

// Importer les routes
import organisationRouter from '../src/routes/organisation.routes';
import universiteRouter from '../src/routes/universite.routes';
import departementRouter from '../src/routes/departement.routes';
import programmeRouter from '../src/routes/programme.routes';
import academicYearRouter from '../src/routes/academicYear.routes';
import courseRouter from '../src/routes/course.routes';
import classSessionRouter from '../src/routes/classSession.routes';
import userRouter from '../src/routes/user.routes';
import emargementRouter from '../src/routes/emargement.routes';
import notificationRouter from '../src/routes/notification.routes';

dotenv.config();
const app = express();
const globalPath = '/api/v1';

const swaggrFilePath = path.join(__dirname, "../public/swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggrFilePath, "utf8"));
const swaggerOptions = {
    definition: swaggerDocument,
    apis: ["./src/routes/*.ts"], // ajouter des routes documentées ici
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Middlewares
app.use(cors());
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
app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req: Request, res: Response) => {
    res.status(505).json({ message: "Bad Request" });
});


module.exports = app;
