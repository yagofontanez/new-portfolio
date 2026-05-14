import Tooltip from "../common/Tooltip";
import { FaTerminal, FaSafari } from "react-icons/fa";
import linkedinImage from "./../../assets/linkedin.png";
import githubImage from "./../../assets/github.png";
import ProjectArt from "../shared/ProjectArt";
import { useWindows } from "../../state/windows/WindowsContext";
import { useSounds } from "../../utils/useSounds";
import { PROJECTS } from "../../data/projects";
import type { ProjectFull } from "../../data/projects";
import "./../../styles/desktop/AppsFooter.css";

const AppsFooter = () => {
  const { windows, openProject, openTerminal, openSafari, focus } = useWindows();
  const sounds = useSounds();

  const notesWindow = windows.find((w) => w.id === "notes");
  const terminalWindow = windows.find((w) => w.id === "terminal");
  const safariWindow = windows.find((w) => w.id === "safari");
  const projectWindowByTitle = (title: string) =>
    windows.find((w) => w.id === `project:${title}`);

  const handleProjectClick = (project: ProjectFull) => {
    sounds.click();
    const existing = projectWindowByTitle(project.title);
    if (existing) {
      focus(existing.id);
    } else {
      openProject(project);
    }
  };

  const handleTerminalClick = () => {
    sounds.click();
    if (terminalWindow) focus("terminal");
    else openTerminal();
  };

  const handleSafariClick = () => {
    sounds.click();
    if (safariWindow) focus("safari");
    else openSafari();
  };

  return (
    <div className="apps-footer-wrap">
      <div className="apps-footer">
        <div className="apps-footer-left">
          {notesWindow && (
            <Tooltip placement="top" title="Notas">
              <button
                type="button"
                className="apps-footer-item dock-notes"
                onClick={() => focus("notes")}
                aria-label="Notas"
              >
                <span className="dock-notes-pad" />
                <span className="dock-indicator" />
              </button>
            </Tooltip>
          )}
          <Tooltip placement="top" title="Safari">
            <button
              type="button"
              className={`apps-footer-item dock-safari${safariWindow ? " active" : ""}`}
              onClick={handleSafariClick}
              aria-label="Safari"
            >
              <FaSafari />
              {safariWindow && <span className="dock-indicator" />}
            </button>
          </Tooltip>
          <Tooltip placement="top" title="Terminal · ⌘T">
            <button
              type="button"
              className={`apps-footer-item dock-terminal${terminalWindow ? " active" : ""}`}
              onClick={handleTerminalClick}
              aria-label="Terminal"
            >
              <FaTerminal />
              {terminalWindow && <span className="dock-indicator" />}
            </button>
          </Tooltip>
          {PROJECTS.map((project) => {
            const win = projectWindowByTitle(project.title);
            const isOpen = !!win;
            return (
              <Tooltip placement="top" title={project.title} key={project.slug}>
                <button
                  type="button"
                  className={`apps-footer-item dock-project${isOpen ? " active" : ""}`}
                  onClick={() => handleProjectClick(project)}
                  aria-label={project.title}
                >
                  <ProjectArt id={project.art} />
                  {isOpen && <span className="dock-indicator" />}
                </button>
              </Tooltip>
            );
          })}
        </div>
        <div className="app-footer-line" />
        <div className="apps-footer-right">
          <Tooltip placement="top" title="LinkedIn">
            <button
              type="button"
              className="apps-footer-item"
              style={{ backgroundImage: `url(${linkedinImage})` }}
              onClick={() =>
                window.open("https://www.linkedin.com/in/yagofontanez/", "_blank")
              }
              aria-label="LinkedIn"
            />
          </Tooltip>
          <Tooltip placement="top" title="GitHub">
            <button
              type="button"
              className="apps-footer-item"
              style={{ backgroundImage: `url(${githubImage})` }}
              onClick={() =>
                window.open("https://www.github.com/yagofontanez", "_blank")
              }
              aria-label="GitHub"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default AppsFooter;
