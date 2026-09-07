'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Award, ShieldCheck, Terminal, Sparkles, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ExecutivePortraitProps {
  className?: string;
  priority?: boolean;
}

export function ExecutivePortrait({ className, priority = true }: ExecutivePortraitProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [useTechModel, setUseTechModel] = useState(true);

  // Interactive 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 260 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className={cn('relative flex flex-col items-center justify-center select-none w-full', className)}>
      {/* Volumetric Holographic Glow Halo */}
      <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-cyber-accent/30 via-cyber-cyan/25 to-cyber-lavender/30 rounded-[2.5rem] blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Cybernetic Telemetry Radar Ring in Background */}
      <div className="absolute -inset-8 rounded-full border border-cyber-accent/15 pointer-events-none animate-[spin_40s_linear_infinite]" />
      <div className="absolute -inset-14 rounded-full border border-dashed border-cyber-cyan/10 pointer-events-none animate-[spin_60s_linear_infinite_reverse]" />

      {/* Main High-Tech Holographic Executive Frame */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative group w-[290px] h-[290px] xs:w-[330px] xs:h-[330px] sm:w-[370px] sm:h-[370px] lg:w-[410px] lg:h-[410px] xl:w-[430px] xl:h-[430px] aspect-square shrink-0 rounded-3xl p-2 sm:p-2.5 bg-gradient-to-b from-cyber-surface2/90 via-cyber-surface/95 to-cyber-dark border border-cyber-accent/40 shadow-glass-card hover:border-cyber-cyan/70 hover:shadow-glow-accent transition-all duration-300"
      >
        {/* Cyber Aesthetic Precision Corner Brackets */}
        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-cyber-accent rounded-tl pointer-events-none" />
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-cyber-cyan rounded-tr pointer-events-none" />
        <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-cyber-lavender rounded-bl pointer-events-none" />
        <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-cyber-accent rounded-br pointer-events-none" />

        {/* Inner Portrait Viewport — High-definition 3D Tech Avatar Model */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-cyber-surface2 border border-white/5">
          {/* Executive Portrait Image (Default: Ultra-Sharp 3D Tech Avatar Model, with authentic photo toggle) */}
          <Image
            src={useTechModel ? '/images/yash-avatar-tech.webp' : '/images/yash-jangid.webp'}
            alt="Yash Jangid — Senior Full Stack Engineer & AI Platform Developer"
            fill
            sizes="(max-width: 640px) 330px, (max-width: 1024px) 370px, 430px"
            priority={priority}
            unoptimized={true}
            className="object-cover object-center w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-105 contrast-[1.03]"
          />

          {/* Gentle edge vignette preserving full portrait clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b12]/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-cyber-radial opacity-20 pointer-events-none" />

          {/* High-Tech Scanner Beam Sweep Line */}
          <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyber-accent/15 to-transparent pointer-events-none -translate-y-full group-hover:translate-y-[450px] transition-transform duration-1000 ease-in-out" />

          {/* Interactive 3D Model / Real Photo Switcher */}
          <button
            type="button"
            onClick={() => setUseTechModel(!useTechModel)}
            className="absolute bottom-2.5 right-2.5 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyber-dark/85 hover:bg-cyber-surface2 border border-cyber-accent/50 text-[10px] font-mono text-cyber-cyan transition-all backdrop-blur-md shadow-md cursor-pointer hover:border-cyber-cyan"
            title="Toggle between 3D Tech Avatar and Authentic Photo"
          >
            <Sparkles className="w-3 h-3 text-cyber-accent" />
            <span className="font-semibold">{useTechModel ? '3D Model' : 'Photo'}</span>
          </button>
        </div>

        {/* Top-Right Online Telemetry Beacon */}
        <div className="absolute -top-3 -right-3 sm:-right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-dark/95 backdrop-blur-md border border-cyber-green/50 shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green" />
          </span>
          <span className="text-[10px] font-mono font-bold tracking-wider text-cyber-green uppercase">
            Online
          </span>
        </div>

        {/* Floating Top-Left Telemetry KPI Badge */}
        <div className="absolute -top-3 -left-3 sm:-left-5 z-20 hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyber-surface/95 backdrop-blur-md border border-cyber-accent/40 shadow-glass-card text-xs font-mono">
          <Terminal className="w-3.5 h-3.5 text-cyber-accent" />
          <span className="text-white font-medium">Senior Full Stack</span>
          <span className="text-cyber-muted text-[10px]">· AI Dev</span>
        </div>

        {/* Floating Bottom-Right Honors Badge */}
        <div className="absolute -bottom-3 -right-3 sm:-right-5 z-20 hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyber-surface/95 backdrop-blur-md border border-cyber-accent/40 shadow-glass-card text-xs font-mono">
          <Award className="w-3.5 h-3.5 text-cyber-green" />
          <span className="text-white font-medium">UPES B.Tech</span>
          <span className="text-cyber-green text-[10px] font-bold">8.9 GPA</span>
        </div>

        {/* Floating Bottom-Left Verified Status Badge */}
        <div className="absolute -bottom-3 -left-3 sm:-left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-dark/95 backdrop-blur-md border border-cyber-accent/40 shadow-md text-[10px] font-mono text-cyber-cyan">
          <ShieldCheck className="w-3.5 h-3.5 text-cyber-accent" />
          <span className="font-semibold text-white">Verified Senior Engineer</span>
        </div>
      </motion.div>
    </div>
  );
}

export default ExecutivePortrait;
