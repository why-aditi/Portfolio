import { useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { HOME_CONTENT } from "../constants";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function OscilloscopeWave({ onComplete }) {
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.offsetWidth || window.innerWidth;
    const H = 56;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    if (prefersReduced) {
      ctx.strokeStyle = "#5080ff";
      ctx.globalAlpha = 0.15;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.stroke();
      onComplete?.();
      return;
    }

    const DURATION = 1100;
    const start = performance.now();
    let done = false;
    let raf;

    function drawWave(endX, alpha) {
      ctx.beginPath();
      for (let x = 0; x <= endX; x += 0.8) {
        const p = x / W;
        const y = H / 2 + Math.sin(p * Math.PI * 7) * H * 0.36;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#5080ff";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = alpha;
      ctx.stroke();
    }

    function frame(now) {
      const t = Math.min((now - start) / DURATION, 1);
      ctx.clearRect(0, 0, W, H);
      drawWave(t * W, 0.85);

      if (t < 1) {
        raf = requestAnimationFrame(frame);
      } else if (!done) {
        done = true;
        onComplete?.();
        let alpha = 0.85;
        function fadeToLine() {
          alpha -= 0.04;
          ctx.clearRect(0, 0, W, H);
          if (alpha > 0.14) {
            drawWave(W, alpha);
            raf = requestAnimationFrame(fadeToLine);
          } else {
            ctx.strokeStyle = "#5080ff";
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.14;
            ctx.beginPath();
            ctx.moveTo(0, H / 2);
            ctx.lineTo(W, H / 2);
            ctx.stroke();
          }
        }
        raf = requestAnimationFrame(fadeToLine);
      }
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: 56, display: "block" }}
      aria-hidden
    />
  );
}

export default function Hero() {
  const [waveComplete, setWaveComplete] = useState(prefersReduced);

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: waveComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div
      className="hero-bg relative flex flex-col justify-center overflow-hidden"
      style={{ height: "100vh", minHeight: 600, paddingTop: 64 }}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div style={{ maxWidth: 880 }}>
          <motion.div
            className="mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <OscilloscopeWave onComplete={() => setWaveComplete(true)} />
          </motion.div>

          <motion.h1
            className="font-display leading-[1.02] mb-5 select-none"
            style={{
              fontSize: "clamp(4rem, 12vw, 10rem)",
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
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
        initial={{ opacity: 0 }}
        animate={waveComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
          scroll
        </span>
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
