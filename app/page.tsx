'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import {
  Activity,
  ArrowUp,
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Layers,
  Linkedin,
  Mail,
  Network,
  Shield,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';

import { SmoothScroll } from '@/components/ui/smooth-scroll';
import { ExecutiveNav } from '@/components/navigation/executive-nav';
import { ExecutiveFooter } from '@/components/navigation/executive-footer';
import { HeroSection } from '@/components/hero/hero-section';
import { NeuralCanvas } from '@/components/hero/neural-canvas';
import { SystemMetricsVisualizer } from '@/components/interactive/system-metrics';
import { ProjectGrid } from '@/components/projects/project-grid';
import { AgentCLI } from '@/components/interactive/agent-cli';
import { ExperienceSection } from '@/components/experience/experience-section';
import { SkillsMatrix } from '@/components/experience/skills-matrix';
import { EducationCard } from '@/components/experience/education-card';
import { CommandPalette } from '@/components/ui/command-palette';
import { CaseStudyModal } from '@/components/projects/case-study-modal';
import { getCaseStudyById } from '@/data/case-studies';
import { useSound } from '@/hooks/use-sound';

export default function HomePage() {
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { playClick, playHover, playSuccessChime } = useSound();

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('gityash2024@gmail.com');
      setCopiedEmail(true);
      playSuccessChime();
      setTimeout(() => setCopiedEmail(false), 2400);
    }
  };

  const handleOpenCaseStudy = (projectId: string) => {
    playClick();
    setActiveCaseStudyId(projectId);
  };

  const scrollToTop = () => {
    playClick();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeCaseStudy = activeCaseStudyId ? getCaseStudyById(activeCaseStudyId) : null;

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-cyber-dark text-foreground selection:bg-cyber-accent/30 selection:text-white relative overflow-x-hidden">
        {/* Ambient background glow & atmospheric cyber grid */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-cyber-gradient opacity-60" aria-hidden="true" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-10" aria-hidden="true" />

        {/* Full-Page Interactive Neural Particle Mesh (Moving canvas across entire portfolio background) */}
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <NeuralCanvas className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80" />
        </div>

        {/* Top Sticky Executive Navigation */}
        <ExecutiveNav
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* ================================================================== */}
        {/* 1. FULL-BLEED HERO SECTION (COMPLETE WIDTH & HEIGHT COVERAGE)       */}
        {/* ================================================================== */}
        <section
          id="hero"
          className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden border-b border-cyber-border/40"
        >
          {/* Fallback anchor for overview */}
          <div id="overview" className="absolute -top-24" aria-hidden="true" />

          {/* Full-Bleed 3D Neural Backdrop & Directional Vignettes (Complete 100vw/100vh coverage) */}
          <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none select-none">
            <Image
              src="/images/hero-neural.jpg"
              alt="Cybernetic Neural Architecture Backdrop"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-15 mix-blend-screen scale-105 filter blur-[0.5px]"
            />
            {/* Directional Vignette Gradient Masks */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#070b12]/50 via-transparent to-[#070b12]/95" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070b12]/70 via-transparent to-[#070b12]/75" />
            <div className="absolute inset-0 bg-cyber-radial opacity-35" />
          </div>

          {/* Foreground Hero Content Container with generous vertical breathing room */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full my-auto">
            <HeroSection
              onLaunchTerminal={() => {
                const el = document.getElementById('playground') || document.getElementById('terminal');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreArchitecture={() => {
                const el = document.getElementById('architecture');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </section>

        {/* Main Single-Page Bento Layout */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-24 sm:space-y-32">
          {/* ================================================================== */}
          {/* 2. PROOF OF SCALE: SYSTEM METRICS & ARCHITECTURE VISUALIZER       */}
          {/* ================================================================== */}
          <section id="architecture" className="space-y-6 pt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyber-border pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-widest text-cyber-accent">
                    System Architecture &amp; Scale
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Distributed Cluster Telemetry
                </h2>
                <p className="text-sm text-cyber-secondary max-w-2xl">
                  Inspect how Redis multi-level caching, RabbitMQ decoupling, and Model Context Protocol (MCP) agent tool layers maintain sub-100ms response targets under peak concurrency.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyber-surface2 border border-cyber-border text-cyber-green">
                  <span className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
                  <span>HOT-PATH SLA: 99.9%</span>
                </span>
              </div>
            </div>

            {/* 4-Stage Pipeline Visualizer with Dynamic Load Slider & System Presets */}
            <SystemMetricsVisualizer />
          </section>

          {/* ================================================================== */}
          {/* 3. FLAGSHIP CASE STUDIES: 3D TILT CARDS & DEEP-DIVE MODAL          */}
          {/* ================================================================== */}
          <section id="work" className="relative space-y-6 pt-4">
            {/* Fallback anchor for projects */}
            <div id="projects" className="absolute -top-24" aria-hidden="true" />
            <ProjectGrid />
          </section>

          {/* ================================================================== */}
          {/* 4. AI AGENT INTERACTIVE PLAYGROUND: STREAMING TERMINAL CLI         */}
          {/* ================================================================== */}
          <section id="playground" className="relative space-y-6 pt-4">
            {/* Fallback anchor for terminal */}
            <div id="terminal" className="absolute -top-24" aria-hidden="true" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyber-border pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-widest text-cyber-cyan">
                    Interactive AI Playground
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Developer Agent CLI Terminal
                </h2>
                <p className="text-sm text-cyber-secondary max-w-2xl">
                  Simulate production agentic workflows in real time. Execute 4-stage DICOM tumor segmentation pipelines, query live cluster latency, and inspect registered Model Context Protocol (MCP) server tools.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-cyber-muted">
                <span>Try:</span>
                <code className="text-cyber-accent px-1.5 py-0.5 rounded bg-cyber-surface2 border border-cyber-border">
                  run-dicom-pipeline
                </code>
              </div>
            </div>

            {/* Terminal CLI Component */}
            <AgentCLI />
          </section>

          {/* ================================================================== */}
          {/* 5. CAREER & TECHNICAL MASTERY: TIMELINE, SKILLS, EDUCATION         */}
          {/* ================================================================== */}
          <div className="space-y-24 sm:space-y-32">
            {/* 5A. Experience Timeline (Imaging IQ & ITH Technologies) */}
            <ExperienceSection />

            {/* 5B. Skills Taxonomy Matrix with Multi-Domain Filter Tabs */}
            <SkillsMatrix />

            {/* 5C. Education Card (UPES GPA 8.9 & 2023 Technical Honors) */}
            <section id="resume" className="space-y-6">
              <EducationCard />
            </section>
          </div>

        </main>

        {/* ================================================================== */}
        {/* 6. CYBER-EXECUTIVE FOOTER & DIRECT CONTACT COORDINATES             */}
        {/* ================================================================== */}
        <div id="contact" className="relative z-10 w-full grid grid-cols-1">
          <ExecutiveFooter
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          />
        </div>

        {/* Global Command Palette Dialog (Cmd/Ctrl+K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onOpenCaseStudy={handleOpenCaseStudy}
        />

        {/* Global Deep-Dive Case Study Modal */}
        {activeCaseStudy && (
          <CaseStudyModal
            isOpen={!!activeCaseStudy}
            caseStudy={activeCaseStudy}
            onClose={() => setActiveCaseStudyId(null)}
            onNavigate={(id) => setActiveCaseStudyId(id)}
          />
        )}
      </div>
    </SmoothScroll>
  );
}
