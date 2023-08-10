import { Request, Response } from "express";
import { developerServices } from "../Services/";
import { Developer, DeveloperInfoCreate, DeveloperRead } from "../Interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const developer: Developer = await developerServices.createDeveloper(
    req.body
  );
  return res.status(201).json(developer);
};

const createInfo = async (req: Request, res: Response): Promise<Response> => {
  const data: DeveloperInfoCreate = {
    ...req.body,
    developerId: req.params.id,
  };

  const developerInfo = await developerServices.createDeveloperInfo(data);

  return res.status(201).json(developerInfo);
};

const readAll = async (req: Request, res: Response): Promise<Response> => {
  const clients: DeveloperRead = await developerServices.readAll();
  return res.status(200).json(clients);
};

const readById = async (req: Request, res: Response): Promise<Response> => {
  const developer: Developer = await developerServices.getDeveloperById(
    req.params.id
  );

  return res.status(200).json(developer);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req;
  const { id } = req.params;

  const developer: Developer = await developerServices.updateDeveloperById(
    id,
    body
  );
  return res.status(200).json(developer);
};

const remove = async (req: Request, res: Response): Promise<Response> => {
  await developerServices.deleteDeveloperById(req.params.id);
  return res.status(204).json();
};

export default { create, createInfo, readById, readAll, update, remove };
