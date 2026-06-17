import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ACHIEVEMENTS } from "../constants";

const STATS = [
  { to: 500, suffix: "+", label: "LeetCode problems solved" },
  { to: 8.3, suffix: "%", decimals: 1, label: "LeetCode global ranking" },
  { to: 50, suffix: "K+", label: "ScriptedByHer pool" },
  { to: 6, suffix: "K+", label: "NEST competitor pool" },
];

function CountUp({ to, suffix = "", decimals = 0 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const DURATION = 1000;
    let raf;
    function tick(now) {
      const t = Math.min((now - start) / DURATION, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(+(ease * to).toFixed(decimals));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, decimals]);

  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

export default function Achievements() {
  return (
    <div className="py-24 border-b" style={{ borderColor: "var(--rule)" }}>
      <div className="container mx-auto px-4 md:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">Recognition</span>
          <h2
            className="font-display leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)" }}
          >
            Achievements
          </h2>
        </motion.div>

        {/* Stat row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span
                className="font-display leading-none"
                style={{ fontSize: "clamp(3rem, 7vw, 5rem)", color: "var(--text)" }}
              >
                <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </span>
              <span className="font-mono text-xs leading-snug" style={{ color: "var(--text-muted)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Achievement rows */}
        <div style={{ borderTop: "1px solid var(--rule)" }}>
          {ACHIEVEMENTS.map((ach, i) => (
            <motion.div
              key={ach.title}
              className="achievement-row py-5"
              style={{ borderBottom: "1px solid var(--rule)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-mono text-xs pt-0.5" style={{ color: "var(--copper)" }}>
                {ach.year}
              </span>
              <span className="font-medium text-sm" style={{ color: "var(--text)" }}>
                {ach.title}
              </span>
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {ach.detail}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
