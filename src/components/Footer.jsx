import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { PROFILE } from "../constants";

const SOCIALS = [
  { Icon: FiGithub, href: PROFILE.github, label: "GitHub" },
  { Icon: FiLinkedin, href: PROFILE.linkedin, label: "LinkedIn" },
  { Icon: FiMail, href: `mailto:${PROFILE.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--rule)" }}>
      <div className="shell flex flex-col items-center justify-between gap-5 py-8 sm:flex-row">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
          Aditi Kala &middot; Built in React
        </span>

        <div className="flex items-center gap-5">
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="transition-colors hover:text-ink"
              style={{ color: "var(--muted)" }}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
