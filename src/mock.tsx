import MacOSChecklist from "./components/desktop/MacOSChecklist";
import "./styles/desktop/mock.css";

const TechChips = ({ items }: { items: string[] }) => (
  <div className="tech-chips">
    {items.map((t) => (
      <span key={t} className="tech-chip">
        {t}
      </span>
    ))}
  </div>
);

export const notesData = [
  {
    title: "Experiências",
    content: (
      <div className="experiencias">
        <h3 className="exp-heading">Trajetória profissional</h3>
        <p className="exp-lead">
          Mais de 2 anos atuando como <span className="destaque">Desenvolvedor Fullstack</span>,
          com background em Design Gráfico e UX. Criador do{" "}
          <span className="destaque">UpStat</span>, SaaS de monitoramento de uptime em
          produção com usuários pagantes.
        </p>

        <div className="exp-card">
          <div className="exp-card-head">
            <h4 className="exp-role">Desenvolvedor Web Fullstack</h4>
            <span className="exp-period">ago/2024 — Atual</span>
          </div>
          <p className="exp-company">Um Clique Digital · Dois Córregos, SP</p>
          <MacOSChecklist
            items={[
              "Arquitetou interfaces React/TypeScript reduzindo retrabalho de design em ~40%.",
              "Refatorou o módulo de chat web com tipagem estrita eliminando bugs recorrentes.",
              "Desenvolveu monitoramento de grupos WhatsApp com relatórios de inteligência competitiva para o setor solar.",
              "Implementou pipelines n8n com agentes de IA, reduzindo tempo de resposta ao cliente em ~60%.",
            ]}
          />
          <TechChips items={["React", "TypeScript", "Laravel", "Node.js", "AWS", "n8n"]} />
        </div>

        <div className="exp-card">
          <div className="exp-card-head">
            <h4 className="exp-role">Desenvolvedor Web</h4>
            <span className="exp-period">fev/2024 — ago/2024</span>
          </div>
          <p className="exp-company">TDP Sistemas de Informação · Dois Córregos, SP</p>
          <MacOSChecklist
            items={[
              "Integrou WhatsChatIA ao sistema principal habilitando envio automatizado via WhatsApp.",
              "Identificou e corrigiu memory leaks críticos, melhorando estabilidade em produção.",
              "Implementou API da Meta para tracking de conversões e análise de campanhas.",
              "Resolveu bugs na integração iFood garantindo consistência no fluxo de pedidos.",
            ]}
          />
          <TechChips items={["React", "Node.js", "Express", "Styled Components"]} />
        </div>

        <div className="exp-card">
          <div className="exp-card-head">
            <h4 className="exp-role">Designer Gráfico</h4>
            <span className="exp-period">ago/2023 — fev/2024</span>
          </div>
          <p className="exp-company">TDP Sistemas de Informação · Dois Córregos, SP</p>
          <MacOSChecklist
            items={[
              "Produziu identidades visuais e artes aprovadas em primeira revisão.",
              "Arte-finalização e tratamento de imagens para impressão (cor, resolução, sangria).",
              "Desenvolveu ilustrações personalizadas reforçando o posicionamento de marcas.",
            ]}
          />
          <TechChips items={["Illustrator", "Photoshop", "Figma", "Branding"]} />
        </div>
      </div>
    ),
  },
  {
    title: "Sobre Mim",
    content: (
      <div className="sobre-mim">
        <p className="sobre-intro">
          Sou <span className="destaque">Yago Henrique Fontanez</span> — Desenvolvedor
          Fullstack focado em React, TypeScript, Node.js, Laravel e Python/FastAPI,
          com olhar de designer. Construo produtos de ponta a ponta, do SDK ao pixel.
        </p>

        <section className="sobre-section section-yellow">
          <h3 className="sobre-heading">Início da paixão</h3>
          <p>
            Desde criança acompanhava meu pai na{" "}
            <span className="highlight-blue">lan house</span> dele — consertando
            computadores, videogames e programando. Essa vivência despertou minha
            curiosidade por tecnologia e nunca mais parei.
          </p>
        </section>

        <section className="sobre-section section-blue">
          <h3 className="sobre-heading">UpStat · projeto próprio em produção</h3>
          <p>
            SaaS de monitoramento de uptime com usuários pagantes. Ecossistema
            publicado: <span className="highlight-blue">SDK npm</span>,{" "}
            <span className="highlight-blue">CLI em Go</span>,{" "}
            <span className="highlight-blue">Flutter SDK</span>,{" "}
            <span className="highlight-blue">MCP Server</span>, Chrome Extension e
            AI Copilot. Pagamentos BR (Asaas + PIX), CPF/CNPJ criptografado com
            AES-256-GCM e roteamento por taxa via webhook.
          </p>
        </section>

        <section className="sobre-section section-green">
          <h3 className="sobre-heading">Formação acadêmica</h3>
          <p>
            Bacharel em <span className="highlight-green">Sistemas de Informação</span>{" "}
            e Tecnólogo em Análise e Desenvolvimento de Sistemas pela{" "}
            <span className="highlight-green">Instituição Toledo de Ensino — ITE Bauru</span>{" "}
            (2023—2025). TCC{" "}
            <span className="italico">"Benchmarking de Backends: Node.js · FastAPI · Laravel"</span>{" "}
            aprovado com <span className="highlight-orange">nota máxima</span>.
          </p>
        </section>

        <section className="sobre-section section-purple">
          <h3 className="sobre-heading">Stack &amp; ferramentas</h3>
          <ul className="sobre-list">
            <li>React · Next.js</li>
            <li>TypeScript</li>
            <li>Node.js · Express</li>
            <li>Laravel · PHP</li>
            <li>Python · FastAPI</li>
            <li>Java Spring Boot</li>
            <li>PostgreSQL · MySQL</li>
            <li>MongoDB · Prisma</li>
            <li>AWS · Docker</li>
            <li>n8n · Make.com</li>
            <li>Figma · Illustrator</li>
            <li>Jest · Vitest</li>
          </ul>
        </section>

        <section className="sobre-section section-red">
          <h3 className="sobre-heading">Idiomas</h3>
          <p>
            Português <span className="italico">(nativo)</span> · Inglês{" "}
            <span className="highlight-blue">B2</span> · Espanhol{" "}
            <span className="highlight-blue">B1</span>
          </p>
        </section>
      </div>
    ),
  },
  {
    title: "Contato",
    content: (
      <div className="contato">
        <p className="contato-texto">
          Aberto a oportunidades e conversas. Escolha o canal que preferir:
        </p>
        <ul className="contato-lista">
          <li>
            <a
              href="mailto:dev.yagofontanez@gmail.com"
              className="contato-item email"
            >
              <span className="contato-icone">✉</span>
              <span className="contato-body">
                <span className="contato-label">dev.yagofontanez@gmail.com</span>
                <span className="contato-sub">E-mail</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/5514982258397"
              target="_blank"
              rel="noreferrer"
              className="contato-item whatsapp"
            >
              <span className="contato-icone">☏</span>
              <span className="contato-body">
                <span className="contato-label">(14) 98225-8397</span>
                <span className="contato-sub">WhatsApp</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/yagofontanez"
              target="_blank"
              rel="noreferrer"
              className="contato-item linkedin"
            >
              <span className="contato-icone">in</span>
              <span className="contato-body">
                <span className="contato-label">/in/yagofontanez</span>
                <span className="contato-sub">LinkedIn</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/yagofontanez"
              target="_blank"
              rel="noreferrer"
              className="contato-item github"
            >
              <span className="contato-icone">◉</span>
              <span className="contato-body">
                <span className="contato-label">@yagofontanez</span>
                <span className="contato-sub">GitHub</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://yagof-dev.netlify.app"
              target="_blank"
              rel="noreferrer"
              className="contato-item web"
            >
              <span className="contato-icone">✦</span>
              <span className="contato-body">
                <span className="contato-label">yagof-dev.netlify.app</span>
                <span className="contato-sub">Site pessoal</span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="/assets/Curriculo Yago 2026 Att.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="contato-item pdf"
            >
              <span className="contato-icone">⇣</span>
              <span className="contato-body">
                <span className="contato-label">Baixar currículo</span>
                <span className="contato-sub">PDF · 2026</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Ajuda",
    content: (
      <form
        className="form-ajuda"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const mailto = `mailto:dev.yagofontanez@gmail.com?subject=${encodeURIComponent(
            formData.get("assunto") as string
          )}&body=${encodeURIComponent(formData.get("mensagem") as string)}`;
          window.location.href = mailto;
        }}
      >
        <p className="form-intro">
          Precisa de algo? Me mande uma mensagem — respondo em até 24h.
        </p>

        <div className="form-group">
          <label className="form-label">De</label>
          <input
            type="email"
            name="email"
            placeholder="seuemail@exemplo.com"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Assunto</label>
          <input
            type="text"
            name="assunto"
            placeholder="Sobre o que gostaria de falar?"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Mensagem</label>
          <textarea
            name="mensagem"
            placeholder="Escreva sua mensagem..."
            rows={5}
            required
            className="form-textarea"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">
            Enviar mensagem
          </button>
        </div>
      </form>
    ),
  },
];
