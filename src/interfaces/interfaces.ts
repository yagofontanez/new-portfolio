import type { SetStateAction } from "react";

import type { ProjectId } from "../components/shared/ProjectArt";

export interface Project {
  title: string;
  description: string;
  link: string;
  art: ProjectId;
}

export interface AppsFooterProps {
  setProject: (project: Project) => void;
}

export interface MacOSModalTemplateProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export interface HeaderProps {
  selected: string;
  setSelected: React.Dispatch<SetStateAction<string>>;
}
