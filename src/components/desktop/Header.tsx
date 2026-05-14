import {
  FaApple,
  FaBatteryFull,
  FaSearch,
  FaWifi,
  FaBluetoothB,
} from "react-icons/fa";
import { HiSwitchVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
import Tooltip from "../common/Tooltip";
import { useBatteryLevel } from "../../utils/useBatteryLevel";
import { useWindows } from "../../state/windows/WindowsContext";
import { useSpotlight } from "../../state/spotlight/SpotlightContext";
import AppleMenu from "./AppleMenu";
import AboutMacModal from "./AboutMacModal";
import PreferencesPanel from "./PreferencesPanel";
import "./../../styles/desktop/Header.css";

const NOTE_TITLES = ["Página Inicial", "Experiências", "Sobre Mim", "Contato", "Ajuda"];

const Header = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const { windows, focusedId, openNotes, close } = useWindows();
  const { open: openSpotlight } = useSpotlight();
  const { level: batteryLevel, charging } = useBatteryLevel(1);
  const batteryPct = Math.round(batteryLevel * 100);
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [restarting, setRestarting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  const focusedWindow = windows.find((w) => w.id === focusedId);
  const appName = focusedWindow
    ? focusedWindow.type === "notes"
      ? "Notas"
      : focusedWindow.title
    : "Finder";

  const notesWindow = windows.find((w) => w.id === "notes");
  const selectedNote =
    notesWindow?.payload.type === "notes"
      ? notesWindow.payload.data.selectedNote
      : "Página Inicial";

  const handleNavClick = (title: string) => {
    if (title === "Página Inicial") {
      if (notesWindow) close("notes");
      return;
    }
    openNotes({ selectedNote: title });
  };

  const handleRestart = () => {
    setRestarting(true);
    setTimeout(() => window.location.reload(), 900);
  };

  const formattedDate = dateTime.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const formattedTime = dateTime.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className="header">
        <div className="header-left">
          <button
            type="button"
            className="header-apple-wrap"
            onClick={() => setAppleMenuOpen((v) => !v)}
            aria-label="Menu Apple"
          >
            <FaApple className="header-icon" />
          </button>
          <span className="header-app-name">{appName}</span>
          <nav className="header-nav">
            {NOTE_TITLES.map((title) => {
              const isSelected =
                title === "Página Inicial"
                  ? !notesWindow
                  : !!notesWindow && selectedNote === title;
              return (
                <button
                  type="button"
                  onClick={() => handleNavClick(title)}
                  key={title}
                  className={isSelected ? "header-link-selected" : "header-link"}
                >
                  {title}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="header-right">
          <div className="header-configs">
            <Tooltip title="Bluetooth">
              <FaBluetoothB className="icon-config" />
            </Tooltip>
            <Tooltip title="Wi-Fi · Conectado">
              <FaWifi className="icon-config" />
            </Tooltip>
            <Tooltip title={`Bateria ${batteryPct}%${charging ? " · carregando" : ""}`}>
              <div className="header-battery">
                <FaBatteryFull className="icon-config" />
                <span className="header-battery-text">{batteryPct}%</span>
              </div>
            </Tooltip>
            <Tooltip title="Spotlight · ⌘+Space">
              <FaSearch
                className="icon-config"
                onClick={openSpotlight}
                role="button"
                aria-label="Abrir Spotlight"
                tabIndex={0}
              />
            </Tooltip>
            <Tooltip title="Central de Controle">
              <HiSwitchVertical className="icon-config" />
            </Tooltip>
          </div>
          <div className="header-hour">
            <span className="header-date">{formattedDate}</span>
            <span className="header-time">{formattedTime}</span>
          </div>
        </div>
      </div>

      {appleMenuOpen && (
        <AppleMenu
          onClose={() => setAppleMenuOpen(false)}
          onOpenAbout={() => setAboutOpen(true)}
          onOpenPreferences={() => setPreferencesOpen(true)}
          onRestart={handleRestart}
        />
      )}
      {aboutOpen && <AboutMacModal onClose={() => setAboutOpen(false)} />}
      {preferencesOpen && (
        <PreferencesPanel onClose={() => setPreferencesOpen(false)} />
      )}
      {restarting && (
        <div className="restart-overlay" aria-hidden="true">
          <FaApple />
        </div>
      )}
    </>
  );
};

export default Header;
