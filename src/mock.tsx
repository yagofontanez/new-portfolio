import MacOSChecklist from "./components/desktop/MacOSChecklist";
import "./styles/desktop/mock.css";

export const notesData = [
  {
    title: "Experiências",
    content: (
      <div className="experiencias">
        <h3 className="exp-heading">Minha trajetória profissional</h3>
        <p>
          Comecei na área de tecnologia na{" "}
          <span className="destaque">TDP Sistemas de Informação</span>, em Dois
          Córregos - SP, como estagiário em design gráfico (08/2023 – 02/2024).
        </p>
        <MacOSChecklist
          items={[
            "Artes para Instagram (feed, reels, stories)",
            "Flyers, artes para caneca e banners",
            "Edição de vídeos",
          ]}
        />

        <p>
          Em 02/2024 fui promovido para{" "}
          <span className="destaque">desenvolvedor fullstack web trainee</span>{" "}
          na mesma empresa, atuando até 09/2024.
        </p>
        <MacOSChecklist
          items={[
            "Frontend: React, Styled Components, Material UI",
            "Backend: Express, Node.js",
          ]}
        />

        <p>
          Em 09/2024 iniciei como{" "}
          <span className="destaque">desenvolvedor fullstack web</span> na
          empresa <span className="destaque">umClique</span> (Vitória/ES, home
          office), onde trabalho até hoje.
        </p>
        <MacOSChecklist
          items={[
            "Frontend: React, React Native, Tailwind, Ant Design",
            "Backend: Laravel, Node.js com Knex e TypeScript",
            "Infra: AWS (EC2, RDS, S3, Lambdas)",
          ]}
        />
      </div>
    ),
  },
  {
    title: "Sobre Mim",
    content: (
      <div className="sobre-mim">
        <section className="sobre-section section-yellow">
          <h3 className="sobre-heading">Início da Paixão</h3>
          <p>
            Desde criança, acompanhava meu pai na{" "}
            <span className="highlight-blue">lan house</span> que ele tinha,
            observando-o consertar computadores, videogames e programar. Essa
            vivência despertou em mim a curiosidade e a paixão por tecnologia.
          </p>
        </section>

        <section className="sobre-section section-green">
          <h3 className="sobre-heading">Formação e Cursos</h3>
          <ul className="sobre-list">
            <li>Pacote Office</li>
            <li>Montagem e manutenção de PCs, notebooks e celulares</li>
            <li>Criação de aplicativos</li>
            <li>Frontend, backend e infraestrutura</li>
          </ul>
        </section>

        <section className="sobre-section section-blue">
          <h3 className="sobre-heading">Faculdade</h3>
          <p>
            Atualmente curso{" "}
            <span className="highlight-orange">Sistemas de Informação</span> na{" "}
            <span className="highlight-green">
              Instituição Toledo de Ensino (ITE)
            </span>
            . Concluirei no final de 2025, recebendo diploma de{" "}
            <span className="italico">bacharel</span> e também de{" "}
            <span className="italico">
              tecnólogo em Análise e Desenvolvimento de Sistemas
            </span>
            .
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
          Você pode me encontrar nos canais abaixo:
        </p>
        <ul className="contato-lista">
          <li>
            <a
              href="https://github.com/yagofontanez"
              target="_blank"
              rel="noreferrer"
              className="contato-item github"
            >
              <span className="contato-icone">🐙</span>
              <span className="contato-label">Github</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/yagofontanez"
              target="_blank"
              rel="noreferrer"
              className="contato-item linkedin"
            >
              <span className="contato-icone">💼</span>
              <span className="contato-label">LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              href="mailto:dev.yagofontanez@gmail.com"
              className="contato-item email"
            >
              <span className="contato-icone">📧</span>
              <span className="contato-label">dev.yagofontanez@gmail.com</span>
            </a>
          </li>
          <li>
            <a
              href="/assets/yago_curriculo_dev.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="contato-item pdf"
            >
              <span className="contato-icone">📄</span>
              <span className="contato-label">Currículo</span>
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
            placeholder="Digite o assunto"
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
            Enviar
          </button>
        </div>
      </form>
    ),
  },
];
