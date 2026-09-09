'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isVisibleRef = useRef(false);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktop mouse/trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Instant precision dot positioning via GPU translation
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };
    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    // Check for interactive element hover
    const onElementOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], .clickable, [data-interactive="true"]'
      );
      setIsHovered(Boolean(isInteractive));
    };

    // Smooth trailing physics for the ring (lerp)
    const animateRing = () => {
      const lerpFactor = 0.16; // smooth spring lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onElementOver, { passive: true });

    animFrameId.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onElementOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      aria-hidden="true"
    >
      {/* 1. Precision Center Dot Container */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div
          className={cn(
            'w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-out',
            isHovered
              ? 'bg-cyber-cyan scale-125 shadow-[0_0_10px_#8cd8ff]'
              : isClicked
              ? 'bg-cyber-green scale-75'
              : 'bg-cyber-accent shadow-[0_0_8px_#7c8cff]'
          )}
        />
      </div>

      {/* 2. Trailing Smooth Glow Ring Container */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div
          className={cn(
            'rounded-full border -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out',
            isHovered
              ? 'w-11 h-11 border-cyber-accent bg-cyber-accent/15 shadow-[0_0_18px_rgba(124,140,255,0.4)] scale-110'
              : isClicked
              ? 'w-7 h-7 border-cyber-green bg-cyber-green/20 scale-90'
              : 'w-8 h-8 border-cyber-accent/40 bg-cyber-accent/[0.04]'
          )}
        />
      </div>
    </div>
  );
}

export default CustomCursor;
