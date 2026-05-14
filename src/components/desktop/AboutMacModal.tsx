import { useEffect, useRef } from "react";
import { FaApple } from "react-icons/fa";
import { useFocusTrap } from "../../utils/useFocusTrap";
import "./../../styles/desktop/AboutMacModal.css";

interface AboutMacModalProps {
  onClose: () => void;
}

const AboutMacModal = ({ onClose }: AboutMacModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="about-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="about-modal" role="dialog" aria-modal="true" aria-label="Sobre este Mac" ref={modalRef}>
        <div className="about-apple">
          <FaApple />
        </div>
        <h2 className="about-title">macOS Portfolio</h2>
        <span className="about-version">Edição Yago · v1.0</span>
        <div className="about-meta">
          <div>
            <span className="about-meta-label">Desenvolvedor</span>
            <span className="about-meta-value">Yago Henrique Fontanez</span>
          </div>
          <div>
            <span className="about-meta-label">Stack</span>
            <span className="about-meta-value">React · TypeScript · Vite</span>
          </div>
          <div>
            <span className="about-meta-label">Formação</span>
            <span className="about-meta-value">ITE Bauru · Sistemas de Informação</span>
          </div>
          <div>
            <span className="about-meta-label">Contato</span>
            <span className="about-meta-value">
              <a href="mailto:dev.yagofontanez@gmail.com">
                dev.yagofontanez@gmail.com
              </a>
            </span>
          </div>
        </div>
        <p className="about-tip">
          Dica: pressione <kbd>⌘</kbd>+<kbd>Space</kbd> para abrir o Spotlight.
        </p>
        <button type="button" className="about-ok" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default AboutMacModal;
