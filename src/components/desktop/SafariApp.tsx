import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaRedo,
  FaShareAlt,
  FaLock,
  FaPlus,
  FaTimes,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { PROJECTS, findProjectBySlug } from "../../data/projects";
import type { ProjectFull } from "../../data/projects";
import ProjectArt from "../shared/ProjectArt";
import { useWindows } from "../../state/windows/WindowsContext";
import type { SafariPayload } from "../../state/windows/types";
import "./../../styles/desktop/SafariApp.css";

interface SafariAppProps {
  payload: SafariPayload;
}

interface Tab {
  id: string;
  label: string;
  url: string;
  kind: "home" | "project";
  projectSlug?: string;
}

const HOME_TAB: Tab = {
  id: "home",
  label: "Favoritos",
  url: "yago://favoritos",
  kind: "home",
};

const tabForProject = (p: ProjectFull): Tab => ({
  id: `project:${p.slug}`,
  label: p.title,
  url: p.link.replace(/^https?:\/\//, ""),
  kind: "project",
  projectSlug: p.slug,
});

const SafariApp = ({ payload }: SafariAppProps) => {
  const { openProject } = useWindows();
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const initial = payload.initialTab
      ? findProjectBySlug(payload.initialTab)
      : undefined;
    return initial ? [HOME_TAB, tabForProject(initial)] : [HOME_TAB];
  });
  const [activeId, setActiveId] = useState<string>(() => {
    const initial = payload.initialTab
      ? findProjectBySlug(payload.initialTab)
      : undefined;
    return initial ? `project:${initial.slug}` : "home";
  });
  const [history, setHistory] = useState<string[]>(["home"]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [reloading, setReloading] = useState(false);

  // Reage a novos opens com initialTab via openToken
  const lastTokenRef = useRef<number | undefined>(payload.openToken);
  useEffect(() => {
    if (!payload.openToken) return;
    if (lastTokenRef.current === payload.openToken) return;
    lastTokenRef.current = payload.openToken;
    if (!payload.initialTab) return;
    const proj = findProjectBySlug(payload.initialTab);
    if (!proj) return;
    const tab = tabForProject(proj);
    setTabs((prev) => (prev.find((t) => t.id === tab.id) ? prev : [...prev, tab]));
    goTo(tab.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload.openToken]);

  const activeTab = useMemo(
    () => tabs.find((t) => t.id === activeId) ?? HOME_TAB,
    [tabs, activeId],
  );

  const goTo = (id: string) => {
    setActiveId(id);
    setHistory((h) => [...h.slice(0, historyIdx + 1), id]);
    setHistoryIdx((i) => i + 1);
  };

  const canBack = historyIdx > 0;
  const canForward = historyIdx < history.length - 1;

  const goBack = () => {
    if (!canBack) return;
    const next = historyIdx - 1;
    setHistoryIdx(next);
    setActiveId(history[next]);
  };
  const goForward = () => {
    if (!canForward) return;
    const next = historyIdx + 1;
    setHistoryIdx(next);
    setActiveId(history[next]);
  };

  const reload = () => {
    setReloading(true);
    setTimeout(() => setReloading(false), 500);
  };

  const openProjectTab = (slug: string) => {
    const proj = findProjectBySlug(slug);
    if (!proj) return;
    const tab = tabForProject(proj);
    setTabs((prev) => (prev.find((t) => t.id === tab.id) ? prev : [...prev, tab]));
    goTo(tab.id);
  };

  const closeTab = (id: string) => {
    if (id === "home") return;
    setTabs((prev) => {
      const next = prev.filter((t) => t.id !== id);
      if (activeId === id) {
        const fallback = next[next.length - 1] ?? HOME_TAB;
        setActiveId(fallback.id);
      }
      return next;
    });
  };

  const addNewTab = () => {
    setActiveId("home");
  };

  const renderPage = () => {
    if (activeTab.kind === "home") {
      return (
        <div className="safari-page safari-home">
          <header className="safari-home-hero">
            <span className="safari-home-eyebrow">Favoritos</span>
            <h1>Projetos de Yago Fontanez</h1>
            <p>
              Clique em um cartão pra navegar pelo "site" do projeto. Cada um tem
              detalhes, stack, status e link pra produção.
            </p>
          </header>
          <div className="safari-home-grid">
            {PROJECTS.map((p) => (
              <button
                key={p.slug}
                type="button"
                className="safari-home-card"
                onClick={() => openProjectTab(p.slug)}
              >
                <div className="safari-home-card-art">
                  <ProjectArt id={p.art} />
                </div>
                <div className="safari-home-card-body">
                  <span className="safari-home-card-url">{p.link.replace(/^https?:\/\//, "")}</span>
                  <h3>{p.title}</h3>
                  <p>{p.subtitle}</p>
                  {p.status && (
                    <span
                      className="safari-status"
                      style={{ ["--c" as string]: p.status.color }}
                    >
                      <span className="safari-status-dot" />
                      {p.status.label}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    const proj = activeTab.projectSlug
      ? findProjectBySlug(activeTab.projectSlug)
      : undefined;
    if (!proj) return null;

    return (
      <div className={`safari-page safari-project${reloading ? " is-reloading" : ""}`}>
        <div className="safari-project-hero">
          <ProjectArt id={proj.art} />
          <div className="safari-project-hero-shade" />
          <div className="safari-project-hero-text">
            <span className="safari-project-eyebrow">{proj.subtitle}</span>
            <h1>{proj.title}</h1>
            {proj.status && (
              <span
                className="safari-status"
                style={{ ["--c" as string]: proj.status.color }}
              >
                <span className="safari-status-dot" />
                {proj.status.label}
              </span>
            )}
          </div>
        </div>
        <div className="safari-project-body">
          <p className="safari-project-desc">{proj.description}</p>
          <div className="safari-project-tags">
            {proj.tags.map((t) => (
              <span key={t} className="safari-project-tag">{t}</span>
            ))}
          </div>
          <div className="safari-project-actions">
            <a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="safari-btn safari-btn-primary"
            >
              <FaExternalLinkAlt /> Visitar site real
            </a>
            <button
              type="button"
              className="safari-btn"
              onClick={() => openProject(proj)}
            >
              Abrir como janela
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="safari-app">
      <div className="safari-toolbar">
        <div className="safari-toolbar-controls">
          <button
            type="button"
            className="safari-icon-btn"
            onClick={goBack}
            disabled={!canBack}
            aria-label="Voltar"
          >
            <FaArrowLeft />
          </button>
          <button
            type="button"
            className="safari-icon-btn"
            onClick={goForward}
            disabled={!canForward}
            aria-label="Avançar"
          >
            <FaArrowRight />
          </button>
          <button
            type="button"
            className="safari-icon-btn"
            onClick={reload}
            aria-label="Recarregar"
          >
            <FaRedo className={reloading ? "spin" : ""} />
          </button>
        </div>
        <div className="safari-urlbar">
          <FaLock className="safari-urlbar-lock" />
          <span className="safari-urlbar-url">{activeTab.url}</span>
        </div>
        <div className="safari-toolbar-controls">
          <button type="button" className="safari-icon-btn" aria-label="Compartilhar">
            <FaShareAlt />
          </button>
        </div>
      </div>
      <div className="safari-tabs">
        {tabs.map((t) => (
          <div
            key={t.id}
            className={`safari-tab${t.id === activeId ? " is-active" : ""}`}
            onClick={() => goTo(t.id)}
            role="button"
            tabIndex={0}
          >
            <span className="safari-tab-label">{t.label}</span>
            {t.id !== "home" && (
              <button
                type="button"
                className="safari-tab-close"
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(t.id);
                }}
                aria-label={`Fechar aba ${t.label}`}
              >
                <FaTimes />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="safari-tab-new"
          onClick={addNewTab}
          aria-label="Nova aba"
        >
          <FaPlus />
        </button>
      </div>
      <div className="safari-viewport">{renderPage()}</div>
    </div>
  );
};

export default SafariApp;
