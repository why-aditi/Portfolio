import { motion } from "framer-motion";
import { SKILLS } from "../constants";

const CATEGORIES = Object.keys(SKILLS);

export default function Skills() {
  return (
    <div className="py-24 border-b" style={{ borderColor: "var(--rule)" }}>
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-label">Tech Stack</span>
        <h2
          className="font-display leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)" }}
        >
          What I work with
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label">{cat}</span>
            <div className="flex flex-wrap gap-2">
              {SKILLS[cat].map((skill) => (
                <span key={skill} className="skill-chip">{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
