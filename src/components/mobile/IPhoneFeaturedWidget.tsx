import img1 from "../../assets/project1.jpg";
import img2 from "../../assets/project4.jpg";
import img3 from "../../assets/project3.jpg";
import "./../../styles/mobile/IPhoneFeaturedWidget.css";

const IPhoneFeaturedWidget = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="iphone-featured-widget" onClick={onClick}>
      <div className="iphone-featured-widget-inner">
        <div className="iphone-featured-top">
          <div
            className="iphone-featured-art"
            style={{ backgroundImage: `url(${img1})` }}
          />
          <div className="iphone-featured-info">
            <h3 className="iphone-featured-title">Martins Adviser</h3>
            <p className="iphone-featured-artist">CRM · React · Laravel</p>
            <div className="iphone-featured-controls">
              <button className="iphone-featured-play">▶</button>
              <span className="iphone-featured-devices">⎚</span>
            </div>
          </div>
        </div>
        <div className="iphone-featured-divider" />
        <div className="iphone-featured-bottom">
          <div className="iphone-featured-item">
            <div
              className="iphone-featured-thumb"
              style={{ backgroundImage: `url(${img1})` }}
            />
            <span>Martins Adviser</span>
          </div>
          <div className="iphone-featured-item">
            <div
              className="iphone-featured-thumb"
              style={{ backgroundImage: `url(${img2})` }}
            />
            <span>Windows Simulator</span>
          </div>
          <div className="iphone-featured-item">
            <div
              className="iphone-featured-thumb"
              style={{ backgroundImage: `url(${img3})` }}
            />
            <span>Dashdark X</span>
          </div>
        </div>
      </div>
      <span className="iphone-featured-label">Projeto em Destaque</span>
    </div>
  );
};

export default IPhoneFeaturedWidget;
