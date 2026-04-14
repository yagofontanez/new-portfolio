import {
  FaWhatsapp,
  FaEnvelope,
  FaSafari,
  FaLinkedin,
} from "react-icons/fa";
import "./../../styles/mobile/IPhoneDock.css";

interface IPhoneDockProps {
  onContact: () => void;
}

const IPhoneDock: React.FC<IPhoneDockProps> = ({ onContact }) => {
  const openExternal = (url: string) => window.open(url, "_blank");

  return (
    <div className="iphone-dock">
      <button
        className="iphone-dock-app dock-whatsapp"
        onClick={() => openExternal("https://wa.me/5514982258397")}
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </button>
      <button
        className="iphone-dock-app dock-mail"
        onClick={onContact}
        aria-label="Mail"
      >
        <FaEnvelope />
      </button>
      <button
        className="iphone-dock-app dock-safari"
        onClick={() => openExternal("https://yagof-dev.netlify.app")}
        aria-label="Safari"
      >
        <FaSafari />
      </button>
      <button
        className="iphone-dock-app dock-linkedin"
        onClick={() => openExternal("https://linkedin.com/in/yagofontanez")}
        aria-label="LinkedIn"
      >
        <FaLinkedin />
      </button>
    </div>
  );
};

export default IPhoneDock;
