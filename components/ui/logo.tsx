'use client';

import React from 'react';
import Image from 'next/image';
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
        className="relative shrink-0 flex items-center justify-center rounded-xl overflow-hidden border border-white/15 bg-[#080d18] shadow-sm transition-all duration-200 group-hover:border-cyber-accent/60 group-hover:shadow-[0_0_12px_rgba(124,140,255,0.4)]"
      >
        <Image
          src="/images/yj-monogram-icon.png"
          alt="Yash Jangid YJ Brand Logo"
          width={size}
          height={size}
          priority
          className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <span className="sr-only">YJ</span>
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
