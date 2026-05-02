import { useState, useEffect } from "react";

export function useMouseParallax(strength = 0.02) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth  - 0.5) * 2 * strength,
        y: -(e.clientY / window.innerHeight - 0.5) * 2 * strength,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);
  return mouse;
}
