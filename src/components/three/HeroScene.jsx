import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { PostFX } from "./PostFX";
import { useTheme3D } from "../../hooks/useTheme3D";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const NODE_COUNT = isMobile ? 8 : 14;

function buildHelix(n) {
  const s1 = [], s2 = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 4;
    const y = (i / (n - 1)) * 6 - 3;
    const r = isMobile ? 1.2 : 1.8;
    s1.push(new THREE.Vector3(r * Math.cos(t), y, r * Math.sin(t)));
    s2.push(new THREE.Vector3(r * Math.cos(t + Math.PI), y, r * Math.sin(t + Math.PI)));
  }
  return { s1, s2 };
}

function HelixNode({ position, color, index }) {
  const meshRef = useRef();
  const matRef = useRef();
  const [hovered, setHovered] = useState(false);
  const scaleV = useRef(1);
  const emV = useRef(0.4);

  useFrame((_, dt) => {
    if (!meshRef.current || !matRef.current) return;
    const ts = hovered ? 1.7 : 1.0;
    const te = hovered ? 2.0 : 0.4;
    scaleV.current += (ts - scaleV.current) * Math.min(dt * 10, 1);
    emV.current += (te - emV.current) * Math.min(dt * 10, 1);
    meshRef.current.scale.setScalar(scaleV.current);
    matRef.current.emissiveIntensity = emV.current;
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.13, 14, 14]} />
        <meshStandardMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {hovered && (
        <Sparkles count={isMobile ? 8 : 18} size={3} scale={0.6} speed={0.5} color={color} />
      )}
    </group>
  );
}

function HelixStructure() {
  const colors = useTheme3D();
  const { s1, s2 } = useMemo(() => buildHelix(NODE_COUNT), []);

  const palette = useMemo(
    () => [colors.pink, colors.purple, colors.blueLight],
    [colors]
  );

  const colorList = useMemo(
    () => [...s1, ...s2].map((_, i) => palette[i % 3]),
    [palette, s1, s2]
  );

  const lineSegments = useMemo(() => {
    const segs = [];
    for (let i = 0; i < s1.length - 1; i++) {
      segs.push([s1[i].toArray(), s1[i + 1].toArray()]);
      segs.push([s2[i].toArray(), s2[i + 1].toArray()]);
    }
    for (let i = 0; i < s1.length; i++) {
      segs.push([s1[i].toArray(), s2[i].toArray()]);
    }
    return segs;
  }, [s1, s2]);

  const groupRef = useRef();
  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.15;
  });

  return (
    <group ref={groupRef}>
      {s1.map((pos, i) => (
        <HelixNode key={`s1-${i}`} position={pos.toArray()} color={palette[i % 3]} index={i} />
      ))}
      {s2.map((pos, i) => (
        <HelixNode key={`s2-${i}`} position={pos.toArray()} color={palette[(i + 1) % 3]} index={i} />
      ))}
      {lineSegments.map((pts, i) => (
        <Line key={i} points={pts} color={colorList[i % colorList.length]} lineWidth={0.8} opacity={0.35} transparent />
      ))}
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#D60270" intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#0038A8" intensity={1.0} />
      <pointLight position={[0, 10, -10]} color="#9B4F96" intensity={0.8} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      camera={{ fov: 60, position: [0, 0, isMobile ? 7 : 9], near: 0.1, far: 1000 }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={[1, isMobile ? 1.5 : 2]}
    >
      <Lights />
      <Stars radius={80} depth={40} count={isMobile ? 800 : 1800} factor={4} saturation={0.3} fade />
      <HelixStructure />
      {!isMobile && <PostFX bloomIntensity={1.4} bloomThreshold={0.35} />}
    </Canvas>
  );
}
