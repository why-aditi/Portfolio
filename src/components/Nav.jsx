import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { FiGithub, FiLinkedin, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { PROFILE } from "../constants";

const openPalette = () => window.dispatchEvent(new Event("palette:open"));

const NAV_LINKS = [
  { label: "About", to: "about" },
  { label: "Stack", to: "skills" },
  { label: "Experience", to: "experience" },
  { label: "Work", to: "projects" },
  { label: "Recognition", to: "achievements" },
  { label: "Contact", to: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
        style={{
          background: scrolled ? "rgba(8,9,11,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--rule)" : "transparent"}`,
        }}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between">
          <Link to="hero" smooth duration={500} className="cursor-pointer select-none" aria-label="Back to top">
            <span
              className="font-mono text-sm font-bold tracking-[0.28em]"
              style={{ color: "var(--ink)" }}
            >
              AK
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                smooth
                duration={500}
                offset={-72}
                spy
                activeClass="nav-active"
                className="nav-link font-mono text-[0.7rem] uppercase tracking-[0.16em] cursor-pointer transition-colors duration-150"
                style={{ color: "var(--muted)" }}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openPalette}
              aria-label="Open command palette"
              className="hidden items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors md:flex"
              style={{ border: "1px solid var(--rule)", color: "var(--muted)" }}
            >
              <FiSearch size={13} />
              <kbd className="font-mono text-[0.65rem]">⌘K</kbd>
            </button>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden md:block transition-colors hover:text-ink"
              style={{ color: "var(--muted)" }}
            >
              <FiGithub size={16} />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden md:block transition-colors hover:text-ink"
              style={{ color: "var(--muted)" }}
            >
              <FiLinkedin size={16} />
            </a>
            <button
              onClick={openPalette}
              aria-label="Open command palette"
              className="p-1 md:hidden"
              style={{ color: "var(--muted)" }}
            >
              <FiSearch size={18} />
            </button>
            <button
              className="md:hidden p-1"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              style={{ color: "var(--ink)" }}
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>

        <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden />
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50"
              style={{ background: "rgba(8,9,11,0.6)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col gap-8 p-7"
              style={{ background: "var(--raised)", borderLeft: "1px solid var(--rule)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold tracking-[0.28em]" style={{ color: "var(--ink)" }}>
                  AK
                </span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" style={{ color: "var(--muted)" }}>
                  <FiX size={20} />
                </button>
              </div>

              <nav className="flex flex-col">
                {NAV_LINKS.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    smooth
                    duration={500}
                    offset={-72}
                    onClick={() => setOpen(false)}
                    className="font-mono text-xs uppercase tracking-[0.16em] py-4 cursor-pointer"
                    style={{ borderBottom: "1px solid var(--rule)", color: "var(--muted)" }}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex items-center gap-5 pt-5" style={{ borderTop: "1px solid var(--rule)" }}>
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: "var(--muted)" }}>
                  <FiGithub size={17} />
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "var(--muted)" }}>
                  <FiLinkedin size={17} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link:hover { color: var(--ink); }
        .nav-active { color: var(--accent) !important; }
      `}</style>
    </>
  );
}
