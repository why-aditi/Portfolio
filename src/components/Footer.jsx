import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer>
      <div style={{ height: 1, background: "var(--rule)" }} />
      <div
        className="py-8 px-4"
        style={{ background: "var(--surface-alt)" }}
      >
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="font-display text-lg select-none"
            style={{ color: "var(--text)", letterSpacing: "-0.02em" }}
          >
            Aditi Kala
          </span>

<div className="flex items-center gap-4">
            {[
              { icon: <FiGithub size={16} />, href: "https://github.com/why-aditi", label: "GitHub" },
              { icon: <FiLinkedin size={16} />, href: "https://www.linkedin.com/in/adikala/", label: "LinkedIn" },
              { icon: <FiMail size={16} />, href: "mailto:aditi25.kala@gmail.com", label: "Email" },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-opacity hover:opacity-50"
                style={{ color: "var(--text-muted)" }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
