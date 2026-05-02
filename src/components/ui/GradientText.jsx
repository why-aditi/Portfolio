export function GradientText({ children, className = '', shimmer = false }) {
  return (
    <span className={`${shimmer ? 'shimmer' : 'gradient-text'} ${className}`}>
      {children}
    </span>
  );
}
