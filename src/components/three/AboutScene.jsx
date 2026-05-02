import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { PostFX } from "./PostFX";
import { useTheme3D } from "../../hooks/useTheme3D";
import AboutImg from "../../assets/AboutImg.jpg";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

const torusVert = `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const torusFrag = `
  uniform float uTime;
  uniform vec3 uPink;
  uniform vec3 uPurple;
  uniform vec3 uBlue;
  varying vec3 vPos;
  void main() {
    float a = atan(vPos.z, vPos.x) + uTime * 0.6;
    float t = sin(a) * 0.5 + 0.5;
    float s = cos(a + 2.094) * 0.5 + 0.5;
    vec3 color = mix(mix(uPink, uPurple, t), uBlue, s * 0.6);
    gl_FragColor = vec4(color, 1.0);
  }
`;

function GradientTorus({ colors }) {
  const matRef = useRef();
  const uniforms = useMemo(() => ({
    uTime:   { value: 0 },
    uPink:   { value: colors.pink },
    uPurple: { value: colors.purple },
    uBlue:   { value: colors.blueLight },
  }), [colors]);

  useEffect(() => {
    uniforms.uPink.value = colors.pink;
    uniforms.uPurple.value = colors.purple;
    uniforms.uBlue.value = colors.blueLight;
  }, [colors, uniforms]);

  useFrame((_, dt) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += dt;
  });

  return (
    <mesh rotation-x={Math.PI / 6}>
      <torusGeometry args={[1.8, 0.06, 16, 80]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={torusVert}
        fragmentShader={torusFrag}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function OrbitingOrb({ radius, speed, yOffset, color, size }) {
  const ref = useRef();
  const angle = useRef(Math.random() * Math.PI * 2);
  useFrame((_, dt) => {
    if (!ref.current) return;
    angle.current += dt * speed;
    ref.current.position.x = Math.cos(angle.current) * radius;
    ref.current.position.z = Math.sin(angle.current) * radius;
    ref.current.position.y = yOffset + Math.sin(angle.current * 2) * 0.3;
    ref.current.rotation.x += dt * 0.6;
    ref.current.rotation.y += dt * 0.4;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.1} metalness={0.9} wireframe />
    </mesh>
  );
}

function PhotoPlane() {
  const texture = useTexture(AboutImg);
  const meshRef = useRef();
  const distortRef = useRef(0.08);
  const targetDistort = useRef(0.08);

  useFrame((_, dt) => {
    if (!meshRef.current) return;
    distortRef.current += (targetDistort.current - distortRef.current) * Math.min(dt * 6, 1);
    if (meshRef.current.children[0]?.material) {
      meshRef.current.children[0].material.distort = distortRef.current;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => { targetDistort.current = 0.28; }}
      onPointerOut={() => { targetDistort.current = 0.08; }}
    >
      <planeGeometry args={[2.4, 3.2, 32, 32]} />
      <MeshDistortMaterial
        map={texture}
        distort={0.08}
        speed={1.4}
        roughness={0}
      />
    </mesh>
  );
}

function Scene() {
  const colors = useTheme3D();
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#D60270" intensity={1.2} />
      <pointLight position={[-5, -5, 5]} color="#0038A8" intensity={0.8} />
      <PhotoPlane />
      <GradientTorus colors={colors} />
      <OrbitingOrb radius={2.5} speed={0.5} yOffset={0.3}  color={colors.pink}   size={0.14} />
      <OrbitingOrb radius={2.8} speed={0.35} yOffset={-0.5} color={colors.purple} size={0.18} />
      <OrbitingOrb radius={2.2} speed={0.65} yOffset={0.8}  color={colors.blueLight} size={0.12} />
      {!isMobile && <PostFX bloomIntensity={0.9} bloomThreshold={0.3} noise={false} />}
    </>
  );
}

export default function AboutScene() {
  return (
    <Canvas
      camera={{ fov: 50, position: [0, 0, 5], near: 0.1, far: 100 }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={[1, isMobile ? 1.5 : 2]}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
