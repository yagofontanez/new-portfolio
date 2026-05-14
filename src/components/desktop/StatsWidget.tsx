import { useEffect, useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";
import "./../../styles/desktop/StatsWidget.css";

const USERNAME = "yagofontanez";
const WEEKS = 12;
const DAY_MS = 24 * 60 * 60 * 1000;

interface Profile {
  avatar_url: string;
  name: string | null;
  login: string;
  public_repos: number;
  followers: number;
}

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionsResponse {
  total: Record<string, number>;
  contributions: Contribution[];
}

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

const StatsWidget = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [contribs, setContribs] = useState<Record<string, Contribution>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        signal: controller.signal,
        headers: { Accept: "application/vnd.github+json" },
      }),
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
        { signal: controller.signal },
      ),
    ])
      .then(async ([profRes, contribRes]) => {
        if (!profRes.ok || !contribRes.ok) {
          throw new Error(`HTTP ${profRes.status}/${contribRes.status}`);
        }
        const prof: Profile = await profRes.json();
        const contribData: ContributionsResponse = await contribRes.json();
        const map: Record<string, Contribution> = {};
        for (const c of contribData.contributions) {
          map[c.date] = c;
        }
        setProfile(prof);
        setContribs(map);
        setLoading(false);
      })
      .catch((e: unknown) => {
        if ((e as Error).name === "AbortError") return;
        setError("offline");
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const matrix = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = WEEKS * 7;
    const start = new Date(today.getTime() - (days - 1) * DAY_MS);
    start.setDate(start.getDate() - start.getDay());
    const weeks: { date: Date; key: string }[][] = [];
    let cursor = new Date(start);
    while (weeks.length < WEEKS) {
      const week: { date: Date; key: string }[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(cursor);
        week.push({ date, key: dayKey(date) });
        cursor = new Date(cursor.getTime() + DAY_MS);
      }
      weeks.push(week);
    }
    return weeks;
  }, []);

  const totals = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let d7 = 0;
    let d30 = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date(today.getTime() - i * DAY_MS);
      const c = contribs[dayKey(d)]?.count ?? 0;
      d30 += c;
      if (i < 7) d7 += c;
    }
    return { d7, d30 };
  }, [contribs]);

  return (
    <aside className="stats-widget" aria-label="Atividade no GitHub">
      <header className="stats-widget-head">
        <div className="stats-widget-avatar">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="" loading="lazy" />
          ) : (
            <FaGithub />
          )}
        </div>
        <div className="stats-widget-head-text">
          <span className="stats-widget-name">
            {profile?.name ?? "Yago Fontanez"}
          </span>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="stats-widget-login"
          >
            @{USERNAME}
          </a>
        </div>
        <FaGithub className="stats-widget-mark" />
      </header>

      <div className="stats-widget-numbers">
        <div className="stats-widget-num">
          <span className="stats-widget-num-value">
            {loading ? "—" : totals.d7}
          </span>
          <span className="stats-widget-num-label">contrib · 7d</span>
        </div>
        <div className="stats-widget-num">
          <span className="stats-widget-num-value">
            {loading ? "—" : totals.d30}
          </span>
          <span className="stats-widget-num-label">contrib · 30d</span>
        </div>
        <div className="stats-widget-num">
          <span className="stats-widget-num-value">
            {loading ? "—" : profile?.public_repos ?? "—"}
          </span>
          <span className="stats-widget-num-label">repos</span>
        </div>
      </div>

      <div className="stats-widget-heatmap" aria-hidden="true">
        {matrix.map((week, wi) => (
          <div key={wi} className="stats-widget-week">
            {week.map(({ key }) => {
              const c = contribs[key];
              const lvl = c?.level ?? 0;
              return (
                <span
                  key={key}
                  className={`stats-widget-cell lvl-${lvl}`}
                  title={`${c?.count ?? 0} contrib em ${key}`}
                />
              );
            })}
          </div>
        ))}
      </div>

      <footer className="stats-widget-foot">
        {error
          ? "Dados indisponíveis (offline ou rate limit)"
          : `últimas ${WEEKS} semanas · GitHub`}
      </footer>
    </aside>
  );
};

export default StatsWidget;
