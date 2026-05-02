import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PostFX } from "./PostFX";
import { useTheme3D } from "../../hooks/useTheme3D";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

const vortexVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const vortexFrag = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec3 vPos;

  void main() {
    float angle = atan(vPos.z, vPos.x);
    float r = length(vec2(vPos.x, vPos.z));

    float spiral  = sin(angle * 5.0 - uTime * 2.2 + r * 2.5) * 0.5 + 0.5;
    float pulse   = sin(angle * 2.0 + uTime * 1.1) * 0.5 + 0.5;
    float radial  = smoothstep(0.0, 1.0, sin(r * 4.0 - uTime * 3.0) * 0.5 + 0.5);

    vec3 color = mix(uColor1, uColor2, spiral);
    color = mix(color, uColor3, pulse * 0.45);
    color += radial * 0.15 * uColor1;

    float alpha = 0.55 + spiral * 0.3 + radial * 0.15;
    gl_FragColor = vec4(color, alpha);
  }
`;

function VortexTorus({ colors }) {
  const mat1Ref = useRef();
  const mat2Ref = useRef();
  const mat3Ref = useRef();
  const groupRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime:   { value: 0 },
      uColor1: { value: colors.pink.clone() },
      uColor2: { value: colors.purple.clone() },
      uColor3: { value: colors.blueLight.clone() },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uColor1.value.copy(colors.pink);
    uniforms.uColor2.value.copy(colors.purple);
    uniforms.uColor3.value.copy(colors.blueLight);
  }, [colors, uniforms]);

  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
    if (groupRef.current) groupRef.current.rotation.z += dt * 0.06;
  });

  const sharedProps = {
    vertexShader: vortexVert,
    fragmentShader: vortexFrag,
    uniforms,
    transparent: true,
    side: THREE.DoubleSide,
  };

  return (
    <group ref={groupRef}>
      <mesh rotation-x={Math.PI * 0.22}>
        <torusGeometry args={[isMobile ? 2.6 : 3.2, isMobile ? 0.65 : 0.8, 32, 128]} />
        <shaderMaterial ref={mat1Ref} {...sharedProps} />
      </mesh>

      <mesh rotation-x={Math.PI * 0.22} rotation-z={Math.PI * 0.42}>
        <torusGeometry args={[isMobile ? 1.9 : 2.4, isMobile ? 0.45 : 0.55, 24, 96]} />
        <shaderMaterial ref={mat2Ref} {...sharedProps} />
      </mesh>

      <mesh rotation-x={Math.PI * 0.55} rotation-y={Math.PI * 0.25}>
        <torusGeometry args={[isMobile ? 1.4 : 1.7, isMobile ? 0.28 : 0.35, 16, 80]} />
        <shaderMaterial ref={mat3Ref} {...sharedProps} />
      </mesh>
    </group>
  );
}

function FloatingParticles({ colors }) {
  const ref = useRef();
  const count = isMobile ? 60 : 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={colors.pinkLight} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

function Scene() {
  const colors = useTheme3D();
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 4]} color={colors.pink} intensity={2.0} />
      <pointLight position={[4, 4, 2]} color={colors.purple} intensity={0.8} />
      <VortexTorus colors={colors} />
      <FloatingParticles colors={colors} />
      {!isMobile && (
        <PostFX bloomIntensity={2.0} bloomThreshold={0.12} vignette={true} noise={false} />
      )}
    </>
  );
}

export default function ContactWormhole() {
  return (
    <Canvas
      camera={{
        fov: 60,
        position: [0, 0, isMobile ? 7 : 6],
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
