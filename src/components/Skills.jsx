import { useMemo } from "react";
import { motion } from "framer-motion";
import Band from "./SectionHead";
import { SKILLS, PROJECTS } from "../constants";
import { normalizeTech } from "../lib/interaction";

const CATEGORIES = Object.keys(SKILLS);

export default function Skills({ onFilter, activeFilter }) {
  // Only skills that actually appear in a project become clickable, so no chip
  // can ever filter the list down to nothing.
  const usedInProjects = useMemo(() => {
    const set = new Set();
    PROJECTS.forEach((p) => p.tech?.forEach((t) => set.add(normalizeTech(t))));
    return set;
  }, []);

  const activeKey = activeFilter ? normalizeTech(activeFilter) : null;

  return (
    <Band
      id="skills"
      label="Stack"
      title="What I work with"
      lede="Picked for the problem, not the résumé. Click anything highlighted to see the projects that use it."
    >
      <div style={{ borderTop: "1px solid var(--rule)" }}>
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat}
            className="grid gap-4 py-6 sm:grid-cols-[9rem_1fr]"
            style={{ borderBottom: "1px solid var(--rule)" }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="font-mono text-[0.7rem] uppercase tracking-[0.16em] pt-1"
              style={{ color: "var(--muted)" }}
            >
              {cat}
            </span>
            <div className="flex flex-wrap gap-2">
              {SKILLS[cat].map((skill) => {
                const key = normalizeTech(skill);
                if (!usedInProjects.has(key)) {
                  return (
                    <span key={skill} className="badge">
                      {skill}
                    </span>
                  );
                }
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => onFilter(skill)}
                    className="badge badge-clickable"
                    data-selected={activeKey === key}
                    aria-label={`Show projects using ${skill}`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </Band>
  );
}
