import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import AboutImg from "../assets/AboutImg.jpg";
import { ABOUT_TEXT } from "../constants";
import { GlassCard } from "./ui/GlassCard";
import { GradientText } from "./ui/GradientText";

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawParallax = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const imageParallax = useSpring(rawParallax, { stiffness: 60, damping: 18 });

  function onMouseMove(e) {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateY.set(((e.clientX - cx) / rect.width) * 14);
    rotateX.set(-((e.clientY - cy) / rect.height) * 14);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const paragraphs = ABOUT_TEXT.split("\n\n").filter(Boolean);

  return (
    <div ref={sectionRef} className="py-24 border-b" style={{ borderColor: "var(--glass-border)" }}>
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <span
          className="text-xs font-mono uppercase tracking-widest mb-3 block"
          style={{ color: "var(--pink)" }}
        >
          About Me
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
          <GradientText>Who I am</GradientText>
        </h2>
        <div className="gradient-underline mx-auto mt-3" style={{ width: 60 }} />
      </motion.div>

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image — left on desktop */}
        <motion.div
          ref={imageRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{ y: imageParallax, rotateX: springX, rotateY: springY, perspective: 800 }}
          className="flex justify-center lg:justify-end order-2 lg:order-1"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="relative rounded-2xl"
            style={{
              border: "2px solid transparent",
              background:
                "linear-gradient(var(--bg-dark), var(--bg-dark)) padding-box, linear-gradient(135deg, var(--pink), var(--purple), var(--blue)) border-box",
              boxShadow: "0 20px 60px rgba(214,2,112,0.15)",
              maxWidth: 360,
            }}
          >
            <img
              src={AboutImg}
              alt="Aditi Kala"
              className="rounded-2xl w-full h-auto object-cover block"
              style={{ maxWidth: 360 }}
            />
          </div>
        </motion.div>

        {/* Text — right on desktop */}
        <div className="flex flex-col gap-6 order-1 lg:order-2">
          {/* Status chips */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard
              hover={false}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-mono"
              style={{ color: "var(--purple-light)" }}
            >
              🎓 Final Year @ IIIT Pune
            </GlassCard>
            <GlassCard
              hover={false}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-mono"
              style={{ color: "var(--blue-light)" }}
            >
              📍 Pune, India
            </GlassCard>
          </motion.div>

          {/* Paragraphs with staggered reveal */}
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              className="text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
