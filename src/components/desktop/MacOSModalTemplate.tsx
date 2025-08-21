import React from "react";
import "./../../styles/desktop/MacOSModalTemplate.css";
import type { MacOSModalTemplateProps } from "../../interfaces/interfaces";

const MacOSModalTemplate: React.FC<MacOSModalTemplateProps> = ({
  title,
  children,
  onClose,
}) => {
  return (
    <div className="macos-modal">
      <div className="macos-modal-header">
        <div className="macos-modal-buttons">
          <span className="close" onClick={onClose} />
          <span className="minimize" />
          <span className="maximize" />
        </div>
        <div className="macos-modal-title">{title}</div>
      </div>
      <div className="macos-modal-content">{children}</div>
    </div>
  );
};

export default MacOSModalTemplate;
