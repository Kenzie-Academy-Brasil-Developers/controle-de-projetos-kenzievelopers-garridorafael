import { QueryResult } from "pg";

type Developer = {
  id: number;
  name: string;
  email: string;
};

type DeveloperInfo = {
  id: number;
  developerSince: Date;
  preferedOS: string;
  developerId: number;
};

type DeveloperResult = QueryResult<Developer>;
type DeveloperCreate = Omit<Developer, "id">;
type DeveloperInfoCreate = Omit<DeveloperInfo, "id">;
type DeveloperInfoResult = QueryResult<DeveloperInfo>;
type DeveloperRead = Array<Developer>;
type DeveloperUpdate = Partial<DeveloperCreate>;

export {
  Developer,
  DeveloperInfo,
  DeveloperResult,
  DeveloperCreate,
  DeveloperRead,
  DeveloperUpdate,
  DeveloperInfoCreate,
  DeveloperInfoResult,
};
