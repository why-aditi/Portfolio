import confetti from "canvas-confetti";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import { BrandMark } from "./ui/BrandMark";

function easterEgg() {
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 1, x: 0.5 },
    startVelocity: 45,
    colors: ["#D60270", "#9B4F96", "#0038A8", "#FF6B9D", "#C77DFF"],
  });
}

export default function Footer() {
  return (
    <footer className="pt-0">
      {/* Gradient divider */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--pink), var(--purple), var(--blue), transparent)",
        }}
      />

      <div
        className="py-10 px-4"
        style={{ background: "var(--bg-mid)" }}
      >
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <button
            type="button"
            onClick={easterEgg}
            className="flex items-center justify-center rounded-2xl p-2 select-none cursor-pointer transition-all hover:scale-105 active:scale-95"
            style={{
              border: "1px solid var(--glass-border)",
              background: "linear-gradient(145deg, rgba(214,2,112,0.1), rgba(0,56,168,0.06))",
              boxShadow: "0 0 20px rgba(214, 2, 112, 0.15)",
            }}
            aria-label="Celebrate — confetti surprise"
          >
            <BrandMark size={38} className="drop-shadow-[0_0_10px_rgba(155,79,150,0.4)]" />
          </button>

          <div className="flex items-center gap-4">
            {[
              { icon: <FiGithub size={18} />, href: "https://github.com/why-aditi", label: "GitHub" },
              { icon: <FiLinkedin size={18} />, href: "https://www.linkedin.com/in/adikala/", label: "LinkedIn" },
              { icon: <FiMail size={18} />, href: "mailto:aditi25.kala@gmail.com", label: "Email" },
            ].map(({ icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color: "var(--text-secondary)" }}
                whileHover={{ scale: 1.15, color: "var(--pink)" }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
