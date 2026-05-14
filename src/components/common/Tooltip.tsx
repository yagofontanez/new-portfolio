import { useRef, useState } from "react";
import type { ReactNode } from "react";
import "./Tooltip.css";

type Placement = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  title: ReactNode;
  children: ReactNode;
  placement?: Placement;
  delay?: number;
}

const Tooltip = ({ title, children, placement = "bottom", delay = 450 }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  const show = () => {
    timerRef.current = window.setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <span
      className="tooltip-host"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span className={`tooltip-bubble place-${placement}`} role="tooltip">
          {title}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
