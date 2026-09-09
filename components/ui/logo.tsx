'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className, size = 32, showText = false }: LogoProps) {
  const rawId = React.useId();
  const id = rawId.replace(/:/g, '_');

  return (
    <div className={cn('inline-flex items-center gap-2.5 select-none group', className)}>
      <div
        style={{ width: size, height: size }}
        className="relative shrink-0 flex items-center justify-center transition-all duration-200 group-hover:brightness-110"
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
          shapeRendering="geometricPrecision"
          className="relative w-full h-full drop-shadow-sm transition-all duration-200 group-hover:drop-shadow-[0_0_8px_rgba(124,140,255,0.4)]"
        >
          <defs>
            <linearGradient id={`yjLogoBorder_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c8cff" />
              <stop offset="50%" stopColor="#8cd8ff" />
              <stop offset="100%" stopColor="#78e6bc" />
            </linearGradient>
            <linearGradient id={`yjLogoGradY_${id}`} x1="25%" y1="25%" x2="50%" y2="55%">
              <stop offset="0%" stopColor="#b8a8ff" />
              <stop offset="100%" stopColor="#7c8cff" />
            </linearGradient>
            <linearGradient id={`yjLogoGradJ_${id}`} x1="75%" y1="25%" x2="20%" y2="85%">
              <stop offset="0%" stopColor="#8cd8ff" />
              <stop offset="50%" stopColor="#7c8cff" />
              <stop offset="100%" stopColor="#78e6bc" />
            </linearGradient>
            <linearGradient id={`yjLogoBg_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c1424" />
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
            fill={`url(#yjLogoBg_${id})`}
            stroke={`url(#yjLogoBorder_${id})`}
            strokeWidth="3.2"
            className="transition-all duration-300"
          />

          {/* Cyber Tech Brackets */}
          <path
            d="M15 28 V15 H28"
            stroke="#8cd8ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
          <path
            d="M85 72 V85 H72"
            stroke="#78e6bc"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />

          {/* Y-Wing (Left) meeting at nexus (50, 52) */}
          <path
            d="M26 26 L50 52"
            stroke={`url(#yjLogoGradY_${id})`}
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Interlocking Y-Right-Wing + J Stem & Hook meeting at nexus (50, 52) */}
          <path
            d="M74 26 L50 52 V67 C50 76.5 43 83 33 83 C24 83 18 76.5 18 69"
            stroke={`url(#yjLogoGradJ_${id})`}
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Precision Nexus Accent Nodes */}
          <circle cx="26" cy="26" r="3.2" fill="#b8a8ff" />
          <circle cx="74" cy="26" r="3.2" fill="#8cd8ff" />
          <circle cx="18" cy="69" r="3.2" fill="#78e6bc" />
          <circle cx="50" cy="52" r="2" fill="#ffffff" opacity="0.85" />
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
