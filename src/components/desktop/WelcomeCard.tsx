import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./../../styles/desktop/WelcomeCard.css";

interface WelcomeCardProps {
  onOpenNote: (title: string) => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ onOpenNote }) => {
  return (
    <div className="welcome-card">
      <div className="welcome-avatar">
        <span>YF</span>
      </div>
      <div className="welcome-body">
        <span className="welcome-eyebrow">Olá, seja bem-vindo(a) 👋</span>
        <h1 className="welcome-title">Yago Henrique Fontanez</h1>
        <p className="welcome-subtitle">
          Desenvolvedor Fullstack · Design &amp; UX
        </p>
        <p className="welcome-desc">
          +2 anos construindo produtos com React, TypeScript, Node.js, Laravel
          e Python. Criador do <b>UpStat</b>, SaaS de monitoramento de uptime
          em produção. Bacharel em Sistemas de Informação pela ITE Bauru.
        </p>
        <div className="welcome-actions">
          <button
            className="welcome-btn welcome-btn-primary"
            onClick={() => onOpenNote("Experiências")}
          >
            Ver experiências
          </button>
          <button
            className="welcome-btn"
            onClick={() => onOpenNote("Sobre Mim")}
          >
            Sobre mim
          </button>
          <button
            className="welcome-btn"
            onClick={() => onOpenNote("Contato")}
          >
            Contato
          </button>
        </div>
        <div className="welcome-social">
          <a
            href="https://github.com/yagofontanez"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/yagofontanez"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a href="mailto:dev.yagofontanez@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
