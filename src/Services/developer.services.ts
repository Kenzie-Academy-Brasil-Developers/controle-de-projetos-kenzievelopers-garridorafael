import format from "pg-format";
import {
  Developer,
  DeveloperCreate,
  DeveloperInfo,
  DeveloperRead,
  DeveloperResult,
  DeveloperUpdate,
} from "../Interfaces";
import { client } from "../database";
import {
  DeveloperInfoCreate,
  DeveloperInfoResult,
} from "../Interfaces/developer.interfaces";

const createDeveloper = async (
  payload: DeveloperCreate
): Promise<Developer> => {
  const queryFormat: string = format(
    'INSERT INTO "developers" (%I) VALUES (%L) RETURNING *',
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: DeveloperResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

const createDeveloperInfo = async (
  payload: DeveloperInfoCreate
): Promise<DeveloperInfo> => {
  const queryFormat: string = format(
    'INSERT INTO "developerInfos" (%I) VALUES (%L) RETURNING *',
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: DeveloperInfoResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

const readAll = async (): Promise<DeveloperRead> => {
  const query: string = 'SELECT * FROM "developers";';
  const queryResult: DeveloperResult = await client.query(query);

  return queryResult.rows;
};

const getDeveloperById = async (id: string): Promise<Developer> => {
  const query: string = `
            SELECT 
                "d"."id" AS "developerId",
                "d"."name" AS "developerName",
                "d"."email" AS "developerEmail",
                "di"."developerSince" AS "developerInfoDeveloperSince",
                "di"."preferredOS" AS "developerInfoPreferredOS"
            FROM "developers" AS d
            LEFT JOIN "developerInfos" AS di ON d.id = di."developerId"
            WHERE d.id = $1;
        `;

  const queryResult: DeveloperResult = await client.query(query, [id]);
  return queryResult.rows[0];
};

const deleteDeveloperById = async (id: string): Promise<void> => {
  await client.query(`DELETE FROM "developers" WHERE "id" = $1;`, [id]);
};

const updateDeveloperById = async (
  id: string,
  data: DeveloperUpdate
): Promise<Developer> => {
  const queryFormat: string = format(
    `
      UPDATE "developers" SET (%I) = ROW(%L) WHERE id = $1 RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: DeveloperResult = await client.query(queryFormat, [id]);
  return queryResult.rows[0];
};

export default {
  createDeveloper,
  getDeveloperById,
  deleteDeveloperById,
  updateDeveloperById,
  readAll,
  createDeveloperInfo,
};
