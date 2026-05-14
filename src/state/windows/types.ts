import type { ProjectFull } from "../../data/projects";

export type WindowType = "notes" | "project" | "terminal" | "safari";

export interface WindowBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface NotesPayload {
  selectedNote: string;
}

export type ProjectPayload = ProjectFull;

export type TerminalPayload = Record<string, never>;

export interface SafariPayload {
  initialTab?: string;
  openToken?: number;
}

export type WindowPayload =
  | { type: "notes"; data: NotesPayload }
  | { type: "project"; data: ProjectPayload }
  | { type: "terminal"; data: TerminalPayload }
  | { type: "safari"; data: SafariPayload };

export interface AppWindow {
  id: string;
  type: WindowType;
  title: string;
  payload: WindowPayload;
  bounds: WindowBounds;
  z: number;
  minimized: boolean;
  maximized: boolean;
  prevBounds?: WindowBounds;
}

export interface WindowsState {
  windows: AppWindow[];
  nextZ: number;
  focusedId: string | null;
}
