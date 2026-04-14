import React from "react";
import "./../../styles/desktop/MacOSNoteTemplate.css";

interface NoteEntry {
  title: string;
  preview: string;
  icon: string;
}

interface MacOSNoteProps {
  title: string;
  selected: string;
  notes: NoteEntry[];
  onSelect: (title: string) => void;
  children: React.ReactNode;
  onClose?: () => void;
}

const MacOSNoteTemplate: React.FC<MacOSNoteProps> = ({
  title,
  selected,
  notes,
  onSelect,
  children,
  onClose,
}) => {
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

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
      <div className="macos-note-body">
        <aside className="macos-note-sidebar">
          <div className="macos-note-sidebar-section">
            <div className="macos-note-sidebar-head">iCloud</div>
            <div className="macos-note-sidebar-folder">
              <span className="macos-note-folder-icon">📁</span>
              <span>Notas</span>
              <span className="macos-note-folder-count">{notes.length}</span>
            </div>
          </div>
          <div className="macos-note-sidebar-divider" />
          <ul className="macos-note-list">
            {notes.map((note) => (
              <li
                key={note.title}
                onClick={() => onSelect(note.title)}
                className={`macos-note-list-item${
                  selected === note.title ? " selected" : ""
                }`}
              >
                <span className="macos-note-item-icon">{note.icon}</span>
                <div className="macos-note-item-body">
                  <div className="macos-note-item-title">{note.title}</div>
                  <div className="macos-note-item-meta">
                    <span className="macos-note-item-date">{today}</span>
                    <span className="macos-note-item-preview">
                      {note.preview}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </aside>
        <main className="macos-note-main">
          <div className="macos-note-toolbar">
            <span className="macos-note-toolbar-date">
              {today.toUpperCase()}
            </span>
          </div>
          <div className="macos-note-content">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MacOSNoteTemplate;
