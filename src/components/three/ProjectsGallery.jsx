import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { PostFX } from "./PostFX";
import { useTheme3D } from "../../hooks/useTheme3D";
import { PROJECTS } from "../../constants";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const CARD_W = isMobile ? 1.6 : 2.0;
const CARD_H = CARD_W * 1.35;
const ARC_SPREAD = isMobile ? 0.9 : 1.3;
const ARC_RADIUS = isMobile ? 5 : 7;

function ProjectCard({ project, index, total, colors, activeIndex, onActivate }) {
  const isActive = activeIndex === index;
  const isDimmed = activeIndex !== null && !isActive;

  const offset = index - (total - 1) / 2;
  const angle = (offset / total) * ARC_SPREAD;
  const x = Math.sin(angle) * ARC_RADIUS;
  const z = Math.cos(angle) * ARC_RADIUS - ARC_RADIUS * 0.85;
  const rotY = -angle;

  const color = [colors.pink, colors.purple, colors.blueLight][index % 3];

  const { posZ, scale, emissive } = useSpring({
    posZ: isActive ? z + 2.5 : z,
    scale: isActive ? 1.12 : isDimmed ? 0.88 : 1.0,
    emissive: isActive ? 0.55 : isDimmed ? 0.05 : 0.2,
    config: { mass: 1, tension: 220, friction: 28 },
  });

  return (
    <animated.group
      position-x={x}
      position-y={0}
      position-z={posZ}
      rotation-y={rotY}
      scale={scale}
      onClick={(e) => { e.stopPropagation(); onActivate(isActive ? null : index); }}
    >
      {/* Card face */}
      <mesh>
        <planeGeometry args={[CARD_W, CARD_H, 1, 1]} />
        <animated.meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissive}
          roughness={0.25}
          metalness={0.75}
          transparent
          opacity={isDimmed ? 0.5 : 1}
        />
      </mesh>

      {/* Card border glow */}
      <mesh position={[0, 0, -0.002]}>
        <planeGeometry args={[CARD_W + 0.04, CARD_H + 0.04]} />
        <animated.meshBasicMaterial
          color={color}
          transparent
          opacity={emissive.to((v) => v * 0.4)}
        />
      </mesh>

      <Html
        center
        distanceFactor={isMobile ? 2.8 : 4.5}
        style={{ pointerEvents: "none", width: `${CARD_W * 58}px` }}
        position={[0, 0, 0.01]}
      >
        <div
          style={{
            color: "#fff",
            textAlign: "center",
            fontFamily: "Inter, sans-serif",
            padding: "6px 4px",
          }}
        >
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: isMobile ? 9 : 11,
              fontWeight: 800,
              letterSpacing: "0.03em",
              marginBottom: isActive ? 5 : 0,
              textShadow: "0 1px 6px rgba(0,0,0,0.9)",
            }}
          >
            {project.title}
          </div>
          {isActive && (
            <>
              <div
                style={{
                  fontSize: isMobile ? 7 : 8,
                  opacity: 0.75,
                  lineHeight: 1.4,
                  marginBottom: 4,
                  textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                }}
              >
                {project.description?.slice(0, 70)}…
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                {project.tech?.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 6,
                      padding: "1px 4px",
                      borderRadius: 3,
                      background: "rgba(255,255,255,0.15)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </Html>
    </animated.group>
  );
}

function Scene({ activeIndex, onActivate }) {
  const colors = useTheme3D();
  const projects = PROJECTS.slice(0, isMobile ? 4 : 6);
  const groupRef = useRef();

  useFrame((_, dt) => {
    if (groupRef.current && activeIndex === null) {
      groupRef.current.rotation.y += dt * 0.025;
    }
  });

  return (
    <group ref={groupRef} onClick={() => onActivate(null)}>
      <ambientLight intensity={0.25} />
      <pointLight position={[6, 6, 6]} color={colors.pink} intensity={1.5} />
      <pointLight position={[-6, -4, 4]} color={colors.blueLight} intensity={1.0} />
      {projects.map((project, i) => (
        <ProjectCard
          key={i}
          project={project}
          index={i}
          total={projects.length}
          colors={colors}
          activeIndex={activeIndex}
          onActivate={onActivate}
        />
      ))}
      {!isMobile && (
        <PostFX bloomIntensity={0.9} bloomThreshold={0.38} vignette={false} noise={false} />
      )}
    </group>
  );
}

export default function ProjectsGallery({ activeIndex, onActivate }) {
  return (
    <Canvas
      camera={{ fov: 55, position: [0, 0, isMobile ? 3 : 2.5], near: 0.1, far: 100 }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={[1, isMobile ? 1.5 : 2]}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <Scene activeIndex={activeIndex} onActivate={onActivate} />
    </Canvas>
  );
}
