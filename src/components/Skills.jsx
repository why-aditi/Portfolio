import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS } from "../constants";
import { GradientText } from "./ui/GradientText";

const CATEGORIES = Object.keys(SKILLS);

export default function Skills() {
  const [active, setActive] = useState(CATEGORIES[0]);

  return (
    <div className="py-24 border-b" style={{ borderColor: "var(--glass-border)" }}>
      {/* Header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <span
          className="text-xs font-mono uppercase tracking-widest mb-3 block"
          style={{ color: "var(--pink)" }}
        >
          Tech Stack
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
          What I work with
        </h2>
        {/* Animated underline */}
        <motion.div
          className="gradient-underline mx-auto mt-3"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />
      </motion.div>

      {/* Category tabs */}
      <div className="flex justify-center mb-10">
        <div
          className="flex gap-1 p-1 rounded-2xl"
          style={{ background: "var(--surface)", border: "1px solid var(--glass-border)" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 z-10"
              style={{ color: active === cat ? "#fff" : "var(--text-secondary)" }}
            >
              {active === cat && (
                <motion.div
                  layoutId="skills-tab-indicator"
                  className="absolute inset-0 rounded-xl -z-10"
                  style={{
                    background: "linear-gradient(135deg, var(--pink), var(--purple))",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skill chips grid */}
      <div className="min-h-[160px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            className="flex flex-wrap justify-center gap-3"
          >
            {SKILLS[active].map((skill, i) => (
              <motion.div
                key={skill}
                className="skill-chip font-mono"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
