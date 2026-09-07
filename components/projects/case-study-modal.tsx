'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Activity,
  CheckCircle2,
  Cpu,
  Layers,
  Shield,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Database,
  GitBranch,
  TrendingUp,
  BarChart3,
  Server,
  Zap,
} from 'lucide-react';
import { CaseStudy } from '@/data/case-studies';
import { cn } from '@/lib/utils';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
  onNavigate?: (id: string) => void;
  allCaseStudies?: CaseStudy[];
}

export function CaseStudyModal({
  isOpen,
  onClose,
  caseStudy,
  onNavigate,
  allCaseStudies = [],
}: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'highlights' | 'outcomes'>('overview');

  // Handle body scroll locking when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset tab to overview whenever case study changes
  useEffect(() => {
    setActiveTab('overview');
  }, [caseStudy?.id]);

  if (!isOpen || !caseStudy) return null;

  // Compute next and previous projects
  const currentIndex = allCaseStudies.findIndex((cs) => cs.id === caseStudy.id);
  const prevStudy = currentIndex > 0 ? allCaseStudies[currentIndex - 1] : allCaseStudies[allCaseStudies.length - 1];
  const nextStudy = currentIndex < allCaseStudies.length - 1 ? allCaseStudies[currentIndex + 1] : allCaseStudies[0];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        {/* Backdrop blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          aria-hidden="true"
        />

        {/* Modal / Drawer Surface */}
        <motion.div
          initial={{ x: '100%', opacity: 0.8 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0.8 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl h-full bg-cyber-dark/95 border-l border-cyber-border shadow-2xl flex flex-col backdrop-blur-xl overflow-hidden"
        >
          {/* Top Bar / Header Navigation */}
          <div className="flex-none px-6 py-4 border-b border-cyber-border bg-cyber-surface/90 backdrop-blur-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/30">
                <Sparkles className="w-3 h-3" />
                {caseStudy.category}
              </span>
              <span className="text-xs font-mono text-cyber-muted hidden sm:inline-block">·</span>
              <span className="text-xs font-mono text-cyber-secondary hidden sm:inline-block">
                {caseStudy.clientOrCompany} ({caseStudy.period})
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Previous / Next Quick Switchers */}
              {allCaseStudies.length > 1 && onNavigate && (
                <div className="hidden sm:flex items-center gap-1 border-r border-cyber-border pr-2 mr-1">
                  <button
                    type="button"
                    onClick={() => prevStudy && onNavigate(prevStudy.id)}
                    className="p-1.5 rounded-lg border border-cyber-border text-cyber-secondary hover:text-white hover:border-cyber-accent/40 transition-colors"
                    title={`Previous: ${prevStudy?.title}`}
                    aria-label="Previous case study"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => nextStudy && onNavigate(nextStudy.id)}
                    className="p-1.5 rounded-lg border border-cyber-border text-cyber-secondary hover:text-white hover:border-cyber-accent/40 transition-colors"
                    title={`Next: ${nextStudy?.title}`}
                    aria-label="Next case study"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study modal"
                className="p-2 rounded-xl bg-cyber-surface2 border border-cyber-border text-cyber-secondary hover:text-white hover:border-cyber-accent/40 hover:bg-cyber-surface2/80 transition-all group"
              >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Tab Navigation Pill Strip */}
          <div className="flex-none px-6 py-2.5 bg-cyber-surface/60 border-b border-cyber-border/70 overflow-x-auto flex items-center gap-2 scrollbar-none">
            {[
              { id: 'overview', label: 'Executive Summary & Challenge' },
              { id: 'architecture', label: 'System Architecture & Flow' },
              { id: 'highlights', label: 'Engineering Decisions & Highlights' },
              { id: 'outcomes', label: 'Verified Metrics & Stack' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all',
                  activeTab === tab.id
                    ? 'bg-cyber-accent text-cyber-dark font-semibold shadow-glow-accent'
                    : 'text-cyber-secondary hover:text-white hover:bg-white/5 border border-transparent hover:border-cyber-border'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scrollable Modal Content */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-8 custom-scrollbar">
            {/* Title & Headline Header */}
            <div className="space-y-3 border-b border-cyber-border pb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyber-accent">
                <span>{caseStudy.role}</span>
                <span className="text-cyber-muted">·</span>
                <span className="text-cyber-secondary">{caseStudy.period}</span>
                <span className="text-cyber-muted">·</span>
                <span className="text-cyber-green font-semibold">{caseStudy.liveStatus}</span>
              </div>
              <h2 id="case-study-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {caseStudy.title}
              </h2>
              <p className="text-sm sm:text-base text-cyber-secondary leading-relaxed">
                {caseStudy.subtitle}
              </p>
            </div>

            {/* Visual Hero Render */}
            <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-cyber-border/80 group">
              <Image
                src={caseStudy.heroImage}
                alt={caseStudy.title}
                fill
                sizes="(max-width: 1024px) 100vw, 850px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-1.5 rounded-lg bg-cyber-dark/80 backdrop-blur-md border border-white/10 text-xs font-mono text-white flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-cyber-green" />
                  <span>Production Architecture Case Study</span>
                </div>
                <span className="text-[11px] font-mono text-cyber-secondary px-2 py-1 rounded bg-black/60 backdrop-blur-md">
                  {caseStudy.category}
                </span>
              </div>
            </div>

            {/* TAB 1: EXECUTIVE SUMMARY & CHALLENGE */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in-50 duration-200">
                {/* Executive Summary */}
                <div className="glass-card rounded-2xl p-6 border border-cyber-border space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyber-accent" />
                    <span>Executive Summary</span>
                  </h3>
                  <p className="text-sm text-cyber-secondary leading-relaxed">
                    {caseStudy.summary}
                  </p>
                </div>

                {/* Challenge & Constraints */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyber-accent">The Engineering Challenge</span>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {caseStudy.challenge.headline}
                    </h3>
                  </div>
                  <p className="text-sm text-cyber-secondary leading-relaxed">
                    {caseStudy.challenge.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Architectural Constraints */}
                    <div className="rounded-xl p-4 bg-cyber-surface2/60 border border-cyber-border space-y-2.5">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-cyan flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" />
                        <span>System Constraints</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-cyber-secondary">
                        {caseStudy.challenge.constraints.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-cyber-accent font-mono">›</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Core Pain Points */}
                    <div className="rounded-xl p-4 bg-cyber-surface2/60 border border-cyber-border space-y-2.5">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-lavender flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        <span>Core Operational Bottlenecks</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-cyber-secondary">
                        {caseStudy.challenge.corePainPoints.map((p, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-cyber-lavender font-mono">›</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Quick Impact Highlight Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {caseStudy.verifiedOutcomes.map((kpi, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl p-3.5 bg-cyber-surface2/40 border border-cyber-border text-center flex flex-col justify-center"
                    >
                      <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                        {kpi.metric}
                      </div>
                      <div className="text-[11px] font-mono text-cyber-accent mt-0.5">{kpi.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: SYSTEM ARCHITECTURE & FLOW */}
            {activeTab === 'architecture' && (
              <div className="space-y-8 animate-in fade-in-50 duration-200">
                {/* Architectural Overview */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyber-accent">Architectural Blueprint</span>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      End-to-End Distributed Architecture
                    </h3>
                  </div>
                  <p className="text-sm text-cyber-secondary leading-relaxed">
                    {caseStudy.architecture.overview}
                  </p>
                </div>

                {/* Interactive System Diagram Visualizer Card */}
                <div className="glass-card rounded-2xl p-6 border border-cyber-border space-y-4">
                  <div className="flex items-center justify-between border-b border-cyber-border pb-3">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyber-cyan" />
                      <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                        System Architecture Topology
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-green/10 text-cyber-green border border-cyber-green/20">
                      LIVE TOPOLOGY
                    </span>
                  </div>

                  <p className="text-xs text-cyber-muted italic">
                    {caseStudy.architecture.diagramDescription}
                  </p>

                  {/* Node Grid Visualization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                    {caseStudy.systemDiagramNodes.map((node, i) => (
                      <div
                        key={node.id}
                        className="rounded-xl p-3.5 bg-cyber-surface2/80 border border-cyber-border hover:border-cyber-accent/40 transition-all space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-cyber-muted">Stage 0{i + 1}</span>
                          <span className="text-cyber-accent font-medium">{node.status}</span>
                        </div>
                        <div className="text-xs font-bold text-white">{node.label}</div>
                        <div className="text-[11px] text-cyber-secondary">{node.sublabel}</div>
                        <div className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-cyber-cyan border border-white/5 w-fit mt-1">
                          {node.tech}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4-Stage Pipeline Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-cyber-accent font-semibold">
                    Detailed Pipeline Execution Stages
                  </h4>

                  <div className="space-y-3">
                    {caseStudy.architecture.pipelineStages.map((stage) => (
                      <div
                        key={stage.stageNumber}
                        className="rounded-xl p-4 bg-cyber-surface2/50 border border-cyber-border space-y-2"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent text-xs font-mono font-bold flex items-center justify-center">
                              {stage.stageNumber}
                            </span>
                            <span className="text-sm font-bold text-white">{stage.name}</span>
                          </div>
                          <span className="text-xs font-mono text-cyber-cyan">{stage.tech}</span>
                        </div>

                        <p className="text-xs text-cyber-secondary leading-relaxed">
                          {stage.description}
                        </p>

                        <div className="pt-1 space-y-1 border-t border-white/5">
                          {stage.substeps.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-[11px] text-cyber-muted">
                              <span className="text-cyber-green">✓</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DECISIONS & TECHNICAL HIGHLIGHTS */}
            {activeTab === 'highlights' && (
              <div className="space-y-8 animate-in fade-in-50 duration-200">
                {/* Key Technical Highlights */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyber-accent">Engineering Highlights</span>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Core Implementation Accomplishments
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {caseStudy.technicalHighlights.map((hl, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl p-5 bg-cyber-surface2/60 border border-cyber-border space-y-3 hover:border-cyber-accent/30 transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h4 className="text-base font-bold text-white">{hl.title}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20 w-fit">
                            {hl.badge}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-cyber-secondary leading-relaxed">
                          {hl.description}
                        </p>
                        <div className="space-y-1.5 pt-2 border-t border-white/5">
                          {hl.keyPoints.map((kp, kIdx) => (
                            <div key={kIdx} className="flex items-start gap-2 text-xs text-cyber-secondary">
                              <span className="text-cyber-accent font-mono">›</span>
                              <span>{kp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architectural Tradeoffs Analysis */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyber-cyan">Engineering Tradeoffs</span>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Decision Rationale &amp; Alternative Paths
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {caseStudy.architecture.tradeoffs.map((tradeoff, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl p-4 bg-cyber-surface2/40 border border-cyber-border space-y-2.5"
                      >
                        <div className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-cyber-accent" />
                          <h4 className="text-xs sm:text-sm font-bold text-white">{tradeoff.decision}</h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                          <div className="p-2 rounded bg-cyber-green/5 border border-cyber-green/20 text-cyber-green">
                            <span className="font-semibold block text-[10px] uppercase">Chosen Approach:</span>
                            <span>{tradeoff.chosen}</span>
                          </div>
                          <div className="p-2 rounded bg-white/5 border border-white/10 text-cyber-muted">
                            <span className="font-semibold block text-[10px] uppercase">Alternative Considered:</span>
                            <span>{tradeoff.alternative}</span>
                          </div>
                        </div>

                        <p className="text-xs text-cyber-secondary leading-relaxed pt-1">
                          <strong className="text-white">Rationale: </strong>
                          {tradeoff.rationale}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: VERIFIED OUTCOMES & TECH STACK */}
            {activeTab === 'outcomes' && (
              <div className="space-y-8 animate-in fade-in-50 duration-200">
                {/* Quantified Verified Outcomes */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyber-accent">Measurable Production Outcomes</span>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Verifiable Impact Metrics
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {caseStudy.verifiedOutcomes.map((item, idx) => (
                      <div
                        key={idx}
                        className="glass-card rounded-xl p-5 border border-cyber-border space-y-2"
                      >
                        <div className="text-3xl font-extrabold font-mono text-white tracking-tight">
                          {item.metric}
                        </div>
                        <div className="text-xs font-mono font-bold text-cyber-accent">{item.label}</div>
                        <p className="text-xs text-cyber-secondary leading-relaxed pt-1 border-t border-white/5">
                          {item.context}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Complete Tech Stack Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-cyber-accent font-semibold">
                    Complete Technology Stack
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {caseStudy.techStack.map((stackGroup) => (
                      <div
                        key={stackGroup.category}
                        className="rounded-xl p-4 bg-cyber-surface2/50 border border-cyber-border space-y-2.5"
                      >
                        <h5 className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-wider">
                          {stackGroup.category}
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {stackGroup.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-mono px-2.5 py-1 rounded bg-cyber-surface2 text-cyber-secondary border border-cyber-border hover:text-white hover:border-cyber-accent/30 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Footer Navigation */}
            <div className="border-t border-cyber-border pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-cyber-muted">
                Case Study ID: <code className="text-cyber-accent">{caseStudy.id}</code>
              </div>

              {allCaseStudies.length > 1 && onNavigate && (
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <button
                    type="button"
                    onClick={() => prevStudy && onNavigate(prevStudy.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono bg-cyber-surface2 border border-cyber-border text-cyber-secondary hover:text-white hover:border-cyber-accent/40 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{prevStudy?.title}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => nextStudy && onNavigate(nextStudy.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono bg-cyber-surface2 border border-cyber-border text-cyber-secondary hover:text-white hover:border-cyber-accent/40 transition-all"
                  >
                    <span>{nextStudy?.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
