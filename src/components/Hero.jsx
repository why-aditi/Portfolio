import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-scroll";
import { HOME_CONTENT } from "../constants";

const HeroBackground = lazy(() => import("./HeroBackground"));

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Typewriter({ texts }) {
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const pauseRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(texts[0]);
      return;
    }

    if (pauseRef.current) return;

    const target = texts[textIndex];

    if (!deleting && charIndex === target.length) {
      pauseRef.current = true;
      const t = setTimeout(() => {
        pauseRef.current = false;
        setDeleting(true);
      }, 1800);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((i) => (i + 1) % texts.length);
      return;
    }

    const delay = deleting ? 35 : 70;
    const id = setTimeout(() => {
      setCharIndex((c) => (deleting ? c - 1 : c + 1));
      setDisplayed(target.slice(0, deleting ? charIndex - 1 : charIndex + 1));
    }, delay);

    return () => clearTimeout(id);
  }, [charIndex, deleting, textIndex, texts]);

  return (
    <span>
      {displayed}
      <span
        className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse"
        style={{ background: "var(--pink)" }}
      />
    </span>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();

  const spring = { stiffness: 80, damping: 20 };

  const rawNameY = useTransform(scrollY, [0, 600], [0, prefersReducedMotion ? 0 : -200]);
  const rawTaglineY = useTransform(scrollY, [0, 600], [0, prefersReducedMotion ? 0 : -110]);
  const rawBgY = useTransform(scrollY, [0, 600], [0, prefersReducedMotion ? 0 : 80]);

  const nameY = useSpring(rawNameY, spring);
  const taglineY = useSpring(rawTaglineY, spring);

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: "100vh", minHeight: 600 }}
    >
      {/* Three.js background — radial mask keeps the center clear for headline / CTAs */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: rawBgY,
          WebkitMaskImage:
            "radial-gradient(ellipse min(88vw, 56rem) min(72vh, 44rem) at 50% 44%, transparent 0%, transparent 30%, rgba(0,0,0,0.12) 42%, rgba(0,0,0,0.75) 58%, #000 100%)",
          maskImage:
            "radial-gradient(ellipse min(88vw, 56rem) min(72vh, 44rem) at 50% 44%, transparent 0%, transparent 30%, rgba(0,0,0,0.12) 42%, rgba(0,0,0,0.75) 58%, #000 100%)",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      >
        <Suspense
          fallback={
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(155,79,150,0.12), transparent)",
                WebkitMaskImage:
                  "radial-gradient(ellipse min(88vw, 56rem) min(72vh, 44rem) at 50% 44%, transparent 0%, transparent 30%, rgba(0,0,0,0.12) 42%, rgba(0,0,0,0.75) 58%, #000 100%)",
                maskImage:
                  "radial-gradient(ellipse min(88vw, 56rem) min(72vh, 44rem) at 50% 44%, transparent 0%, transparent 30%, rgba(0,0,0,0.12) 42%, rgba(0,0,0,0.75) 58%, #000 100%)",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
            />
          }
        >
          <HeroBackground />
        </Suspense>
      </motion.div>

      {/* Radial vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, var(--bg-dark) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        {/* Name */}
        <motion.div style={{ y: nameY }} className="mb-4">
          <motion.h1
            className="font-display leading-none select-none cursor-default"
            style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span
              className="shimmer glitch"
              data-text="Aditi Kala"
              onMouseEnter={(e) => e.currentTarget.classList.add("glitch-active")}
              onMouseLeave={(e) => e.currentTarget.classList.remove("glitch-active")}
            >
              Aditi Kala
            </span>
          </motion.h1>
        </motion.div>

        {/* Tagline typewriter */}
        <motion.div
          style={{ y: taglineY }}
          className="mb-8 h-8 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p
            className="text-lg md:text-xl font-mono"
            style={{ color: "var(--text-secondary)" }}
          >
            <Typewriter texts={HOME_CONTENT.taglines} />
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <Link to="projects" smooth duration={600} offset={-80}>
            <button className="btn-gradient text-base">
              See my work ↓
            </button>
          </Link>
          <a
            href="https://drive.google.com/file/d/1KBXc2wJwhxiR3n3X3b7oMFJ9KeQv2HUB/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-ghost text-base">
              Download Resume
            </button>
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
            scroll to explore
          </span>
          <motion.div
            className="w-0.5 h-8 rounded-full"
            style={{ background: "linear-gradient(to bottom, var(--pink), transparent)" }}
            animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
}
