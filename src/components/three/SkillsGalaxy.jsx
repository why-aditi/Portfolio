import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { PostFX } from "./PostFX";
import { useTheme3D } from "../../hooks/useTheme3D";
import { SKILLS } from "../../constants";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

const CLUSTER_CENTERS = {
  Languages:  [-3.5,  0.5, 0],
  Frameworks: [ 0.5,  0.2, 0],
  Tools:      [ 3.5, -0.3, 0],
  "Cloud / DB": [0, -2.5, 0],
};

const CLUSTER_COLORS = {
  Languages:    "pink",
  Frameworks:   "purple",
  Tools:        "blueLight",
  "Cloud / DB": "pinkLight",
};

function buildNodes(colors) {
  const nodes = [];
  Object.entries(SKILLS).forEach(([cat, skills]) => {
    const center = CLUSTER_CENTERS[cat] || [0, 0, 0];
    const colorKey = CLUSTER_COLORS[cat] || "purple";
    skills.forEach((name, j) => {
      const phi = Math.acos(-1 + (2 * j) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const r = isMobile ? 0.9 : 1.1;
      nodes.push({
        id: `${cat}-${name}`,
        name,
        cat,
        color: colors[colorKey],
        pos: [
          center[0] + r * Math.sin(phi) * Math.cos(theta),
          center[1] + r * Math.sin(phi) * Math.sin(theta),
          center[2] + r * Math.cos(phi) * (isMobile ? 0.4 : 0.8),
        ],
      });
    });
  });
  return nodes;
}

function SkillNode({ node, activeCategory }) {
  const meshRef = useRef();
  const matRef = useRef();
  const [hovered, setHovered] = useState(false);
  const scaleV = useRef(1);
  const emV = useRef(0.4);
  const dimmed = activeCategory && node.cat !== activeCategory;

  useFrame((_, dt) => {
    if (!meshRef.current || !matRef.current) return;
    const ts = hovered ? 1.8 : 1.0;
    const te = dimmed ? 0.05 : hovered ? 2.0 : 0.45;
    scaleV.current += (ts - scaleV.current) * Math.min(dt * 9, 1);
    emV.current += (te - emV.current) * Math.min(dt * 7, 1);
    meshRef.current.scale.setScalar(scaleV.current);
    matRef.current.emissiveIntensity = emV.current;
    matRef.current.opacity = dimmed ? 0.25 : 1;
  });

  return (
    <group position={node.pos}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial
          ref={matRef}
          color={node.color}
          emissive={node.color}
          emissiveIntensity={0.45}
          roughness={0.2}
          metalness={0.8}
          transparent
        />
      </mesh>
      {hovered && (
        <Html center distanceFactor={isMobile ? 5 : 8} style={{ pointerEvents: "none" }}>
          <div
            style={{
              padding: "4px 10px",
              background: "rgba(10,10,15,0.85)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8,
              color: "#fff",
              fontSize: 11,
              fontFamily: "JetBrains Mono, monospace",
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
            }}
          >
            {node.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function ClusterLines({ nodes, colors }) {
  const segments = useMemo(() => {
    const segs = [];
    const cats = Object.keys(SKILLS);
    cats.forEach((cat) => {
      const group = nodes.filter((n) => n.cat === cat);
      for (let i = 0; i < group.length - 1; i++) {
        segs.push({ pts: [group[i].pos, group[i + 1].pos], color: group[i].color });
      }
    });
    return segs;
  }, [nodes]);

  return (
    <>
      {segments.map((s, i) => (
        <Line key={i} points={s.pts} color={s.color} lineWidth={0.5} opacity={0.25} transparent />
      ))}
    </>
  );
}

function Galaxy({ activeCategory }) {
  const colors = useTheme3D();
  const nodes = useMemo(() => buildNodes(colors), [colors]);
  const groupRef = useRef();

  useFrame((_, dt) => {
    if (groupRef.current && !activeCategory) {
      groupRef.current.rotation.y += dt * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[8, 8, 8]}  color="#D60270" intensity={1.2} />
      <pointLight position={[-8, -8, -8]} color="#0038A8" intensity={0.9} />
      {nodes.map((n) => (
        <SkillNode key={n.id} node={n} activeCategory={activeCategory} />
      ))}
      <ClusterLines nodes={nodes} colors={colors} />
    </group>
  );
}

export default function SkillsGalaxy({ activeCategory }) {
  return (
    <Canvas
      camera={{ fov: 60, position: [0, 0, isMobile ? 8 : 7], near: 0.1, far: 200 }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={[1, isMobile ? 1.5 : 2]}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <Galaxy activeCategory={activeCategory} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!activeCategory}
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
      />
      {!isMobile && <PostFX bloomIntensity={1.0} bloomThreshold={0.35} noise={false} />}
    </Canvas>
  );
}
