import { useMemo } from "react";
import * as THREE from "three";
import { useTheme } from "../components/ThemeProvider";

export function useTheme3D() {
  const { theme } = useTheme();
  return useMemo(() => {
    const root = document.documentElement;
    const get = (v) => getComputedStyle(root).getPropertyValue(v).trim() || null;
    return {
      pink:        new THREE.Color(get("--pink")         || "#D60270"),
      purple:      new THREE.Color(get("--purple")       || "#9B4F96"),
      blue:        new THREE.Color(get("--blue")         || "#0038A8"),
      pinkLight:   new THREE.Color(get("--pink-light")   || "#FF6B9D"),
      purpleLight: new THREE.Color(get("--purple-light") || "#C77DFF"),
      blueLight:   new THREE.Color(get("--blue-light")   || "#4895EF"),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);
}
