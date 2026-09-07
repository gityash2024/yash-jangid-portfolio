'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Activity,
  ArrowRight,
  Download,
  FileText,
  Layers,
  Mail,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { ExecutivePortrait } from '@/components/hero/executive-portrait';
import { cn } from '@/lib/utils';

export interface HeroSectionProps {
  onLaunchTerminal?: () => void;
  onExploreArchitecture?: () => void;
  className?: string;
}

export function HeroSection({
  onLaunchTerminal,
  onExploreArchitecture,
  className,
}: HeroSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('gityash2024@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleTerminalClick = (e: React.MouseEvent) => {
    if (onLaunchTerminal) {
      e.preventDefault();
      onLaunchTerminal();
    } else {
      const elem = document.getElementById('terminal') || document.getElementById('playground');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleArchitectureClick = (e: React.MouseEvent) => {
    if (onExploreArchitecture) {
      e.preventDefault();
      onExploreArchitecture();
    } else {
      const elem = document.getElementById('architecture') || document.getElementById('projects');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const verifiedStats = [
    {
      value: '10,000+',
      unit: 'Users',
      label: '10K+ Users Served',
      detail: 'Enterprise healthcare AI & Web3 platforms',
      icon: Activity,
    },
    {
      value: '10,000+',
      unit: 'req/min',
      label: '10K+ req/min Throughput',
      detail: 'Order book sync & exchange routing paths',
      icon: Zap,
    },
    {
      value: '40%',
      unit: 'Latency Drop',
      label: '40% Latency Drop',
      detail: 'Redis hot-path caching & microservices',
      icon: Sparkles,
    },
    {
      value: '99.9%',
      unit: 'SLA Uptime',
      label: '99.9% Production Uptime',
      detail: 'Maintained across 5+ live production platforms',
      icon: Layers,
    },
  ];

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className={cn('relative pt-4 sm:pt-8 lg:pt-12 space-y-12 sm:space-y-16 overflow-hidden', className)}
    >
      {/* Bespoke 3D Neural Backdrop Layer with Holographic Vignette */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        <Image
          src="/images/hero-neural.jpg"
          alt="Cybernetic Neural Architecture Backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 mix-blend-screen scale-105 filter blur-[1px]"
        />
        {/* Deep space obsidian vignette gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/80 via-cyber-dark/60 to-cyber-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-dark via-transparent to-cyber-dark/90" />
        <div className="absolute inset-0 bg-cyber-radial opacity-60" />
      </div>

      {/* Verified Status Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-cyber-surface2/90 border border-cyber-border text-cyber-secondary shadow-glass-card backdrop-blur-md">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-green" />
        </span>
        <span className="text-cyber-green font-semibold tracking-wide uppercase text-[11px]">
          Open to Senior Opportunities
        </span>
        <span className="text-cyber-muted">·</span>
        <span className="text-cyber-secondary hidden xs:inline">Senior Full Stack &amp; AI Platform Engineer</span>
        <span className="text-cyber-muted hidden sm:inline">·</span>
        <span className="text-cyber-muted hidden sm:inline">Gurugram, India (IST)</span>
      </div>

      {/* Cyber-Executive Headline, Subtitle, CTAs & Executive Portrait Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headline & Action Triggers */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
              Architecting High-Throughput Platforms &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent via-cyber-cyan to-cyber-lavender">
                Agentic AI Workflows
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-cyber-secondary font-normal leading-relaxed max-w-2xl">
              <strong className="text-white font-semibold">
                Senior Full Stack Engineer &amp; AI Platform / Agentic Developer
              </strong>{' '}
              with nearly five years of production experience building mission-critical architectures across{' '}
              <span className="text-white">Healthcare AI</span> (DICOM/NIfTI tumor pipelines at Imaging IQ),{' '}
              <span className="text-white">High-Frequency Web3</span> (10K+ req/min at ITH Tech), and{' '}
              <span className="text-white">Autonomous LLM Systems</span>.
            </p>
          </div>

          {/* High-Impact CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Primary CTA: Launch Agent CLI */}
            <a
              href="#terminal"
              onClick={handleTerminalClick}
              className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-xl text-sm font-mono font-semibold bg-cyber-accent text-cyber-dark hover:bg-cyber-cyan hover:shadow-glow-cyan transition-all duration-200 shadow-md group"
            >
              <Terminal className="w-4 h-4 text-cyber-dark group-hover:rotate-12 transition-transform duration-200" />
              <span>Launch Agent CLI</span>
            </a>

            {/* Secondary CTA: Explore Architecture */}
            <a
              href="#architecture"
              onClick={handleArchitectureClick}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-cyber-surface2 hover:bg-cyber-surface2/80 border border-cyber-border hover:border-cyber-accent/50 text-white transition-all duration-200 shadow-sm group"
            >
              <Layers className="w-4 h-4 text-cyber-accent group-hover:text-cyber-cyan transition-colors" />
              <span>Explore Architecture</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyber-muted group-hover:translate-x-1 group-hover:text-white transition-all" />
            </a>

            {/* Tertiary CTA: Download Résumé */}
            <a
              href="/resume"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-transparent border border-cyber-border hover:border-white/20 text-cyber-secondary hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <FileText className="w-4 h-4 text-cyber-cyan" />
              <span>Download Résumé</span>
            </a>

            {/* Direct Email Copy Trigger */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-mono bg-cyber-surface2/60 border border-cyber-border hover:border-cyber-accent/40 text-cyber-secondary hover:text-white transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-cyber-accent" />
              <span>{copiedEmail ? 'Copied ✓' : 'gityash2024@gmail.com'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Executive Portrait with Volumetric Frame & Status Pill */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <ExecutivePortrait priority={true} />
        </div>
      </div>

      {/* VERIFIED STATS PILLS (10K+ users, 10K+ req/min, 40% latency drop, 99.9% uptime) */}
      <div className="pt-4 sm:pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {verifiedStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-4 sm:p-5 border border-cyber-border hover:border-cyber-accent/40 hover:shadow-glass-card-hover transition-all duration-300 flex flex-col justify-between group bg-cyber-card/90 backdrop-blur-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-cyber-muted group-hover:text-cyber-cyan transition-colors">
                    {stat.label}
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-cyber-accent/10 border border-cyber-accent/20 flex items-center justify-center text-cyber-accent group-hover:text-cyber-cyan transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white flex items-baseline gap-1.5">
                    <span>{stat.value}</span>
                    <span className="text-xs font-normal text-cyber-accent font-sans">{stat.unit}</span>
                  </div>
                  <p className="text-[11px] text-cyber-secondary mt-1 line-clamp-1 group-hover:text-white transition-colors">
                    {stat.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
