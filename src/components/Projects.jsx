import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { PROJECTS } from "../constants";
import { GradientText } from "./ui/GradientText";

/** Rotating aspects so the masonry column feels varied like Pinterest. */
const IMAGE_ASPECTS = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-video",
  "aspect-[5/6]",
  "aspect-[4/5]",
  "aspect-square",
];

function ProjectCard({ project, variantIndex }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 28 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 28 });
  const aspect = IMAGE_ASPECTS[variantIndex % IMAGE_ASPECTS.length];

  function onMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateY.set(((e.clientX - cx) / rect.width) * 6);
    rotateX.set(-((e.clientY - cy) / rect.height) * 6);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: springX, rotateY: springY, perspective: 1200 }}
      className="group relative rounded-2xl overflow-hidden glass-card flex flex-col break-inside-avoid"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,15,0.92) 0%, transparent 55%)",
          }}
        />
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live demo"
              className="p-2 rounded-lg transition-colors pointer-events-auto"
              style={{ background: "rgba(214,2,112,0.85)", color: "#fff" }}
            >
              <FiExternalLink size={14} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg transition-colors pointer-events-auto"
              style={{ background: "rgba(0,0,0,0.75)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <FiGithub size={14} />
            </a>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-2.5 flex-1">
        <h3
          className="font-display text-base sm:text-lg font-bold leading-snug"
          style={{ color: "var(--text-primary)" }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-4" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech?.slice(0, 5).map((t) => (
            <span
              key={t}
              className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-full"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--glass-border)",
                color: "var(--text-secondary)",
              }}
            >
              {t}
            </span>
          ))}
          {project.tech && project.tech.length > 5 && (
            <span className="text-[10px] font-mono self-center" style={{ color: "var(--text-secondary)" }}>
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        <div
          className="flex items-center gap-4 pt-2 mt-auto"
          style={{ borderTop: "1px solid var(--glass-border)" }}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono transition-colors hover:opacity-80"
              style={{ color: "var(--pink-light)" }}
            >
              <FiGithub size={13} /> GitHub
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono transition-colors hover:opacity-80"
              style={{ color: "var(--blue-light)" }}
            >
              <FiExternalLink size={13} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <div className="py-24 border-b" style={{ borderColor: "var(--glass-border)" }}>
      <motion.div
        className="text-center mb-12 sm:mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <span
          className="text-xs font-mono uppercase tracking-widest mb-3 block"
          style={{ color: "var(--pink)" }}
        >
          Portfolio
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
          Things I&apos;ve <GradientText>built</GradientText>{" "}
          <motion.span
            className="inline-block"
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦
          </motion.span>
        </h2>
        <motion.div
          className="gradient-underline mx-auto mt-3"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />
      </motion.div>

      {/* Pinterest-style masonry (CSS columns) */}
      <div
        className="w-full columns-1 sm:columns-2 xl:columns-3 [column-gap:1rem] sm:[column-gap:1.5rem] xl:[column-gap:2rem]"
      >
        {PROJECTS.map((project, i) => (
          <div key={project.title} className="break-inside-avoid mb-5 sm:mb-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
            >
              <ProjectCard project={project} variantIndex={i} />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
