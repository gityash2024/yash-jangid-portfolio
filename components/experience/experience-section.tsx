'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Cpu,
  TrendingDown,
  Zap,
  Activity,
  Award,
  Layers,
  Sparkles,
  Shield,
  ExternalLink,
} from 'lucide-react';
import { careerExperiences, ExperienceItem } from '@/data/portfolio';
import { useSound } from '@/hooks/use-sound';
import { cn } from '@/lib/utils';

export function ExperienceSection() {
  const { playClick, playHover } = useSound();

  // State tracking which experience cards are expanded for deep-dive reading
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    'imaging-iq': true,
    'ith-technologies-sde1': true,
    'ith-technologies-intern': false,
  });

  const toggleExpand = (id: string) => {
    playClick();
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const architecturalPillars: Record<string, { title: string; subtitle: string; highlights: string[] }> = {
    'imaging-iq': {
      title: 'Enterprise Healthcare AI & DICOMweb Ingestion Architecture',
      subtitle: 'Oncology tumor detection pipelines with 98.4% Dice score and sub-100ms slice streaming',
      highlights: [
        'Store-and-forward DICOM ingestion via Orthanc PACS and DICOMweb WADO-RS / QIDO-RS protocols.',
        'Client-side WebGL multi-planar reconstruction (MPR) rendering via customized OHIF Viewer.',
        'Deterministic LLM agent orchestration integrating Model Context Protocol (MCP) tool endpoints for structured clinical reporting.',
        'Decoupled microservice topology isolating volume normalization (SimpleITK/NumPy) from GPU model execution.',
      ],
    },
    'ith-technologies-sde1': {
      title: 'High-Throughput Web3 & Algorithmic Trading Infrastructure',
      subtitle: '10,000+ req/min throughput, -40% latency reduction, and 99.9% uptime across 5+ platforms',
      highlights: [
        'Distributed Redis cache cluster maintaining hot-path order books and sub-100ms request paths under volatility surges.',
        'Full-duplex WebSocket order-book multiplexing with sequence validation algorithms preventing state desyncs.',
        'Automated Docker containerization & GitHub Actions CI/CD pipeline slashing release cycles from 2 hours to 15 minutes.',
        'Authored and published 8+ shared internal npm utility libraries adopted company-wide.',
      ],
    },
    'ith-technologies-intern': {
      title: 'Full Stack Engineering Foundations & Accelerated Promotion',
      subtitle: 'High-velocity feature delivery and rapid advancement from Intern to Core SDE I',
      highlights: [
        'Engineered responsive React interfaces and integrated RESTful backend services with strict error boundaries.',
        'Authored integration tests for critical authentication and data transformation paths.',
        'Earned accelerated promotion to full-time Software Development Engineer (SDE I) in 7 months.',
      ],
    },
  };

  return (
    <section id="experience" className="space-y-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyber-border pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyber-accent">
              Career Timeline &amp; Track Record
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Production Engineering Experience
          </h2>
          <p className="text-sm text-cyber-secondary max-w-xl">
            Nearly five years of verified engineering ownership across Healthcare AI, Web3/FinTech trading engines, and enterprise microservices.
          </p>
        </div>

        {/* Quick Summary Pill Strip */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-cyber-surface2 border border-cyber-border text-xs font-mono text-cyber-secondary">
            <span className="text-cyber-accent font-bold">5+</span> Years Production
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-cyber-surface2 border border-cyber-border text-xs font-mono text-cyber-secondary">
            <span className="text-cyber-green font-bold">99.9%</span> Uptime SLA
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-cyber-surface2 border border-cyber-border text-xs font-mono text-cyber-secondary">
            <span className="text-cyber-cyan font-bold">10K+</span> Req / Min
          </div>
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative pl-6 sm:pl-10 space-y-8">
        {/* Continuous Timeline Vertical Line */}
        <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyber-accent via-cyber-cyan to-cyber-border" />

        {careerExperiences.map((exp) => {
          const isExpanded = !!expandedCards[exp.id];
          const pillar = architecturalPillars[exp.id];

          return (
            <div key={exp.id} className="relative group">
              {/* Glowing Timeline Node Dot */}
              <div
                className={cn(
                  'absolute -left-[27px] sm:-left-[39px] top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10',
                  exp.current
                    ? 'bg-cyber-dark border-cyber-green shadow-glow-green scale-110'
                    : 'bg-cyber-dark border-cyber-accent/60 group-hover:border-cyber-accent group-hover:shadow-glow-accent'
                )}
              >
                <div
                  className={cn(
                    'w-2 h-2 rounded-full',
                    exp.current ? 'bg-cyber-green animate-pulse' : 'bg-cyber-accent'
                  )}
                />
              </div>

              {/* Experience Card Shell */}
              <article className="glass-card rounded-2xl border border-cyber-border hover:border-cyber-accent/40 hover:shadow-glass-card-hover transition-all duration-300 p-6 sm:p-8 space-y-6">
                {/* Header Row: Role, Company, Period, Badges */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-cyber-border pb-5">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-cyber-green/10 text-cyber-green border border-cyber-green/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                          CURRENT ROLE
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-cyber-muted">
                      <span className="text-cyber-accent font-semibold">{exp.company}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-cyber-secondary">
                        <MapPin className="w-3.5 h-3.5 text-cyber-muted" />
                        {exp.location}
                      </span>
                      <span>·</span>
                      <span className="text-cyber-cyan">{exp.domain}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium bg-cyber-surface2 text-cyber-secondary border border-cyber-border">
                      <Calendar className="w-3.5 h-3.5 text-cyber-accent" />
                      <span>{exp.period}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpand(exp.id)}
                      onMouseEnter={playHover}
                      aria-expanded={isExpanded}
                      className="p-1.5 rounded-lg border border-cyber-border text-cyber-secondary hover:text-white hover:border-cyber-accent/40 transition-colors"
                      title={isExpanded ? 'Collapse details' : 'Expand details'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Measurable Production Metrics Chips */}
                {exp.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                    {exp.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl p-3 bg-cyber-surface2/60 border border-cyber-border text-center flex flex-col justify-center group-hover:border-cyber-accent/20 transition-colors"
                      >
                        <div className="text-lg sm:text-xl font-bold font-mono text-white">
                          {metric.value}
                        </div>
                        <div className="text-[10px] font-mono text-cyber-muted uppercase tracking-wider mt-0.5 truncate">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Accomplishments Bullet Points */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-cyber-muted font-semibold">
                    Core Technical Accomplishments
                  </h4>
                  <ul className="space-y-2.5">
                    {exp.highlights.slice(0, isExpanded ? undefined : 3).map((hl, hlIdx) => (
                      <li key={hlIdx} className="flex items-start gap-3 text-xs sm:text-sm text-cyber-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent flex-shrink-0 mt-2" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>

                  {!isExpanded && exp.highlights.length > 3 && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(exp.id)}
                      onMouseEnter={playHover}
                      className="text-xs font-mono text-cyber-accent hover:underline inline-flex items-center gap-1 pt-1"
                    >
                      <span>Show {exp.highlights.length - 3} more accomplishments...</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Deep-Dive Architectural Pillar Banner (Rendered when expanded) */}
                {isExpanded && pillar && (
                  <div className="p-4 sm:p-5 rounded-xl bg-cyber-surface2/80 border border-cyber-accent/30 space-y-3 animate-in fade-in-50 duration-200">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyber-accent" />
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        {pillar.title}
                      </span>
                    </div>
                    <p className="text-xs text-cyber-secondary">{pillar.subtitle}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {pillar.highlights.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-start gap-2 p-2.5 rounded-lg bg-black/30 border border-white/5 text-[11px] text-cyber-secondary"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyber-green shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technology Badges */}
                <div className="pt-2 border-t border-cyber-border space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyber-muted">
                    Engineered With
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        onMouseEnter={playHover}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyber-surface2 text-cyber-secondary border border-cyber-border hover:text-white hover:border-cyber-accent/40 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ExperienceSection;
