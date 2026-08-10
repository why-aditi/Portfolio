import { motion } from "framer-motion";
import AboutImg from "../assets/AboutImg.jpg";
import Band from "./SectionHead";
import EdgeLens from "./EdgeLens";
import { ABOUT_TEXT } from "../constants";

const FACTS = [
  ["Studying", "ECE, IIIT Pune"],
  ["Graduating", "May 2026"],
  ["Based in", "Pune, India"],
  ["Working on", "Voice & vision agents"],
];

export default function About() {
  const paragraphs = ABOUT_TEXT.split("\n\n").filter(Boolean);

  return (
    <Band id="about" label="About" title="At the seam.">
      <div className="grid gap-12 md:grid-cols-[1fr_18rem] md:items-start">
        <div className="flex flex-col gap-5">
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              className="t-body max-w-2xl"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {para}
            </motion.p>
          ))}

          <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {FACTS.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3" style={{ borderBottom: "1px solid var(--rule)" }}>
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>
                  {k}
                </dt>
                <dd className="font-mono text-[0.75rem] text-right" style={{ color: "var(--ink)" }}>
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <EdgeLens src={AboutImg} alt="Aditi Kala" />
        </motion.figure>
      </div>
    </Band>
  );
}
