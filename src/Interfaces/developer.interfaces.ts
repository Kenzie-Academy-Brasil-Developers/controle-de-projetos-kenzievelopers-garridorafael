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

export { Developer, DeveloperInfo, DeveloperResult, DeveloperCreate }