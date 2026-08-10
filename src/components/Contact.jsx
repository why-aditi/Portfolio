import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import Band from "./SectionHead";
import { PROFILE } from "../constants";

const CHANNELS = [
  { icon: FiMail, href: `mailto:${PROFILE.email}`, label: "Email", value: PROFILE.email },
  { icon: FiGithub, href: PROFILE.github, label: "GitHub", value: "why-aditi" },
  { icon: FiLinkedin, href: PROFILE.linkedin, label: "LinkedIn", value: "adikala" },
  { icon: SiLeetcode, href: PROFILE.leetcode, label: "LeetCode", value: "AditiKala" },
];

export default function Contact() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const data = new FormData(e.target);
    try {
      const res = await fetch("https://getform.io/f/blllvyqb", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Form responded ${res.status}`);
      setStatus("success");
      e.target.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Band id="contact" label="Contact" title="Let's build something.">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2.5">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em]" style={{ color: "var(--ink)" }}>
              Open to 2026 roles
            </span>
          </div>

          <div style={{ borderTop: "1px solid var(--rule)" }}>
            {CHANNELS.map(({ icon: Icon, href, label, value }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="row row-link -mx-3 flex items-center gap-4 px-3"
              >
                <Icon size={15} style={{ color: "var(--muted)" }} />
                <span
                  className="font-mono text-[0.7rem] uppercase tracking-[0.16em]"
                  style={{ color: "var(--muted)", minWidth: "5rem" }}
                >
                  {label}
                </span>
                <span className="truncate text-sm" style={{ color: "var(--ink)" }}>
                  {value}
                </span>
              </a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {status === "success" ? (
            <div className="flex flex-col items-start gap-4 rounded-lg p-8" style={{ border: "1px solid var(--rule)", background: "var(--raised)" }}>
              <h3 className="t-h3">Message sent.</h3>
              <p className="t-body text-sm">I read everything and reply within a day or two.</p>
              <button onClick={() => setStatus("idle")} className="btn btn-ghost mt-1">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
                    Name
                  </span>
                  <input name="name" required className="field" placeholder="Your name" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
                    Email
                  </span>
                  <input name="email" type="email" required className="field" placeholder="you@company.com" />
                </label>
              </div>

              <label className="flex flex-col gap-1">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
                  Subject
                </span>
                <input name="subject" required className="field" placeholder="What's this about?" />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
                  Message
                </span>
                <textarea name="message" required rows={5} className="field" placeholder="A few lines is plenty." style={{ resize: "none" }} />
              </label>

              {status === "error" && (
                <p role="alert" className="font-mono text-xs" style={{ color: "#ff6b6b" }}>
                  That didn&apos;t send. Email {PROFILE.email} instead.
                </p>
              )}

              <button type="submit" disabled={status === "loading"} className="btn btn-primary self-start">
                {status === "loading" ? (
                  <>
                    <span className="spinner" /> Sending
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </Band>
  );
}
