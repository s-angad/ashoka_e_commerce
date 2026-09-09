import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorMode, setCursorMode] = useState<'default' | 'hover' | 'view'>('default');
  const [cursorText, setCursorText] = useState('');

  // Smooth springs for cursor position
  const cursorX = useSpring(-100, { stiffness: 400, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 400, damping: 28 });
  const ringX = useSpring(-100, { stiffness: 200, damping: 22 });
  const ringY = useSpring(-100, { stiffness: 200, damping: 22 });

  useEffect(() => {
    // Disable custom cursor on touch devices or prefers-reduced-motion
    const touchCheck = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotionCheck = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touchCheck || reducedMotionCheck) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Check element under cursor for cursor attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const mode = cursorTarget.getAttribute('data-cursor');
        if (mode === 'view') {
          setCursorMode('view');
          setCursorText('VIEW');
          return;
        } else if (mode === 'zoom') {
          setCursorMode('view');
          setCursorText('ZOOM');
          return;
        }
      }

      const interactiveTarget = target.closest('button, a, [role="button"], input, select');
      if (interactiveTarget) {
        setCursorMode('hover');
        setCursorText('');
      } else {
        setCursorMode('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, ringX, ringY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central Cursor Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`fixed top-0 left-0 rounded-full bg-[#C59B27] transition-all duration-150 ${
          cursorMode === 'view' ? 'w-0 h-0 opacity-0' : cursorMode === 'hover' ? 'w-2 h-2 bg-[#1C3A27]' : 'w-2.5 h-2.5'
        }`}
      />

      {/* Trailing Ring / View Pill */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`fixed top-0 left-0 rounded-full border border-[#C59B27]/60 flex items-center justify-center font-bold font-serif text-[10px] tracking-wider transition-all duration-200 ${
          cursorMode === 'view'
            ? 'w-14 h-14 bg-[#1C3A27]/90 text-amber-200 backdrop-blur-xs border-amber-300/40 shadow-xl scale-100'
            : cursorMode === 'hover'
            ? 'w-10 h-10 border-[#1C3A27]/40 bg-[#1C3A27]/10 backdrop-blur-[2px] scale-110'
            : 'w-7 h-7 bg-transparent scale-100'
        }`}
      >
        {cursorMode === 'view' && cursorText}
      </motion.div>
    </div>
  );
};
