'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className, size = 32, showText = false }: LogoProps) {
  return (
    <div className={cn('inline-flex items-center gap-2.5 select-none group', className)}>
      <div
        style={{ width: size, height: size }}
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
      >
        {/* Ambient Glow */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyber-accent via-cyber-cyan to-cyber-green opacity-40 blur-md group-hover:opacity-75 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />

        {/* Bespoke Geometric YJ Cyber Shield SVG */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-md"
        >
          <defs>
            <linearGradient id="yjGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c8cff" />
              <stop offset="50%" stopColor="#8cd8ff" />
              <stop offset="100%" stopColor="#78e6bc" />
            </linearGradient>
            <linearGradient id="yjGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b8a8ff" />
              <stop offset="100%" stopColor="#7c8cff" />
            </linearGradient>
            <linearGradient id="yjBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#070b12" />
            </linearGradient>
            <filter id="yjGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Hexagonal Cyber Container */}
          <polygon
            points="50,4 92,26 92,74 50,96 8,74 8,26"
            fill="url(#yjBg)"
            stroke="url(#yjGrad1)"
            strokeWidth="3.5"
            strokeLinejoin="round"
            className="transition-all duration-300 group-hover:stroke-[4]"
          />

          {/* Inner Accent Ring */}
          <polygon
            points="50,11 85,29 85,71 50,89 15,71 15,29"
            fill="none"
            stroke="rgba(140, 216, 255, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Stylized Monogram "Y" (Top arms and stem) */}
          <path
            d="M26 27 L44 48 L44 56 L34 56 L20 38 Z"
            fill="url(#yjGrad1)"
          />
          <path
            d="M74 27 L56 48 L56 56 L66 56 L80 38 Z"
            fill="url(#yjGrad2)"
          />
          <path
            d="M45 49 L55 49 L55 64 L45 64 Z"
            fill="url(#yjGrad1)"
          />

          {/* Stylized Monogram "J" (Flowing curve anchored from center to right hook) */}
          <path
            d="M57 40 L69 40 L69 66 C69 76 60 83 48 83 C38 83 31 77 29 70 L38 68 C39 72 43 75 48 75 C54 75 58 72 58 65 Z"
            fill="url(#yjGrad1)"
          />

          {/* Cyber Core Quantum Dot / Terminal Accent */}
          <circle cx="50" cy="50" r="3" fill="#78e6bc" filter="url(#yjGlow)" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-mono text-sm font-bold tracking-tight text-foreground group-hover:text-cyber-accent transition-colors">
            YASH JANGID
          </span>
          <span className="text-[10px] font-mono text-cyber-muted tracking-widest uppercase">
            AI Platform Engineer
          </span>
        </div>
      )}
    </div>
  );
}

export default Logo;
