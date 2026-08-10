import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scroller } from "react-scroll";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiFileText, FiExternalLink, FiCopy } from "react-icons/fi";
import { PROJECTS, PROFILE, RESUME_URL } from "../constants";

const SECTIONS = [
  ["About", "about"],
  ["Stack", "skills"],
  ["Experience", "experience"],
  ["Work", "projects"],
  ["Recognition", "achievements"],
  ["Contact", "contact"],
];

const goTo = (id) => scroller.scrollTo(id, { smooth: true, duration: 500, offset: -72 });
const open = (url) => window.open(url, "_blank", "noopener,noreferrer");

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = useMemo(
    () => [
      ...SECTIONS.map(([label, id]) => ({
        id: `go-${id}`,
        label,
        group: "Jump to",
        Icon: FiArrowRight,
        run: () => goTo(id),
      })),
      ...PROJECTS.map((p) => ({
        id: `proj-${p.title}`,
        label: p.title,
        hint: p.tech?.slice(0, 3).join(" · "),
        group: "Projects",
        Icon: p.liveDemo ? FiExternalLink : FiGithub,
        run: () => open(p.liveDemo || p.github),
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        hint: PROFILE.email,
        group: "Actions",
        Icon: FiCopy,
        keepOpen: true,
        run: async () => {
          await navigator.clipboard.writeText(PROFILE.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        },
      },
      { id: "email", label: "Send an email", group: "Actions", Icon: FiMail, run: () => { window.location.href = `mailto:${PROFILE.email}`; } },
      { id: "resume", label: "Open résumé", group: "Actions", Icon: FiFileText, run: () => open(RESUME_URL) },
      { id: "github", label: "GitHub profile", hint: "why-aditi", group: "Actions", Icon: FiGithub, run: () => open(PROFILE.github) },
      { id: "linkedin", label: "LinkedIn profile", hint: "adikala", group: "Actions", Icon: FiLinkedin, run: () => open(PROFILE.linkedin) },
    ],
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(({ label, hint, group }) =>
      `${label} ${hint ?? ""} ${group}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    const onRequest = () => setIsOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onRequest);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onRequest);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keeps the highlighted row inside the scroll viewport during keyboard nav.
  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  function runAt(index) {
    const cmd = results[index];
    if (!cmd) return;
    if (!cmd.keepOpen) setIsOpen(false);
    cmd.run();
  }

  function onInputKey(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(cursor);
    }
  }

  let lastGroup = null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "rgba(8,9,11,0.72)", backdropFilter: "blur(6px)" }}
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-xl overflow-hidden rounded-xl"
            style={{ background: "var(--raised)", border: "1px solid var(--rule)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 px-4" style={{ borderBottom: "1px solid var(--rule)" }}>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
                &gt;
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search sections, projects, actions…"
                aria-label="Search commands"
                /* Sole focus target in the dialog and auto-focused, so the caret already
                   signals focus — the global focus ring would just add noise here. */
                className="w-full bg-transparent py-4 text-sm outline-none focus-visible:outline-none"
                style={{ color: "var(--ink)" }}
              />
              <kbd
                className="hidden shrink-0 rounded px-1.5 py-0.5 font-mono text-[0.6rem] sm:block"
                style={{ border: "1px solid var(--rule)", color: "var(--muted)" }}
              >
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
              {results.length === 0 && (
                <p className="px-4 py-8 text-center text-sm" style={{ color: "var(--muted)" }}>
                  Nothing matches “{query}”.
                </p>
              )}

              {results.map((cmd, i) => {
                const showGroup = cmd.group !== lastGroup;
                lastGroup = cmd.group;
                const isActive = i === cursor;

                return (
                  <div key={cmd.id}>
                    {showGroup && (
                      <p
                        className="px-4 pb-1.5 pt-3 font-mono text-[0.6rem] uppercase tracking-[0.2em]"
                        style={{ color: "var(--muted)" }}
                      >
                        {cmd.group}
                      </p>
                    )}
                    <button
                      type="button"
                      data-active={isActive}
                      onMouseMove={() => setCursor(i)}
                      onClick={() => runAt(i)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left"
                      style={{ background: isActive ? "rgba(77,124,255,0.1)" : "transparent" }}
                    >
                      <cmd.Icon size={14} style={{ color: isActive ? "var(--accent)" : "var(--muted)" }} />
                      <span className="flex-1 truncate text-sm" style={{ color: "var(--ink)" }}>
                        {cmd.label}
                      </span>
                      {cmd.id === "copy-email" && copied ? (
                        <span className="font-mono text-[0.65rem]" style={{ color: "var(--accent)" }}>
                          copied
                        </span>
                      ) : (
                        cmd.hint && (
                          <span className="hidden truncate font-mono text-[0.65rem] sm:block" style={{ color: "var(--muted)" }}>
                            {cmd.hint}
                          </span>
                        )
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div
              className="flex items-center gap-4 px-4 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.16em]"
              style={{ borderTop: "1px solid var(--rule)", color: "var(--muted)" }}
            >
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span className="ml-auto">{results.length} results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
