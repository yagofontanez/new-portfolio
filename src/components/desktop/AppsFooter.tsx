import { Tooltip } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import linkedinImage from "./../../assets/linkedin.png";
import githubImage from "./../../assets/github.png";
import type { AppsFooterProps, Project } from "../../interfaces/interfaces";
import ProjectArt from "../shared/ProjectArt";
import "./../../styles/desktop/AppsFooter.css";

interface Props extends AppsFooterProps {
  activeProject?: string | null;
  noteOpen?: boolean;
}

const AppsFooter: React.FC<Props> = ({ setProject, activeProject, noteOpen }) => {
  const projects: Project[] = [
    {
      title: "UpStat",
      description: `SaaS de monitoramento de uptime em produção com usuários pagantes — desenvolvido do zero.

Plataforma completa com synthetic monitoring, dependency map, alertas via e-mail/WhatsApp/SMS, status pages customizáveis com subdomínio próprio e notificações com double opt-in.

Ecossistema publicado: SDK npm, CLI em Go, Flutter SDK (pub.dev), MCP Server, Chrome Extension e AI Copilot (Groq/llama-3.3-70b).

Integrações de pagamento BR (Asaas + pague.dev/PIX), CPF/CNPJ criptografado com AES-256-GCM, auto-downgrade por webhook e roteamento por taxa.`,
      link: "https://upstat.online",
      art: "upstat",
    },
    {
      title: "Pingoo",
      description: `Plataforma de mensageria WhatsApp construída em React + Java Spring Boot.

Interface glassmorphism com módulos de Templates, Integrações, Relatórios e Configurações, pensada para gerenciar campanhas e fluxos de atendimento em escala.

Stack: React, TypeScript, Tailwind CSS, Java Spring Boot, WhatsApp API.`,
      link: "https://github.com/yagofontanez/pingoo-backend",
      art: "pingoo",
    },
    {
      title: "Martins Adviser",
      description: `CRM completo para gestão e automação de mensagens multicanal — e-mail, WhatsApp e SMS.

Frontend em React, backend em Laravel + Node.js, rodando em AWS + Contabo + Railway. Integrações com Twilio e Evolution API para programação e envio automatizado de campanhas.`,
      link: "https://martinsadviser.com/",
      art: "martins",
    },
    {
      title: "TCC · Benchmarking de Backends",
      description: `Trabalho de Conclusão de Curso aprovado com nota máxima na defesa.

Pesquisa comparativa de performance entre Node.js, FastAPI e Laravel aplicados a mensageria automatizada via Twilio. Coleta de métricas de latência, throughput e uso de recursos em cenários controlados.

Resultado: Laravel liderou com 0,561s de latência média, seguido por Node.js e FastAPI — análise completa, metodologia reprodutível e repositório público para consulta acadêmica.`,
      link: "https://repositorios-tcc.netlify.app/",
      art: "tcc",
    },
  ];

  return (
    <div className="apps-footer-wrap">
      <div className="apps-footer">
        <div className="apps-footer-left">
          {noteOpen && (
            <Tooltip title="Notas">
              <div className="apps-footer-item dock-notes">
                <span className="dock-notes-pad" />
                <span className="dock-indicator" />
              </div>
            </Tooltip>
          )}
          {projects.map((project: Project, idx) => {
            const isActive = activeProject === project.title;
            return (
              <Tooltip title={project.title} key={idx}>
                <div
                  className={`apps-footer-item dock-project${isActive ? " active" : ""}`}
                  onClick={() => setProject(project)}
                >
                  <ProjectArt id={project.art} />
                  {isActive && <span className="dock-indicator" />}
                </div>
              </Tooltip>
            );
          })}
        </div>
        <div className="app-footer-line" />
        <div className="apps-footer-right">
          <Tooltip title="LinkedIn">
            <div
              className="apps-footer-item"
              style={{ backgroundImage: `url(${linkedinImage})` }}
              onClick={() =>
                window.open("https://www.linkedin.com/in/yagofontanez/", "_blank")
              }
            />
          </Tooltip>
          <Tooltip title="GitHub">
            <div
              className="apps-footer-item"
              style={{ backgroundImage: `url(${githubImage})` }}
              onClick={() =>
                window.open("https://www.github.com/yagofontanez", "_blank")
              }
            />
          </Tooltip>
          <Tooltip title="Lixeira">
            <div className="apps-footer-item dock-trash">
              <FaTrashAlt />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default AppsFooter;
