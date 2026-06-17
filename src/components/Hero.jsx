import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { HOME_CONTENT } from "../constants";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Lissajous 2:3 — 2 crossings, covers all edges, looks like a random flight path
function buildPath() {
  const N = 300;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * 2 * Math.PI;
    const x = 50 + 56 * Math.sin(2 * t + 0.9);
    const y = 50 + 56 * Math.sin(3 * t);
    pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return "M " + pts.join(" L ") + " Z";
}

const PATH = buildPath();

function Plane() {
  return (
    <svg width="36" height="26" viewBox="0 0 48 34" fill="none">
      {/* upper wing — nose is at right (47,17) */}
      <path d="M 47 17 L 1 5 L 13 17 Z" fill="#e8920c" opacity="0.92" />
      {/* under-wing fold */}
      <path d="M 47 17 L 13 17 L 17 29 Z" fill="#c87010" opacity="0.72" />
      {/* wing-tip inner face */}
      <path d="M 13 17 L 1 5 L 1 17 Z" fill="rgba(232,146,12,0.18)" />
      {/* body crease */}
      <line x1="47" y1="17" x2="13" y2="17" stroke="rgba(7,9,15,0.32)" strokeWidth="0.9" />
      {/* tail fold */}
      <line x1="17" y1="29" x2="13" y2="17" stroke="rgba(7,9,15,0.22)" strokeWidth="0.7" />
    </svg>
  );
}

function PlaneOnPath() {
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const planeRef = useRef(null);

  useEffect(() => {
    if (prefersReduced) return;
    const pathEl = measureRef.current;
    if (!pathEl) return;

    const DURATION = 60000;
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
    <div
      ref={containerRef}
      aria-hidden
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "visible" }}
    >
      {/* measurement path */}
      <svg style={{ position: "absolute", width: 1, height: 1, opacity: 0 }} viewBox="0 0 100 100">
        <path ref={measureRef} d={PATH} />
      </svg>

      {/* dashed trail */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path d={PATH} fill="none" stroke="#5080ff" strokeWidth="0.35" strokeDasharray="1.2 3" opacity="0.17" />
      </svg>

      {/* plane — direct DOM, no re-renders */}
      <div ref={planeRef} style={{ position: "absolute" }}>
        <Plane />
      </div>
    </div>
  );
}

export default function Hero() {
  const [ready, setReady] = useState(prefersReduced);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div
      className="hero-bg relative flex flex-col justify-center"
      style={{ height: "100vh", minHeight: 600, paddingTop: 64, overflow: "visible" }}
    >
      {!prefersReduced && <PlaneOnPath />}

      {/* text — sits above the plane */}
      <div
        className="container mx-auto px-4 md:px-8 lg:px-12"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div style={{ maxWidth: 880 }}>
          <motion.h1
            className="font-display leading-[1.02] mb-5 select-none"
            style={{ fontSize: "clamp(4rem, 12vw, 10rem)", color: "var(--text)", letterSpacing: "-0.02em" }}
            {...reveal(0)}
          >
            Aditi Kala
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-3 font-medium"
            style={{ color: "var(--text)" }}
            {...reveal(0.08)}
          >
            {HOME_CONTENT.taglines[0]}
          </motion.p>

          <motion.p
            className="font-mono text-sm mb-10"
            style={{ color: "var(--text-muted)" }}
            {...reveal(0.16)}
          >
            Full-stack &middot; AI/ML &middot; Computer Vision &middot; ECE
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-3" {...reveal(0.24)}>
            <Link to="projects" smooth duration={600} offset={-80}>
              <button className="btn-primary">See my work →</button>
            </Link>
            <a
              href="https://drive.google.com/file/d/1jBVTIVqgX5358LzBlAtcOdTUNrJcDecw/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn-outline">Download Resume</button>
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 2 }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>scroll</span>
        <motion.div
          className="w-px h-7 rounded-full"
          style={{ background: "var(--rule)" }}
          animate={{ scaleY: [1, 0.35, 1], opacity: [0.7, 0.25, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}
