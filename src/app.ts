import express, { Application, Request, Response } from "express";
import cors from "cors";
import { usersRoutes } from "./app/modules/user/user.route";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// user application routes
app.use("/api/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
