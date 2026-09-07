'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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

import { ExecutiveNav } from '@/components/navigation/executive-nav';
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
    <div className="min-h-screen bg-cyber-dark text-foreground selection:bg-cyber-accent/30 selection:text-white relative overflow-x-hidden">
      {/* Ambient background glow & atmospheric cyber grid */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-cyber-gradient opacity-60" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-10" aria-hidden="true" />

      {/* Top Sticky Executive Navigation */}
      <ExecutiveNav
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Single-Page Bento Layout */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-24 sm:space-y-32">
        {/* ================================================================== */}
        {/* 1. HERO SECTION WITH NEURAL CANVAS BACKDROP                        */}
        {/* ================================================================== */}
        <section id="hero" className="relative">
          {/* Fallback anchor for overview */}
          <div id="overview" className="absolute -top-24" aria-hidden="true" />

          {/* Interactive Cursor-Reactive Particle Constellation Mesh */}
          <div className="absolute inset-0 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden pointer-events-none z-0">
            <NeuralCanvas className="w-full h-full pointer-events-auto opacity-50" />
          </div>

          {/* Foreground Hero Content Container */}
          <div className="relative z-10">
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

          {/* 4-Stage Pipeline Visualizer with Dynamic Load Slider */}
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

        {/* ================================================================== */}
        {/* 6. CYBER-EXECUTIVE FOOTER & DIRECT CONTACT COORDINATES             */}
        {/* ================================================================== */}
        <footer id="contact" className="border-t border-cyber-border pt-16 pb-20 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Value Proposition & Availability */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyber-green">
                <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                <span>AVAILABLE FOR SENIOR FULL STACK &amp; AI ROLES</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Let&apos;s Architect Next-Generation Systems
              </h3>
              <p className="text-sm text-cyber-secondary leading-relaxed max-w-md">
                Looking for a Senior Full Stack Engineer or AI Platform Developer to deliver high-throughput architectures, Healthcare AI pipelines, or deterministic LLM agent workflows? Let&apos;s connect.
              </p>

              {/* Direct email copy action pill */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  onMouseEnter={playHover}
                  aria-label="Copy official email address to clipboard"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono font-medium bg-cyber-surface2 border border-cyber-border hover:border-cyber-accent/50 text-white hover:shadow-glow-accent transition-all duration-200"
                >
                  <Mail className="w-4 h-4 text-cyber-accent" />
                  <span>{copiedEmail ? 'Email Copied to Clipboard ✓' : 'gityash2024@gmail.com'}</span>
                  <Copy className="w-3.5 h-3.5 text-cyber-muted ml-1" />
                </button>
              </div>
            </div>

            {/* Right: Quick Links, Coordinates & Social Actions */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Navigation Anchors */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-cyber-muted">
                  Quick Navigation
                </span>
                <ul className="space-y-2 text-xs font-mono">
                  <li>
                    <a href="#hero" className="text-cyber-secondary hover:text-cyber-accent transition-colors">
                      → Overview &amp; Hero
                    </a>
                  </li>
                  <li>
                    <a href="#architecture" className="text-cyber-secondary hover:text-cyber-accent transition-colors">
                      → System Architecture
                    </a>
                  </li>
                  <li>
                    <a href="#work" className="text-cyber-secondary hover:text-cyber-accent transition-colors">
                      → Flagship Deployments
                    </a>
                  </li>
                  <li>
                    <a href="#playground" className="text-cyber-secondary hover:text-cyber-accent transition-colors">
                      → AI Agent Playground
                    </a>
                  </li>
                  <li>
                    <a href="#experience" className="text-cyber-secondary hover:text-cyber-accent transition-colors">
                      → Career Timeline
                    </a>
                  </li>
                  <li>
                    <a href="#skills" className="text-cyber-secondary hover:text-cyber-accent transition-colors">
                      → Technical Skills
                    </a>
                  </li>
                </ul>
              </div>

              {/* Verified External Profiles */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-cyber-muted">
                  External Coordinates
                </span>
                <div className="space-y-2 text-xs font-mono">
                  <a
                    href="https://github.com/gityash2024"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHover}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-cyber-surface2/60 border border-cyber-border hover:border-cyber-accent/40 text-cyber-secondary hover:text-white transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-cyber-accent" />
                      <span>GitHub @gityash2024</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyber-muted group-hover:text-cyber-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>

                  <a
                    href="https://in.linkedin.com/in/yashjangid091099"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHover}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-cyber-surface2/60 border border-cyber-border hover:border-cyber-accent/40 text-cyber-secondary hover:text-white transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-cyber-cyan" />
                      <span>LinkedIn Profile</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyber-muted group-hover:text-cyber-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsCommandPaletteOpen(true)}
                    onMouseEnter={playHover}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg bg-cyber-surface2/60 border border-cyber-border hover:border-cyber-accent/40 text-cyber-secondary hover:text-white transition-all text-left group"
                  >
                    <span className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyber-lavender" />
                      <span>Command Palette</span>
                    </span>
                    <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-cyber-muted">
                      ⌘K
                    </kbd>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Timezone & Back to Top */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-cyber-border/60 pt-8 text-xs font-mono text-cyber-muted">
            <div className="flex items-center gap-2">
              <span>© 2026 Yash Jangid</span>
              <span>·</span>
              <span>Built with Next.js 15 &amp; React 19</span>
            </div>

            <div className="flex items-center gap-4">
              <span>Gurugram, India (IST / UTC+5:30)</span>
              <button
                type="button"
                onClick={scrollToTop}
                onMouseEnter={playHover}
                aria-label="Scroll back to top"
                className="p-2 rounded-lg bg-cyber-surface2 border border-cyber-border hover:border-cyber-accent/40 text-cyber-secondary hover:text-white transition-all"
                title="Scroll back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Global Command Palette Dialog (Cmd/Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenCaseStudy={handleOpenCaseStudy}
      />

      {/* Global Deep-Dive Case Study Modal (Triggered via Command Palette or Direct Links) */}
      {activeCaseStudy && (
        <CaseStudyModal
          isOpen={!!activeCaseStudy}
          caseStudy={activeCaseStudy}
          onClose={() => setActiveCaseStudyId(null)}
          onNavigate={(id) => setActiveCaseStudyId(id)}
        />
      )}
    </div>
  );
}
