import { useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { ACHIEVEMENTS } from "../constants";
import { GlassCard } from "./ui/GlassCard";
import { Marquee } from "./ui/Marquee";
import { GradientText } from "./ui/GradientText";

const MARQUEE_ITEMS = [
  "🏆 Kakushin 9.0 Finalist",
  "🧠 Top 7.8% LeetCode",
  "🔥 500+ problems solved",
  "⚡ ScriptedByHer Top 40",
  "🔬 NEST Semi-Finalist",
  "💻 AI + Full Stack + CV",
  "🚀 3× Hackathon Finalist",
];

export default function Achievements() {
  const firedRef = useRef(false);

  function onEnter() {
    if (firedRef.current) return;
    firedRef.current = true;
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.55 },
      colors: ["#D60270", "#9B4F96", "#0038A8", "#FF6B9D", "#C77DFF"],
    });
  }

  return (
    <div className="py-24" style={{ borderBottom: "1px solid var(--glass-border)" }}>
      {/* Header */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          onViewportEnter={onEnter}
        >
          <span
            className="text-xs font-mono uppercase tracking-widest mb-3 block"
            style={{ color: "var(--pink)" }}
          >
            Recognition
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
            <GradientText>Achievements</GradientText> ✦
          </h2>
          <motion.div
            className="gradient-underline mx-auto mt-3"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
        </motion.div>
      </div>

      {/* Marquee strip */}
      <Marquee speed="25s" className="mb-14 py-4">
        {MARQUEE_ITEMS.map((item, i) => (
          <GlassCard
            key={i}
            hover={false}
            className="mx-3 px-5 py-2.5 rounded-full inline-flex items-center gap-2 whitespace-nowrap font-mono text-sm shrink-0"
            style={{ color: "var(--text-secondary)" }}
          >
            {item}
          </GlassCard>
        ))}
      </Marquee>

      {/* Achievement cards */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ACHIEVEMENTS.map((ach, i) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="p-6 flex flex-col gap-3 h-full">
                <span style={{ fontSize: "2.2rem" }}>{ach.emoji}</span>
                <h3
                  className="font-display text-lg font-bold leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {ach.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {ach.detail}
                </p>
                <span
                  className="text-xs font-mono mt-auto"
                  style={{ color: "var(--pink-light)" }}
                >
                  {ach.year}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
