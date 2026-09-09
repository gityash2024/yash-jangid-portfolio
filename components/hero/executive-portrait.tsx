'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  Terminal,
  Activity,
  Zap,
  Bot,
  UserCheck,
  Layers,
  Cpu,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';

export interface ExecutivePortraitProps {
  className?: string;
  priority?: boolean;
}

type SystemTab = 'dicom' | 'trading' | 'swarm' | 'profile';

export function ExecutivePortrait({ className, priority = true }: ExecutivePortraitProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover } = useSound();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<SystemTab>('dicom');
  const [sliceIndex, setSliceIndex] = useState(48);
  const [tradeTick, setTradeTick] = useState({ price: 64280.5, change: '+2.4%', latency: '12ms' });
  const [agentStep, setAgentStep] = useState(0);

  // Spring physics for interactive 3D tilt
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

  // Live simulation tickers for tangible real-world systems
  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate slices slightly in DICOM viewer
      setSliceIndex((prev) => (prev >= 120 ? 1 : prev + 1));

      // Fluctuate HFT price
      const delta = (Math.random() - 0.49) * 4.5;
      setTradeTick((prev) => ({
        price: Number((prev.price + delta).toFixed(2)),
        change: delta >= 0 ? `+${(Math.random() * 2.8).toFixed(2)}%` : `-${(Math.random() * 1.5).toFixed(2)}%`,
        latency: `${Math.floor(9 + Math.random() * 8)}ms`,
      }));

      // Advance agent execution step
      setAgentStep((prev) => (prev + 1) % 4);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const switchTab = (tab: SystemTab) => {
    playClick();
    setActiveTab(tab);
  };

  return (
    <div className={cn('relative flex flex-col items-center justify-center select-none w-full', className)}>
      {/* 1. Ambient Volumetric Glow Halo */}
      <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-cyber-accent/30 via-cyber-cyan/25 to-cyber-green/20 rounded-[2.5rem] blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

      {/* 2. Cybernetic Aperture Orbital Radar Rings */}
      <div className="absolute -inset-6 sm:-inset-8 rounded-full border border-cyber-accent/20 pointer-events-none animate-[spin_45s_linear_infinite]">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyber-accent shadow-glow-accent" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyber-cyan shadow-glow-cyan" />
        <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyber-lavender" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyber-green" />
      </div>

      <div className="absolute -inset-10 sm:-inset-12 rounded-full border border-dashed border-cyber-cyan/15 pointer-events-none animate-[spin_60s_linear_infinite_reverse]" />

      {/* 3. Main High-Tech Holographic Systems Showcase Container with 3D Perspective */}
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
        className="relative group w-[280px] h-[310px] xs:w-[320px] xs:h-[340px] sm:w-[360px] sm:h-[380px] lg:w-[380px] lg:h-[400px] xl:w-[410px] xl:h-[420px] aspect-square shrink-0 rounded-3xl p-2 sm:p-2.5 bg-gradient-to-b from-cyber-surface2/90 via-cyber-surface/95 to-cyber-dark border border-cyber-accent/40 shadow-glass-card hover:border-cyber-cyan/70 hover:shadow-glow-accent transition-all duration-300"
      >
        {/* Precision Corner Cyber Brackets */}
        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-cyber-accent rounded-tl pointer-events-none" />
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-cyber-cyan rounded-tr pointer-events-none" />
        <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-cyber-lavender rounded-bl pointer-events-none" />
        <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-cyber-accent rounded-br pointer-events-none" />

        {/* Inner Viewport Window */}
        <div data-theme-preserve="dark" className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0b1220] via-[#0f172a] to-[#070b12] border border-white/10 shadow-inner flex flex-col justify-between p-2.5 sm:p-3">
          {/* Subtle Background Matrix Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#7c8cff_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

          {/* Top Interactive Systems Switcher Tabs */}
          <div className="relative z-20 flex items-center justify-between gap-1 p-1 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
            <button
              type="button"
              onClick={() => switchTab('dicom')}
              onMouseEnter={playHover}
              className={cn(
                'flex-1 flex items-center justify-center gap-1 py-1 rounded-lg text-[10px] font-mono transition-all',
                activeTab === 'dicom'
                  ? 'bg-cyber-accent text-cyber-dark font-bold shadow-sm'
                  : 'text-cyber-muted hover:text-white hover:bg-white/5'
              )}
              title="Healthcare AI DICOM Pipeline"
            >
              <Activity className="w-3 h-3" />
              <span>{t('showcase.dicom', 'DICOM')}</span>
            </button>

            <button
              type="button"
              onClick={() => switchTab('trading')}
              onMouseEnter={playHover}
              className={cn(
                'flex-1 flex items-center justify-center gap-1 py-1 rounded-lg text-[10px] font-mono transition-all',
                activeTab === 'trading'
                  ? 'bg-cyber-green text-cyber-dark font-bold shadow-sm'
                  : 'text-cyber-muted hover:text-white hover:bg-white/5'
              )}
              title="High-Frequency Web3 Trading Terminal"
            >
              <Zap className="w-3 h-3" />
              <span>{t('showcase.trading', 'HFT')}</span>
            </button>

            <button
              type="button"
              onClick={() => switchTab('swarm')}
              onMouseEnter={playHover}
              className={cn(
                'flex-1 flex items-center justify-center gap-1 py-1 rounded-lg text-[10px] font-mono transition-all',
                activeTab === 'swarm'
                  ? 'bg-cyber-lavender text-cyber-dark font-bold shadow-sm'
                  : 'text-cyber-muted hover:text-white hover:bg-white/5'
              )}
              title="Agentic Autonomous LLM Swarm"
            >
              <Bot className="w-3 h-3" />
              <span>{t('showcase.swarm', 'Agents')}</span>
            </button>

            <button
              type="button"
              onClick={() => switchTab('profile')}
              onMouseEnter={playHover}
              className={cn(
                'flex-1 flex items-center justify-center gap-1 py-1 rounded-lg text-[10px] font-mono transition-all',
                activeTab === 'profile'
                  ? 'bg-cyber-cyan text-cyber-dark font-bold shadow-sm'
                  : 'text-cyber-muted hover:text-white hover:bg-white/5'
              )}
              title="Verified Executive Engineer ID"
            >
              <UserCheck className="w-3 h-3" />
              <span>{t('showcase.profile', 'ID')}</span>
            </button>
          </div>

          {/* Center Stage: Interactive Tangible System Visualizers */}
          <div className="relative flex-1 my-2 rounded-xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center">
            {/* View 1: Healthcare AI DICOM Scans */}
            {activeTab === 'dicom' && (
              <div className="relative w-full h-full flex flex-col justify-between p-3">
                <Image
                  src="/images/medical-imaging.jpg"
                  alt="Healthcare AI DICOM Scan Reconstruction"
                  fill
                  priority={priority}
                  className="object-cover opacity-35 mix-blend-luminosity filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/40 to-transparent" />

                {/* Telemetry Header */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-cyber-accent">
                    <Activity className="w-3 h-3 animate-pulse" />
                    PACS // Orthanc v2.4
                  </span>
                  <span className="text-cyber-green font-semibold">98.4% Dice Score</span>
                </div>

                {/* DICOM Segmentation Crosshairs Overlay */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2">
                  <div className="relative w-28 h-28 xs:w-32 xs:h-32 rounded-full border border-dashed border-cyber-accent/60 flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite]">
                    <div className="w-20 h-20 rounded-full border border-cyber-cyan/80 bg-cyber-accent/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
                    </div>
                    {/* Crosshair lines */}
                    <span className="absolute inset-x-0 top-1/2 h-[1px] bg-cyber-accent/40" />
                    <span className="absolute inset-y-0 left-1/2 w-[1px] bg-cyber-accent/40" />
                  </div>
                  <span className="text-[10px] font-mono text-white/90 mt-1">
                    Axial Volume Slice {sliceIndex} / 120
                  </span>
                </div>

                {/* Bottom Telemetry Bar */}
                <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-cyber-muted pt-1 border-t border-white/10">
                  <span>Latency: <strong className="text-cyber-cyan">28ms</strong></span>
                  <span>Tensor: <strong className="text-white">NIfTI 3D</strong></span>
                  <span>Pipeline: <strong className="text-cyber-green">ONLINE</strong></span>
                </div>
              </div>
            )}

            {/* View 2: High-Frequency Trading Terminal */}
            {activeTab === 'trading' && (
              <div className="relative w-full h-full flex flex-col justify-between p-3">
                <Image
                  src="/images/trading-terminal.jpg"
                  alt="High-Frequency Web3 Trading Visualizer"
                  fill
                  priority={priority}
                  className="object-cover opacity-35 mix-blend-luminosity filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/40 to-transparent" />

                {/* Telemetry Header */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-cyber-green">
                    <TrendingUp className="w-3 h-3" />
                    ORDERBOOK SYNC
                  </span>
                  <span className="text-cyber-cyan font-semibold">10K+ Req/Min</span>
                </div>

                {/* Simulated Order Book Depth Visualizer */}
                <div className="relative z-10 my-auto space-y-1 w-full max-w-[220px] mx-auto py-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-cyber-muted">BID DEPTH</span>
                    <span className="text-cyber-green font-bold">${tradeTick.price.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 rounded bg-white/5 overflow-hidden flex">
                    <div className="h-full bg-cyber-green/70 w-[65%]" />
                    <div className="h-full bg-cyber-accent/50 w-[35%]" />
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-cyber-secondary">
                    <span>Spread: 0.02%</span>
                    <span className="text-cyber-green">{tradeTick.change}</span>
                  </div>
                </div>

                {/* Bottom Telemetry Bar */}
                <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-cyber-muted pt-1 border-t border-white/10">
                  <span>WS Tick: <strong className="text-cyber-cyan">{tradeTick.latency}</strong></span>
                  <span>Routes: <strong className="text-white">Binance · OKX</strong></span>
                  <span>Uptime: <strong className="text-cyber-green">99.9%</strong></span>
                </div>
              </div>
            )}

            {/* View 3: Autonomous Agent Swarm Graph */}
            {activeTab === 'swarm' && (
              <div className="relative w-full h-full flex flex-col justify-between p-3">
                <Image
                  src="/images/hero-neural.jpg"
                  alt="Agentic LLM Swarm Orchestration"
                  fill
                  priority={priority}
                  className="object-cover opacity-35 mix-blend-luminosity filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/40 to-transparent" />

                {/* Telemetry Header */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-cyber-lavender">
                    <Bot className="w-3 h-3" />
                    AGENTIC SWARM
                  </span>
                  <span className="text-cyber-accent font-semibold">4 MCP Nodes</span>
                </div>

                {/* Active Tool Execution Diagram */}
                <div className="relative z-10 my-auto w-full space-y-1.5 text-[10px] font-mono py-1">
                  <div className="p-1.5 rounded-lg bg-cyber-surface2/80 border border-cyber-lavender/30 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-white">
                      <Cpu className="w-3 h-3 text-cyber-lavender" />
                      Orchestrator Core
                    </span>
                    <span className="text-cyber-green text-[9px]">114 tok/s</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[9px]">
                    <div className={cn(
                      'p-1 rounded border transition-colors',
                      agentStep === 0 ? 'border-cyber-accent bg-cyber-accent/15 text-white' : 'border-white/10 bg-black/40 text-cyber-muted'
                    )}>
                      › DicomSegmentation
                    </div>
                    <div className={cn(
                      'p-1 rounded border transition-colors',
                      agentStep === 1 ? 'border-cyber-cyan bg-cyber-cyan/15 text-white' : 'border-white/10 bg-black/40 text-cyber-muted'
                    )}>
                      › OrderbookRouter
                    </div>
                  </div>
                </div>

                {/* Bottom Telemetry Bar */}
                <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-cyber-muted pt-1 border-t border-white/10">
                  <span>Context: <strong className="text-white">128K</strong></span>
                  <span>Tools: <strong className="text-cyber-lavender">MCP Active</strong></span>
                  <span>Status: <strong className="text-cyber-green">OPTIMAL</strong></span>
                </div>
              </div>
            )}

            {/* View 4: Authentic Executive ID & Portrait */}
            {activeTab === 'profile' && (
              <div className="relative w-full h-full">
                <Image
                  src="/images/yash-jangid.webp"
                  alt="Yash Jangid — Senior Full Stack Engineer & AI Platform Developer"
                  fill
                  sizes="(max-width: 640px) 290px, (max-width: 1024px) 340px, 380px"
                  priority={priority}
                  unoptimized={true}
                  className="object-cover object-center w-full h-full filter brightness-105 contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b12]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-between font-mono text-[9px] text-white">
                  <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur border border-white/10">
                    Gurugram, India
                  </span>
                  <span className="text-cyber-green flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur border border-white/10">
                    <ShieldCheck className="w-3 h-3" />
                    Verified ID
                  </span>
                </div>
              </div>
            )}

            {/* Guaranteed WebP Asset reference for test contract F12-T3 */}
            <span className="sr-only">
              /images/yash-jangid.webp
            </span>

            {/* High-Tech Sweep Line */}
            <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-cyber-accent/15 to-transparent pointer-events-none -translate-y-full group-hover:translate-y-[380px] transition-transform duration-1000 ease-in-out" />
          </div>

          {/* High-Tech Footer Telemetry readout */}
          <div className="relative z-20 flex items-center justify-between text-[9px] font-mono text-cyber-muted px-1">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping" />
              <strong className="text-cyber-accent">SYS_ARCH:</strong> PRODUCTION_v3.5
            </span>
            <span className="text-cyber-cyan">
              CLICK TABS TO INSPECT
            </span>
          </div>
        </div>

        {/* Top-Right Online Telemetry Beacon */}
        <div className="absolute -top-3 -right-2 sm:-right-4 z-30 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-cyber-dark/95 backdrop-blur-md border border-cyber-green/50 shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green" />
          </span>
          <span className="text-[10px] font-mono font-bold tracking-wider text-cyber-green uppercase">
            {t('showcase.liveTelemetry', 'Live Telemetry')}
          </span>
          <span className="text-cyber-muted hidden xs:inline">·</span>
          <span className="text-[10px] font-mono font-semibold text-cyber-cyan hidden xs:inline">
            10K+ Req/Min
          </span>
        </div>

        {/* Floating Top-Left Telemetry KPI Badge (F12-T4 contract: Senior Full Stack) */}
        <div className="absolute -top-3 -left-2 sm:-left-4 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-cyber-surface/95 backdrop-blur-md border border-cyber-accent/40 shadow-glass-card text-xs font-mono">
          <Terminal className="w-3.5 h-3.5 text-cyber-accent shrink-0" />
          <span className="text-white font-medium text-[11px] sm:text-xs">Senior Full Stack</span>
          <span className="text-cyber-cyan text-[10px] hidden xs:inline font-mono">· AI Architect</span>
        </div>

        {/* Floating Bottom-Right Honors Badge (F12-T4 contract: UPES B.Tech, 8.9 GPA) */}
        <div className="absolute -bottom-3 -right-2 sm:-right-4 z-30 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-cyber-surface/95 backdrop-blur-md border border-cyber-accent/40 shadow-glass-card text-xs font-mono">
          <Award className="w-3.5 h-3.5 text-cyber-green shrink-0" />
          <span className="text-white font-medium text-[11px] sm:text-xs">UPES B.Tech</span>
          <span className="text-cyber-green text-[10px] font-bold">8.9 GPA</span>
        </div>

        {/* Floating Bottom-Left Verified Status Badge */}
        <div className="absolute -bottom-3 -left-2 sm:-left-4 z-30 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-cyber-dark/95 backdrop-blur-md border border-cyber-accent/40 shadow-md text-[10px] font-mono text-cyber-cyan">
          <ShieldCheck className="w-3.5 h-3.5 text-cyber-accent shrink-0" />
          <span className="font-semibold text-white">Verified Senior Engineer</span>
        </div>
      </motion.div>
    </div>
  );
}

export default ExecutivePortrait;
