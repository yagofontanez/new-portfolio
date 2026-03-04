import { useState } from "react";
import IPhoneFrame from "../../components/mobile/iPhoneFrame";
import IPhoneStatusBar from "../../components/mobile/iPhoneStatusBar";
import IPhoneBatteryWidget from "../../components/mobile/IPhoneBatteryWidget";
import IPhoneCalendarWidget from "../../components/mobile/IPhoneCalendarWidget";
import IPhoneFolderWidget from "../../components/mobile/IPhoneFolderWidget";
import IPhoneFeaturedWidget from "../../components/mobile/IPhoneFeaturedWidget";
import IPhoneSearchBar from "../../components/mobile/IPhoneSearchBar";
import IPhoneSheet from "../../components/mobile/iPhoneSheet";
import {
  FaBriefcase,
  FaUser,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaFolderOpen,
  FaCode,
  FaShareAlt,
} from "react-icons/fa";
import img1 from "../../assets/project1.jpg";
import img2 from "../../assets/project2.jpg";
import img3 from "../../assets/project3.jpg";
import img4 from "../../assets/project4.jpg";
import { notesData } from "../../mock";
import type { Project } from "../../interfaces/interfaces";
import "./../../styles/mobile/HomeMobile.css";
import "./../../styles/desktop/mock.css";

const projects: Project[] = [
  {
    title: "Martins Adviser",
    description:
      "Martins Adviser é um sistema completo tipo CRM, projetado para gerenciar e automatizar o envio de mensagens em múltiplos canais. Desenvolvido com React e Laravel + Node.js.",
    link: "https://martinsadviser.com/",
    image: img1,
  },
  {
    title: "To-Do List",
    description:
      "Aplicação para gerenciamento de tarefas com HTML, CSS e JavaScript. LocalStorage para persistência.",
    link: "https://to-do-list-yago.netlify.app/",
    image: img2,
  },
  {
    title: "Dashdark X",
    description:
      "Simulação de dashboard moderno com foco em design elegante, feito com HTML, CSS e JavaScript.",
    link: "https://dashdark.netlify.app/",
    image: img3,
  },
  {
    title: "Windows Simulator",
    description:
      "Portfólio interativo que simula interface Windows. React, Styled Components e i18n.",
    link: "https://yagofontanezcurriculo.netlify.app/",
    image: img4,
  },
];

const HomeMobile = () => {
  const [sheetOpen, setSheetOpen] = useState<string | null>(null);

  const openSheet = (title: string) => setSheetOpen(title);
  const closeSheet = () => setSheetOpen(null);

  const getContent = (title: string) => {
    const note = notesData.find((n) => n.title === title);
    return note?.content ?? null;
  };

  return (
    <div className="home-mobile">
      <IPhoneFrame>
        <IPhoneStatusBar />
        <div className="iphone-home">
          <div className="iphone-widgets">
            <IPhoneBatteryWidget />

            <div className="iphone-widgets-grid">
              <div className="iphone-widgets-folders">
                <IPhoneFolderWidget
                  label="Redes Sociais"
                  badge={8}
                  icons={[
                    <FaLinkedin />,
                    <FaGithub />,
                    <FaShareAlt />,
                    <FaEnvelope />,
                  ]}
                  onClick={() => openSheet("Contato")}
                />
                <IPhoneFolderWidget
                  label="Importantes"
                  badge={4}
                  icons={[
                    <FaUser />,
                    <FaBriefcase />,
                    <FaEnvelope />,
                    <FaFolderOpen />,
                  ]}
                  onClick={() => openSheet("Sobre Mim")}
                />
                <IPhoneFolderWidget
                  label="Projetos"
                  badge={projects.length}
                  icons={[
                    <div
                      key="1"
                      style={{
                        backgroundImage: `url(${img1})`,
                        width: "100%",
                        height: "100%",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />,
                    <div
                      key="2"
                      style={{
                        backgroundImage: `url(${img2})`,
                        width: "100%",
                        height: "100%",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />,
                    <div
                      key="3"
                      style={{
                        backgroundImage: `url(${img3})`,
                        width: "100%",
                        height: "100%",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />,
                    <div
                      key="4"
                      style={{
                        backgroundImage: `url(${img4})`,
                        width: "100%",
                        height: "100%",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />,
                  ]}
                  onClick={() => openSheet("Projetos")}
                />
                <IPhoneFolderWidget
                  label="Dev"
                  badge={22}
                  icons={[
                    <FaGithub />,
                    <FaCode />,
                    <FaBriefcase />,
                    <FaLinkedin />,
                  ]}
                  onClick={() => openSheet("Experiências")}
                />
              </div>
              <div className="iphone-widgets-calendar">
                <IPhoneCalendarWidget />
              </div>
            </div>

            <IPhoneFeaturedWidget onClick={() => openSheet("Projetos")} />

            <IPhoneSearchBar />
          </div>
        </div>
      </IPhoneFrame>

      {sheetOpen && sheetOpen !== "Projetos" && (
        <IPhoneSheet
          title={sheetOpen}
          isOpen={!!sheetOpen}
          onClose={closeSheet}
        >
          {sheetOpen === "Página Inicial" ? (
            <div className="sobre-mim">
              <p>
                Olá! Sou Yago Fontanez, desenvolvedor full stack. Explore as
                pastas e widgets para conhecer meu trabalho.
              </p>
            </div>
          ) : (
            getContent(sheetOpen)
          )}
        </IPhoneSheet>
      )}

      {sheetOpen === "Projetos" && (
        <IPhoneSheet title="Projetos" isOpen={true} onClose={closeSheet}>
          <div className="iphone-projects-grid">
            {projects.map((project, idx) => (
              <div key={idx} className="iphone-project-card">
                <div
                  className="iphone-project-card-image"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="iphone-project-card-info">
                  <h3 className="iphone-project-card-title">{project.title}</h3>
                  <p className="iphone-project-card-desc">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="iphone-project-card-link"
                  >
                    Ver projeto →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </IPhoneSheet>
      )}
    </div>
  );
};

export default HomeMobile;
