import { useState, useEffect } from "react";
import ProjectArt, { type ProjectId } from "../shared/ProjectArt";
import "./../../styles/mobile/IPhoneFeaturedWidget.css";

const FEATURED_PROJECTS: {
  title: string;
  subtitle: string;
  art: ProjectId;
  bgColor: string;
}[] = [
  {
    title: "UpStat",
    subtitle: "SaaS · Monitoramento · Em produção",
    art: "upstat",
    bgColor:
      "linear-gradient(135deg, #064e3b 0%, #047857 60%, #0f766e 100%)",
  },
  {
    title: "Pingoo",
    subtitle: "Mensageria · React · Spring Boot",
    art: "pingoo",
    bgColor:
      "linear-gradient(135deg, #15803d 0%, #16a34a 60%, #22c55e 100%)",
  },
  {
    title: "Martins Adviser",
    subtitle: "CRM Multicanal · Laravel · AWS",
    art: "martins",
    bgColor:
      "linear-gradient(135deg, #312e81 0%, #4f46e5 60%, #6366f1 100%)",
  },
];

const IPhoneFeaturedWidget = ({ onClick }: { onClick: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_PROJECTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = FEATURED_PROJECTS[currentIndex];

  return (
    <div className="iphone-featured-widget" onClick={onClick}>
      <div
        className="iphone-featured-widget-inner"
        style={{ background: current.bgColor }}
      >
        <div className="iphone-featured-top-wrap">
          <div
            className="iphone-featured-slider"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {FEATURED_PROJECTS.map((project) => (
              <div key={project.title} className="iphone-featured-slide">
                <div className="iphone-featured-top">
                  <div className="iphone-featured-art">
                    <ProjectArt id={project.art} />
                  </div>
                  <div className="iphone-featured-info">
                    <h3 className="iphone-featured-title">{project.title}</h3>
                    <p className="iphone-featured-artist">{project.subtitle}</p>
                  </div>
                  <span className="iphone-featured-cta">Abrir ↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="iphone-featured-divider" />
        <div className="iphone-featured-bottom">
          {FEATURED_PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className={`iphone-featured-item${
                i === currentIndex ? " active" : ""
              }`}
            >
              <div className="iphone-featured-thumb">
                <ProjectArt id={project.art} />
              </div>
              <span className="iphone-featured-item-label">
                {project.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <span className="iphone-featured-label">Projeto em Destaque</span>
    </div>
  );
};

export default IPhoneFeaturedWidget;
