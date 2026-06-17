import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCES } from "../constants";

const MONTH_MAP = {
  Jan: 0, January: 0, Feb: 1, February: 1, Mar: 2, March: 2, Apr: 3, April: 3,
  May: 4, Jun: 5, June: 5, Jul: 6, July: 6, Aug: 7, August: 7,
  Sep: 8, September: 8, Oct: 9, October: 9, Nov: 10, November: 10, Dec: 11, December: 11,
};

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseMonths(str) {
  const [m, y] = str.trim().split(/\s+/);
  return parseInt(y) * 12 + (MONTH_MAP[m] ?? 0);
}

function parsePeriod(period) {
  const [startStr, endStr] = period.split(/\s*[–-]\s*/);
  const now = new Date();
  const nowM = now.getFullYear() * 12 + now.getMonth();
  const start = parseMonths(startStr);
  const end = /present/i.test(endStr ?? "") ? nowM : parseMonths(endStr ?? startStr);
  return {
    start,
    end: Math.max(end, start),
    isPresent: /present/i.test(endStr ?? ""),
    startLabel: startStr.trim(),
    monthCount: Math.max(end, start) - start + 1,
  };
}

function formatMonthLabel(monthIndex) {
  const year = Math.floor(monthIndex / 12);
  const month = monthIndex % 12;
  return `${MONTH_SHORT[month]} '${String(year).slice(2)}`;
}

function ExperienceModal({ item, onClose }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!item) return null;

  const { exp, range } = item;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        style={{ background: "rgba(0,0,0,0.72)" }}
        onClick={onClose}
        aria-label="Close"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-modal-title"
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg card p-6 md:p-8"
        style={{ borderColor: range.isPresent ? "rgba(232,146,12,0.28)" : "var(--rule)" }}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 font-mono text-xs px-2 py-1 rounded transition-colors"
          style={{ color: "var(--text-muted)", border: "1px solid var(--rule)" }}
          aria-label="Close"
        >
          ✕
        </button>

        <h3
          id="experience-modal-title"
          className="font-display leading-tight mb-1 pr-8"
          style={{ fontSize: "1.35rem", color: range.isPresent ? "var(--copper)" : "var(--text)" }}
        >
          {exp.role}
        </h3>
        <p className="font-mono text-sm mb-4" style={{ color: "var(--copper)" }}>
          {exp.company}
        </p>

        <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs mb-6" style={{ color: "var(--text-muted)" }}>
          <span>{exp.period}</span>
          <span>·</span>
          <span>{range.monthCount} mo</span>
          {range.isPresent && (
            <>
              <span>·</span>
              <span
                className="uppercase tracking-wider px-1.5 py-0.5 rounded text-[10px]"
                style={{
                  background: "rgba(80,128,255,0.1)",
                  color: "var(--signal)",
                  border: "1px solid rgba(80,128,255,0.2)",
                }}
              >
                Current
              </span>
            </>
          )}
          <span>·</span>
          <span>{exp.location}</span>
        </div>

        <ul className="flex flex-col gap-3 mb-6">
          {(exp.points || []).map((pt, j) => (
            <li
              key={j}
              className="flex items-start gap-3 text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              <span
                className="shrink-0 rounded-full mt-2"
                style={{ width: 4, height: 4, background: "var(--copper)" }}
              />
              {pt}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {(exp.technologies || []).map((t) => (
            <span
              key={t}
              className="font-mono rounded"
              style={{
                fontSize: "0.65rem",
                padding: "3px 8px",
                background: "var(--surface-alt)",
                border: "1px solid var(--rule)",
                color: "var(--text-muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MonthScaledTimeline({ items, selected, onSelect }) {
  const { tMin, totalMonths, monthTicks } = useMemo(() => {
    const min = Math.min(...items.map(({ range }) => range.start));
    const max = Math.max(...items.map(({ range }) => range.end));
    const ticks = [];
    for (let m = min; m <= max; m++) ticks.push(m);
    return {
      tMin: min,
      totalMonths: Math.max(max - min + 1, 1),
      monthTicks: ticks,
    };
  }, [items]);

  const toLeft = (month) => ((month - tMin) / totalMonths) * 100;
  const toWidth = (start, end) => ((end - start + 1) / totalMonths) * 100;
  const showEvery = monthTicks.length > 16 ? 2 : 1;

  return (
    <div className="w-full select-none">
      <p className="font-mono text-xs mb-4 text-center" style={{ color: "var(--text-muted)" }}>
        Click a role to view more
      </p>

      <div className="relative h-7 mb-1">
        {monthTicks.map((m, i) => {
          if (i % showEvery !== 0 && i !== monthTicks.length - 1) return null;
          return (
            <div
              key={m}
              className="absolute top-0"
              style={{ left: `${toLeft(m)}%`, transform: "translateX(-50%)" }}
            >
              <span className="font-mono whitespace-nowrap" style={{ fontSize: "0.55rem", color: "var(--text-muted)" }}>
                {formatMonthLabel(m)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="relative h-8 mb-2">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px" style={{ background: "var(--rule)" }} />
        {monthTicks.map((m) => (
          <div
            key={`tick-${m}`}
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${toLeft(m)}%`, background: "var(--rule)", opacity: 0.3 }}
          />
        ))}
        {items.map(({ range, index: i }) => {
          const isActive = selected === i;
          return (
            <div
              key={`node-${i}`}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full"
              style={{
                left: `${toLeft(range.start)}%`,
                width: 9,
                height: 9,
                background: range.isPresent ? "var(--copper)" : "var(--surface-card)",
                border: `2px solid ${isActive || range.isPresent ? "var(--copper)" : "var(--rule)"}`,
                boxShadow: isActive ? "0 0 8px rgba(232,146,12,0.4)" : "none",
              }}
            />
          );
        })}
      </div>

      <div className="relative h-24">
        {items.map(({ exp, range, index: i }) => {
          const isActive = selected === i;
          const left = toLeft(range.start);
          const width = toWidth(range.start, range.end);

          return (
            <motion.button
              key={exp.company + exp.period}
              type="button"
              onClick={() => onSelect(i)}
              className="absolute top-0 h-full flex flex-col justify-center px-2.5 py-2 rounded-md transition-all duration-150 cursor-pointer overflow-hidden text-left"
              style={{
                left: `${left}%`,
                width: `${width}%`,
                minWidth: 72,
                border: `1px solid ${isActive ? "rgba(232,146,12,0.5)" : "var(--rule)"}`,
                background: isActive ? "var(--surface-alt)" : "var(--surface-card)",
                zIndex: isActive ? 2 : 1,
              }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ borderColor: "rgba(232,146,12,0.35)" }}
            >
              <p
                className="font-mono truncate"
                style={{ fontSize: "0.58rem", color: isActive ? "var(--copper)" : "var(--text-muted)" }}
              >
                {exp.company}
              </p>
              <p
                className="font-display truncate leading-tight"
                style={{
                  fontSize: width < 14 ? "0.68rem" : "0.78rem",
                  color: isActive ? "var(--text)" : "var(--text-muted)",
                }}
              >
                {exp.role}
              </p>
              <p className="font-mono mt-auto truncate" style={{ fontSize: "0.48rem", color: "var(--text-muted)" }}>
                {range.monthCount} mo · click to view
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function Experience() {
  const items = useMemo(
    () =>
      EXPERIENCES.map((exp, i) => ({
        exp,
        range: parsePeriod(exp.period),
        index: i,
      })).sort((a, b) => a.range.start - b.range.start),
    []
  );

  const [selected, setSelected] = useState(null);
  const activeItem = selected !== null ? items.find(({ index }) => index === selected) : null;

  return (
    <div className="py-24 border-b" style={{ borderColor: "var(--rule)" }}>
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">Experience</span>
          <h2
            className="font-display leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)" }}
          >
            Work
          </h2>
        </motion.div>
      </div>

      <div className="hidden md:block w-full px-[4vw] lg:px-[5vw]">
        <MonthScaledTimeline items={items} selected={selected} onSelect={setSelected} />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <p className="md:hidden font-mono text-xs mb-4 text-center" style={{ color: "var(--text-muted)" }}>
          Click a role to view more
        </p>

        <div className="md:hidden relative mt-2">
          <div className="absolute top-2 bottom-0 w-px" style={{ left: "6px", background: "var(--rule)" }} />
          <div className="flex flex-col gap-6">
            {items.map(({ exp, range, index: i }) => (
              <motion.button
                key={exp.company + exp.period}
                type="button"
                onClick={() => setSelected(i)}
                className="relative pl-10 text-left w-full rounded-lg p-4 -ml-4 transition-colors"
                style={{
                  border: selected === i ? "1px solid rgba(232,146,12,0.4)" : "1px solid transparent",
                  background: selected === i ? "var(--surface-alt)" : "transparent",
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div
                  className="absolute top-5 rounded-full"
                  style={{
                    left: 0,
                    width: 12,
                    height: 12,
                    background: range.isPresent ? "var(--copper)" : "var(--surface-alt)",
                    border: `2px solid ${range.isPresent ? "var(--copper)" : "var(--rule)"}`,
                  }}
                />
                <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                  <span>{exp.period}</span>
                  <span>· {range.monthCount} mo</span>
                  <span>· {exp.location}</span>
                </div>
                <h3 className="font-display text-lg mb-1" style={{ color: "var(--text)" }}>{exp.role}</h3>
                <p className="text-sm font-medium" style={{ color: "var(--copper)" }}>{exp.company}</p>
                <p className="font-mono text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                  Click to view more →
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeItem && (
          <ExperienceModal item={activeItem} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
