export function Marquee({ children, speed = '30s', className = '' }) {
  return (
    <div
      className={`marquee-container overflow-hidden ${className}`}
      style={{ '--marquee-speed': speed }}
    >
      <div className="marquee-track">
        {children}
        {children}
      </div>
    </div>
  );
}
