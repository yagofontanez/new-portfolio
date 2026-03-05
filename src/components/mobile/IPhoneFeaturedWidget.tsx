import { useState, useEffect } from "react";
import img1 from "../../assets/project1.jpg";
import img3 from "../../assets/project3.jpg";
import img4 from "../../assets/project4.jpg";
import "./../../styles/mobile/IPhoneFeaturedWidget.css";

const FEATURED_PROJECTS = [
  {
    title: "Martins Adviser",
    subtitle: "CRM · React · Laravel",
    image: img1,
    bgColor: "rgba(30, 58, 95, 0.85)",
  },
  {
    title: "Dashdark X",
    subtitle: "Dashboard · HTML · CSS · JS",
    image: img3,
    bgColor: "rgba(88, 28, 135, 0.85)",
  },
  {
    title: "Windows Simulator",
    subtitle: "Portfólio · React · i18n",
    image: img4,
    bgColor: "rgba(20, 83, 80, 0.85)",
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
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {FEATURED_PROJECTS.map((project) => (
              <div key={project.title} className="iphone-featured-slide">
                <div className="iphone-featured-top">
                  <div
                    className="iphone-featured-art"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="iphone-featured-info">
                    <h3 className="iphone-featured-title">{project.title}</h3>
                    <p className="iphone-featured-artist">{project.subtitle}</p>
                    <div className="iphone-featured-controls">
                      <button
                        type="button"
                        className="iphone-featured-play"
                        aria-label="Reproduzir"
                      >
                        ▶
                      </button>
                      <span className="iphone-featured-devices">⎚</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="iphone-featured-divider" />
        <div className="iphone-featured-bottom">
          {FEATURED_PROJECTS.map((project) => (
            <div key={project.title} className="iphone-featured-item">
              <div
                className="iphone-featured-thumb"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <span>{project.title}</span>
            </div>
          ))}
        </div>
      </div>
      <span className="iphone-featured-label">Projeto em Destaque</span>
    </div>
  );
};

export default IPhoneFeaturedWidget;
