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

function OngoingBadge({ size = "sm" }) {
  const isSmall = size === "sm";
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono uppercase tracking-wider rounded-full shrink-0"
      style={{
        fontSize: isSmall ? "9px" : "10px",
        padding: isSmall ? "3px 8px" : "4px 10px",
        background: "rgba(232,146,12,0.12)",
        color: "var(--copper)",
        border: "1px solid rgba(232,146,12,0.4)",
      }}
    >
      <span
        className="pulse-dot rounded-full shrink-0"
        style={{ width: 6, height: 6, background: "var(--copper)", display: "inline-block" }}
      />
      Ongoing
    </span>
  );
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
        className="absolute inset-0 cursor-default backdrop-blur-sm"
        style={{ background: "rgba(4,6,12,0.78)" }}
        onClick={onClose}
        aria-label="Close"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-modal-title"
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl card p-6 md:p-8"
        style={{
          borderColor: range.isPresent ? "rgba(232,146,12,0.35)" : "var(--rule)",
          boxShadow: range.isPresent
            ? "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(232,146,12,0.12)"
            : "0 24px 64px rgba(0,0,0,0.55)",
        }}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 font-mono text-xs w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:opacity-80"
          style={{ color: "var(--text-muted)", border: "1px solid var(--rule)", background: "var(--surface-alt)" }}
          aria-label="Close"
        >
          ✕
        </button>

        {range.isPresent && (
          <div
            className="absolute top-0 left-6 right-6 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(232,146,12,0.5), transparent)" }}
          />
        )}

        <h3
          id="experience-modal-title"
          className="font-display leading-tight mb-1 pr-10"
          style={{ fontSize: "1.45rem", color: range.isPresent ? "var(--copper)" : "var(--text)" }}
        >
          {exp.role}
        </h3>
        <p className="font-mono text-sm mb-4" style={{ color: "var(--copper)" }}>
          {exp.company}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="font-mono text-xs px-2 py-1 rounded-md" style={{ background: "var(--surface-alt)", color: "var(--text-muted)", border: "1px solid var(--rule)" }}>
            {exp.period}
          </span>
          <span className="font-mono text-xs px-2 py-1 rounded-md" style={{ background: "var(--surface-alt)", color: "var(--text-muted)", border: "1px solid var(--rule)" }}>
            {range.monthCount} mo
          </span>
          {range.isPresent && <OngoingBadge size="md" />}
          <span className="font-mono text-xs px-2 py-1 rounded-md" style={{ background: "var(--surface-alt)", color: "var(--text-muted)", border: "1px solid var(--rule)" }}>
            {exp.location}
          </span>
        </div>

        <ul className="flex flex-col gap-3.5 mb-6">
          {(exp.points || []).map((pt, j) => (
            <li
              key={j}
              className="flex items-start gap-3 text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              <span
                className="shrink-0 rounded-full mt-2"
                style={{ width: 5, height: 5, background: "var(--copper)" }}
              />
              {pt}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {(exp.technologies || []).map((t) => (
            <span
              key={t}
              className="font-mono rounded-md"
              style={{
                fontSize: "0.65rem",
                padding: "4px 10px",
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

function TimelineEventCard({ exp, range, isActive, nodeLeft, lane, onSelect }) {
  const isPresent = range.isPresent;
  const accentColor = isPresent ? "var(--copper)" : "var(--signal)";
  const accentRgb = isPresent ? "232,146,12" : "80,128,255";
  const yearMatch = range.startLabel.match(/\d{4}/);
  const displayYear = yearMatch?.[0] ?? "";
  const displayMonth = range.startLabel.replace(/\d{4}/, "").trim();
  const snippet = exp.points?.[0]
    ? `${exp.points[0].slice(0, 72)}${exp.points[0].length > 72 ? "…" : ""}`
    : "";

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={`absolute w-[min(240px,42vw)] text-left rounded-xl transition-all duration-200 cursor-pointer overflow-hidden group ${
        lane === "top" ? "bottom-3" : "top-3"
      }`}
      style={{
        left: `${nodeLeft}%`,
        transform: "translateX(-50%)",
        border: `1px solid ${
          isPresent
            ? isActive
              ? "rgba(232,146,12,0.65)"
              : "rgba(232,146,12,0.42)"
            : isActive
              ? `rgba(${accentRgb},0.55)`
              : `rgba(${accentRgb},0.28)`
        }`,
        background: isActive
          ? `linear-gradient(165deg, #141c2e 0%, ${isPresent ? "#1a2236" : "#152038"} 100%)`
          : `linear-gradient(165deg, ${isPresent ? "#121820" : "#131d30"} 0%, ${isPresent ? "var(--surface-card)" : "#172440"} 100%)`,
        boxShadow: isPresent
          ? isActive
            ? "0 12px 32px rgba(232,146,12,0.18), 0 0 0 1px rgba(232,146,12,0.2), 0 2px 8px rgba(0,0,0,0.4)"
            : "0 4px 24px rgba(232,146,12,0.12), 0 0 0 1px rgba(232,146,12,0.15), 0 2px 8px rgba(0,0,0,0.35)"
          : isActive
            ? `0 12px 32px rgba(${accentRgb},0.14), 0 2px 8px rgba(0,0,0,0.4)`
            : `0 4px 20px rgba(${accentRgb},0.08), 0 2px 8px rgba(0,0,0,0.35)`,
        zIndex: isActive ? 3 : isPresent ? 2 : 1,
      }}
      initial={{ opacity: 0, y: lane === "top" ? -12 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: lane === "top" ? 2 : -2,
        borderColor: `rgba(${accentRgb},0.5)`,
      }}
    >
      {isPresent && (
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: "linear-gradient(90deg, var(--copper), rgba(232,146,12,0.25), var(--copper))" }}
        />
      )}

      {isPresent && (
        <div className="absolute top-3 right-3">
          <OngoingBadge />
        </div>
      )}

      <div className="flex gap-3 p-4">
        <div
          className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-display text-lg"
          style={{
            background: `rgba(${accentRgb},0.12)`,
            border: `1px solid rgba(${accentRgb},0.25)`,
            color: accentColor,
          }}
        >
          {exp.company.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-display leading-none mb-0.5" style={{ fontSize: "1.35rem", color: accentColor }}>
            {displayYear}
          </p>
          <p className="font-mono text-[10px] mb-2 uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            {isPresent ? `${displayMonth} – Present` : displayMonth} · {range.monthCount} mo
          </p>
          <p className="font-semibold text-sm mb-0.5 truncate" style={{ color: accentColor }}>
            {exp.company}
          </p>
          <p className="font-display text-sm leading-snug mb-2 line-clamp-1" style={{ color: "var(--text)" }}>
            {exp.role}
          </p>
          {snippet && (
            <p className="text-[11px] leading-relaxed line-clamp-2 mb-2" style={{ color: "var(--text-muted)" }}>
              {snippet}
            </p>
          )}
          <p
            className="font-mono text-[10px] opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ color: accentColor }}
          >
            click to view more →
          </p>
        </div>
      </div>
    </motion.button>
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

  const topItems = items.filter(({ lane }) => lane === "top");
  const bottomItems = items.filter(({ lane }) => lane === "bottom");

  const renderStem = (item, direction) => {
    const { range, index: i } = item;
    const isActive = selected === i;
    const isPresent = range.isPresent;
    const accentRgb = isPresent ? "232,146,12" : "80,128,255";
    const nodeLeft = toLeft(range.start);

    return (
      <div
        key={`stem-${direction}-${i}`}
        className="absolute pointer-events-none rounded-full"
        style={{
          left: `${nodeLeft}%`,
          transform: "translateX(-50%)",
          width: 2,
          ...(direction === "down" ? { bottom: 0, height: "0.75rem" } : { top: 0, height: "0.75rem" }),
          background: isActive ? `rgba(${accentRgb},0.75)` : "rgba(80,128,255,0.35)",
          opacity: isActive ? 1 : 0.5,
        }}
      />
    );
  };

  return (
    <div className="w-full select-none py-2">
      <p className="font-mono text-[11px] mb-10 text-center tracking-wide">
        <span
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
          style={{
            color: "var(--text-muted)",
            border: "1px solid var(--rule)",
            background: "rgba(13,17,23,0.8)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--copper)" }} />
          Click a role to view more
        </span>
      </p>

      {/* Cards above spine */}
      <div className="relative h-[11.5rem] mb-0">
        {topItems.map((item) => renderStem(item, "down"))}
        {topItems.map(({ exp, range, index: i, lane }) => (
          <TimelineEventCard
            key={exp.company + exp.period}
            exp={exp}
            range={range}
            isActive={selected === i}
            nodeLeft={toLeft(range.start)}
            lane={lane}
            onSelect={() => onSelect(i)}
          />
        ))}
      </div>

      {/* Central spine */}
      <div className="relative h-16 z-10">
        {monthTicks.map((m, i) => {
          if (i % showEvery !== 0 && i !== monthTicks.length - 1) return null;
          return (
            <div
              key={m}
              className="absolute top-1 flex flex-col items-center"
              style={{ left: `${toLeft(m)}%`, transform: "translateX(-50%)" }}
            >
              <span className="font-mono whitespace-nowrap" style={{ fontSize: "0.58rem", color: "var(--text-muted)" }}>
                {formatMonthLabel(m)}
              </span>
            </div>
          );
        })}

        {items.map(({ range, index: i }) => {
          const isActive = selected === i;
          const spanLeft = toLeft(range.start);
          const spanWidth = toWidth(range.start, range.end);
          const isPresent = range.isPresent;
          return (
            <div
              key={`span-${i}`}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${spanLeft}%`, width: `${spanWidth}%`, minWidth: 12 }}
            >
              <div
                className="h-1 rounded-full transition-all duration-200"
                style={{
                  background: isPresent
                    ? "linear-gradient(90deg, rgba(232,146,12,0.55), rgba(232,146,12,0.2))"
                    : "rgba(80,128,255,0.3)",
                  opacity: isActive ? 1 : 0.65,
                }}
              />
              {isPresent && (
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center gap-1"
                  title="Ongoing"
                >
                  <span
                    className="pulse-dot rounded-full"
                    style={{ width: 8, height: 8, background: "var(--copper)", display: "block" }}
                  />
                </div>
              )}
            </div>
          );
        })}

        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 rounded-full"
          style={{ background: "linear-gradient(90deg, rgba(80,128,255,0.15), var(--signal) 15%, var(--signal) 85%, rgba(80,128,255,0.15))" }}
        />

        {monthTicks.map((m) => (
          <div
            key={`tick-${m}`}
            className="absolute top-1/2 -translate-y-1/2 w-px h-3 pointer-events-none"
            style={{ left: `${toLeft(m)}%`, background: "var(--rule)", opacity: 0.35 }}
          />
        ))}

        {items.map(({ range, index: i }) => {
          const isActive = selected === i;
          const isPresent = range.isPresent;
          return (
            <div
              key={`node-${i}`}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${toLeft(range.start)}%` }}
            >
              {isPresent && (
                <span
                  className="pulse-dot absolute inset-0 rounded-full"
                  style={{
                    background: "rgba(232,146,12,0.25)",
                    transform: "scale(2)",
                    display: "block",
                  }}
                />
              )}
              <div
                className="relative rounded-full transition-all duration-200"
                style={{
                  width: isActive ? 14 : 12,
                  height: isActive ? 14 : 12,
                  background: isPresent ? "var(--copper)" : "var(--signal)",
                  border: "2px solid var(--surface)",
                  boxShadow: isActive
                    ? `0 0 0 4px rgba(${isPresent ? "232,146,12" : "80,128,255"},0.2), 0 0 14px rgba(${isPresent ? "232,146,12" : "80,128,255"},0.4)`
                    : isPresent
                      ? "0 0 10px rgba(232,146,12,0.45)"
                      : `0 0 8px rgba(80,128,255,0.3)`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Cards below spine */}
      <div className="relative h-[11.5rem] mt-0">
        {bottomItems.map((item) => renderStem(item, "up"))}
        {bottomItems.map(({ exp, range, index: i, lane }) => (
          <TimelineEventCard
            key={exp.company + exp.period}
            exp={exp}
            range={range}
            isActive={selected === i}
            nodeLeft={toLeft(range.start)}
            lane={lane}
            onSelect={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const items = useMemo(() => {
    const mapped = EXPERIENCES.map((exp, i) => ({
      exp,
      range: parsePeriod(exp.period),
      index: i,
    })).sort((a, b) => a.range.start - b.range.start);

    const byRecency = [...mapped].sort(
      (a, b) => b.range.end - a.range.end || b.range.start - a.range.start
    );
    const laneByIndex = new Map(
      byRecency.map((item, rank) => [item.index, rank % 2 === 0 ? "top" : "bottom"])
    );

    return mapped.map((item) => ({
      ...item,
      lane: laneByIndex.get(item.index),
    }));
  }, []);

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
          <div
            className="absolute top-2 bottom-0 w-px"
            style={{ left: "6px", background: "linear-gradient(180deg, var(--copper), var(--rule))" }}
          />
          <div className="flex flex-col gap-4">
            {[...items].reverse().map(({ exp, range, index: i }) => (
              <motion.button
                key={exp.company + exp.period}
                type="button"
                onClick={() => setSelected(i)}
                className="relative pl-10 text-left w-full rounded-xl p-4 -ml-4 transition-all duration-200 card"
                style={{
                  borderColor: range.isPresent
                    ? selected === i
                      ? "rgba(232,146,12,0.55)"
                      : "rgba(232,146,12,0.35)"
                    : selected === i
                      ? "rgba(232,146,12,0.45)"
                      : "var(--rule)",
                  background: selected === i
                    ? "linear-gradient(160deg, #141c2e 0%, var(--surface-card) 100%)"
                    : range.isPresent
                      ? "linear-gradient(160deg, #121820 0%, var(--surface-card) 100%)"
                      : "var(--surface-card)",
                  boxShadow: range.isPresent
                    ? "0 4px 20px rgba(232,146,12,0.1), 0 0 0 1px rgba(232,146,12,0.12)"
                    : selected === i
                      ? "0 8px 24px rgba(232,146,12,0.1)"
                      : undefined,
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div
                  className="absolute top-5 rounded-full"
                  style={{
                    left: 0,
                    width: 12,
                    height: 12,
                    background: range.isPresent ? "var(--copper)" : "var(--surface-alt)",
                    border: `2px solid ${range.isPresent ? "var(--copper)" : "var(--rule)"}`,
                    boxShadow: range.isPresent ? "0 0 10px rgba(232,146,12,0.45)" : "none",
                  }}
                >
                  {range.isPresent && (
                    <span
                      className="pulse-dot absolute inset-0 rounded-full"
                      style={{ background: "rgba(232,146,12,0.35)", transform: "scale(2)", display: "block" }}
                    />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                  <span>{exp.period}</span>
                  <span>· {range.monthCount} mo</span>
                  {range.isPresent && <OngoingBadge />}
                </div>
                <h3 className="font-display text-lg mb-1" style={{ color: "var(--text)" }}>{exp.role}</h3>
                <p className="text-sm font-medium mb-2" style={{ color: "var(--copper)" }}>{exp.company}</p>
                <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                  Tap to view more →
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
