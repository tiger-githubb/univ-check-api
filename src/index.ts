import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { userRouter } from "./routes/user.routes";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import { authRouter } from "./routes/auth.routes";
import { UserController } from "./controllers/user.controllers";
import { RoleEnum } from "./entity/user.entity";
dotenv.config();

const app = express();
const globalPath = '/api/v1';
app.use(express.json());
const { PORT = 3000 } = process.env;
app.use(errorHandler);
app.use(`${globalPath}/auth`, authRouter);
app.use(`${globalPath}/users`, userRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    UserController.seeder({
      name: 'Univ Admin',
      email: 'univ.admin@gmail.com',
      role: RoleEnum.ADMIN,
      phone: '+228 90000090',
      password: '_KUSO58AD@',
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
