import {
  FaRegFilePdf,
  FaFolder,
  FaRegStickyNote,
  FaGithub,
} from "react-icons/fa";
import "./../../styles/desktop/DesktopIcons.css";

interface DesktopIconsProps {
  onOpenNote: (title: string) => void;
}

const DesktopIcons: React.FC<DesktopIconsProps> = ({ onOpenNote }) => {
  const openPDF = () =>
    window.open("/assets/Curriculo Yago 2026 Att.pdf", "_blank");
  const openGitHub = () =>
    window.open("https://github.com/yagofontanez", "_blank");

  return (
    <div className="desktop-icons">
      <div className="desktop-icon" onClick={() => onOpenNote("Sobre Mim")}>
        <div className="desktop-icon-shape desktop-icon-note">
          <FaRegStickyNote />
        </div>
        <span className="desktop-icon-label">Sobre Mim</span>
      </div>

      <div className="desktop-icon" onClick={() => onOpenNote("Experiências")}>
        <div className="desktop-icon-shape desktop-icon-folder">
          <FaFolder />
        </div>
        <span className="desktop-icon-label">Experiências</span>
      </div>

      <div className="desktop-icon" onClick={openPDF}>
        <div className="desktop-icon-shape desktop-icon-pdf">
          <FaRegFilePdf />
        </div>
        <span className="desktop-icon-label">Currículo.pdf</span>
      </div>

      <div className="desktop-icon" onClick={openGitHub}>
        <div className="desktop-icon-shape desktop-icon-github">
          <FaGithub />
        </div>
        <span className="desktop-icon-label">GitHub</span>
      </div>
    </div>
  );
};

export default DesktopIcons;
