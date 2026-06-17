import { motion } from "framer-motion";
import AboutImg from "../assets/AboutImg.jpg";
import { ABOUT_TEXT } from "../constants";

export default function About() {
  const paragraphs = ABOUT_TEXT.split("\n\n").filter(Boolean);

  return (
    <div className="py-24 border-b" style={{ borderColor: "var(--rule)" }}>
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-label">About me</span>
      </motion.div>

      <motion.div
        className="card overflow-hidden"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]">
          {/* Photo — fills full left height */}
          <div className="relative" style={{ minHeight: 420 }}>
            <img
              src={AboutImg}
              alt="Aditi Kala"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, transparent 70%, var(--surface-card))",
              }}
            />
          </div>

          {/* Content */}
          <div
            className="flex flex-col gap-6 p-8 lg:p-10"
            style={{ borderLeft: "1px solid var(--rule)" }}
          >
            <h2
              className="font-display italic leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "var(--text)" }}
            >
              At the seam.
            </h2>

            <div className="flex flex-col gap-4">
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-2 mt-auto" style={{ borderTop: "1px solid var(--rule)" }}>
              {[
                "ECE @ IIIT Pune",
                "Graduating May 2026",
                "Pune, India",
              ].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-3 py-1.5 rounded-full border"
                  style={{
                    color: "var(--text-muted)",
                    borderColor: "var(--rule)",
                    background: "var(--surface-alt)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
