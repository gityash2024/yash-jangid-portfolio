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
        className="relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
      >
        {/* Subtle Ambient Glow */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyber-accent/30 via-cyber-cyan/20 to-cyber-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />

        {/* Bespoke Geometric YJ Vector Monogram SVG */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-sm transition-transform duration-200"
        >
          <defs>
            <linearGradient id="yjLogoBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c8cff" />
              <stop offset="50%" stopColor="#8cd8ff" />
              <stop offset="100%" stopColor="#78e6bc" />
            </linearGradient>
            <linearGradient id="yjLogoGradY" x1="25%" y1="25%" x2="50%" y2="55%">
              <stop offset="0%" stopColor="#b8a8ff" />
              <stop offset="100%" stopColor="#7c8cff" />
            </linearGradient>
            <linearGradient id="yjLogoGradJ" x1="75%" y1="25%" x2="20%" y2="85%">
              <stop offset="0%" stopColor="#8cd8ff" />
              <stop offset="50%" stopColor="#7c8cff" />
              <stop offset="100%" stopColor="#78e6bc" />
            </linearGradient>
            <linearGradient id="yjLogoBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d1527" />
              <stop offset="100%" stopColor="#05080f" />
            </linearGradient>
          </defs>

          {/* Modern Rounded Squircle Frame */}
          <rect
            x="5"
            y="5"
            width="90"
            height="90"
            rx="22"
            fill="url(#yjLogoBg)"
            stroke="url(#yjLogoBorder)"
            strokeWidth="3"
            className="transition-all duration-300 group-hover:stroke-[3.5]"
          />

          {/* Cyber Tech Brackets */}
          <path
            d="M15 28 V15 H28"
            stroke="#8cd8ff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
          <path
            d="M85 72 V85 H72"
            stroke="#78e6bc"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />

          {/* Y-Wing (Left) */}
          <path
            d="M26 27 L47 52"
            stroke="url(#yjLogoGradY)"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Interlocking Y-Right-Wing + J Stem & Hook */}
          <path
            d="M74 27 L53 52 V68 C53 76.5 46 83 36 83 C27 83 21 77 20 70"
            stroke="url(#yjLogoGradJ)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Quantum Core Pulse Accent Nodes */}
          <circle cx="26" cy="27" r="3.2" fill="#b8a8ff" />
          <circle cx="74" cy="27" r="3.2" fill="#8cd8ff" />
          <circle cx="20" cy="70" r="3.2" fill="#78e6bc" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-mono text-sm font-bold tracking-tight text-foreground group-hover:text-cyber-accent transition-colors">
            YASH JANGID
          </span>
          <span className="text-[10px] font-mono text-cyber-muted tracking-widest uppercase">
            Senior Full Stack & AI Platform Engineer
          </span>
        </div>
      )}
    </div>
  );
}

export default Logo;
