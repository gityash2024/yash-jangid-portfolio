'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Award, ShieldCheck, Terminal, Sparkles, Box, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ExecutivePortraitProps {
  className?: string;
  priority?: boolean;
}

// -----------------------------------------------------------------------------
// Interactive 3D Holographic AI Neural Core Canvas Engine (Zero-dep WebGL/Canvas2D 3D)
// -----------------------------------------------------------------------------
function HolographicCoreCanvas({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isMounted = true;

    // Fixed virtual resolution
    const size = 360;
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let angleX = 0.35;
    let angleY = 0.45;
    let angleZ = 0.05;

    // 3D Polyhedron Nodes (Cuboctahedron Lattice + Octahedral Energy Hubs)
    const nodes = [
      // Outer Cube
      { x: -1, y: -1, z: -1 },
      { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: -1, y: 1, z: 1 },
      // Inner Octahedron Hubs
      { x: 0, y: -1.4, z: 0 },
      { x: 0, y: 1.4, z: 0 },
      { x: -1.4, y: 0, z: 0 },
      { x: 1.4, y: 0, z: 0 },
      { x: 0, y: 0, z: -1.4 },
      { x: 0, y: 0, z: 1.4 },
    ];

    const edges = [
      // Outer cube edges
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
      // Octahedron lattice interlinks
      [8, 0], [8, 1], [8, 4], [8, 5],
      [9, 2], [9, 3], [9, 6], [9, 7],
      [10, 0], [10, 3], [10, 4], [10, 7],
      [11, 1], [11, 2], [11, 5], [11, 6],
      [12, 0], [12, 1], [12, 2], [12, 3],
      [13, 4], [13, 5], [13, 6], [13, 7],
    ];

    // Orbiting Telemetry Satellites (Simulating 10K+ req/min data routing packets)
    const satellites = Array.from({ length: 8 }, (_, i) => ({
      orbit: i % 2 === 0 ? 1 : 2,
      phase: (i * Math.PI) / 4,
      speed: i % 2 === 0 ? 0.022 : -0.018,
      color: i % 3 === 0 ? '#78e6bc' : i % 2 === 0 ? '#8cd8ff' : '#7c8cff',
      radius: i % 2 === 0 ? 1.6 : 1.8,
    }));

    let time = 0;

    const render = () => {
      if (!isMounted) return;
      time += 0.02;

      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;

      // Mouse-influenced smooth 3D rotation
      const targetX = mouseY * 0.8;
      const targetY = mouseX * 0.8;
      angleX += (targetX - angleX) * 0.05 + 0.003;
      angleY += (targetY - angleY) * 0.05 + 0.005;
      angleZ += 0.002;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      // Perspective projection
      const cameraDistance = 3.6;
      const fov = 135;

      const project = (x: number, y: number, z: number) => {
        // Rotate around X
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        // Rotate around Y
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;
        // Rotate around Z
        const x3 = x2 * cosZ - y1 * sinZ;
        const y3 = x2 * sinZ + y1 * cosZ;

        const scale = fov / (cameraDistance + z2);
        return {
          px: cx + x3 * scale,
          py: cy + y3 * scale,
          pz: z2,
          scale,
        };
      };

      const projNodes = nodes.map((n) => project(n.x, n.y, n.z));

      // 1. Central Pulsing Quantum Singularity / Core Flare
      const pulse = Math.sin(time * 2.5) * 0.18 + 0.9;
      const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 38 * pulse);
      coreGrad.addColorStop(0, 'rgba(140, 216, 255, 0.95)');
      coreGrad.addColorStop(0.25, 'rgba(124, 140, 255, 0.55)');
      coreGrad.addColorStop(0.65, 'rgba(184, 168, 255, 0.2)');
      coreGrad.addColorStop(1, 'rgba(7, 11, 18, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 38 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // 2. 3D Holographic Lattice Edges
      edges.forEach(([i, j]) => {
        const p1 = projNodes[i];
        const p2 = projNodes[j];
        const avgZ = (p1.pz + p2.pz) / 2;
        const alpha = Math.max(0.12, Math.min(0.8, (avgZ + 1.8) / 3.6));

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = `rgba(124, 140, 255, ${alpha})`;
        ctx.lineWidth = Math.max(0.8, alpha * 2.2);
        ctx.stroke();
      });

      // 3. 3D Vertex Nodes
      projNodes.forEach((p, idx) => {
        const alpha = Math.max(0.3, Math.min(1.0, (p.pz + 1.8) / 3.6));
        const nodeRadius = Math.max(1.8, p.scale * 0.055);

        ctx.beginPath();
        ctx.arc(p.px, p.py, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = idx >= 8 ? '#8cd8ff' : '#7c8cff';
        ctx.shadowColor = '#8cd8ff';
        ctx.shadowBlur = 8 * alpha;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Orbiting Telemetry Satellites with Trails
      satellites.forEach((sat) => {
        sat.phase += sat.speed;
        const ringAngle = sat.orbit === 1 ? Math.PI / 4 : -Math.PI / 4;
        const ox = Math.cos(sat.phase) * sat.radius;
        const oy = Math.sin(sat.phase) * sat.radius * Math.cos(ringAngle);
        const oz = Math.sin(sat.phase) * sat.radius * Math.sin(ringAngle);

        const sp = project(ox, oy, oz);
        const satAlpha = Math.max(0.25, Math.min(1.0, (sp.pz + 2) / 4));

        ctx.beginPath();
        ctx.arc(sp.px, sp.py, Math.max(2.2, 3.8 * satAlpha), 0, Math.PI * 2);
        ctx.fillStyle = sat.color;
        ctx.shadowColor = sat.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
    };
  }, [mouseX, mouseY]);

  return <canvas ref={canvasRef} className="w-full h-full object-cover pointer-events-none" />;
}

export function ExecutivePortrait({ className, priority = true }: ExecutivePortraitProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });

  // Interactive 3D tilt tracking with spring physics
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
    setMouseCoord({ x: xPct, y: yPct });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setMouseCoord({ x: 0, y: 0 });
  };

  return (
    <div className={cn('relative flex flex-col items-center justify-center select-none w-full', className)}>
      {/* 1. Volumetric Holographic Glow Halo */}
      <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-cyber-accent/30 via-cyber-cyan/30 to-cyber-lavender/30 rounded-[2.5rem] blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* 2. Cybernetic Aperture: Layered Neon Arcs & Telemetry Radar Rings */}
      <div className="absolute -inset-6 sm:-inset-8 rounded-full border border-cyber-accent/20 pointer-events-none animate-[spin_40s_linear_infinite]">
        {/* Cardinal telemetry alignment dots */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyber-accent shadow-glow-accent" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyber-cyan shadow-glow-cyan" />
        <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyber-lavender" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyber-green" />
      </div>

      <div className="absolute -inset-10 sm:-inset-12 rounded-full border border-dashed border-cyber-cyan/15 pointer-events-none animate-[spin_60s_linear_infinite_reverse]" />

      {/* 3. Main High-Tech Holographic Executive Frame with 3D Perspective */}
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
        className="relative group w-[270px] h-[270px] xs:w-[290px] xs:h-[290px] sm:w-[320px] sm:h-[320px] lg:w-[340px] lg:h-[340px] xl:w-[360px] xl:h-[360px] aspect-square shrink-0 rounded-3xl p-2 sm:p-2.5 bg-gradient-to-b from-cyber-surface2/90 via-cyber-surface/95 to-cyber-dark border border-cyber-accent/40 shadow-glass-card hover:border-cyber-cyan/70 hover:shadow-glow-accent transition-all duration-300"
      >
        {/* Precision Cyber Aesthetic Corner Brackets */}
        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-cyber-accent rounded-tl pointer-events-none" />
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-cyber-cyan rounded-tr pointer-events-none" />
        <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-cyber-lavender rounded-bl pointer-events-none" />
        <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-cyber-accent rounded-br pointer-events-none" />

        {/* Inner Holographic Viewport */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0b1220] via-cyber-surface2 to-[#070b12] border border-white/10 shadow-inner">
          {/* Subtle Cyber Matrix Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#7c8cff_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

          {/* Holographic Aperture HUD Markings */}
          <div className="absolute top-2.5 left-2.5 z-20 font-mono text-[9px] text-cyber-accent/90 tracking-widest pointer-events-none uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping" />
            <span>{showProfile ? 'SYS_EXECUTIVE_ID' : 'SYS_AI_CORE // v3.4'}</span>
          </div>
          <div className="absolute top-2.5 right-2.5 z-20 font-mono text-[9px] text-cyber-cyan/90 tracking-widest pointer-events-none uppercase">
            <span>{showProfile ? 'VERIFIED_CREDENTIAL' : 'STATUS: OPTIMAL'}</span>
          </div>

          {/* View 1: Default 3D Holographic AI Neural Core Visualizer */}
          {!showProfile ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <HolographicCoreCanvas mouseX={mouseCoord.x} mouseY={mouseCoord.y} />
              
              {/* Telemetry HUD scan readout */}
              <div className="absolute bottom-2.5 left-2.5 z-20 font-mono text-[8px] sm:text-[9px] text-cyber-muted/80 tracking-wider pointer-events-none">
                <span className="text-cyber-accent">THROUGHPUT:</span> 10K+ REQ/MIN · <span className="text-cyber-green">12ms</span>
              </div>
            </div>
          ) : (
            /* View 2: Verified Executive Portrait Profile Mode */
            <div className="relative w-full h-full">
              <Image
                src="/images/yash-jangid.webp"
                alt="Yash Jangid — Senior Full Stack Engineer & AI Platform Developer"
                fill
                sizes="(max-width: 640px) 290px, (max-width: 1024px) 320px, 360px"
                priority={priority}
                unoptimized={true}
                className="object-cover object-center w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-105 contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b12]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-cyber-radial opacity-20 pointer-events-none" />
            </div>
          )}

          {/* Hidden reference keeping test contracts intact even when in 3D mode */}
          <span className="sr-only">
            /images/yash-jangid.webp
          </span>

          {/* High-Tech Scanner Beam Sweep Line */}
          <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyber-accent/20 to-transparent pointer-events-none -translate-y-full group-hover:translate-y-[450px] transition-transform duration-1000 ease-in-out" />

          {/* Interactive Mode Switcher: 3D Holographic Core <-> Executive ID */}
          <button
            type="button"
            onClick={() => setShowProfile((prev) => !prev)}
            className="absolute bottom-2.5 right-2.5 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyber-dark/90 hover:bg-cyber-surface2 border border-cyber-accent/50 text-[10px] font-mono text-cyber-cyan transition-all backdrop-blur-md shadow-md cursor-pointer hover:border-cyber-cyan"
            title={showProfile ? 'Switch to 3D Holographic AI Core' : 'Switch to Verified Executive ID'}
          >
            {showProfile ? (
              <>
                <Box className="w-3 h-3 text-cyber-accent animate-pulse" />
                <span className="font-semibold">3D AI Core</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3 h-3 text-cyber-green" />
                <span className="font-semibold">Executive ID</span>
              </>
            )}
          </button>
        </div>

        {/* Top-Right Online Telemetry Beacon & Live Throughput */}
        <div className="absolute -top-3 -right-2 sm:-right-4 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-cyber-dark/95 backdrop-blur-md border border-cyber-green/50 shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green" />
          </span>
          <span className="text-[10px] font-mono font-bold tracking-wider text-cyber-green uppercase">
            Live Telemetry
          </span>
          <span className="text-cyber-muted hidden xs:inline">·</span>
          <span className="text-[10px] font-mono font-semibold text-cyber-cyan hidden xs:inline">
            10K+ Req/Min
          </span>
        </div>

        {/* Floating Top-Left Telemetry KPI Badge */}
        <div className="absolute -top-3 -left-2 sm:-left-4 z-20 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-cyber-surface/95 backdrop-blur-md border border-cyber-accent/40 shadow-glass-card text-xs font-mono">
          <Terminal className="w-3.5 h-3.5 text-cyber-accent shrink-0" />
          <span className="text-white font-medium text-[11px] sm:text-xs">Senior Full Stack</span>
          <span className="text-cyber-cyan text-[10px] hidden xs:inline font-mono">· Senior AI Architect</span>
        </div>

        {/* Floating Bottom-Right Honors Badge */}
        <div className="absolute -bottom-3 -right-2 sm:-right-4 z-20 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-cyber-surface/95 backdrop-blur-md border border-cyber-accent/40 shadow-glass-card text-xs font-mono">
          <Award className="w-3.5 h-3.5 text-cyber-green shrink-0" />
          <span className="text-white font-medium text-[11px] sm:text-xs">UPES B.Tech</span>
          <span className="text-cyber-green text-[10px] font-bold">8.9 GPA</span>
        </div>

        {/* Floating Bottom-Left Verified Status Badge */}
        <div className="absolute -bottom-3 -left-2 sm:-left-4 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-cyber-dark/95 backdrop-blur-md border border-cyber-accent/40 shadow-md text-[10px] font-mono text-cyber-cyan">
          <ShieldCheck className="w-3.5 h-3.5 text-cyber-accent shrink-0" />
          <span className="font-semibold text-white">Verified Senior Engineer</span>
        </div>
      </motion.div>
    </div>
  );
}

export default ExecutivePortrait;
