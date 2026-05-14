import type { ProjectId } from "../components/shared/ProjectArt";

export interface Project {
  title: string;
  description: string;
  link: string;
  art: ProjectId;
}
