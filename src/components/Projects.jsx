import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { PROJECTS } from "../constants";

function FeaturedCard({ project }) {
  return (
    <motion.div
      className="card overflow-hidden mb-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ minHeight: 280 }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover absolute inset-0"
          />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background: "linear-gradient(to right, transparent 60%, var(--surface-card))",
            }}
          />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="section-label" style={{ marginBottom: 0 }}>Featured</span>
            <div className="flex gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                  className="transition-opacity hover:opacity-50" style={{ color: "var(--text-muted)" }}>
                  <FiGithub size={16} />
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" aria-label="Live demo"
                  className="transition-opacity hover:opacity-50" style={{ color: "var(--text-muted)" }}>
                  <FiExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          <h3
            className="font-display leading-tight"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--text)" }}
          >
            {project.title}
          </h3>

          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {project.description}
          </p>

          {project.points?.length > 0 && (
            <ul className="flex flex-col gap-2">
              {project.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ background: "var(--copper)" }} />
                  {pt}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {project.tech?.map((t) => (
              <span key={t} className="font-mono text-[11px] px-2 py-0.5 rounded"
                style={{ background: "var(--surface-alt)", border: "1px solid var(--rule)", color: "var(--text-muted)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, delay }) {
  return (
    <motion.div
      className="card card-hover flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display leading-snug"
            style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)", color: "var(--text)" }}>
            {project.title}
          </h3>
          <div className="flex gap-2 shrink-0 mt-0.5">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="transition-opacity hover:opacity-50" style={{ color: "var(--text-muted)" }}>
                <FiGithub size={15} />
              </a>
            )}
            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" aria-label="Live demo"
                className="transition-opacity hover:opacity-50" style={{ color: "var(--text-muted)" }}>
                <FiExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--text-muted)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
          {project.tech?.slice(0, 4).map((t) => (
            <span key={t} className="font-mono text-[11px] px-2 py-0.5 rounded"
              style={{ background: "var(--surface-alt)", border: "1px solid var(--rule)", color: "var(--text-muted)" }}>
              {t}
            </span>
          ))}
          {project.tech && project.tech.length > 4 && (
            <span className="font-mono text-[11px] self-center" style={{ color: "var(--text-muted)" }}>
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [featured, ...rest] = PROJECTS;

  return (
    <div className="py-24 border-b" style={{ borderColor: "var(--rule)" }}>
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-label">Projects</span>
        <h2
          className="font-display leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)" }}
        >
          Things I&apos;ve built
        </h2>
      </motion.div>

      <FeaturedCard project={featured} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {rest.map((project, i) => (
          <ProjectCard key={project.title} project={project} delay={(i % 3) * 0.07} />
        ))}
      </div>
    </div>
  );
}
