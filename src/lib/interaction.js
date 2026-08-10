import { useEffect, useRef } from "react";

export const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * "React.js" / "React" / "react" all collapse to "react" so skill chips can be
 * matched against project tech lists that were written inconsistently.
 */
export const normalizeTech = (t) =>
  t.toLowerCase().replace(/\.js$/, "").replace(/[\s.\-/]/g, "");

/** Pulls an element toward the pointer while hovered. Returns a ref to attach. */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) * strength;
      const dy = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const reset = () => {
      el.style.transform = "";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    el.addEventListener("blur", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      el.removeEventListener("blur", reset);
    };
  }, [strength]);

  return ref;
}

/**
 * Writes pointer position onto the element as --mx/--my percentages so CSS can
 * render a spotlight without React re-rendering on every mouse move.
 */
export function useSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return ref;
}
