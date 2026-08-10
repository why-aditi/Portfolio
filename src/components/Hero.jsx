import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { Kinetic } from "./SectionHead";
import { HOME_CONTENT, RESUME_URL, CORE_STACK } from "../constants";
import { prefersReduced, useMagnetic } from "../lib/interaction";

// Lissajous 2:3 — two crossings, reaches every edge, reads as a flight path.
const PATH = (() => {
  const pts = [];
  for (let i = 0; i <= 300; i++) {
    const t = (i / 300) * 2 * Math.PI;
    pts.push(`${(50 + 56 * Math.sin(2 * t + 0.9)).toFixed(2)} ${(50 + 56 * Math.sin(3 * t)).toFixed(2)}`);
  }
  return "M " + pts.join(" L ") + " Z";
})();

function PlaneOnPath() {
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const planeRef = useRef(null);

  useEffect(() => {
    const pathEl = measureRef.current;
    if (!pathEl) return;

    const DURATION = 75000;
    const totalLen = pathEl.getTotalLength();
    const start = performance.now();
    let raf;

    function tick(now) {
      const t = ((now - start) % DURATION) / DURATION;
      const d = t * totalLen;
      const { x, y } = pathEl.getPointAtLength(d);
      const p2 = pathEl.getPointAtLength(Math.min(d + 0.8, totalLen));

      const W = containerRef.current?.offsetWidth || 1;
      const H = containerRef.current?.offsetHeight || 1;
      const angle = Math.atan2((p2.y - y) * H, (p2.x - x) * W) * (180 / Math.PI);

      if (planeRef.current) {
        planeRef.current.style.left = `${x}%`;
        planeRef.current.style.top = `${y}%`;
        planeRef.current.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`;
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    // Hidden on small screens: the non-uniform scale turns the dashed trail into visual noise.
    <div ref={containerRef} aria-hidden className="absolute inset-0 pointer-events-none z-0 hidden md:block">
      <svg className="absolute w-px h-px opacity-0" viewBox="0 0 100 100">
        <path ref={measureRef} d={PATH} />
      </svg>

      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        style={{ overflow: "visible" }}
      >
        <path d={PATH} fill="none" stroke="var(--accent)" strokeWidth="0.28" strokeDasharray="1 4" opacity="0.22" />
      </svg>

      <div ref={planeRef} className="absolute">
        <svg width="30" height="21" viewBox="0 0 48 34" fill="none">
          <path d="M 47 17 L 1 5 L 13 17 Z" fill="var(--accent)" />
          <path d="M 47 17 L 13 17 L 17 29 Z" fill="var(--accent)" opacity="0.55" />
          <path d="M 13 17 L 1 5 L 1 17 Z" fill="var(--accent)" opacity="0.18" />
        </svg>
      </div>
    </div>
  );
}

const rise = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  const workRef = useMagnetic(0.25);
  const resumeRef = useMagnetic(0.25);

  return (
    <section id="hero" className="relative flex flex-col justify-center min-h-screen pt-24 pb-16 overflow-hidden">
      {!prefersReduced && <PlaneOnPath />}

      <div className="shell relative z-10">
        <motion.span className="eyebrow" {...rise(0.05)}>
          {HOME_CONTENT.role}
        </motion.span>

        <Kinetic as="h1" text={HOME_CONTENT.name} className="t-display mt-6 mb-7" delayStep={0.09} />

        <motion.p
          className="text-xl md:text-2xl font-light max-w-2xl mb-4"
          style={{ color: "var(--ink)" }}
          {...rise(0.45)}
        >
          {HOME_CONTENT.thesis}
        </motion.p>

        <motion.p className="t-body max-w-xl mb-9" {...rise(0.52)}>
          {HOME_CONTENT.blurb}
        </motion.p>

        <motion.div className="flex flex-wrap gap-2 mb-10" {...rise(0.58)}>
          {CORE_STACK.map((t) => (
            <span key={t} className="badge">{t}</span>
          ))}
        </motion.div>

        {/* The magnetic ref needs a real DOM node — react-scroll's Link is a component. */}
        <motion.div className="flex flex-col sm:flex-row gap-3" {...rise(0.64)}>
          <span ref={workRef} className="magnetic">
            <Link to="projects" smooth duration={600} offset={-72}>
              <button className="btn btn-primary w-full sm:w-auto">See the work</button>
            </Link>
          </span>
          <span ref={resumeRef} className="magnetic">
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              <button className="btn btn-ghost w-full sm:w-auto">Résumé</button>
            </a>
          </span>
        </motion.div>

        <motion.p
          className="mt-8 hidden items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] md:flex"
          style={{ color: "var(--muted)" }}
          {...rise(0.72)}
        >
          Press
          <kbd className="rounded px-1.5 py-0.5" style={{ border: "1px solid var(--rule)" }}>
            ⌘K
          </kbd>
          to jump anywhere
        </motion.p>
      </div>

      <motion.div
        className="shell relative z-10 mt-16 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>
          Scroll
        </span>
        <span className="h-px flex-1" style={{ background: "var(--rule)" }} />
      </motion.div>
    </section>
  );
}
