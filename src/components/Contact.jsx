import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import confetti from "canvas-confetti";
import { GlassCard } from "./ui/GlassCard";
import { GradientText } from "./ui/GradientText";

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  background: "var(--surface)",
  border: "1px solid var(--glass-border)",
  borderRadius: 10,
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

function FloatInput({ id, label, type = "text", name, required, textarea }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className="relative">
      <Tag
        id={id}
        name={name}
        type={textarea ? undefined : type}
        required={required}
        rows={textarea ? 5 : undefined}
        placeholder=" "
        style={{
          ...inputStyle,
          resize: textarea ? "none" : undefined,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--pink)";
          e.target.style.boxShadow = "0 0 0 2px rgba(214,2,112,0.2)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--glass-border)";
          e.target.style.boxShadow = "none";
        }}
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-3 text-sm pointer-events-none transition-all duration-200"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </label>
      <style>{`
        #${id}:not(:placeholder-shown) ~ label,
        #${id}:focus ~ label {
          transform: translateY(-22px) scale(0.8);
          transform-origin: left;
          color: var(--pink);
          background: var(--bg-dark);
          padding: 0 4px;
          left: 12px;
        }
      `}</style>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("https://getform.io/f/blllvyqb", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#D60270", "#9B4F96", "#0038A8"],
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="py-24">
      {/* Header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <span
          className="text-xs font-mono uppercase tracking-widest mb-3 block"
          style={{ color: "var(--pink)" }}
        >
          Contact
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
          Let&apos;s build something <GradientText>unhinged</GradientText> together
        </h2>
        <motion.div
          className="gradient-underline mx-auto mt-3"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />

        {/* Availability badge */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <span
            className="w-2 h-2 rounded-full pulse-dot"
            style={{ background: "#22c55e", display: "inline-block" }}
          />
          <span className="text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
            Open to opportunities 🟢
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Left: info */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <h3 className="font-display text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              Say hi — I don&apos;t bite 🌸
            </h3>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Whether you have a project idea, want to collaborate, or just want to talk tech — my inbox is always open.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:aditi25.kala@gmail.com"
              className="flex items-center gap-3 text-sm font-mono transition-opacity hover:opacity-70"
              style={{ color: "var(--text-secondary)" }}
            >
              <FiMail size={16} style={{ color: "var(--pink)" }} />
              aditi25.kala@gmail.com
            </a>
            <span className="flex items-center gap-3 text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--blue-light)" }}>📍</span>
              Pune, India
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              { icon: <FiGithub size={22} />, href: "https://github.com/why-aditi", label: "GitHub" },
              { icon: <FiLinkedin size={22} />, href: "https://www.linkedin.com/in/aditi-kala-7b0b55290/", label: "LinkedIn" },
              { icon: <FiMail size={22} />, href: "mailto:aditi25.kala@gmail.com", label: "Email" },
            ].map(({ icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-xl glass-card"
                style={{ color: "var(--text-secondary)" }}
                whileHover={{ scale: 1.1, color: "var(--pink)" }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <GlassCard className="p-8">
            {status === "success" ? (
              <div className="text-center py-8 flex flex-col items-center gap-4">
                <span style={{ fontSize: "3rem" }}>🎉</span>
                <h4 className="font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  Message sent!
                </h4>
                <p style={{ color: "var(--text-secondary)" }}>
                  I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-ghost text-sm mt-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <FloatInput id="name" name="name" label="Your name" required />
                  <FloatInput id="email" name="email" label="Your email" type="email" required />
                </div>
                <FloatInput id="subject" name="subject" label="Subject" required />
                <FloatInput id="message" name="message" label="Message" required textarea />

                {status === "error" && (
                  <p className="text-sm font-mono" style={{ color: "#f87171" }}>
                    Something went wrong — try emailing me directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-gradient w-full justify-center"
                >
                  {status === "loading" ? (
                    <>
                      <span className="spinner" /> Sending...
                    </>
                  ) : (
                    "Send Message →"
                  )}
                </button>
              </form>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
