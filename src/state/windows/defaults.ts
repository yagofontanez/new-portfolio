import type { WindowBounds, WindowPayload } from "./types";

const MENU_BAR_HEIGHT = 28;
const DOCK_RESERVED = 96;
const CASCADE_STEP = 28;

export const WINDOW_LAYER_TOP = MENU_BAR_HEIGHT;
export const WINDOW_LAYER_BOTTOM = DOCK_RESERVED;

const centerBounds = (width: number, height: number): WindowBounds => ({
  width,
  height,
  x: Math.max(0, Math.round((window.innerWidth - width) / 2)),
  y: Math.max(
    MENU_BAR_HEIGHT + 12,
    Math.round((window.innerHeight - height) / 2) - 20,
  ),
});

export const initialBoundsFor = (
  payload: WindowPayload,
  existingCount: number,
): WindowBounds => {
  const sizeByType: Record<WindowPayload["type"], { w: number; h: number }> = {
    notes: { w: 900, h: 600 },
    project: { w: 760, h: 520 },
    terminal: { w: 680, h: 420 },
    safari: { w: 980, h: 640 },
  };
  const size = sizeByType[payload.type];
  const base = centerBounds(
    Math.min(size.w, window.innerWidth - 80),
    Math.min(size.h, window.innerHeight - MENU_BAR_HEIGHT - DOCK_RESERVED - 40),
  );

  if (existingCount === 0) return base;

  const offset = (existingCount % 6) * CASCADE_STEP;
  return {
    ...base,
    x: Math.min(
      base.x + offset,
      window.innerWidth - base.width - 12,
    ),
    y: Math.min(
      base.y + offset,
      window.innerHeight - base.height - DOCK_RESERVED,
    ),
  };
};

export const maximizedBounds = (): WindowBounds => ({
  x: 0,
  y: MENU_BAR_HEIGHT,
  width: window.innerWidth,
  height: window.innerHeight - MENU_BAR_HEIGHT - DOCK_RESERVED + 32,
});

export const idFor = (payload: WindowPayload): string => {
  if (payload.type === "notes") return "notes";
  if (payload.type === "terminal") return "terminal";
  if (payload.type === "safari") return "safari";
  return `project:${payload.data.title}`;
};

export const titleFor = (payload: WindowPayload): string => {
  if (payload.type === "notes") return "Notas";
  if (payload.type === "terminal") return "Terminal — yago@portfolio";
  if (payload.type === "safari") return "Safari";
  return payload.data.title;
};

export const clampBounds = (
  bounds: WindowBounds,
  viewport = { w: window.innerWidth, h: window.innerHeight },
): WindowBounds => {
  const minVisible = 64;
  return {
    width: bounds.width,
    height: bounds.height,
    x: Math.min(
      Math.max(bounds.x, minVisible - bounds.width),
      viewport.w - minVisible,
    ),
    y: Math.min(
      Math.max(bounds.y, MENU_BAR_HEIGHT),
      viewport.h - 48,
    ),
  };
};
