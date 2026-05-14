import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import { initialState, windowsReducer } from "./reducer";
import type { AppWindow, NotesPayload, ProjectPayload, SafariPayload, WindowBounds } from "./types";

interface WindowsApi {
  windows: AppWindow[];
  focusedId: string | null;
  openNotes: (data: NotesPayload) => void;
  openProject: (data: ProjectPayload) => void;
  openTerminal: () => void;
  openSafari: (data?: SafariPayload) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  setBounds: (id: string, bounds: Partial<WindowBounds>) => void;
}

const WindowsContext = createContext<WindowsApi | null>(null);

export const WindowsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(windowsReducer, initialState);

  const openNotes = useCallback(
    (data: NotesPayload) =>
      dispatch({ type: "OPEN", payload: { type: "notes", data } }),
    [],
  );
  const openProject = useCallback(
    (data: ProjectPayload) =>
      dispatch({ type: "OPEN", payload: { type: "project", data } }),
    [],
  );
  const openTerminal = useCallback(
    () => dispatch({ type: "OPEN", payload: { type: "terminal", data: {} } }),
    [],
  );
  const openSafari = useCallback(
    (data?: SafariPayload) =>
      dispatch({
        type: "OPEN",
        payload: {
          type: "safari",
          data: { ...data, openToken: Date.now() },
        },
      }),
    [],
  );
  const close = useCallback((id: string) => dispatch({ type: "CLOSE", id }), []);
  const focus = useCallback((id: string) => dispatch({ type: "FOCUS", id }), []);
  const minimize = useCallback(
    (id: string) => dispatch({ type: "MINIMIZE", id }),
    [],
  );
  const toggleMaximize = useCallback(
    (id: string) => dispatch({ type: "TOGGLE_MAXIMIZE", id }),
    [],
  );
  const setBounds = useCallback(
    (id: string, bounds: Partial<WindowBounds>) =>
      dispatch({ type: "SET_BOUNDS", id, bounds }),
    [],
  );

  const value = useMemo<WindowsApi>(
    () => ({
      windows: state.windows,
      focusedId: state.focusedId,
      openNotes,
      openProject,
      openTerminal,
      openSafari,
      close,
      focus,
      minimize,
      toggleMaximize,
      setBounds,
    }),
    [state, openNotes, openProject, openTerminal, openSafari, close, focus, minimize, toggleMaximize, setBounds],
  );

  return (
    <WindowsContext.Provider value={value}>{children}</WindowsContext.Provider>
  );
};

export const useWindows = (): WindowsApi => {
  const ctx = useContext(WindowsContext);
  if (!ctx) throw new Error("useWindows must be used inside <WindowsProvider>");
  return ctx;
};
