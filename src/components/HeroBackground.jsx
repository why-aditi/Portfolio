import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

/** World-space XY: nothing inside this radius (plus float slack). */
const CLEAR_RADIUS = 2.45;

function pushOutsideRing(x, y, minR = CLEAR_RADIUS) {
  const d = Math.hypot(x, y);
  if (d < 1e-6) return [minR, 0];
  if (d >= minR) return [x, y];
  const s = minR / d;
  return [x * s * 1.1, y * s * 1.1];
}

function ParticleField() {
  const ref = useRef();
  const count = 900;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      let x;
      let y;
      let z;
      let guard = 0;
      do {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2.95 + Math.random() * 3.35;
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi) - 2.25;
        guard++;
      } while (Math.hypot(x, y) < CLEAR_RADIUS + 0.2 && guard < 28);

      if (Math.hypot(x, y) < CLEAR_RADIUS + 0.2) {
        [x, y] = pushOutsideRing(x, y, CLEAR_RADIUS + 0.45);
      }

      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.024;
      ref.current.rotation.x += delta * 0.006;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.0095}
        sizeAttenuation
        depthWrite={false}
        opacity={0.32}
      />
    </Points>
  );
}

export default function HeroBackground() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      camera={{ position: [0, 0, 5.2], fov: 54 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#D60270" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#0038A8" />
      <ParticleField />
    </Canvas>
  );
}
