import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Splits text into per-word clipped boxes that slide up when scrolled into view.
 * Whitespace is preserved outside the clipping boxes so wrapping still works.
 */
export function Kinetic({ text, as: Tag = "span", className = "", style, delayStep = 0.055 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={`${className} ${inView ? "kinetic-in" : ""}`} style={style}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="kinetic-word">
            <span style={{ transitionDelay: `${i * delayStep}s` }}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/**
 * Section wrapper: a hairline-topped band with a sticky label rail on the left
 * so the reader always knows which section they're inside on long scrolls.
 */
export default function Band({ id, label, title, lede, children }) {
  return (
    <section id={id} className="band">
      <div className="shell grid gap-y-10 gap-x-12 lg:grid-cols-[10rem_1fr] xl:grid-cols-[13rem_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <span className="eyebrow">{label}</span>
        </div>

        <div>
          {title && <Kinetic as="h2" text={title} className="t-h2 mb-6" />}
          {lede && <p className="t-body max-w-xl mb-14">{lede}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
