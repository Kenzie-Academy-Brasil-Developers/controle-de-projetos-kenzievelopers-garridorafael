import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import {
  Developer,
  DeveloperInfo,
  DeveloperResult,
  Projects,
  ProjectsResult,
} from "../Interfaces";
import { AppError } from "../Errors";

const checkEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  const queryResult: DeveloperResult = await client.query(
    'SELECT * FROM "developers" WHERE "email" = $1;',
    [email]
  );

  if (queryResult.rowCount > 0) {
    const error = new AppError("Email already exists.", 409);
    res.status(error.status).json({ message: error.message });
    return;
  }

  const foundDeveloperEmail: Developer = queryResult.rows[0];
  res.locals = { ...res.locals, foundDeveloperEmail };

  return next();
};

const developerIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryResult: DeveloperResult = await client.query(
    'SELECT * FROM "developers" WHERE "id" = $1;',
    [id]
  );

  if (!queryResult.rowCount) {
    const error = new AppError("Developer not found.", 404);
    res.status(error.status).json({ message: error.message });
    return;
  }

  const foundDeveloper: Developer = queryResult.rows[0];
  res.locals = { ...res.locals, foundDeveloper };

  return next();
};

const developerIdExistsInProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { developerId } = req.body;

  const queryResult: DeveloperResult = await client.query(
    'SELECT * FROM "developers" WHERE "id" = $1;',
    [developerId]
  );

  if (!queryResult.rowCount) {
    const error = new AppError("Developer not found.", 404);
    res.status(error.status).json({ message: error.message });
    return;
  }

  const foundDeveloper: Developer = queryResult.rows[0];
  res.locals = { ...res.locals, foundDeveloper };

  next();
};

const projectIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryResult: ProjectsResult = await client.query(
    'SELECT * FROM "projects" WHERE "id" = $1;',
    [id]
  );

  if (!queryResult.rowCount) {
    const error = new AppError("Project not found.", 404);
    res.status(error.status).json({ message: error.message });
    return;
  }

  const foundProject: Projects = queryResult.rows[0];
  res.locals = { ...res.locals, foundProject };

  return next();
};

const checkDeveloperInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const queryResult = await client.query<DeveloperInfo>(
      'SELECT * FROM "developerInfos" WHERE "developerId" = $1;',
      [id]
    );

    const existingInfo: DeveloperInfo = queryResult.rows[0];
    if (existingInfo) {
      const error = new AppError("Developer infos already exists.", 409);
      res.status(error.status).json({ message: error.message });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

const checkValidOSOption = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const validOSOptions = ["Windows", "Linux", "MacOS"];
  const { preferredOS } = req.body;
  if (!validOSOptions.includes(preferredOS)) {
    const error = new AppError("Invalid preferredOS option.", 400);
    res.status(error.status).json({ message: error.message });
    return;
  }

  next();
};

export {
  checkEmailExists,
  checkDeveloperInfo,
  checkValidOSOption,
  developerIdExists,
  projectIdExists,
  developerIdExistsInProject,
};
