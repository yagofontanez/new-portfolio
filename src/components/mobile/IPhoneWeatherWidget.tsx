import { useEffect, useState } from "react";
import "./../../styles/mobile/IPhoneWeatherWidget.css";

const IPhoneWeatherWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(i);
  }, []);

  const hour = time.getHours();
  const isNight = hour < 6 || hour >= 19;
  const icon = isNight ? "🌙" : "☀️";
  const temp = isNight ? 21 : 27;
  const cond = isNight ? "Céu limpo" : "Ensolarado";

  return (
    <div className="iphone-weather-widget">
      <div className="iphone-weather-inner">
        <div className="iphone-weather-top">
          <span className="iphone-weather-city">Bauru · SP</span>
          <span className="iphone-weather-now">Agora</span>
        </div>
        <div className="iphone-weather-main">
          <span className="iphone-weather-icon">{icon}</span>
          <span className="iphone-weather-temp">{temp}°</span>
        </div>
        <span className="iphone-weather-cond">{cond}</span>
        <div className="iphone-weather-range">
          <span>Mín. 19°</span>
          <span>Máx. 29°</span>
        </div>
      </div>
      <span className="iphone-widget-label">Tempo</span>
    </div>
  );
};

export default IPhoneWeatherWidget;
