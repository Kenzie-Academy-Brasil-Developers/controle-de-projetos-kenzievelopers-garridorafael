import "express-async-errors"
import express, { Application, json } from "express";
import "dotenv/config";
import { developerRouter } from "./Routers";
import { handleErrors } from "./Middlewares/handleErrors.middleware";
import projectRouter from "./Routers/projects.router";

const app: Application = express();
app.use(json());

app.use("/developers", developerRouter);
app.use("/projects", projectRouter);
app.use(handleErrors);

export default app;
