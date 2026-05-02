import { motion } from 'framer-motion';

export function GlassCard({
  children,
  className = '',
  hover = true,
  as = 'div',
  ...motionProps
}) {
  const Tag = motion[as] || motion.div;
  const hoverClass = hover ? '' : 'glass-card-no-hover';

  return (
    <Tag className={`glass-card ${hoverClass} ${className}`} {...motionProps}>
      {children}
    </Tag>
  );
}
