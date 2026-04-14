import "./../../styles/shared/ProjectArt.css";

export type ProjectId = "upstat" | "pingoo" | "martins" | "tcc";

interface ProjectArtProps {
  id: ProjectId;
  rounded?: boolean;
  className?: string;
}

const UpStatArt = () => (
  <div className="project-art project-art-upstat">
    <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="upstat-line" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#34d399" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path
        d="M8 82 L28 62 L44 72 L60 38 L78 54 L96 22 L112 36"
        fill="none"
        stroke="url(#upstat-line)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [28, 62],
        [44, 72],
        [60, 38],
        [78, 54],
        [96, 22],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#fff" />
      ))}
      <circle cx="96" cy="22" r="9" fill="none" stroke="#fff" strokeWidth="2" opacity="0.6" />
    </svg>
    <div className="project-art-badge">UP</div>
  </div>
);

const PingooArt = () => (
  <div className="project-art project-art-pingoo">
    <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid meet">
      <path
        d="M30 30 Q22 30 22 40 L22 70 Q22 80 32 80 L50 80 L50 94 L68 80 L86 80 Q96 80 96 70 L96 40 Q96 30 86 30 Z"
        fill="#fff"
        opacity="0.96"
      />
      <circle cx="44" cy="55" r="4" fill="#16a34a" />
      <circle cx="60" cy="55" r="4" fill="#16a34a" />
      <circle cx="76" cy="55" r="4" fill="#16a34a" />
      <g opacity="0.55" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M14 24 Q10 28 14 32" />
        <path d="M8 20 Q2 28 8 36" />
        <path d="M106 24 Q110 28 106 32" />
        <path d="M112 20 Q118 28 112 36" />
      </g>
    </svg>
  </div>
);

const MartinsArt = () => (
  <div className="project-art project-art-martins">
    <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid meet">
      <g opacity="0.25" stroke="#fff" strokeWidth="1.5" fill="none">
        <circle cx="60" cy="60" r="18" />
        <circle cx="60" cy="60" r="32" />
        <circle cx="60" cy="60" r="46" />
      </g>
      <g fill="#fff">
        <circle cx="60" cy="28" r="6" />
        <circle cx="92" cy="60" r="6" />
        <circle cx="60" cy="92" r="6" />
        <circle cx="28" cy="60" r="6" />
      </g>
      <rect
        x="44"
        y="48"
        width="32"
        height="24"
        rx="4"
        fill="#fff"
      />
      <path
        d="M44 50 L60 64 L76 50"
        stroke="#4f46e5"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const TccArt = () => (
  <div className="project-art project-art-tcc">
    <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid meet">
      <g opacity="0.2" stroke="#fff" strokeWidth="1">
        <line x1="18" y1="88" x2="102" y2="88" />
        <line x1="18" y1="70" x2="102" y2="70" />
        <line x1="18" y1="52" x2="102" y2="52" />
      </g>
      <rect x="28" y="60" width="14" height="30" rx="2" fill="#fff" opacity="0.7" />
      <rect x="52" y="46" width="14" height="44" rx="2" fill="#fff" opacity="0.85" />
      <rect x="76" y="34" width="14" height="56" rx="2" fill="#fff" />
      <g transform="translate(83 24)">
        <polygon
          points="0,-10 3,-3 10,-3 4.5,1.5 6.5,8.5 0,4.5 -6.5,8.5 -4.5,1.5 -10,-3 -3,-3"
          fill="#fbbf24"
          stroke="#fff"
          strokeWidth="0.8"
        />
      </g>
      <text
        x="60"
        y="108"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#fff"
        opacity="0.85"
        letterSpacing="1"
      >
        TCC
      </text>
    </svg>
  </div>
);

const ART: Record<ProjectId, React.FC> = {
  upstat: UpStatArt,
  pingoo: PingooArt,
  martins: MartinsArt,
  tcc: TccArt,
};

const ProjectArt: React.FC<ProjectArtProps> = ({
  id,
  rounded = true,
  className,
}) => {
  const Art = ART[id];
  return (
    <div
      className={`project-art-wrap${rounded ? " rounded" : ""}${
        className ? " " + className : ""
      }`}
    >
      <Art />
    </div>
  );
};

export default ProjectArt;
