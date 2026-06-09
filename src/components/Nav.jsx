import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "./ThemeProvider";
import { THEME_LABELS, THEME_ORDER } from "../themes/index";
import { BrandMark } from "./ui/BrandMark";

const NAV_LINKS = [
  { label: "About", to: "about" },
  { label: "Skills", to: "skills" },
  { label: "Experience", to: "experience" },
  { label: "Projects", to: "projects" },
  { label: "Achievements", to: "achievements" },
  { label: "Contact", to: "contact" },
];

export default function Nav() {
  const { theme, setTheme } = useTheme();
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-card" : ""
        }`}
        style={{ borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none" }}
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="hero"
            smooth
            duration={500}
            className="cursor-pointer shrink-0 ms-2 sm:ms-3"
            aria-label="Scroll to top"
          >
            <motion.div
              className="flex items-center justify-center rounded-xl select-none p-0.5"
              style={{
                boxShadow: "0 0 18px rgba(214, 2, 112, 0.18)",
                background: "linear-gradient(145deg, rgba(214,2,112,0.1), rgba(0,56,168,0.06))",
              }}
              whileHover={{ scale: 1.06, boxShadow: "0 0 26px rgba(155,79,150,0.28)" }}
              whileTap={{ scale: 0.96 }}
            >
              <BrandMark size={26} className="drop-shadow-[0_0_6px_rgba(214,2,112,0.4)]" />
            </motion.div>
          </Link>

          {/* Desktop links */}
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
                className="nav-link text-sm font-medium px-3 py-1.5 cursor-pointer relative group transition-colors duration-200 rounded-md"
                style={{ color: "var(--text-secondary)" }}
              >
                {label}
                <span
                  className="absolute -bottom-0.5 left-3 h-0.5 w-0 group-hover:w-[calc(100%-1.5rem)] transition-all duration-200 rounded-full"
                  style={{ background: "linear-gradient(90deg, var(--pink), var(--purple))" }}
                />
              </Link>
            ))}
          </div>

          {/* Right: social + theme switcher */}
          <div className="flex items-center gap-3">
            <motion.a
              href="https://github.com/why-aditi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ color: "var(--text-secondary)" }}
              whileHover={{ scale: 1.15 }}
              className="hidden md:block transition-colors"
            >
              <FiGithub size={18} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/aditi-kala-7b0b55290/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: "var(--text-secondary)" }}
              whileHover={{ scale: 1.15 }}
              className="hidden md:block transition-colors"
            >
              <FiLinkedin size={18} />
            </motion.a>

            {/* Theme switcher dots */}
            <div className="flex items-center gap-1.5 ml-1 p-1.5 rounded-full glass-card-no-hover glass-card">
              {THEME_ORDER.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  title={`${THEME_LABELS[t].emoji} ${THEME_LABELS[t].label}`}
                  aria-label={`Switch to ${THEME_LABELS[t].label} theme`}
                  className="w-3 h-3 rounded-full transition-all duration-200"
                  style={{
                    background: THEME_LABELS[t].dot,
                    outline: theme === t ? `2px solid ${THEME_LABELS[t].dot}` : "none",
                    outlineOffset: "2px",
                    opacity: theme === t ? 1 : 0.45,
                    transform: theme === t ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden ml-1 p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{ color: "var(--text-primary)" }}
            >
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-72 p-6 flex flex-col gap-6"
              style={{ background: "var(--bg-mid)", borderLeft: "1px solid var(--glass-border)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-xl gradient-text">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <FiX size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    smooth
                    duration={500}
                    offset={-80}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium py-3 px-2 rounded-lg cursor-pointer transition-colors duration-200 border-b"
                    style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-4 mt-auto pt-4 border-t" style={{ borderColor: "var(--glass-border)" }}>
                <a href="https://github.com/why-aditi" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: "var(--text-secondary)" }}>
                  <FiGithub size={20} />
                </a>
                <a href="https://www.linkedin.com/in/adikala/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "var(--text-secondary)" }}>
                  <FiLinkedin size={20} />
                </a>
                <div className="flex items-center gap-2 ml-auto">
                  {THEME_ORDER.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      title={THEME_LABELS[t].label}
                      aria-label={`Switch to ${THEME_LABELS[t].label} theme`}
                      className="w-4 h-4 rounded-full transition-all duration-200"
                      style={{
                        background: THEME_LABELS[t].dot,
                        outline: theme === t ? `2px solid ${THEME_LABELS[t].dot}` : "none",
                        outlineOffset: "2px",
                        opacity: theme === t ? 1 : 0.45,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link-active {
          color: var(--pink) !important;
        }
      `}</style>
    </>
  );
}
