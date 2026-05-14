import type { ProjectFull } from "../../data/projects";
import ProjectArt from "../shared/ProjectArt";

interface ProjectAppProps {
  project: ProjectFull;
}

const ProjectApp = ({ project }: ProjectAppProps) => {
  return (
    <div className="project-modal-content">
      <div className="project-image">
        <ProjectArt id={project.art} />
      </div>
      <div className="project-info">
        <div className="project-info-head">
          <span className="project-subtitle">{project.subtitle}</span>
          {project.status && (
            <span
              className="project-status"
              style={{ ["--c" as string]: project.status.color }}
            >
              <span className="project-status-dot" />
              {project.status.label}
            </span>
          )}
        </div>
        <h2 className="project-title">{project.title}</h2>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((t) => (
            <span key={t} className="project-tag">{t}</span>
          ))}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          Abrir projeto ↗
        </a>
      </div>
    </div>
  );
};

export default ProjectApp;
