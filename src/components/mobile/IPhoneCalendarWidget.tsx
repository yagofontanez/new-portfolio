import { useState, useEffect } from "react";
import "./../../styles/mobile/IPhoneCalendarWidget.css";

const IPhoneCalendarWidget = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const weekday = date.toLocaleDateString("pt-BR", { weekday: "short" });
  const month = date.toLocaleDateString("pt-BR", { month: "short" });
  const day = date.getDate();

  return (
    <div className="iphone-calendar-widget">
      <div className="iphone-calendar-widget-inner">
        <div className="iphone-calendar-header">
          <span className="iphone-calendar-weekday">{weekday}</span>
          <span className="iphone-calendar-month"> {month}</span>
        </div>
        <div className="iphone-calendar-day">{day}</div>
      </div>
      <span className="iphone-calendar-label">Calendário</span>
    </div>
  );
};

export default IPhoneCalendarWidget;
