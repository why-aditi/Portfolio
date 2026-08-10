import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiArrowUpRight, FiX } from "react-icons/fi";
import Band from "./SectionHead";
import { PROJECTS } from "../constants";
import { normalizeTech, useSpotlight } from "../lib/interaction";

function Links({ project, size = 15 }) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source on GitHub`}
          className="transition-colors hover:text-ink"
          style={{ color: "var(--muted)" }}
        >
          <FiGithub size={size} />
        </a>
      )}
      {project.liveDemo && (
        <a
          href={project.liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live demo`}
          className="transition-colors hover:text-ink"
          style={{ color: "var(--muted)" }}
        >
          <FiArrowUpRight size={size + 3} />
        </a>
      )}
    </div>
  );
}

function Thumb({ project, ratio, className = "" }) {
  return (
    // w-full/min-w-0 keep the box inside its grid track. Without them, the
    // featured card's lg:h-full lets aspect-ratio derive width from height,
    // which overflows the column and covers the copy beside it.
    <div
      className={`relative w-full min-w-0 overflow-hidden ${className}`}
      style={{ aspectRatio: ratio, background: "var(--raised)" }}
    >
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
      />
    </div>
  );
}

function TechRow({ tech, limit, activeKey }) {
  const shown = limit ? tech.slice(0, limit) : tech;
  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((t) => (
        <span key={t} className="badge" data-selected={activeKey === normalizeTech(t)}>
          {t}
        </span>
      ))}
      {limit && tech.length > limit && (
        <span className="badge" style={{ borderStyle: "dashed" }}>
          +{tech.length - limit}
        </span>
      )}
    </div>
  );
}

function ProjectCard({ project, activeKey }) {
  const ref = useSpotlight();

  return (
    <motion.article
      ref={ref}
      layout
      className="spotlight group flex flex-col overflow-hidden rounded-lg"
      style={{ border: "1px solid var(--rule)", background: "var(--raised)" }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Thumb project={project} ratio="16/9" />

      <div className="relative flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="t-h3">{project.title}</h3>
          <Links project={project} />
        </div>
        <p className="t-body text-sm">{project.description}</p>
        <div className="mt-auto pt-2">
          <TechRow tech={project.tech ?? []} limit={4} activeKey={activeKey} />
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ filter, onFilter }) {
  const activeKey = filter ? normalizeTech(filter) : null;

  // Filter chips ordered by how many projects use each tech — the most
  // representative stack surfaces first instead of alphabetical noise.
  const topTech = useMemo(() => {
    const counts = new Map();
    PROJECTS.forEach((p) =>
      p.tech?.forEach((t) => {
        const k = normalizeTech(t);
        const prev = counts.get(k);
        counts.set(k, { label: prev?.label ?? t, n: (prev?.n ?? 0) + 1 });
      })
    );
    return [...counts.values()].filter((c) => c.n > 1).sort((a, b) => b.n - a.n);
  }, []);

  const matches = useMemo(() => {
    if (!activeKey) return PROJECTS;
    return PROJECTS.filter((p) => p.tech?.some((t) => normalizeTech(t) === activeKey));
  }, [activeKey]);

  const [featured, ...rest] = matches;
  const showFeatured = !activeKey && featured;

  return (
    <Band
      id="projects"
      label="Work"
      title="Things I've built"
      // Counted from the data so the copy can't drift when a project is added.
      lede={`${PROJECTS.length} projects that made it past the prototype stage. Source is public on all of them.`}
    >
      <div className="mb-10 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onFilter(null)}
          className="badge badge-clickable"
          data-selected={!activeKey}
        >
          All ({PROJECTS.length})
        </button>
        {topTech.map(({ label, n }) => (
          <button
            key={label}
            type="button"
            onClick={() => onFilter(activeKey === normalizeTech(label) ? null : label)}
            className="badge badge-clickable"
            data-selected={activeKey === normalizeTech(label)}
          >
            {label} ({n})
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {activeKey && (
          <motion.p
            key="filter-status"
            className="mb-6 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em]"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span aria-live="polite">
              {matches.length} project{matches.length === 1 ? "" : "s"} using {filter}
            </span>
            <button
              type="button"
              onClick={() => onFilter(null)}
              className="inline-flex items-center gap-1 transition-colors hover:text-ink"
              style={{ color: "var(--accent)" }}
            >
              <FiX size={12} /> clear
            </button>
          </motion.p>
        )}
      </AnimatePresence>

      {showFeatured && (
        <article
          className="group mb-6 grid overflow-hidden rounded-lg lg:grid-cols-2"
          style={{ border: "1px solid var(--rule)" }}
        >
          {/* lg:h-full overrides the aspect ratio so the image matches the copy column's height */}
          <Thumb project={featured} ratio="16/10" className="lg:h-full" />

          <div className="flex flex-col gap-4 p-7 lg:p-9" style={{ background: "var(--raised)" }}>
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>
                Featured
              </span>
              <Links project={featured} size={16} />
            </div>

            <h3 className="t-h2" style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)" }}>
              {featured.title}
            </h3>

            <p className="t-body">{featured.description}</p>

            <ul className="flex flex-col gap-2.5">
              {featured.points?.map((pt, i) => (
                <li key={i} className="t-body flex gap-3 text-sm">
                  <span className="mt-[0.6em] h-px w-3 shrink-0" style={{ background: "var(--accent)" }} />
                  {pt}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-3">
              <TechRow tech={featured.tech ?? []} activeKey={activeKey} />
            </div>
          </div>
        </article>
      )}

      <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence>
          {(showFeatured ? rest : matches).map((project) => (
            <ProjectCard key={project.title} project={project} activeKey={activeKey} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Band>
  );
}
