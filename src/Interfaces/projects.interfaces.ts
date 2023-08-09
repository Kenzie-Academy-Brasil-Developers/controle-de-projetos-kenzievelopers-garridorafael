import { QueryResult } from "pg";

type Projects = {
    id: number;
    name: string;
    description: string;
    repository: string;
    startDate: Date;
    endDate?: Date;
    developerId: number;
};

type ProjectsResult = QueryResult<Projects>;
type ProjectsCreate = Omit<Projects, "id">;

export { Projects, ProjectsResult, ProjectsCreate }