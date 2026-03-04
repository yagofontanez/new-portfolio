import { useEffect, useState } from "react";
import AppsFooter from "../../components/desktop/AppsFooter";
import Header from "../../components/desktop/Header";
import HomeMobile from "../mobile/HomeMobile";
import "./../../styles/desktop/Home.css";
import type { Project } from "../../interfaces/interfaces";
import MacOSModalTemplate from "../../components/desktop/MacOSModalTemplate";
import MacOSNoteTemplate from "../../components/desktop/MacOSNoteTemplate";
import { notesData } from "../../mock";

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selected, setSelected] = useState<string>("Página Inicial");
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className="home">
      {isMobile ? (
        <HomeMobile />
      ) : (
        <>
          <Header selected={selected} setSelected={setSelected} />
          {project && (
            <div className="modal-overlay">
              <MacOSModalTemplate
                title={project.title}
                onClose={() => setProject(null)}
              >
                <div
                  className="project-modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="project-image"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="project-info">
                    <h2 className="project-title">{project.title}</h2>
                    <p className="project-description">{project.description}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="project-link"
                    >
                      Ver projeto
                    </a>
                  </div>
                </div>
              </MacOSModalTemplate>
            </div>
          )}
          {selected && selected !== "Página Inicial" && (
            <MacOSNoteTemplate
              title={selected}
              onClose={() => setSelected("Página Inicial")}
            >
              {notesData.find((note) => note.title === selected)?.content}
            </MacOSNoteTemplate>
          )}
          <AppsFooter setProject={setProject} />
        </>
      )}
    </div>
  );
};

export default Home;
