import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import { useWindows } from "../../state/windows/WindowsContext";
import { PROJECTS, findProjectBySlug } from "../../data/projects";
import "./../../styles/desktop/TerminalApp.css";

type HistoryEntry =
  | { kind: "prompt"; text: string }
  | { kind: "output"; node: ReactNode }
  | { kind: "error"; text: string };

const NOTE_FILES: Record<string, string> = {
  "about.md": "sobre",
  "sobre.md": "sobre",
  "experiencias.md": "experiencias",
  "experiences.md": "experiencias",
  "contato.md": "contato",
  "contact.md": "contato",
  "ajuda.md": "ajuda",
  "help.md": "ajuda",
};

const NOTE_TO_TITLE: Record<string, string> = {
  sobre: "Sobre Mim",
  experiencias: "Experiências",
  contato: "Contato",
  ajuda: "Ajuda",
};

const FILE_PREVIEWS: Record<string, string> = {
  sobre: `Yago Henrique Fontanez
Desenvolvedor Fullstack · Design & UX
ITE Bauru · Sistemas de Informação

Construo produtos com React, TypeScript, Node.js, Laravel e Python.
Criador do UpStat — SaaS de monitoramento de uptime em produção.

Dica: 'open notes sobre' abre o app Notas nessa entrada.`,
  experiencias: `1. Um Clique Digital — fullstack
2. TDP Sistemas — desenvolvimento
3. Designer Gráfico — período anterior

Detalhes completos: 'open notes experiencias'.`,
  contato: `email     dev.yagofontanez@gmail.com
linkedin  linkedin.com/in/yagofontanez
github    github.com/yagofontanez
whatsapp  +55 14 98225-8397

Mais opções: 'open notes contato'.`,
  ajuda: `Este é um terminal-portfolio interativo.
Digite 'help' para ver os comandos.
Setas ↑ ↓ navegam no histórico.`,
};

const PROMPT = "yago@portfolio";

const WELCOME: HistoryEntry[] = [
  {
    kind: "output",
    node: (
      <pre className="terminal-banner">
{`╭────────────────────────────────────────────╮
│   yago@portfolio · macOS portfolio v1.0    │
│   bem-vindo(a) — digite "help" pra começar │
╰────────────────────────────────────────────╯`}
      </pre>
    ),
  },
];

const HELP_TABLE = (
  <table className="terminal-help">
    <tbody>
      <tr><td>help</td><td>lista os comandos</td></tr>
      <tr><td>whoami</td><td>quem é o dev</td></tr>
      <tr><td>ls [projects|files]</td><td>lista projetos e/ou arquivos</td></tr>
      <tr><td>cat &lt;arquivo&gt;</td><td>about.md, experiencias.md, contato.md, ajuda.md</td></tr>
      <tr><td>open &lt;app&gt;</td><td>upstat · pingoo · martins · tcc · notes [nota] · safari [slug]</td></tr>
      <tr><td>date</td><td>data e hora agora</td></tr>
      <tr><td>echo &lt;texto&gt;</td><td>ecoa o texto</td></tr>
      <tr><td>clear</td><td>limpa a tela (Ctrl+L)</td></tr>
      <tr><td>exit</td><td>fecha o terminal</td></tr>
    </tbody>
  </table>
);

const TerminalApp = () => {
  const { openNotes, openProject, openSafari, close, windows } = useWindows();
  const [history, setHistory] = useState<HistoryEntry[]>(WELCOME);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const push = (entry: HistoryEntry) =>
    setHistory((h) => [...h, entry]);

  const output = (node: ReactNode) => push({ kind: "output", node });
  const err = (text: string) => push({ kind: "error", text });

  const isTerminalFocused = () =>
    document.activeElement === inputRef.current;

  useEffect(() => {
    // mantém foco quando se clica em qualquer área do terminal
    const el = scrollRef.current?.parentElement;
    if (!el) return;
    const refocus = () => {
      if (!isTerminalFocused()) inputRef.current?.focus();
    };
    el.addEventListener("click", refocus);
    return () => el.removeEventListener("click", refocus);
  }, []);

  const runCommand = (raw: string) => {
    const parts = raw.trim().split(/\s+/);
    const cmd = parts[0]?.toLowerCase() ?? "";
    const args = parts.slice(1);

    switch (cmd) {
      case "":
        return;

      case "help":
        output(HELP_TABLE);
        return;

      case "whoami":
        output("Yago Henrique Fontanez · Dev Fullstack · ITE Bauru");
        return;

      case "ls":
      case "ll": {
        const target = args[0]?.toLowerCase();
        if (!target || target === "all") {
          output(
            <div>
              <div className="terminal-dim">projects/</div>
              <div>{PROJECTS.map((p) => p.slug).join("  ")}</div>
              <div className="terminal-dim" style={{ marginTop: 6 }}>files/</div>
              <div>about.md  experiencias.md  contato.md  ajuda.md</div>
            </div>,
          );
        } else if (target === "projects" || target === "projects/") {
          output(PROJECTS.map((p) => p.slug).join("  "));
        } else if (target === "files" || target === "files/") {
          output("about.md  experiencias.md  contato.md  ajuda.md");
        } else {
          err(`ls: cannot access '${target}': No such file or directory`);
        }
        return;
      }

      case "cat": {
        if (args.length === 0) {
          err("cat: missing operand");
          return;
        }
        const file = args[0].toLowerCase();
        const key = NOTE_FILES[file];
        if (!key) {
          err(`cat: ${args[0]}: No such file or directory`);
          return;
        }
        output(<pre className="terminal-text">{FILE_PREVIEWS[key]}</pre>);
        return;
      }

      case "open": {
        if (args.length === 0) {
          err("open: missing operand. Use 'open <app>'.");
          return;
        }
        const target = args[0].toLowerCase();

        if (target === "terminal") {
          output("Terminal já está aberto.");
          return;
        }

        if (target === "safari") {
          const slug = args[1]?.toLowerCase();
          openSafari(slug ? { initialTab: slug } : undefined);
          output(`Abrindo Safari${slug ? ` → ${slug}` : ""}…`);
          return;
        }

        if (target === "notes") {
          const noteKey = args[1]?.toLowerCase();
          const noteTitle = noteKey
            ? NOTE_TO_TITLE[noteKey] ?? null
            : "Página Inicial";
          if (noteKey && !noteTitle) {
            err(`open: nota não encontrada: ${args[1]}`);
            return;
          }
          openNotes({ selectedNote: noteTitle ?? "Página Inicial" });
          output(`Abrindo Notas${noteTitle && noteTitle !== "Página Inicial" ? ` → ${noteTitle}` : ""}…`);
          return;
        }

        const project = findProjectBySlug(target);
        if (!project) {
          err(`open: app não encontrado: ${args[0]}. Tente 'ls projects'.`);
          return;
        }
        openProject(project);
        output(`Abrindo ${project.title}…`);
        return;
      }

      case "date":
        output(new Date().toLocaleString("pt-BR"));
        return;

      case "echo":
        output(args.join(" "));
        return;

      case "clear":
        setHistory([]);
        return;

      case "history":
        output(
          <div>
            {cmdHistory.map((h, i) => (
              <div key={i}>
                <span className="terminal-dim">{String(i + 1).padStart(3, " ")}</span>  {h}
              </div>
            ))}
          </div>,
        );
        return;

      case "exit":
      case "quit":
        close("terminal");
        return;

      default:
        err(`zsh: command not found: ${cmd}`);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const raw = input;
    push({ kind: "prompt", text: raw });
    if (raw.trim()) {
      setCmdHistory((h) => [...h, raw]);
    }
    setHistoryIdx(-1);
    runCommand(raw);
    setInput("");
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "l" || e.key === "L") && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([]);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const next = historyIdx + 1;
      if (next >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(cmdHistory[next]);
      }
    }
  };

  // se a janela do terminal foi fechada, este componente desmonta — nada a fazer
  void windows;

  return (
    <div className="terminal-app">
      <div className="terminal-scroll" ref={scrollRef}>
        {history.map((entry, idx) => {
          if (entry.kind === "prompt") {
            return (
              <div key={idx} className="terminal-line">
                <span className="terminal-prompt">{PROMPT}</span>
                <span className="terminal-prompt-sep">:</span>
                <span className="terminal-path">~</span>
                <span className="terminal-prompt-sep">$</span>{" "}
                <span className="terminal-cmd">{entry.text}</span>
              </div>
            );
          }
          if (entry.kind === "error") {
            return (
              <div key={idx} className="terminal-error">
                {entry.text}
              </div>
            );
          }
          return (
            <div key={idx} className="terminal-output">
              {entry.node}
            </div>
          );
        })}
        <form className="terminal-line terminal-input-line" onSubmit={handleSubmit}>
          <span className="terminal-prompt">{PROMPT}</span>
          <span className="terminal-prompt-sep">:</span>
          <span className="terminal-path">~</span>
          <span className="terminal-prompt-sep">$</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal"
          />
        </form>
      </div>
    </div>
  );
};

export default TerminalApp;
