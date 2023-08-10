import { Request, Response } from "express";
import { Projects } from "../Interfaces";
import { projectsServices } from "../Services";

const createProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project: Projects = await projectsServices.createProject(req.body);
  return res.status(201).json(project);
};

const readProjectById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project: Projects = await projectsServices.getProjectById(
    req.params.id
  );

  return res.status(200).json(project);
};

const updateProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body } = req;
  const { id } = req.params;

  const project: Projects = await projectsServices.updateProjectById(id, body);
  return res.status(200).json(project);
};

export default { createProject, readProjectById, updateProject };
