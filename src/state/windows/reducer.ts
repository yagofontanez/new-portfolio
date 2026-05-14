import type { AppWindow, WindowBounds, WindowPayload, WindowsState } from "./types";
import { clampBounds, idFor, initialBoundsFor, maximizedBounds, titleFor } from "./defaults";

export type WindowsAction =
  | { type: "OPEN"; payload: WindowPayload }
  | { type: "CLOSE"; id: string }
  | { type: "FOCUS"; id: string }
  | { type: "MINIMIZE"; id: string }
  | { type: "TOGGLE_MAXIMIZE"; id: string }
  | { type: "SET_BOUNDS"; id: string; bounds: Partial<WindowBounds> };

export const initialState: WindowsState = {
  windows: [],
  nextZ: 1,
  focusedId: null,
};

const bump = (state: WindowsState, id: string): WindowsState => ({
  ...state,
  nextZ: state.nextZ + 1,
  focusedId: id,
  windows: state.windows.map((w) =>
    w.id === id ? { ...w, z: state.nextZ + 1, minimized: false } : w,
  ),
});

export const windowsReducer = (
  state: WindowsState,
  action: WindowsAction,
): WindowsState => {
  switch (action.type) {
    case "OPEN": {
      const id = idFor(action.payload);
      const existing = state.windows.find((w) => w.id === id);

      if (existing) {
        const updated = bump(state, id);
        return {
          ...updated,
          windows: updated.windows.map((w) =>
            w.id === id
              ? { ...w, payload: action.payload, title: titleFor(action.payload) }
              : w,
          ),
        };
      }

      const bounds = initialBoundsFor(action.payload, state.windows.length);
      const newWindow: AppWindow = {
        id,
        type: action.payload.type,
        title: titleFor(action.payload),
        payload: action.payload,
        bounds,
        z: state.nextZ + 1,
        minimized: false,
        maximized: false,
      };

      return {
        windows: [...state.windows, newWindow],
        nextZ: state.nextZ + 1,
        focusedId: id,
      };
    }

    case "CLOSE": {
      const remaining = state.windows.filter((w) => w.id !== action.id);
      const nextFocus =
        state.focusedId === action.id
          ? remaining
              .filter((w) => !w.minimized)
              .sort((a, b) => b.z - a.z)[0]?.id ?? null
          : state.focusedId;
      return { ...state, windows: remaining, focusedId: nextFocus };
    }

    case "FOCUS":
      return bump(state, action.id);

    case "MINIMIZE": {
      const next = {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w,
        ),
      };
      if (state.focusedId === action.id) {
        const nextFocus = next.windows
          .filter((w) => !w.minimized && w.id !== action.id)
          .sort((a, b) => b.z - a.z)[0]?.id ?? null;
        next.focusedId = nextFocus;
      }
      return next;
    }

    case "TOGGLE_MAXIMIZE":
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.id !== action.id) return w;
          if (w.maximized && w.prevBounds) {
            return { ...w, maximized: false, bounds: w.prevBounds, prevBounds: undefined };
          }
          return {
            ...w,
            maximized: true,
            prevBounds: w.bounds,
            bounds: maximizedBounds(),
          };
        }),
      };

    case "SET_BOUNDS":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, bounds: clampBounds({ ...w.bounds, ...action.bounds }) }
            : w,
        ),
      };

    default:
      return state;
  }
};
