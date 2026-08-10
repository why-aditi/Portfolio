import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Band from "./SectionHead";
import { ACHIEVEMENTS } from "../constants";

// Figures verified against the LeetCode profile, not the résumé — 8.53 is the
// contest top-percentage, which is a different metric from global rank.
const STATS = [
  { to: 587, suffix: "+", label: "LeetCode solved" },
  { to: 8.53, suffix: "%", decimals: 2, label: "Contest top %" },
  { to: 50, suffix: "K+", label: "ScriptedByHer pool" },
  { to: 6, suffix: "K+", label: "NEST pool" },
];

function CountUp({ to, suffix = "", decimals = 0 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    function tick(now) {
      const t = Math.min((now - start) / 1100, 1);
      setVal(+((1 - Math.pow(1 - t, 3)) * to).toFixed(decimals));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, decimals]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Achievements() {
  return (
    <Band id="achievements" label="Recognition" title="Where it held up">
      <motion.div
        className="mb-14 grid grid-cols-2 gap-px md:grid-cols-4"
        style={{ background: "var(--rule)", border: "1px solid var(--rule)", borderRadius: 8, overflow: "hidden" }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col gap-2 p-6" style={{ background: "var(--raised)" }}>
            <span
              className="font-display leading-none"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", letterSpacing: "-0.04em", color: "var(--ink)" }}
            >
              <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </span>
            <span
              className="font-mono text-[0.68rem] uppercase leading-snug tracking-[0.14em]"
              style={{ color: "var(--muted)" }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </motion.div>

      <div style={{ borderTop: "1px solid var(--rule)" }}>
        {ACHIEVEMENTS.map((ach, i) => (
          <motion.div
            key={ach.title}
            className="grid gap-1 py-5 sm:grid-cols-[6rem_1fr_1.2fr] sm:items-baseline sm:gap-6"
            style={{ borderBottom: "1px solid var(--rule)" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[0.7rem] tracking-[0.12em]" style={{ color: "var(--accent)" }}>
              {ach.year}
            </span>
            <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
              {ach.title}
            </span>
            <span className="t-body text-sm">{ach.detail}</span>
          </motion.div>
        ))}
      </div>
    </Band>
  );
}
