import { Tooltip } from "antd";
import img1 from "./../../assets/project1.jpg";
import img2 from "./../../assets/project2.jpg";
import img3 from "./../../assets/project3.jpg";
import img4 from "./../../assets/project4.jpg";
import linkedinImage from "./../../assets/linkedin.png";
import githubImage from "./../../assets/github.png";
import type { AppsFooterProps, Project } from "../../interfaces/interfaces";
import "./../../styles/desktop/AppsFooter.css";

const AppsFooter: React.FC<AppsFooterProps> = ({ setProject }) => {
  const projects: Project[] = [
    {
      title: "Martins Adviser",
      description: `Martins Adviser é um sistema completo tipo CRM, projetado para gerenciar e automatizar o envio de mensagens em múltiplos canais, incluindo e-mail, WhatsApp e SMS.
        Desenvolvido com React no front-end e Laravel + Node.js no back-end, o projeto utiliza uma infraestrutura robusta combinando AWS, Contabo e Railway para garantir escalabilidade e confiabilidade.
        Para integração com comunicação, foram utilizados serviços como Twilio e Evolution, permitindo automação e programação de envios de forma eficiente.
        É uma solução prática para empresas que precisam gerenciar contatos e campanhas de forma automatizada, unindo design moderno com alta performance e automatização de processos complexos.`,
      link: "https://martinsadviser.com/",
      image: img1,
    },
    {
      title: "To-Do List",
      description: `To-Do List é uma aplicação simples e prática para gerenciamento diário de tarefas, ideal para organizar afazeres do dia a dia.
        Construída apenas com HTML, CSS e JavaScript, utiliza LocalStorage para salvar dados diretamente no navegador, garantindo que suas tarefas fiquem armazenadas sem a necessidade de servidor.
        Apesar da simplicidade, o projeto oferece uma interface limpa e intuitiva, permitindo que o usuário adicione, remova e marque tarefas como concluídas de forma rápida.
        Um ótimo exemplo de como aplicações pequenas podem ser eficientes, rápidas e úteis no cotidiano.`,
      link: "https://to-do-list-yago.netlify.app/",
      image: img2,
    },
    {
      title: "Dashdark X",
      description: `Dashdark X é uma simulação de dashboard moderno, com foco em design elegante e interatividade, feito totalmente com HTML, CSS e JavaScript.
        O projeto demonstra a capacidade de criar interfaces sofisticadas e responsivas sem depender de frameworks externos.
        Com cores, tipografia e disposição de elementos cuidadosamente escolhidos, o dashboard transmite uma experiência visual agradável, com gráficos, painéis e cards estilizados que simulam funcionalidades reais de uma aplicação de análise de dados.
        Ideal para quem quer ver como um layout moderno pode ser implementado com tecnologia web pura, mantendo performance e estética de ponta.`,
      link: "https://dashdark.netlify.app/",
      image: img3,
    },
    {
      title: "Windows Simulator - Portfólio",
      description: `Windows Simulator é um portfólio interativo que simula a interface de um sistema Windows, exibindo informações pessoais e profissionais de forma divertida e dinâmica.
        Desenvolvido com React e Styled Components, o projeto também integra i18n, permitindo suporte a múltiplos idiomas.
        O objetivo é criar uma experiência única de navegação, combinando interatividade, design clássico de Windows e conteúdo pessoal/portfolio, transformando informações em uma experiência visual envolvente.
        É uma maneira criativa de apresentar habilidades e trabalhos, unindo programação, design e experiência do usuário de forma lúdica.`,
      link: "https://yagofontanezcurriculo.netlify.app/",
      image: img4,
    },
  ];

  return (
    <div className="apps-footer">
      <div className="apps-footer-left">
        {projects.map((project: Project, idx) => (
          <Tooltip title={project.title} key={idx}>
            <div
              className="apps-footer-item"
              onClick={() => setProject(project)}
              style={{ backgroundImage: `url(${project.image})` }}
            />
          </Tooltip>
        ))}
      </div>
      <hr className="app-footer-line" />
      <div className="apps-footer-right">
        <div
          className="apps-footer-item"
          style={{ backgroundImage: `url(${linkedinImage})` }}
          onClick={() =>
            window.open("https://www.linkedin.com/in/yagofontanez/", "_blank")
          }
        />
        <div
          className="apps-footer-item"
          style={{ backgroundImage: `url(${githubImage})` }}
          onClick={() =>
            window.open("https://www.github.com/yagofontanez", "_blank")
          }
        />
      </div>
    </div>
  );
};

export default AppsFooter;
