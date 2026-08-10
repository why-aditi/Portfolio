import { motion } from "framer-motion";
import Band from "./SectionHead";
import { EXPERIENCES } from "../constants";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Jun 2025 – Present" → { months: 14, isPresent: true }. Unparseable input falls back to 1 month. */
function duration(period) {
  const [from, to = ""] = period.split(/\s*[–-]\s*/);
  const isPresent = /present/i.test(to);
  const toIndex = (s) => {
    const [m, y] = s.trim().split(/\s+/);
    const month = MONTHS.findIndex((x) => m?.startsWith(x));
    return Number(y) * 12 + (month < 0 ? 0 : month);
  };
  const now = new Date();
  const start = toIndex(from);
  const end = isPresent ? now.getFullYear() * 12 + now.getMonth() : toIndex(to || from);
  return { months: Math.max(end - start + 1, 1), isPresent };
}

export default function Experience() {
  return (
    <Band
      id="experience"
      label="Experience"
      title="Where I've shipped"
      lede="Two internships, both on systems that real users touched daily."
    >
      <div style={{ borderTop: "1px solid var(--rule)" }}>
        {EXPERIENCES.map((exp, i) => {
          const { months, isPresent } = duration(exp.period);

          return (
            <motion.article
              key={exp.company + exp.period}
              className="grid gap-6 py-10 lg:grid-cols-[13rem_1fr] lg:gap-12"
              style={{ borderBottom: "1px solid var(--rule)" }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[0.72rem] tracking-[0.08em]" style={{ color: "var(--ink)" }}>
                  {exp.period}
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>
                  {months} mo · {exp.location}
                </span>
                {isPresent && (
                  <span className="mt-1 flex items-center gap-2">
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                    <span
                      className="font-mono text-[0.62rem] uppercase tracking-[0.2em]"
                      style={{ color: "var(--accent)" }}
                    >
                      Ongoing
                    </span>
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="t-h3" style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.8rem)" }}>
                    {exp.role}
                  </h3>
                  <p className="font-mono text-sm mt-1" style={{ color: "var(--accent)" }}>
                    {exp.company}
                  </p>
                </div>

                <ul className="flex flex-col gap-3">
                  {exp.points?.map((pt, j) => (
                    <li key={j} className="t-body flex gap-3.5 text-sm">
                      <span className="mt-[0.65em] h-px w-3.5 shrink-0" style={{ background: "var(--rule)" }} />
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.technologies?.map((t) => (
                    <span key={t} className="badge">{t}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Band>
  );
}
