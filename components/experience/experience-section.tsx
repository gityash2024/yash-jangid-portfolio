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
} from 'lucide-react';
import { careerExperiences, ExperienceItem } from '@/data/portfolio';
import { cn } from '@/lib/utils';

export function ExperienceSection() {
  // State tracking which experience cards are expanded for deep-dive reading
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    'imaging-iq': true,
    'ith-technologies-sde1': true,
    'ith-technologies-intern': false,
  });

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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

        {careerExperiences.map((exp, index) => {
          const isExpanded = !!expandedCards[exp.id];

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
                        className="rounded-xl p-3 bg-cyber-surface2/60 border border-cyber-border text-center flex flex-col justify-center"
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
                      className="text-xs font-mono text-cyber-accent hover:underline inline-flex items-center gap-1 pt-1"
                    >
                      <span>Show {exp.highlights.length - 3} more accomplishments...</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Technology Badges */}
                <div className="pt-2 border-t border-cyber-border space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyber-muted">
                    Engineered With
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyber-surface2 text-cyber-secondary border border-cyber-border hover:text-white hover:border-cyber-accent/30 transition-colors"
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
