import {
  FaGraduationCap,
  FaCode,
  FaLanguage,
  FaBriefcase,
} from "react-icons/fa";

const STACK_GROUPS: { label: string; items: string[] }[] = [
  {
    label: "Front-end",
    items: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    label: "Back-end",
    items: [
      "Node.js · Express",
      "Laravel · PHP",
      "Python · FastAPI",
      "Java · Spring Boot",
    ],
  },
  {
    label: "Dados",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "Docker", "n8n · Make"],
  },
  {
    label: "Design & Testes",
    items: ["Figma", "Illustrator", "Jest", "Vitest"],
  },
];

const AboutMe = () => {
  return (
    <div className="aboutme">
      <header className="aboutme-hero">
        <div className="aboutme-hero-avatar">
          <img src="/assets/yago.jpg" alt="Yago Henrique Fontanez" />
        </div>
        <div className="aboutme-hero-text">
          <span className="aboutme-eyebrow">Sobre mim</span>
          <h1>Yago Henrique Fontanez</h1>
          <p className="aboutme-role">
            Desenvolvedor Fullstack · Design & UX
          </p>
          <p className="aboutme-lead">
            Construo produtos ponta a ponta — do SDK ao pixel. Foco em React,
            TypeScript, Node.js, Laravel e Python/FastAPI, com olhar de
            designer.
          </p>
        </div>
      </header>

      <div className="aboutme-stats">
        <div className="aboutme-stat">
          <FaBriefcase />
          <div>
            <span className="aboutme-stat-num">2+</span>
            <span className="aboutme-stat-label">anos como dev</span>
          </div>
        </div>
        <div className="aboutme-stat">
          <FaCode />
          <div>
            <span className="aboutme-stat-num">4</span>
            <span className="aboutme-stat-label">projetos em produção</span>
          </div>
        </div>
        <div className="aboutme-stat">
          <FaGraduationCap />
          <div>
            <span className="aboutme-stat-num">ITE</span>
            <span className="aboutme-stat-label">Bauru · 2023—2025</span>
          </div>
        </div>
        <div className="aboutme-stat">
          <FaLanguage />
          <div>
            <span className="aboutme-stat-num">PT/EN/ES</span>
            <span className="aboutme-stat-label">nativo · B2 · B1</span>
          </div>
        </div>
      </div>

      <section className="aboutme-section">
        <h2>Trajetória</h2>
        <p>
          Cresci acompanhando meu pai na lan house dele — consertando
          computadores, videogames e programando. Essa vivência despertou minha
          curiosidade por tecnologia e nunca mais parei.
        </p>
        <p>
          Comecei como Designer Gráfico, migrei pra desenvolvimento e hoje
          construo produtos completos — frontend, backend, infra e UI.
        </p>
      </section>

      <section className="aboutme-section">
        <h2>Projeto principal · UpStat</h2>
        <p>
          SaaS de monitoramento de uptime com usuários pagantes, desenvolvido
          do zero. Ecossistema publicado: <b>SDK npm</b>, <b>CLI em Go</b>,{" "}
          <b>Flutter SDK</b>, <b>MCP Server</b>, Chrome Extension e AI Copilot.
        </p>
        <p>
          Pagamentos BR (Asaas + PIX), CPF/CNPJ criptografado com AES-256-GCM,
          auto-downgrade por webhook e roteamento por taxa. Synthetic
          monitoring, dependency map, alertas por e-mail/WhatsApp/SMS e status
          pages com subdomínio próprio.
        </p>
      </section>

      <section className="aboutme-section">
        <h2>Formação acadêmica</h2>
        <p>
          Bacharel em <b>Sistemas de Informação</b> e Tecnólogo em <b>Análise
          e Desenvolvimento de Sistemas</b> pela <b>Instituição Toledo de
          Ensino — ITE Bauru</b> (2023—2025). TCC{" "}
          <i>"Benchmarking de Backends: Node.js · FastAPI · Laravel"</i>{" "}
          aprovado com <b>nota máxima</b>.
        </p>
      </section>

      <section className="aboutme-section">
        <h2>Stack & ferramentas</h2>
        <div className="aboutme-stack">
          {STACK_GROUPS.map((g) => (
            <div key={g.label} className="aboutme-stack-group">
              <span className="aboutme-stack-label">{g.label}</span>
              <div className="aboutme-stack-chips">
                {g.items.map((t) => (
                  <span key={t} className="aboutme-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
