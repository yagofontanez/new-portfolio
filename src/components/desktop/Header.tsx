import { FaApple, FaBatteryFull, FaSearch, FaWifi } from "react-icons/fa";
import "./../../styles/desktop/Header.css";
import { GiToggles } from "react-icons/gi";
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
    { title: "Página Inicial", link: "/" },
    { title: "Experiências", link: "/experiences" },
    { title: "Sobre Mim", link: "/about-me" },
    { title: "Contato", link: "/contact" },
    { title: "Ajuda", link: "/help" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <FaApple className="header-icon" />
        <div className="header-navbar">
          <nav className="header-nav">
            {option.map((item, index) => {
              const isSelected = selected === item.title;
              return (
                <div
                  onClick={() => setSelected(item.title)}
                  key={index}
                  className={
                    isSelected ? "header-link-selected" : "header-link"
                  }
                >
                  {item.title}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="header-right">
        <div className="header-configs">
          <Tooltip title="Motivado sempre">
            <FaBatteryFull className="icon-config" />
          </Tooltip>
          <Tooltip title="Conectando com oportunidades">
            <FaWifi className="icon-config" />
          </Tooltip>
          <Tooltip title="Explore meu trabalho">
            <FaSearch className="icon-config" />
          </Tooltip>
          <Tooltip title="Meu jeito de trabalhar">
            <GiToggles className="icon-config" />
          </Tooltip>
        </div>
        <div className="header-hour">
          {formattedDate} {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default Header;
