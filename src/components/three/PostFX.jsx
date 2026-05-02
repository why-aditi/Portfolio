import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export function PostFX({
  bloomIntensity = 1.2,
  bloomThreshold = 0.4,
  vignette = true,
  noise = true,
}) {
  return (
    <EffectComposer multisampling={isMobile ? 0 : 4}>
      <Bloom
        mipmapBlur
        luminanceThreshold={bloomThreshold}
        luminanceSmoothing={0.9}
        intensity={isMobile ? bloomIntensity * 0.6 : bloomIntensity}
        blendFunction={BlendFunction.ADD}
      />
      {vignette && (
        <Vignette eskil={false} offset={0.1} darkness={0.65} />
      )}
      {noise && !isMobile && (
        <Noise opacity={0.025} blendFunction={BlendFunction.ADD} />
      )}
    </EffectComposer>
  );
}
