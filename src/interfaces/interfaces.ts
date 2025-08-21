import type { SetStateAction } from "react";

export interface Project {
  title: string;
  description: string;
  link: string;
  image: string;
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
