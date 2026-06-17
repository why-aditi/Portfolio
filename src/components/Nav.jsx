import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";

const NAV_LINKS = [
  { label: "About", to: "about" },
  { label: "Skills", to: "skills" },
  { label: "Experience", to: "experience" },
  { label: "Projects", to: "projects" },
  { label: "Achievements", to: "achievements" },
  { label: "Contact", to: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(7,9,15,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
        }}
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between h-16">
          <Link
            to="hero"
            smooth
            duration={500}
            className="cursor-pointer select-none"
            aria-label="Scroll to top"
          >
            <span
              className="font-display text-2xl"
              style={{ color: "var(--text)", letterSpacing: "-0.02em" }}
            >
              AK
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                smooth
                duration={500}
                offset={-80}
                spy
                activeClass="nav-link-active"
                className="nav-link text-sm font-medium px-3 py-1.5 cursor-pointer relative group rounded-md transition-colors duration-150"
                style={{ color: "var(--text-muted)" }}
              >
                {label}
                <span
                  className="absolute bottom-0 left-3 h-px w-0 group-hover:w-[calc(100%-1.5rem)] transition-all duration-200"
                  style={{ background: "var(--copper)" }}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/why-aditi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden md:block transition-opacity hover:opacity-50"
              style={{ color: "var(--text-muted)" }}
            >
              <FiGithub size={17} />
            </a>
            <a
              href="https://www.linkedin.com/in/adikala/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden md:block transition-opacity hover:opacity-50"
              style={{ color: "var(--text-muted)" }}
            >
              <FiLinkedin size={17} />
            </a>
            <button
              className="md:hidden p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{ color: "var(--text)" }}
            >
              <FiMenu size={21} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-64 p-6 flex flex-col gap-6"
              style={{ background: "var(--surface-card)", borderLeft: "1px solid var(--rule)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center">
                <span className="font-display text-xl" style={{ color: "var(--text)" }}>
                  AK
                </span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" style={{ color: "var(--text-muted)" }}>
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
                    offset={-80}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium py-3 px-2 cursor-pointer border-b transition-colors duration-150 hover:text-copper"
                    style={{ borderColor: "var(--rule)", color: "var(--text-muted)" }}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-4 mt-auto pt-4 border-t" style={{ borderColor: "var(--rule)" }}>
                <a href="https://github.com/why-aditi" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: "var(--text-muted)" }}>
                  <FiGithub size={18} />
                </a>
                <a href="https://www.linkedin.com/in/aditi-kala-7b0b55290/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "var(--text-muted)" }}>
                  <FiLinkedin size={18} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link-active { color: var(--copper) !important; }
        .nav-link-active > span { width: calc(100% - 1.5rem) !important; }
      `}</style>
    </>
  );
}
