import { Router } from "express";
import { developerControllers } from "../Controllers";
import { checkDeveloperInfo, checkEmailExists, checkValidOSOption, developerIdExists } from "../Middlewares";

const developerRouter: Router = Router();

developerRouter.post("",checkEmailExists, developerControllers.create);
developerRouter.post("/:id/infos", developerIdExists, checkDeveloperInfo, checkValidOSOption, developerControllers.createInfo)
developerRouter.get("", developerControllers.readAll)
developerRouter.get("/:id", developerIdExists, developerControllers.readById)
developerRouter.patch("/:id", developerIdExists, checkEmailExists, developerControllers.update)
developerRouter.delete("/:id", developerIdExists, developerControllers.remove)

export default developerRouter;