'use client';

import React from 'react';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  BookOpen,
  Trophy,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { educationData, awardsData } from '@/data/portfolio';
import { useLanguage } from '@/context/language-context';

export function EducationCard() {
  const { t } = useLanguage();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-2 border-b border-cyber-border pb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-cyber-accent">
            {t('edu.badge', 'Academic & Professional Honors')}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('edu.title', 'Education & Recognition')}
        </h2>
        <p className="text-sm text-cyber-secondary max-w-xl">
          {t('edu.description', 'Formal computer science foundations, cumulative GPA distinction, and industry technical awards earned in production environments.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Academic Card (Left Column - 6 cols) */}
        <div className="lg:col-span-6 glass-card rounded-2xl border border-cyber-border p-6 sm:p-8 space-y-6 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-5">
            {/* Header with University & Graduation Year */}
            <div className="flex items-start justify-between gap-4 border-b border-cyber-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyber-accent/10 border border-cyber-accent/30 flex items-center justify-center text-cyber-accent">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyber-cyan">
                    B.Tech Computer Science &amp; Engineering
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {educationData.institution}
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyber-surface2 text-cyber-accent border border-cyber-border">
                {educationData.period}
              </span>
            </div>

            {/* GPA Distinction Banner */}
            <div className="rounded-xl p-4 bg-cyber-surface2/70 border border-cyber-accent/30 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyber-muted">
                  Cumulative Academic Performance
                </span>
                <div className="text-sm font-semibold text-white">
                  First Class with Distinction
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent via-cyber-cyan to-white">
                  {educationData.gpa}
                </div>
                <span className="text-[10px] font-mono text-cyber-muted">Scale of 10.0</span>
              </div>
            </div>

            {/* Honors Highlights */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyber-muted font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyber-accent" />
                <span>Academic Distinction Highlights</span>
              </h4>
              <ul className="space-y-2 text-xs text-cyber-secondary">
                {educationData.honors.map((honor, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-green flex-shrink-0 mt-0.5" />
                    <span>{honor}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Coursework Grid */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyber-muted font-semibold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>Foundational Coursework</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {educationData.coursework.map((course) => (
                  <span
                    key={course}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyber-surface2 text-cyber-secondary border border-cyber-border"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-cyber-border flex items-center justify-between text-[11px] font-mono text-cyber-muted">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyber-muted" />
              {educationData.location}
            </span>
            <span className="text-cyber-green flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Verified Degree (2022)
            </span>
          </div>
        </div>

        {/* Technical Awards & Honors Cards (Right Column - 6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {awardsData.map((award) => (
            <div
              key={award.id}
              className="glass-card rounded-2xl border border-cyber-border hover:border-cyber-accent/40 hover:shadow-glass-card-hover transition-all duration-300 p-6 sm:p-7 space-y-4 relative overflow-hidden"
            >
              {/* Top Row: Title, Issuer, Badge */}
              <div className="flex items-start justify-between gap-3 border-b border-cyber-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyber-accent/10 border border-cyber-accent/30 flex items-center justify-center text-cyber-accent">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {award.title}
                    </h3>
                    <p className="text-xs font-mono text-cyber-secondary">
                      {award.issuer} · {award.year}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold bg-cyber-accent/15 text-cyber-accent border border-cyber-accent/30">
                  {award.badge}
                </span>
              </div>

              {/* Award Description */}
              <p className="text-xs sm:text-sm text-cyber-secondary leading-relaxed">
                {award.description}
              </p>

              {/* Key Contributions */}
              <div className="space-y-2 pt-1 border-t border-white/5">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-cyber-muted font-semibold">
                  Recognized Impact &amp; Contributions
                </h4>
                <ul className="space-y-2 text-xs text-cyber-secondary">
                  {award.keyContributions.map((contrib, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-cyber-accent font-mono">›</span>
                      <span>{contrib}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
