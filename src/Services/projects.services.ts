import format from "pg-format";
import {
  Projects,
  ProjectsCreate,
  ProjectsResult,
  ProjectsUpdate,
} from "../Interfaces";
import { client } from "../database";

const createProject = async (payload: ProjectsCreate): Promise<Projects> => {
  const queryFormat: string = format(
    'INSERT INTO "projects" ("name", "description", "repository", "startDate", "endDate", "developerId") VALUES (%L) RETURNING *',
    [
      payload.name,
      payload.description,
      payload.repository,
      payload.startDate,
      payload.endDate,
      payload.developerId,
    ]
  );

  const queryResult: ProjectsResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

const getProjectById = async (id: string): Promise<Projects> => {
  const query: string = `
        SELECT 
            "p"."id" AS "projectId",
            "p"."name" AS "projectName",
            "p"."description" AS "projectDescription",
            "p"."repository" AS "projectRepository",
            "p"."startDate" AS "projectStartDate",
            "p"."endDate" AS "projectEndDate",
            "d"."name" AS "projectDeveloperName"
        FROM "projects" AS p
        LEFT JOIN "developers" AS d ON p.id = d."id"
        WHERE d.id = $1;
    `;

  const queryResult: ProjectsResult = await client.query(query, [id]);
  return queryResult.rows[0];
};

const updateProjectById = async (
  id: string,
  data: ProjectsUpdate
): Promise<Projects> => {
  const queryFormat: string = format(
    `
      UPDATE "projects" SET (%I) = ROW(%L) WHERE id = $1 RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: ProjectsResult = await client.query(queryFormat, [id]);
  return queryResult.rows[0];
};

export default { createProject, getProjectById, updateProjectById };
