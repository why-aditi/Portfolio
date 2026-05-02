import { useId } from "react";

/**
 * Abstract gradient spark — matches pink / purple / blue site palette.
 */
export function BrandMark({ size = 40, className = "" }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `brand-mark-grad-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="2" y1="4" x2="38" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--pink)" />
          <stop offset="0.45" stopColor="var(--purple)" />
          <stop offset="1" stopColor="var(--blue)" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="13" fill={`url(#${gradId})`} opacity="0.1" />
      {/* Four-point spark */}
      <path
        d="M20 3.5 L23.8 15.2 L36 17.5 L24.1 20.3 L20 36.5 L15.9 20.3 L4 17.5 L16.2 15.2 Z"
        stroke={`url(#${gradId})`}
        strokeWidth="1.25"
        strokeLinejoin="round"
        fill={`url(#${gradId})`}
        fillOpacity="0.2"
      />
      <circle cx="20" cy="20" r="2.8" fill={`url(#${gradId})`} />
    </svg>
  );
}
