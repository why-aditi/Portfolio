import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { PostFX } from "./PostFX";
import { useTheme3D } from "../../hooks/useTheme3D";
import { ACHIEVEMENTS } from "../../constants";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

const SHAPES = ["octahedron", "icosahedron", "dodecahedron", "tetrahedron"];

function TrophyObject({ achievement, index, total, color }) {
  const offset = index - (total - 1) / 2;
  const x = offset * (isMobile ? 2.2 : 2.8);
  const shape = SHAPES[index % SHAPES.length];

  return (
    <Float speed={0.8 + index * 0.15} rotationIntensity={0.4} floatIntensity={0.6} floatingRange={[-0.15, 0.15]}>
      <group position={[x, 0, 0]}>
        <mesh>
          {shape === "octahedron"   && <octahedronGeometry args={[0.5, 0]} />}
          {shape === "icosahedron"  && <icosahedronGeometry args={[0.48, 1]} />}
          {shape === "dodecahedron" && <dodecahedronGeometry args={[0.46, 0]} />}
          {shape === "tetrahedron"  && <tetrahedronGeometry args={[0.52, 0]} />}
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.45}
            roughness={0.08}
            metalness={0.95}
          />
        </mesh>

        {/* Wireframe overlay */}
        <mesh>
          {shape === "octahedron"   && <octahedronGeometry args={[0.52, 0]} />}
          {shape === "icosahedron"  && <icosahedronGeometry args={[0.5, 1]} />}
          {shape === "dodecahedron" && <dodecahedronGeometry args={[0.48, 0]} />}
          {shape === "tetrahedron"  && <tetrahedronGeometry args={[0.54, 0]} />}
          <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
        </mesh>

        <Html
          center
          distanceFactor={isMobile ? 4 : 6}
          position={[0, -0.85, 0]}
          style={{ pointerEvents: "none", width: isMobile ? "80px" : "100px" }}
        >
          <div
            style={{
              textAlign: "center",
              color: "#fff",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <div style={{ fontSize: isMobile ? 14 : 18, marginBottom: 2 }}>
              {achievement.emoji}
            </div>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: isMobile ? 7 : 8,
                fontWeight: 700,
                lineHeight: 1.3,
                textShadow: "0 1px 6px rgba(0,0,0,0.9)",
              }}
            >
              {achievement.title}
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function Scene() {
  const colors = useTheme3D();
  const palette = [colors.pink, colors.purple, colors.blueLight, colors.pinkLight];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} color={colors.pink} intensity={1.8} />
      <pointLight position={[0, -5, 5]} color={colors.blueLight} intensity={1.2} />
      <pointLight position={[8, 0, 3]} color={colors.purple} intensity={0.8} />

      {ACHIEVEMENTS.map((a, i) => (
        <TrophyObject
          key={i}
          achievement={a}
          index={i}
          total={ACHIEVEMENTS.length}
          color={palette[i % palette.length]}
        />
      ))}

      {!isMobile && (
        <PostFX bloomIntensity={1.3} bloomThreshold={0.28} vignette={false} noise={false} />
      )}
    </>
  );
}

export default function TrophyShelf() {
  return (
    <Canvas
      camera={{
        fov: 50,
        position: [0, 0, isMobile ? 8 : 7],
        near: 0.1,
        far: 100,
      }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={[1, isMobile ? 1.5 : 2]}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
