import { useEffect } from "react";
import "./../../styles/desktop/AppleMenu.css";

interface AppleMenuProps {
  onClose: () => void;
  onOpenPreferences: () => void;
  onOpenAbout: () => void;
  onRestart: () => void;
}

const AppleMenu = ({
  onClose,
  onOpenPreferences,
  onOpenAbout,
  onRestart,
}: AppleMenuProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div className="apple-menu-backdrop" onMouseDown={onClose} />
      <div className="apple-menu" role="menu" aria-label="Menu Apple">
        <button
          type="button"
          className="apple-menu-item"
          onClick={() => {
            onOpenAbout();
            onClose();
          }}
        >
          Sobre este Mac
        </button>
        <div className="apple-menu-sep" />
        <button
          type="button"
          className="apple-menu-item"
          onClick={() => {
            onOpenPreferences();
            onClose();
          }}
        >
          Ajustes do sistema…
        </button>
        <div className="apple-menu-sep" />
        <button
          type="button"
          className="apple-menu-item"
          onClick={() => {
            onRestart();
            onClose();
          }}
        >
          Reiniciar…
        </button>
      </div>
    </>
  );
};

export default AppleMenu;
