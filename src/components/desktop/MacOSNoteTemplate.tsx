import React from "react";
import "./../../styles/desktop/MacOSNoteTemplate.css";

type MacOSNoteProps = {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
};

const MacOSNoteTemplate: React.FC<MacOSNoteProps> = ({
  title,
  children,
  onClose,
}) => {
  return (
    <div className="macos-note">
      <div className="macos-note-header">
        <div className="macos-note-buttons">
          <span className="close" onClick={onClose} />
          <span className="minimize" />
          <span className="maximize" />
        </div>
        <div className="macos-note-title">{title}</div>
      </div>
      <div className="macos-note-content">{children}</div>
    </div>
  );
};

export default MacOSNoteTemplate;
