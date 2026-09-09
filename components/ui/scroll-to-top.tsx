'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { playClick, playHover } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }

      setIsVisible(scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    playClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG circular geometry
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-40 transition-all duration-300 transform',
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-4 pointer-events-none scale-90'
      )}
    >
      <button
        type="button"
        onClick={handleScrollToTop}
        onMouseEnter={playHover}
        aria-label={`Scroll to top (${Math.round(scrollProgress)}% scrolled)`}
        title={`Scroll to top (${Math.round(scrollProgress)}%)`}
        className="group relative w-12 h-12 rounded-full bg-cyber-card/90 backdrop-blur-xl border border-cyber-border hover:border-cyber-accent/50 shadow-glass-card hover:shadow-glow-accent transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-accent"
      >
        {/* SVG Circular Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 48 48"
        >
          <defs>
            <linearGradient id="scrollProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c8cff" />
              <stop offset="50%" stopColor="#8cd8ff" />
              <stop offset="100%" stopColor="#78e6bc" />
            </linearGradient>
          </defs>

          {/* Background Track Circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="2.5"
          />

          {/* Dynamic Animated Scroll Progress Circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="url(#scrollProgressGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.1s ease-out',
            }}
          />
        </svg>

        {/* Center Icon & Percentage on Hover */}
        <div className="relative z-10 flex items-center justify-center text-cyber-secondary group-hover:text-cyber-accent transition-colors">
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </div>

        {/* Floating Percentage Indicator Tooltip */}
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyber-dark/95 border border-cyber-border text-cyber-accent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
          {Math.round(scrollProgress)}%
        </span>
      </button>
    </div>
  );
}

export default ScrollToTop;
