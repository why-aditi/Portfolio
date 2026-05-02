import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme3D } from "../../hooks/useTheme3D";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const COUNT = isMobile ? 500 : 1200;

function ParticleSphere({ colors }) {
  const ref = useRef();
  const ringRef = useRef();

  const { positions, colors: colorsArr } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const palette = [colors.pink, colors.purple, colors.blueLight, colors.pinkLight];

    for (let i = 0; i < COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / COUNT);
      const theta = Math.sqrt(COUNT * Math.PI) * phi;
      const r = 2.0 + (Math.random() - 0.5) * 0.3;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[i % palette.length];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [colors]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.12;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.07) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.08;
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={colorsArr} count={COUNT} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.032} vertexColors sizeAttenuation transparent opacity={0.85} />
      </points>

      {/* Equatorial ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.1, 0.015, 8, 120]} />
        <meshStandardMaterial
          color={colors.pink}
          emissive={colors.pink}
          emissiveIntensity={0.8}
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh rotation-x={Math.PI / 2} rotation-z={Math.PI / 4}>
        <torusGeometry args={[2.1, 0.012, 8, 120]} />
        <meshStandardMaterial
          color={colors.blueLight}
          emissive={colors.blueLight}
          emissiveIntensity={0.7}
          transparent
          opacity={0.45}
        />
      </mesh>
    </>
  );
}

function Scene() {
  const colors = useTheme3D();
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 4, 4]} color={colors.pink} intensity={1.2} />
      <pointLight position={[-4, -4, 4]} color={colors.blueLight} intensity={0.9} />
      <ParticleSphere colors={colors} />
    </>
  );
}

export default function OrbitTransition() {
  return (
    <Canvas
      camera={{ fov: 55, position: [0, 0, isMobile ? 6.5 : 5.5], near: 0.1, far: 100 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
