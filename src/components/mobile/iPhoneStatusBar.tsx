import { useEffect, useState } from "react";
import { FaSignal, FaWifi, FaBatteryFull } from "react-icons/fa";
import "./../../styles/mobile/iPhoneStatusBar.css";

const IPhoneStatusBar = () => {
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState(28);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if ("getBattery" in navigator) {
      (navigator as Navigator & { getBattery: () => Promise<{ level: number }> })
        .getBattery()
        .then((bat) => setBattery(Math.round(bat.level * 100)))
        .catch(() => {});
    }
  }, []);

  const formattedTime = time.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="iphone-status-bar">
      <span className="iphone-status-time">{formattedTime}</span>
      <div className="iphone-status-right">
        <FaSignal className="iphone-status-icon" />
        <FaWifi className="iphone-status-icon" />
        <FaBatteryFull className="iphone-status-icon iphone-status-battery" />
        <span className="iphone-status-battery-pct">{battery}</span>
      </div>
    </div>
  );
};

export default IPhoneStatusBar;
