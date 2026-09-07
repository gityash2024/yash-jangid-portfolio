'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ExecutivePortraitProps {
  className?: string;
  priority?: boolean;
}

export function ExecutivePortrait({ className, priority = true }: ExecutivePortraitProps) {
  return (
    <div className={cn('relative flex flex-col items-center justify-center', className)}>
      {/* Volumetric Outer Ambient Glow Halo */}
      <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-cyber-accent/25 via-cyber-cyan/20 to-cyber-lavender/25 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Main Glassmorphic Cyber Frame */}
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative group w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-square rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-cyber-card/90 backdrop-blur-xl border border-cyber-accent/30 shadow-glass-card hover:border-cyber-cyan/50 hover:shadow-glass-card-hover transition-all duration-300"
      >
        {/* Cyber Aesthetic Corner Brackets */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyber-accent/70 rounded-tl pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyber-accent/70 rounded-tr pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyber-accent/70 rounded-bl pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyber-accent/70 rounded-br pointer-events-none" />

        {/* Inner Portrait Wrapper */}
        <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-cyber-surface2">
          {/* Authentic Portrait Image via Next.js Image Component */}
          <Image
            src="/images/yash-jangid.webp"
            alt="Yash Jangid — Senior Full Stack Engineer & AI Platform Developer"
            width={400}
            height={400}
            priority={priority}
            className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 420px"
          />

          {/* Holographic / Cyber Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/85 via-cyber-dark/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-cyber-radial opacity-30 pointer-events-none" />

          {/* Top-Right Online Beacon Pill */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyber-dark/90 backdrop-blur-md border border-cyber-green/40 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green" />
            </span>
            <span className="text-[10px] font-mono font-medium tracking-wider text-cyber-green uppercase">
              Online
            </span>
          </div>

          {/* Bottom In-Frame Verified Status Pill */}
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <div className="px-3 py-2 rounded-xl bg-cyber-dark/90 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyber-accent flex-shrink-0" />
                <div className="leading-tight">
                  <p className="text-[11px] font-semibold text-white tracking-tight">Yash Jangid</p>
                  <p className="text-[10px] font-mono text-cyber-cyan">Verified Senior Engineer</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-accent/15 text-cyber-accent border border-cyber-accent/30 font-medium">
                5+ Yrs Prod
              </span>
            </div>
          </div>
        </div>

        {/* Floating KPI Badge 1 (Top-Left): Role / Focus */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-3 -left-3 sm:-left-6 z-20 hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyber-surface/95 backdrop-blur-md border border-cyber-accent/40 shadow-glass-card text-xs font-mono"
        >
          <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
          <span className="text-white font-medium">Senior Full Stack</span>
          <span className="text-cyber-muted text-[10px]">· AI Dev</span>
        </motion.div>

        {/* Floating KPI Badge 2 (Bottom-Right): Honors / Education */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute -bottom-3 -right-3 sm:-right-6 z-20 hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyber-surface/95 backdrop-blur-md border border-cyber-accent/40 shadow-glass-card text-xs font-mono"
        >
          <Award className="w-3.5 h-3.5 text-cyber-accent" />
          <span className="text-white font-medium">UPES B.Tech</span>
          <span className="text-cyber-green text-[10px] font-bold">8.9 GPA</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
