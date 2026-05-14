import { useState } from "react";
import { FaChevronDown, FaCheckCircle } from "react-icons/fa";
import { EXPERIENCES } from "../../data/experiences";
import "./../../styles/desktop/ExperienceTimeline.css";

const ExperienceTimeline = () => {
  const [expanded, setExpanded] = useState<Set<number>>(
    () => new Set([0]),
  );

  const toggle = (idx: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });

  return (
    <div className="exp-timeline">
      <header className="exp-timeline-head">
        <span className="exp-timeline-eyebrow">Trajetória profissional</span>
        <h2 className="exp-timeline-title">+2 anos construindo produtos</h2>
        <p className="exp-timeline-lead">
          De Designer Gráfico a Desenvolvedor Fullstack — combinando olhar de
          design com engenharia de software. Clique nos cards pra expandir.
        </p>
      </header>

      <div className="exp-timeline-list">
        {EXPERIENCES.map((exp, idx) => {
          const isOpen = expanded.has(idx);
          return (
            <article
              key={`${exp.company}-${idx}`}
              className={`exp-timeline-item${isOpen ? " is-open" : ""}${
                exp.current ? " is-current" : ""
              }`}
            >
              <div className="exp-timeline-rail">
                <span className="exp-timeline-dot">
                  {exp.current && <span className="exp-timeline-dot-ring" />}
                </span>
              </div>
              <div className="exp-timeline-content">
                <button
                  type="button"
                  className="exp-timeline-head-row"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <div className="exp-timeline-head-text">
                    <span className="exp-timeline-period">{exp.period}</span>
                    <h3 className="exp-timeline-role">{exp.role}</h3>
                    <span className="exp-timeline-company">
                      {exp.company} · {exp.location}
                    </span>
                  </div>
                  <span className="exp-timeline-chevron">
                    <FaChevronDown />
                  </span>
                </button>

                <div className="exp-timeline-collapse">
                  <ul className="exp-timeline-achievements">
                    {exp.achievements.map((a, i) => (
                      <li key={i}>
                        <FaCheckCircle className="exp-timeline-check" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="exp-timeline-stack">
                    {exp.stack.map((s) => (
                      <span key={s} className="exp-timeline-tag">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
