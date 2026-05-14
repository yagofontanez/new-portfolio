import { useEffect } from "react";
import AppsFooter from "../../components/desktop/AppsFooter";
import Header from "../../components/desktop/Header";
import HomeMobile from "../mobile/HomeMobile";
import DesktopIcons from "../../components/desktop/DesktopIcons";
import WelcomeCard from "../../components/desktop/WelcomeCard";
import WindowLayer from "../../components/desktop/WindowLayer";
import Spotlight from "../../components/desktop/Spotlight";
import StatsWidget from "../../components/desktop/StatsWidget";
import { useWindows } from "../../state/windows/WindowsContext";
import { useSpotlight } from "../../state/spotlight/SpotlightContext";
import { useIsMobile } from "../../utils/useIsMobile";
import "./../../styles/desktop/Home.css";

const Home = () => {
  const isMobile = useIsMobile(768);
  const { windows, focusedId, close, openNotes, openTerminal } = useWindows();
  const { isOpen: spotlightOpen, open: openSpotlight, close: closeSpotlight } =
    useSpotlight();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;

      if (mod && e.code === "Space") {
        e.preventDefault();
        if (spotlightOpen) closeSpotlight();
        else openSpotlight();
        return;
      }

      if (mod && (e.key === "t" || e.key === "T")) {
        e.preventDefault();
        openTerminal();
        return;
      }

      if (e.key === "Escape") {
        if (spotlightOpen) {
          closeSpotlight();
          return;
        }
        if (focusedId) close(focusedId);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    focusedId,
    close,
    spotlightOpen,
    openSpotlight,
    closeSpotlight,
    openTerminal,
  ]);

  if (isMobile) return <HomeMobile />;

  const hasOpenWindow = windows.some((w) => !w.minimized);

  return (
    <div className="home">
      <Header />

      {!hasOpenWindow && (
        <>
          <DesktopIcons onOpenNote={(title) => openNotes({ selectedNote: title })} />
          <div className="desktop-hero">
            <WelcomeCard onOpenNote={(title) => openNotes({ selectedNote: title })} />
            <StatsWidget />
          </div>
        </>
      )}

      <WindowLayer />
      <Spotlight />

      <AppsFooter />
    </div>
  );
};

export default Home;
