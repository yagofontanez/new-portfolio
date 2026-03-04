import { useEffect } from "react";
import "./../../styles/mobile/iPhoneSheet.css";

interface IPhoneSheetProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const IPhoneSheet: React.FC<IPhoneSheetProps> = ({
  title,
  children,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="iphone-sheet-overlay" onClick={onClose} />
      <div className="iphone-sheet">
        <div className="iphone-sheet-handle" />
        <div className="iphone-sheet-header">
          <button className="iphone-sheet-close" onClick={onClose}>
            Concluído
          </button>
          <h2 className="iphone-sheet-title">{title}</h2>
          <div className="iphone-sheet-spacer" />
        </div>
        <div className="iphone-sheet-content">{children}</div>
      </div>
    </>
  );
};

export default IPhoneSheet;
