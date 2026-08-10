import { useEffect, useRef, useState } from "react";
import { prefersReduced } from "../lib/interaction";

/**
 * Signature interaction: the cursor acts as a lens that reveals a live Sobel
 * edge-detection pass over the portrait — the same 3x3 operator behind the
 * segmentation work in the projects below.
 *
 * The convolution runs once per size change, not per frame; the rAF loop only
 * clips and blits the pre-computed result.
 */
export default function EdgeLens({ src, alt }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const edgeRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0, radius: 0, target: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const img = new Image();
    let raf;
    let disposed = false;

    /** Paints the image with `object-fit: cover; object-position: top` semantics. */
    function drawCover(target, w, h) {
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      target.drawImage(img, (w - dw) / 2, 0, dw, dh);
    }

    function buildEdges() {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));

      canvas.width = w;
      canvas.height = h;

      const edge = document.createElement("canvas");
      edge.width = w;
      edge.height = h;
      const ectx = edge.getContext("2d", { willReadFrequently: true });
      drawCover(ectx, w, h);

      const { data } = ectx.getImageData(0, 0, w, h);
      const gray = new Float32Array(w * h);
      for (let i = 0; i < gray.length; i++) {
        gray[i] = data[i * 4] * 0.299 + data[i * 4 + 1] * 0.587 + data[i * 4 + 2] * 0.114;
      }

      const out = ectx.createImageData(w, h);
      const o = out.data;
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          const gx =
            -gray[i - w - 1] - 2 * gray[i - 1] - gray[i + w - 1] +
            gray[i - w + 1] + 2 * gray[i + 1] + gray[i + w + 1];
          const gy =
            -gray[i - w - 1] - 2 * gray[i - w] - gray[i - w + 1] +
            gray[i + w - 1] + 2 * gray[i + w] + gray[i + w + 1];
          const t = Math.min(255, Math.hypot(gx, gy)) / 255;
          const j = i * 4;
          o[j] = 77 * t;
          o[j + 1] = 124 * t;
          o[j + 2] = 255 * t;
          o[j + 3] = 255;
        }
      }
      ectx.putImageData(out, 0, 0);
      edgeRef.current = edge;
    }

    function frame() {
      const p = pointer.current;
      p.radius += (p.target - p.radius) * 0.16;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (edgeRef.current && p.radius > 1) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(edgeRef.current, 0, 0);
        ctx.restore();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(77,124,255,0.55)";
        ctx.lineWidth = dpr;
        ctx.stroke();
      }
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      pointer.current.x = (e.clientX - rect.left) * dpr;
      pointer.current.y = (e.clientY - rect.top) * dpr;
      pointer.current.target = 92 * dpr;
      setActive(true);
    };
    const onLeave = () => {
      pointer.current.target = 0;
      setActive(false);
    };

    img.onload = () => {
      if (disposed) return;
      buildEdges();
      raf = requestAnimationFrame(frame);
    };
    img.src = src;

    const ro = new ResizeObserver(() => {
      if (img.complete && img.naturalWidth) buildEdges();
    });
    ro.observe(wrap);

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [src]);

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden rounded-lg cursor-crosshair"
      style={{ border: "1px solid var(--rule)", aspectRatio: "3/4" }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-top"
        style={{ filter: "grayscale(1) contrast(1.05)" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(8,9,11,0.75), transparent 55%)" }}
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />

      <span
        className="pointer-events-none absolute bottom-3 left-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] transition-opacity duration-300"
        style={{ color: active ? "var(--accent)" : "var(--muted)", opacity: active ? 1 : 0.65 }}
      >
        {active ? "sobel 3×3" : "hover to scan"}
      </span>
    </div>
  );
}
