import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCES } from "../constants";
import { GlassCard } from "./ui/GlassCard";
import { GradientText } from "./ui/GradientText";

const ACCENT_COLORS = ["var(--pink)", "var(--purple)", "var(--blue-light)"];

function TimelineRail() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.25"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute top-0 bottom-0 left-5 z-0 flex w-8 justify-center md:left-1/2 md:w-12 md:-translate-x-1/2"
      aria-hidden
    >
      <div
        className="absolute inset-y-0 w-3 rounded-full opacity-30 blur-md md:w-4"
        style={{
          background: "linear-gradient(180deg, var(--pink), var(--purple), var(--blue-light))",
        }}
      />
      <div
        className="relative h-full w-[3px] rounded-full overflow-hidden"
        style={{
          background: "var(--glass-border)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <motion.div
          className="absolute left-0 right-0 top-0 bottom-0 origin-top rounded-full"
          style={{
            scaleY,
            background: "linear-gradient(180deg, var(--pink) 0%, var(--purple) 48%, var(--blue-light) 100%)",
            boxShadow: "0 0 16px rgba(214,2,112,0.45)",
          }}
        />
      </div>
    </div>
  );
}

function TimelineNode({ accent, index, showPulse }) {
  return (
    <motion.div
      className="absolute z-20 left-5 top-[1.65rem] -translate-x-1/2 md:left-1/2"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 380, damping: 22, delay: index * 0.08 }}
    >
      {showPulse && (
        <span
          className="absolute -inset-1.5 rounded-full animate-ping opacity-25"
          style={{ background: accent }}
        />
      )}
      <span
        className="relative flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full font-mono text-[11px] font-bold text-white"
        style={{
          background: `linear-gradient(145deg, ${accent}, #16121f)`,
          border: "2px solid rgba(255,255,255,0.15)",
          boxShadow: "0 0 0 3px var(--bg-dark), 0 0 20px rgba(214, 2, 112, 0.22)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <div className="py-24" style={{ borderBottom: "1px solid var(--glass-border)" }}>
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-mono uppercase tracking-widest mb-3 block"
            style={{ color: "var(--pink)" }}
          >
            My Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Work <GradientText>Experience</GradientText>
          </h2>
          <motion.div
            className="gradient-underline mx-auto mt-3"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
        </motion.div>

        <div className="relative max-w-5xl mx-auto pl-[3.25rem] md:pl-0">
          <TimelineRail />

          <div className="relative z-10 flex flex-col gap-14 md:gap-16">
            {EXPERIENCES.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
              const isPresent = /present/i.test(exp.period);

              return (
                <div key={i} className="relative">
                  <TimelineNode accent={accent} index={i} showPulse={isPresent} />

                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 md:items-start">
                  <motion.div
                    className={`relative md:min-h-[3.5rem] ${
                      isLeft ? "md:col-start-1 md:row-start-1 md:pr-10" : "md:col-start-2 md:pl-10"
                    }`}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: i * 0.06 }}
                  >
                    <div
                      className="hidden md:block absolute top-8 h-px z-10 pointer-events-none w-10 opacity-70"
                      style={{
                        background: `linear-gradient(${isLeft ? "270deg" : "90deg"}, ${accent}, transparent)`,
                        ...(isLeft ? { right: "-2.5rem" } : { left: "-2.5rem" }),
                      }}
                    />

                    <GlassCard
                      className="p-6 md:p-7 flex flex-col gap-4 rounded-2xl overflow-hidden"
                      style={{
                        borderLeft: `4px solid ${accent}`,
                        boxShadow: "0 14px 48px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)",
                      }}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 320, damping: 26 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="text-xs font-mono px-3 py-1.5 rounded-full font-medium"
                            style={{
                              background: "var(--surface)",
                              border: `1px solid ${accent}`,
                              color: accent,
                            }}
                          >
                            {exp.period}
                          </span>
                          {isPresent && (
                            <span
                              className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
                              style={{
                                background: "rgba(34,197,94,0.12)",
                                color: "#86efac",
                                border: "1px solid rgba(34,197,94,0.28)",
                              }}
                            >
                              Current
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                          <span aria-hidden>📍</span> {exp.location}
                        </span>
                      </div>

                      <div>
                        <h3
                          className="font-display text-xl md:text-2xl font-bold mb-1 leading-tight"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {exp.role}
                        </h3>
                        <p className="font-semibold text-sm md:text-base" style={{ color: accent }}>
                          {exp.company}
                        </p>
                      </div>

                      <ul className="flex flex-col gap-2.5">
                        {(exp.points || exp.description || []).map((point, j) => (
                          <motion.li
                            key={j}
                            className="flex items-start gap-3 text-sm md:text-[0.9375rem] leading-relaxed"
                            style={{ color: "var(--text-secondary)" }}
                            initial={{ opacity: 0, x: -6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: j * 0.05 }}
                          >
                            <span
                              className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                              style={{
                                background: accent,
                                boxShadow: `0 0 10px ${accent}`,
                              }}
                            />
                            {point}
                          </motion.li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-1" style={{ borderTop: "1px solid var(--glass-border)" }}>
                        {(exp.technologies || []).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono px-2.5 py-1 rounded-lg"
                            style={{
                              background: "var(--surface)",
                              border: "1px solid var(--glass-border)",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>

                  <div
                    className={`hidden md:block ${isLeft ? "md:col-start-2 md:row-start-1" : "md:col-start-1 md:row-start-1"}`}
                  />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
