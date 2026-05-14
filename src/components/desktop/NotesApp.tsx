import { notesData } from "../../mock";
import "./../../styles/desktop/MacOSNoteTemplate.css";

interface NotesAppProps {
  selectedNote: string;
  onSelectNote: (title: string) => void;
}

const NOTE_META: Record<string, { icon: string; preview: string }> = {
  Experiências: {
    icon: "💼",
    preview: "Um Clique Digital · TDP Sistemas · Designer",
  },
  "Sobre Mim": {
    icon: "👋",
    preview: "Dev fullstack · criador do UpStat · ITE Bauru",
  },
  Contato: { icon: "✉️", preview: "E-mail, WhatsApp, LinkedIn e mais" },
  Ajuda: { icon: "💬", preview: "Fale comigo diretamente" },
};

const NotesApp = ({ selectedNote, onSelectNote }: NotesAppProps) => {
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const noteEntries = notesData.map((n) => ({
    title: n.title,
    icon: NOTE_META[n.title]?.icon ?? "📝",
    preview: NOTE_META[n.title]?.preview ?? "",
  }));

  const currentNote = notesData.find((n) => n.title === selectedNote);

  return (
    <div className="macos-note-body">
      <aside className="macos-note-sidebar">
        <div className="macos-note-sidebar-section">
          <div className="macos-note-sidebar-head">iCloud</div>
          <div className="macos-note-sidebar-folder">
            <span className="macos-note-folder-icon">📁</span>
            <span>Notas</span>
            <span className="macos-note-folder-count">{noteEntries.length}</span>
          </div>
        </div>
        <div className="macos-note-sidebar-divider" />
        <ul className="macos-note-list">
          {noteEntries.map((note) => (
            <li
              key={note.title}
              onClick={() => onSelectNote(note.title)}
              className={`macos-note-list-item${
                selectedNote === note.title ? " selected" : ""
              }`}
            >
              <span className="macos-note-item-icon">{note.icon}</span>
              <div className="macos-note-item-body">
                <div className="macos-note-item-title">{note.title}</div>
                <div className="macos-note-item-meta">
                  <span className="macos-note-item-date">{today}</span>
                  <span className="macos-note-item-preview">{note.preview}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
      <main className="macos-note-main">
        <div className="macos-note-toolbar">
          <span className="macos-note-toolbar-date">{today.toUpperCase()}</span>
        </div>
        <div className="macos-note-content">{currentNote?.content}</div>
      </main>
    </div>
  );
};

export default NotesApp;
