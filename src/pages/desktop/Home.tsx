import { useEffect, useState } from "react";
import AppsFooter from "../../components/desktop/AppsFooter";
import Header from "../../components/desktop/Header";
import HomeMobile from "../mobile/HomeMobile";
import "./../../styles/desktop/Home.css";
import type { Project } from "../../interfaces/interfaces";
import MacOSModalTemplate from "../../components/desktop/MacOSModalTemplate";
import MacOSNoteTemplate from "../../components/desktop/MacOSNoteTemplate";
import { notesData } from "../../mock";
import DesktopIcons from "../../components/desktop/DesktopIcons";
import WelcomeCard from "../../components/desktop/WelcomeCard";
import ProjectArt from "../../components/shared/ProjectArt";

const NOTE_META: Record<string, { icon: string; preview: string }> = {
  Experiências: {
    icon: "💼",
    preview: "Um Clique Digital · TDP Sistemas · Designer",
  },
  "Sobre Mim": {
    icon: "👋",
    preview: "Dev fullstack · criador do UpStat · ITE Bauru",
  },
  Contato: { icon: "✉️", preview: "E-mail, WhatsApp, LinkedIn e mais" },
  Ajuda: { icon: "💬", preview: "Fale comigo diretamente" },
};

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selected, setSelected] = useState<string>("Página Inicial");
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (project) setProject(null);
        else if (selected !== "Página Inicial") setSelected("Página Inicial");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, selected]);

  const noteOpen = selected !== "Página Inicial";
  const noteEntries = notesData.map((n) => ({
    title: n.title,
    icon: NOTE_META[n.title]?.icon ?? "📝",
    preview: NOTE_META[n.title]?.preview ?? "",
  }));
  const currentNote = notesData.find((n) => n.title === selected);

  return (
    <div className="home">
      {isMobile ? (
        <HomeMobile />
      ) : (
        <>
          <Header selected={selected} setSelected={setSelected} />

          {!noteOpen && !project && (
            <>
              <DesktopIcons onOpenNote={setSelected} />
              <WelcomeCard onOpenNote={setSelected} />
            </>
          )}

          {project && (
            <div className="modal-overlay" onClick={() => setProject(null)}>
              <MacOSModalTemplate
                title={project.title}
                onClose={() => setProject(null)}
              >
                <div
                  className="project-modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="project-image">
                    <ProjectArt id={project.art} />
                  </div>
                  <div className="project-info">
                    <span className="project-subtitle">Projeto em destaque</span>
                    <h2 className="project-title">{project.title}</h2>
                    <p className="project-description">{project.description}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="project-link"
                    >
                      Abrir projeto ↗
                    </a>
                  </div>
                </div>
              </MacOSModalTemplate>
            </div>
          )}

          {noteOpen && currentNote && (
            <MacOSNoteTemplate
              title="Notas"
              notes={noteEntries}
              selected={selected}
              onSelect={setSelected}
              onClose={() => setSelected("Página Inicial")}
            >
              {currentNote.content}
            </MacOSNoteTemplate>
          )}

          <AppsFooter
            setProject={setProject}
            activeProject={project?.title ?? null}
            noteOpen={noteOpen}
          />
        </>
      )}
    </div>
  );
};

export default Home;
