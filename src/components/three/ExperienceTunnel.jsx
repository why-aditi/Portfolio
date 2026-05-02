import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PostFX } from "./PostFX";
import { useTheme3D } from "../../hooks/useTheme3D";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const RING_COUNT = isMobile ? 14 : 22;
const RING_SPACING = 3.5;
const TOTAL_LENGTH = RING_COUNT * RING_SPACING;

function TunnelRings({ colors }) {
  const groupRef = useRef();
  const rings = useMemo(
    () =>
      Array.from({ length: RING_COUNT }, (_, i) => ({
        z: -i * RING_SPACING,
        color: [colors.pink, colors.purple, colors.blueLight][i % 3],
        radius: 2.2 + Math.sin(i * 1.3) * 0.4,
      })),
    [colors]
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const speed = 1.8;
    groupRef.current.children.forEach((ring, i) => {
      let z = rings[i].z + (state.clock.elapsedTime * speed) % TOTAL_LENGTH;
      if (z > 4) z -= TOTAL_LENGTH;
      ring.position.z = z;
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((r, i) => (
        <mesh key={i} position={[0, 0, r.z]} rotation-x={Math.PI / 2}>
          <torusGeometry args={[r.radius, 0.035, 8, 56]} />
          <meshStandardMaterial
            color={r.color}
            emissive={r.color}
            emissiveIntensity={0.7}
            transparent
            opacity={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}

function Sparks({ colors }) {
  const count = isMobile ? 40 : 80;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * 0.6;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = Math.sin(angle) * r;
      arr[i * 3 + 2] = (Math.random() - 0.5) * TOTAL_LENGTH;
    }
    return arr;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      pos.array[i * 3 + 2] += 0.06;
      if (pos.array[i * 3 + 2] > 4) pos.array[i * 3 + 2] -= TOTAL_LENGTH;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color={colors.pinkLight} sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

function Scene({ scrollProgress }) {
  const colors = useTheme3D();

  useFrame((state) => {
    const base = 6;
    const drift = Math.sin(state.clock.elapsedTime * 0.25) * 0.3;
    state.camera.position.y = drift;
    state.camera.position.x = Math.cos(state.clock.elapsedTime * 0.18) * 0.25;
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 3]} color={colors.pink} intensity={2.5} />
      <pointLight position={[0, 0, -20]} color={colors.blueLight} intensity={1.5} />
      <TunnelRings colors={colors} />
      <Sparks colors={colors} />
      {!isMobile && (
        <PostFX bloomIntensity={1.8} bloomThreshold={0.15} vignette={true} noise={false} />
      )}
    </>
  );
}

export default function ExperienceTunnel({ scrollProgress }) {
  return (
    <Canvas
      camera={{ fov: 80, position: [0, 0, 6], near: 0.1, far: 120 }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={[1, isMobile ? 1.5 : 2]}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <Scene scrollProgress={scrollProgress} />
    </Canvas>
  );
}
