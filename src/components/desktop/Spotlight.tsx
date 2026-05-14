import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import {
  FaTerminal,
  FaStickyNote,
  FaBriefcase,
  FaUser,
  FaEnvelope,
  FaQuestionCircle,
  FaGithub,
  FaLinkedin,
  FaRegFilePdf,
  FaCubes,
  FaHome,
  FaSafari,
} from "react-icons/fa";
import { useSpotlight } from "../../state/spotlight/SpotlightContext";
import { useWindows } from "../../state/windows/WindowsContext";
import { useFocusTrap } from "../../utils/useFocusTrap";
import { PROJECTS } from "../../data/projects";
import "./../../styles/desktop/Spotlight.css";

interface SpotlightItem {
  id: string;
  label: string;
  hint: string;
  kind: string;
  icon: ReactNode;
  action: () => void;
}

const Spotlight = () => {
  const { isOpen, close } = useSpotlight();
  const { openNotes, openProject, openTerminal, openSafari } = useWindows();
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  const items: SpotlightItem[] = useMemo(
    () => [
      {
        id: "home",
        label: "Página Inicial",
        hint: "Fechar tudo e voltar à tela",
        kind: "Nota",
        icon: <FaHome />,
        action: () => openNotes({ selectedNote: "Página Inicial" }),
      },
      {
        id: "note-sobre",
        label: "Sobre Mim",
        hint: "Dev fullstack · criador do UpStat",
        kind: "Nota",
        icon: <FaUser />,
        action: () => openNotes({ selectedNote: "Sobre Mim" }),
      },
      {
        id: "note-experiencias",
        label: "Experiências",
        hint: "Um Clique Digital · TDP · Designer",
        kind: "Nota",
        icon: <FaBriefcase />,
        action: () => openNotes({ selectedNote: "Experiências" }),
      },
      {
        id: "note-contato",
        label: "Contato",
        hint: "E-mail, WhatsApp, LinkedIn, GitHub",
        kind: "Nota",
        icon: <FaEnvelope />,
        action: () => openNotes({ selectedNote: "Contato" }),
      },
      {
        id: "note-ajuda",
        label: "Ajuda",
        hint: "Fale comigo diretamente",
        kind: "Nota",
        icon: <FaQuestionCircle />,
        action: () => openNotes({ selectedNote: "Ajuda" }),
      },
      ...PROJECTS.map<SpotlightItem>((p) => ({
        id: `project-${p.slug}`,
        label: p.title,
        hint: p.subtitle,
        kind: "Projeto",
        icon: <FaCubes />,
        action: () => openProject(p),
      })),
      {
        id: "app-safari",
        label: "Safari",
        hint: "Navegar pelos projetos",
        kind: "App",
        icon: <FaSafari />,
        action: () => openSafari(),
      },
      {
        id: "app-terminal",
        label: "Terminal",
        hint: "Abrir Terminal · ⌘T",
        kind: "App",
        icon: <FaTerminal />,
        action: () => openTerminal(),
      },
      {
        id: "app-notes",
        label: "Notas",
        hint: "Abrir app Notas",
        kind: "App",
        icon: <FaStickyNote />,
        action: () => openNotes({ selectedNote: "Página Inicial" }),
      },
      {
        id: "link-github",
        label: "GitHub",
        hint: "github.com/yagofontanez",
        kind: "Link",
        icon: <FaGithub />,
        action: () => window.open("https://github.com/yagofontanez", "_blank"),
      },
      {
        id: "link-linkedin",
        label: "LinkedIn",
        hint: "linkedin.com/in/yagofontanez",
        kind: "Link",
        icon: <FaLinkedin />,
        action: () => window.open("https://linkedin.com/in/yagofontanez", "_blank"),
      },
      {
        id: "link-cv",
        label: "Currículo (PDF)",
        hint: "Abrir em nova aba",
        kind: "Link",
        icon: <FaRegFilePdf />,
        action: () =>
          window.open("/assets/Curriculo Yago 2026 Att.pdf", "_blank"),
      },
    ],
    [openNotes, openProject, openTerminal, openSafari],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 8);
    const matches = items.filter((it) => {
      const hay = `${it.label} ${it.hint} ${it.kind}`.toLowerCase();
      return hay.includes(q);
    });
    return matches.slice(0, 8);
  }, [query, items]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector(".spotlight-row.is-active");
    if (el) (el as HTMLElement).scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  if (!isOpen) return null;

  const runActive = () => {
    const item = filtered[activeIdx];
    if (!item) return;
    item.action();
    close();
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runActive();
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  return (
    <div
      className="spotlight-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="spotlight" role="dialog" aria-modal="true" aria-label="Spotlight" ref={panelRef}>
        <div className="spotlight-search">
          <span className="spotlight-search-icon">⌘</span>
          <input
            ref={inputRef}
            className="spotlight-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Spotlight — busque projetos, notas, apps…"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        {filtered.length > 0 && (
          <div className="spotlight-list" ref={listRef}>
            {filtered.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`spotlight-row${idx === activeIdx ? " is-active" : ""}`}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => {
                  item.action();
                  close();
                }}
              >
                <span className="spotlight-row-icon">{item.icon}</span>
                <div className="spotlight-row-text">
                  <div className="spotlight-row-label">{item.label}</div>
                  <div className="spotlight-row-hint">{item.hint}</div>
                </div>
                <span className="spotlight-row-kind">{item.kind}</span>
              </button>
            ))}
          </div>
        )}
        {filtered.length === 0 && (
          <div className="spotlight-empty">Nenhum resultado para "{query}"</div>
        )}
      </div>
    </div>
  );
};

export default Spotlight;
