import { useState } from "react";
import IPhoneFrame from "../../components/mobile/iPhoneFrame";
import IPhoneStatusBar from "../../components/mobile/iPhoneStatusBar";
import IPhoneCalendarWidget from "../../components/mobile/IPhoneCalendarWidget";
import IPhoneFolderWidget from "../../components/mobile/IPhoneFolderWidget";
import IPhoneFeaturedWidget from "../../components/mobile/IPhoneFeaturedWidget";
import IPhoneSheet from "../../components/mobile/iPhoneSheet";
import IPhoneAppTile from "../../components/mobile/IPhoneAppTile";
import IPhonePageDots from "../../components/mobile/IPhonePageDots";
import IPhoneWeatherWidget from "../../components/mobile/IPhoneWeatherWidget";
import ProjectArt from "../../components/shared/ProjectArt";
import {
  FaBriefcase,
  FaUser,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaReact,
  FaNodeJs,
  FaAws,
  FaPalette,
  FaGraduationCap,
  FaLanguage,
  FaSafari,
} from "react-icons/fa";
import { notesData } from "../../mock";
import type { Project } from "../../interfaces/interfaces";
import "./../../styles/mobile/HomeMobile.css";
import "./../../styles/desktop/mock.css";

type MobileProject = Project & {
  subtitle: string;
  tags: string[];
  status?: { label: string; color: string };
};

const projects: MobileProject[] = [
  {
    title: "UpStat",
    subtitle: "SaaS · Monitoramento de Uptime",
    description:
      "Desenvolvido do zero, em produção com usuários pagantes. Ecossistema com SDK npm, CLI em Go, Flutter SDK, MCP Server, Chrome Extension e AI Copilot. Pagamentos BR (Asaas + PIX) e CPF/CNPJ criptografado com AES-256-GCM.",
    link: "https://upstat.online",
    art: "upstat",
    tags: ["Node.js", "React", "PostgreSQL", "Go", "Flutter"],
    status: { label: "Em produção", color: "#22c55e" },
  },
  {
    title: "Pingoo",
    subtitle: "Mensageria WhatsApp",
    description:
      "Plataforma com UI glassmorphism e módulos de Templates, Integrações, Relatórios e Configurações. Pensada para gerenciar campanhas e fluxos de atendimento em escala.",
    link: "https://github.com/yagofontanez/pingoo-backend",
    art: "pingoo",
    tags: ["React", "TypeScript", "Spring Boot", "Tailwind"],
    status: { label: "Open Source", color: "#818cf8" },
  },
  {
    title: "Martins Adviser",
    subtitle: "CRM Multicanal",
    description:
      "CRM completo para gestão e automação de mensagens em e-mail, WhatsApp e SMS. Infraestrutura combinando AWS, Contabo e Railway. Twilio + Evolution API para envio programado.",
    link: "https://martinsadviser.com/",
    art: "martins",
    tags: ["React", "Laravel", "Node.js", "AWS", "Twilio"],
    status: { label: "Live", color: "#0ea5e9" },
  },
  {
    title: "TCC · Benchmarking de Backends",
    subtitle: "Pesquisa Acadêmica · ITE Bauru",
    description:
      "Pesquisa comparativa de performance entre Node.js, FastAPI e Laravel para mensageria automatizada via Twilio. Laravel liderou com 0,561s de latência média.",
    link: "https://repositorios-tcc.netlify.app/",
    art: "tcc",
    tags: ["Node.js", "FastAPI", "Laravel", "Twilio"],
    status: { label: "★ Nota máxima", color: "#fbbf24" },
  },
];

const HomeMobile = () => {
  const [sheetOpen, setSheetOpen] = useState<string | null>(null);

  const openSheet = (title: string) => setSheetOpen(title);
  const closeSheet = () => setSheetOpen(null);
  const openExternal = (url: string) => window.open(url, "_blank");

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
            <div className="iphone-grid-row">
              <div className="iphone-mini-grid">
                <IPhoneFolderWidget
                  label="Contato"
                  badge={5}
                  tiles={[
                    {
                      icon: <FaEnvelope />,
                      bg: "linear-gradient(135deg, #4facfe 0%, #1e7ce8 100%)",
                    },
                    {
                      icon: <FaWhatsapp />,
                      bg: "linear-gradient(135deg, #4ade80 0%, #16a34a 100%)",
                    },
                    {
                      icon: <FaLinkedin />,
                      bg: "linear-gradient(135deg, #2196f3 0%, #0a66c2 100%)",
                    },
                    {
                      icon: <FaGithub />,
                      bg: "linear-gradient(135deg, #4a4a4a 0%, #1d1d1f 100%)",
                    },
                  ]}
                  onClick={() => openSheet("Contato")}
                />
                <IPhoneFolderWidget
                  label="Sobre Mim"
                  badge={4}
                  tiles={[
                    {
                      icon: <FaUser />,
                      bg: "linear-gradient(135deg, #ffd86b 0%, #ff9500 100%)",
                    },
                    {
                      icon: <FaGraduationCap />,
                      bg: "linear-gradient(135deg, #67e8f9 0%, #0891b2 100%)",
                    },
                    {
                      icon: <FaPalette />,
                      bg: "linear-gradient(135deg, #f0abfc 0%, #af52de 100%)",
                    },
                    {
                      icon: <FaLanguage />,
                      bg: "linear-gradient(135deg, #fb7185 0%, #d93025 100%)",
                    },
                  ]}
                  onClick={() => openSheet("Sobre Mim")}
                />
                <IPhoneAppTile
                  label="WhatsApp"
                  icon={<FaWhatsapp />}
                  bg="linear-gradient(135deg, #4ade80 0%, #16a34a 100%)"
                  onClick={() => openExternal("https://wa.me/5514982258397")}
                />
                <IPhoneAppTile
                  label="Mail"
                  icon={<FaEnvelope />}
                  bg="linear-gradient(135deg, #4facfe 0%, #1e7ce8 100%)"
                  onClick={() => openSheet("Contato")}
                />
              </div>
              <div className="iphone-big-widget">
                <IPhoneWeatherWidget />
              </div>
            </div>

            <div className="iphone-grid-row">
              <div className="iphone-mini-grid">
                <IPhoneFolderWidget
                  label="Projetos"
                  badge={projects.length}
                  tiles={projects.map((p) => ({
                    icon: <ProjectArt id={p.art} />,
                  }))}
                  onClick={() => openSheet("Projetos")}
                />
                <IPhoneFolderWidget
                  label="Experiências"
                  badge={3}
                  tiles={[
                    {
                      icon: <FaBriefcase />,
                      bg: "linear-gradient(135deg, #818cf8 0%, #4f46e5 100%)",
                    },
                    {
                      icon: <FaReact />,
                      bg: "linear-gradient(135deg, #67e8f9 0%, #0ea5e9 100%)",
                    },
                    {
                      icon: <FaNodeJs />,
                      bg: "linear-gradient(135deg, #86efac 0%, #16a34a 100%)",
                    },
                    {
                      icon: <FaAws />,
                      bg: "linear-gradient(135deg, #fbbf24 0%, #ea580c 100%)",
                    },
                  ]}
                  onClick={() => openSheet("Experiências")}
                />
                <IPhoneAppTile
                  label="Safari"
                  icon={<FaSafari />}
                  bg="radial-gradient(circle at 30% 30%, #77b9ff, #0a66c2 70%)"
                  onClick={() =>
                    openExternal("https://yagof-dev.netlify.app")
                  }
                />
                <IPhoneAppTile
                  label="LinkedIn"
                  icon={<FaLinkedin />}
                  bg="linear-gradient(135deg, #2196f3 0%, #0a66c2 100%)"
                  onClick={() =>
                    openExternal("https://linkedin.com/in/yagofontanez")
                  }
                />
              </div>
              <div className="iphone-big-widget">
                <IPhoneCalendarWidget />
              </div>
            </div>

            <IPhoneFeaturedWidget onClick={() => openSheet("Projetos")} />

            <div className="iphone-bottom-stack">
              <IPhonePageDots total={2} active={0} />
            </div>
          </div>
        </div>
      </IPhoneFrame>

      {sheetOpen && sheetOpen !== "Projetos" && (
        <IPhoneSheet
          title={sheetOpen}
          isOpen={!!sheetOpen}
          onClose={closeSheet}
        >
          {getContent(sheetOpen)}
        </IPhoneSheet>
      )}

      {sheetOpen === "Projetos" && (
        <IPhoneSheet title="Projetos" isOpen={true} onClose={closeSheet}>
          <div className="iphone-projects-grid">
            {projects.map((project, idx) => (
              <div key={idx} className="iphone-project-card">
                <div className="iphone-project-card-hero">
                  <ProjectArt id={project.art} />
                  <div className="iphone-project-card-hero-shade" />
                  {project.status && (
                    <span
                      className="iphone-project-card-status"
                      style={{ ["--status-color" as string]: project.status.color }}
                    >
                      <span className="iphone-project-card-status-dot" />
                      {project.status.label}
                    </span>
                  )}
                  <div className="iphone-project-card-hero-text">
                    <span className="iphone-project-card-subtitle">
                      {project.subtitle}
                    </span>
                    <h3 className="iphone-project-card-title">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="iphone-project-card-body">
                  <p className="iphone-project-card-desc">
                    {project.description}
                  </p>
                  <div className="iphone-project-card-tags">
                    {project.tags.map((t) => (
                      <span key={t} className="iphone-project-card-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="iphone-project-card-link"
                  >
                    Abrir projeto
                    <span className="iphone-project-card-link-arrow">↗</span>
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
