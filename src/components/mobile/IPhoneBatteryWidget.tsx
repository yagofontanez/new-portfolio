import { useState, useEffect } from "react";
import "./../../styles/mobile/IPhoneBatteryWidget.css";

const IPhoneBatteryWidget = () => {
  const [battery, setBattery] = useState(28);

  useEffect(() => {
    if ("getBattery" in navigator) {
      (navigator as Navigator & { getBattery: () => Promise<{ level: number }> })
        .getBattery()
        .then((bat) => {
          setBattery(Math.round(bat.level * 100));
        })
        .catch(() => {});
    }
  }, []);

  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (battery / 100) * circumference;

  return (
    <div className="iphone-battery-widget">
      <div className="iphone-battery-widget-inner">
        <div className="iphone-battery-main">
          <div className="iphone-battery-ring-wrap">
            <svg className="iphone-battery-ring" viewBox="0 0 100 100">
            <circle
              className="iphone-battery-ring-bg"
              cx="50"
              cy="50"
              r="42"
              fill="none"
              strokeWidth="5"
            />
            <circle
              className="iphone-battery-ring-fill"
              cx="50"
              cy="50"
              r="42"
              fill="none"
              strokeWidth="5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="iphone-battery-phone-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <span className="iphone-battery-percent">{battery}%</span>
        </div>
        <div className="iphone-battery-devices">
          <div className="iphone-battery-device-circle" />
          <div className="iphone-battery-device-circle" />
          <div className="iphone-battery-device-circle" />
        </div>
      </div>
      <span className="iphone-battery-label">Baterias</span>
    </div>
  );
};

export default IPhoneBatteryWidget;
