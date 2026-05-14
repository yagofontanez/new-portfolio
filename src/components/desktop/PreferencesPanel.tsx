import { useEffect, useRef } from "react";
import { FaTimes, FaSun, FaMoon, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { usePreferences } from "../../state/preferences/PreferencesContext";
import { WALLPAPERS } from "../../data/wallpapers";
import { useFocusTrap } from "../../utils/useFocusTrap";
import "./../../styles/desktop/PreferencesPanel.css";

interface PreferencesPanelProps {
  onClose: () => void;
}

const PreferencesPanel = ({ onClose }: PreferencesPanelProps) => {
  const {
    theme,
    setTheme,
    wallpaperId,
    setWallpaperId,
    soundsEnabled,
    setSoundsEnabled,
  } = usePreferences();
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="prefs-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="prefs-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Ajustes do sistema"
        ref={panelRef}
      >
        <header className="prefs-head">
          <h2>Ajustes do sistema</h2>
          <button
            type="button"
            className="prefs-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            <FaTimes />
          </button>
        </header>

        <section className="prefs-section">
          <h3>Aparência</h3>
          <div className="prefs-segmented" role="radiogroup" aria-label="Tema">
            <button
              type="button"
              className={`prefs-seg${theme === "light" ? " is-active" : ""}`}
              onClick={() => setTheme("light")}
              aria-pressed={theme === "light"}
            >
              <FaSun /> Claro
            </button>
            <button
              type="button"
              className={`prefs-seg${theme === "dark" ? " is-active" : ""}`}
              onClick={() => setTheme("dark")}
              aria-pressed={theme === "dark"}
            >
              <FaMoon /> Escuro
            </button>
          </div>
        </section>

        <section className="prefs-section">
          <h3>Plano de fundo</h3>
          <div className="prefs-wallpapers">
            {WALLPAPERS.map((w) => (
              <button
                type="button"
                key={w.id}
                className={`prefs-wp${wallpaperId === w.id ? " is-active" : ""}`}
                onClick={() => setWallpaperId(w.id)}
                aria-pressed={wallpaperId === w.id}
                aria-label={w.label}
              >
                <span
                  className="prefs-wp-thumb"
                  style={{ background: w.preview }}
                />
                <span className="prefs-wp-label">{w.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="prefs-section">
          <h3>Som</h3>
          <button
            type="button"
            className={`prefs-toggle-row${soundsEnabled ? " is-on" : ""}`}
            onClick={() => setSoundsEnabled(!soundsEnabled)}
            aria-pressed={soundsEnabled}
          >
            <span className="prefs-toggle-text">
              {soundsEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
              Efeitos sonoros do sistema
            </span>
            <span className="prefs-switch" aria-hidden="true">
              <span className="prefs-switch-knob" />
            </span>
          </button>
        </section>
      </div>
    </div>
  );
};

export default PreferencesPanel;
