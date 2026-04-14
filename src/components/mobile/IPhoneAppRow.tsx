import {
  FaWhatsapp,
  FaEnvelope,
  FaSafari,
  FaLinkedin,
} from "react-icons/fa";
import "./../../styles/mobile/IPhoneAppRow.css";

interface IPhoneAppRowProps {
  onContact: () => void;
}

const IPhoneAppRow: React.FC<IPhoneAppRowProps> = ({ onContact }) => {
  const openExternal = (url: string) => window.open(url, "_blank");

  const apps = [
    {
      label: "WhatsApp",
      icon: <FaWhatsapp />,
      bg: "linear-gradient(135deg, #4ade80 0%, #16a34a 100%)",
      onClick: () => openExternal("https://wa.me/5514982258397"),
    },
    {
      label: "Mail",
      icon: <FaEnvelope />,
      bg: "linear-gradient(135deg, #4facfe 0%, #1e7ce8 100%)",
      onClick: onContact,
    },
    {
      label: "Safari",
      icon: <FaSafari />,
      bg: "radial-gradient(circle at 30% 30%, #77b9ff, #0a66c2 70%)",
      onClick: () => openExternal("https://yagof-dev.netlify.app"),
    },
    {
      label: "LinkedIn",
      icon: <FaLinkedin />,
      bg: "linear-gradient(135deg, #2196f3 0%, #0a66c2 100%)",
      onClick: () =>
        openExternal("https://linkedin.com/in/yagofontanez"),
    },
  ];

  return (
    <div className="iphone-app-row">
      {apps.map((app) => (
        <button
          key={app.label}
          className="iphone-app-row-item"
          onClick={app.onClick}
          aria-label={app.label}
        >
          <span className="iphone-app-row-icon" style={{ background: app.bg }}>
            {app.icon}
          </span>
          <span className="iphone-app-row-label">{app.label}</span>
        </button>
      ))}
    </div>
  );
};

export default IPhoneAppRow;
