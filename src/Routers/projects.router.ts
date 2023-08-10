import { Router } from "express";
import { developerIdExistsInProject, projectIdExists } from "../Middlewares";
import { projectController } from "../Controllers";

const projectRouter: Router = Router();

projectRouter.post("", developerIdExistsInProject, projectController.createProject)
projectRouter.get("/:id", projectIdExists, projectController.readProjectById)
projectRouter.patch("/:id", projectIdExists, developerIdExistsInProject, projectController.updateProject)

export default projectRouter;