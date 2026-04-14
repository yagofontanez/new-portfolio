import {
  FaApple,
  FaBatteryFull,
  FaSearch,
  FaWifi,
  FaBluetoothB,
} from "react-icons/fa";
import "./../../styles/desktop/Header.css";
import { HiSwitchVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import type { HeaderProps } from "../../interfaces/interfaces";

const Header: React.FC<HeaderProps> = ({ selected, setSelected }) => {
  const [dateTime, setDateTime] = useState(new Date());

  const formattedDate = dateTime.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const formattedTime = dateTime.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const option = [
    { title: "Página Inicial" },
    { title: "Experiências" },
    { title: "Sobre Mim" },
    { title: "Contato" },
    { title: "Ajuda" },
  ];

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  const appName = selected === "Página Inicial" ? "Finder" : selected;

  return (
    <div className="header">
      <div className="header-left">
        <div className="header-apple-wrap">
          <FaApple className="header-icon" />
        </div>
        <span className="header-app-name">{appName}</span>
        <nav className="header-nav">
          {option.map((item, index) => {
            const isSelected = selected === item.title;
            return (
              <div
                onClick={() => setSelected(item.title)}
                key={index}
                className={isSelected ? "header-link-selected" : "header-link"}
              >
                {item.title}
              </div>
            );
          })}
        </nav>
      </div>
      <div className="header-right">
        <div className="header-configs">
          <Tooltip title="Bluetooth">
            <FaBluetoothB className="icon-config" />
          </Tooltip>
          <Tooltip title="Wi-Fi · Conectado">
            <FaWifi className="icon-config" />
          </Tooltip>
          <Tooltip title="Bateria 100% · Motivado sempre">
            <div className="header-battery">
              <FaBatteryFull className="icon-config" />
              <span className="header-battery-text">100%</span>
            </div>
          </Tooltip>
          <Tooltip title="Spotlight">
            <FaSearch className="icon-config" />
          </Tooltip>
          <Tooltip title="Central de Controle">
            <HiSwitchVertical className="icon-config" />
          </Tooltip>
        </div>
        <div className="header-hour">
          <span className="header-date">{formattedDate}</span>
          <span className="header-time">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
