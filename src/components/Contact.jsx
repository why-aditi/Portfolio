import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

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
      if (res.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="py-24">
      {/* Header — centered */}
      <motion.div className="text-center mb-10" {...fadeUp()}>
        <span className="section-label">Contact</span>
        <h2
          className="font-display leading-tight mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)" }}
        >
          Let&apos;s build something.
        </h2>
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: "#22c55e" }} />
          <span className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>
            Open to opportunities
          </span>
        </div>
      </motion.div>

      {/* Social links */}
      <motion.div className="flex justify-center gap-4 mb-10" {...fadeUp(0.08)}>
        {[
          { icon: <FiMail size={18} />, href: "mailto:aditi25.kala@gmail.com", label: "Email" },
          { icon: <FiGithub size={18} />, href: "https://github.com/why-aditi", label: "GitHub" },
          { icon: <FiLinkedin size={18} />, href: "https://www.linkedin.com/in/adikala/", label: "LinkedIn" },
        ].map(({ icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={label}
            className="p-3 rounded-lg card card-no-hover transition-opacity hover:opacity-60"
            style={{ color: "var(--text-muted)" }}
          >
            {icon}
          </a>
        ))}
      </motion.div>

      {/* Form */}
      <motion.div className="max-w-2xl mx-auto" {...fadeUp(0.12)}>
        {status === "success" ? (
          <div className="card p-10 text-center flex flex-col items-center gap-4">
            <h4 className="font-display text-xl" style={{ color: "var(--text)" }}>Message sent</h4>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>I'll get back to you soon.</p>
            <button onClick={() => setStatus("idle")} className="btn-outline text-sm mt-1">
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card p-6 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Name</label>
                <input name="name" required className="form-input" placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Email</label>
                <input name="email" type="email" required className="form-input" placeholder="your@email.com" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Subject</label>
              <input name="subject" required className="form-input" placeholder="What's this about?" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Message</label>
              <textarea name="message" required rows={5} className="form-input" placeholder="Tell me more..." style={{ resize: "none" }} />
            </div>

            {status === "error" && (
              <p className="font-mono text-xs" style={{ color: "#dc2626" }}>
                Something went wrong — try emailing me directly.
              </p>
            )}

            <button type="submit" disabled={status === "loading"} className="btn-primary w-full justify-center">
              {status === "loading" ? <><span className="spinner" /> Sending...</> : "Send message →"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
