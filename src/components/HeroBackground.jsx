import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";

const COLORS = ["#D60270", "#9B4F96", "#0038A8", "#FF6B9D", "#C77DFF", "#4895EF"];

/** World-space XY: nothing inside this radius (plus float slack). */
const CLEAR_RADIUS = 2.45;

function pushOutsideRing(x, y, minR = CLEAR_RADIUS) {
  const d = Math.hypot(x, y);
  if (d < 1e-6) return [minR, 0];
  if (d >= minR) return [x, y];
  const s = minR / d;
  return [x * s * 1.1, y * s * 1.1];
}

function FloatingShapes() {
  const shapes = useMemo(() => {
    const list = [];
    const total = 28;

    for (let i = 0; i < total; i++) {
      const t = (i / total) * Math.PI * 2 + i * 0.19;
      const ring = i % 4;
      const baseR = 2.85 + (ring % 3) * 0.48;
      let x = Math.cos(t + ring * 0.38) * baseR;
      let y = Math.sin(t * 0.82 + ring * 0.52) * 2.15 + (ring - 1.5) * 0.85;
      const z = -1.85 - (i % 6) * 0.18 - Math.abs(Math.sin(t)) * 0.45;

      [x, y] = pushOutsideRing(x, y);

      if (y > -0.2 && y < 1.5 && Math.abs(x) < 3.1) {
        x += Math.sign(x || 1) * 0.72;
        [x, y] = pushOutsideRing(x, y);
      }

      list.push({
        geo: i % 3 === 0 ? "octahedron" : "icosahedron",
        pos: [x, y, z],
        size: 0.11 + (i % 5) * 0.032,
        color: COLORS[i % COLORS.length],
        speed: 0.35 + (i % 6) * 0.1,
      });
    }

    const corners = [
      [-4.15, 2.75, -1.35],
      [4.1, 2.65, -1.45],
      [-4.0, -2.75, -1.5],
      [4.05, -2.65, -1.25],
      [-4.25, -1.1, -1.95],
      [4.2, 1.05, -1.85],
      [-3.95, 1.35, -1.55],
      [3.9, -1.25, -1.7],
    ];
    corners.forEach((pos, j) => {
      list.push({
        geo: j % 2 ? "octahedron" : "icosahedron",
        pos,
        size: 0.14 + (j % 3) * 0.025,
        color: COLORS[(j + 2) % COLORS.length],
        speed: 0.45 + j * 0.06,
      });
    });

    return list;
  }, []);

  return (
    <>
      {shapes.map((s, i) => (
        <Float
          key={i}
          speed={s.speed}
          rotationIntensity={0.22}
          floatIntensity={0.16}
          floatingRange={[-0.05, 0.05]}
          position={s.pos}
        >
          <mesh>
            {s.geo === "octahedron" ? (
              <octahedronGeometry args={[s.size, 0]} />
            ) : (
              <icosahedronGeometry args={[s.size, 0]} />
            )}
            <meshStandardMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={0.34}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </>
  );
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
      <FloatingShapes />
      <ParticleField />
    </Canvas>
  );
}
