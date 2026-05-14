import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useWindows } from "../../state/windows/WindowsContext";
import type { AppWindow } from "../../state/windows/types";
import { useSounds } from "../../utils/useSounds";
import "./../../styles/desktop/WindowFrame.css";

interface WindowFrameProps {
  window: AppWindow;
  headerVariant?: "default" | "notes" | "terminal";
  children: ReactNode;
}

interface DragState {
  pointerId: number;
  offsetX: number;
  offsetY: number;
}

const WindowFrame = ({ window: win, headerVariant = "default", children }: WindowFrameProps) => {
  const { focusedId, focus, close, minimize, toggleMaximize, setBounds } = useWindows();
  const sounds = useSounds();
  const [drag, setDrag] = useState<DragState | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sounds.pop();
    // só dispara no mount; ignorar deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFocused = focusedId === win.id;
  const { bounds, minimized, maximized } = win;

  const handlePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (maximized) return;
      const target = e.target as HTMLElement;
      if (target.closest(".window-traffic-light")) return;
      focus(win.id);
      e.currentTarget.setPointerCapture(e.pointerId);
      setDrag({
        pointerId: e.pointerId,
        offsetX: e.clientX - bounds.x,
        offsetY: e.clientY - bounds.y,
      });
    },
    [bounds.x, bounds.y, focus, maximized, win.id],
  );

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!drag || e.pointerId !== drag.pointerId) return;
      setBounds(win.id, {
        x: e.clientX - drag.offsetX,
        y: e.clientY - drag.offsetY,
      });
    },
    [drag, setBounds, win.id],
  );

  const handlePointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!drag || e.pointerId !== drag.pointerId) return;
      e.currentTarget.releasePointerCapture(e.pointerId);
      setDrag(null);
    },
    [drag],
  );

  const handleHeaderDoubleClick = useCallback(
    (e: ReactPointerEvent<HTMLDivElement> | React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".window-traffic-light")) return;
      toggleMaximize(win.id);
    },
    [toggleMaximize, win.id],
  );

  const style: CSSProperties = maximized
    ? {
        left: bounds.x,
        top: bounds.y,
        width: bounds.width,
        height: bounds.height,
        zIndex: 1500 + win.z,
      }
    : {
        left: bounds.x,
        top: bounds.y,
        width: bounds.width,
        height: bounds.height,
        zIndex: 1500 + win.z,
      };

  return (
    <div
      className={[
        "window-frame",
        `variant-${headerVariant}`,
        isFocused ? "is-focused" : "is-blurred",
        minimized ? "is-minimized" : "",
        maximized ? "is-maximized" : "",
        drag ? "is-dragging" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      onPointerDown={() => focus(win.id)}
    >
      <div
        ref={headerRef}
        className="window-header"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDoubleClick={handleHeaderDoubleClick}
      >
        <div className="window-traffic-lights">
          <button
            type="button"
            className="window-traffic-light close"
            aria-label="Fechar"
            onClick={(e) => {
              e.stopPropagation();
              sounds.close();
              close(win.id);
            }}
          />
          <button
            type="button"
            className="window-traffic-light minimize"
            aria-label="Minimizar"
            onClick={(e) => {
              e.stopPropagation();
              minimize(win.id);
            }}
          />
          <button
            type="button"
            className="window-traffic-light maximize"
            aria-label="Maximizar"
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize(win.id);
            }}
          />
        </div>
        <div className="window-title">{win.title}</div>
      </div>
      <div className="window-content">{children}</div>
    </div>
  );
};

export default WindowFrame;
