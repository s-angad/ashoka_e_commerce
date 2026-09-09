import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, HTMLMotionProps } from 'framer-motion';

interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Maximum offset in pixels (default 7px)
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 7,
  onClick,
  disabled,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 600, damping: 28 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const touchCheck = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotionCheck = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touchCheck || reducedMotionCheck) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouchDevice || disabled || !ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Calculate percentage offset capped at strength px
    const deltaX = (distanceX / (width / 2)) * strength;
    const deltaY = (distanceY / (height / 2)) * strength;

    x.set(Math.max(-strength, Math.min(strength, deltaX)));
    y.set(Math.max(-strength, Math.min(strength, deltaY)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{
        x: springX,
        y: springY,
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center transition-shadow duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
