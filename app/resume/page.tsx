'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Printer,
  ArrowLeft,
  Mail,
  ExternalLink,
  Award,
  GraduationCap,
  Briefcase,
  Code2,
  Cpu,
  Activity,
  CheckCircle2,
  MapPin,
  Calendar,
  Sparkles,
  Sun,
  Moon,
  Globe,
  Check,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { useTheme } from '@/context/theme-context';
import { useLanguage } from '@/context/language-context';
import { SupportedLanguage, LANGUAGES } from '@/lib/translations';
import { cn } from '@/lib/utils';

export default function ResumePage() {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t, dir } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langMenuOpen]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-foreground selection:bg-cyber-accent/30 selection:text-white print:bg-white print:text-black" dir={dir}>
      {/* Top Floating Control Bar (Hidden on Print) */}
      <header className="sticky top-0 z-50 glass-nav border-b border-cyber-border py-4 px-4 sm:px-8 print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyber-secondary hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-cyber-accent" />
            <span>{t('resume.back', 'Back to Portfolio')}</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="mailto:gityash2024@gmail.com"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono bg-cyber-surface2 border border-cyber-border text-cyber-secondary hover:text-white hover:border-cyber-accent/40 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>{t('resume.contact', 'Contact Yash')}</span>
            </a>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                aria-label="Select Language"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-cyber-surface2 border border-cyber-border text-cyber-secondary hover:text-white hover:border-cyber-accent/40 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-cyber-accent" />
                <span className="hidden sm:inline">{LANGUAGES[language]?.nativeName || 'Language'}</span>
                <span className="sm:hidden uppercase">{language}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-cyber-surface/95 backdrop-blur-xl border border-cyber-border shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {Object.entries(LANGUAGES).map(([code, meta]) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        setLanguage(code as SupportedLanguage);
                        setLangMenuOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-colors text-left',
                        language === code
                          ? 'bg-cyber-accent/15 text-white font-bold border border-cyber-accent/40'
                          : 'text-cyber-secondary hover:text-white hover:bg-white/5'
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span>{meta.flag}</span>
                        <span>{meta.nativeName}</span>
                      </span>
                      {language === code && <Check className="w-3.5 h-3.5 text-cyber-accent" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-xl border border-cyber-border bg-cyber-surface2 text-cyber-secondary hover:text-white transition-all flex items-center justify-center"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-cyber-cyan" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-cyber-accent text-cyber-dark hover:bg-white hover:shadow-glow-accent transition-all duration-200"
            >
              <Printer className="w-4 h-4" />
              <span>{t('resume.print', 'Print / Save PDF')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Resume Paper Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12 print:max-w-none print:p-0 print:m-0">
        <div className="bg-cyber-card/80 border border-cyber-border rounded-2xl p-6 sm:p-10 shadow-glass-card print:border-none print:shadow-none print:bg-white print:p-0">
          {/* Header Section: Name, Role, Contact, Photo */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b border-cyber-border print:border-gray-300">
            <div className="space-y-3">
              <div className="flex items-center gap-2 print:hidden">
                <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyber-accent">
                  {t('resume.badge', 'Verified Executive Curriculum Vitae')}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight print:text-black">
                {portfolioData.personal.name}
              </h1>

              <p className="text-base sm:text-lg font-medium text-cyber-cyan font-mono print:text-gray-800">
                {t('resume.title', portfolioData.personal.title)}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-cyber-secondary print:text-gray-600 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyber-accent print:text-black" />
                  {t('resume.location', portfolioData.personal.location)}
                </span>
                <span>•</span>
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="hover:text-white transition-colors print:text-gray-800"
                >
                  {portfolioData.personal.email}
                </a>
                <span>•</span>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors print:text-gray-800"
                >
                  GitHub
                </a>
                <span>•</span>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors print:text-gray-800"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Bespoke Generated Brand Logo replacing photo */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyber-accent/40 shadow-[0_0_20px_rgba(124,140,255,0.25)] flex-shrink-0 bg-[#080d18] print:hidden">
              <Image
                src="/images/yj-brand-logo.jpg"
                alt={`${portfolioData.personal.name} Executive Monogram Logo`}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Executive Summary */}
          <section className="py-6 border-b border-cyber-border print:border-gray-300">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyber-accent mb-3 flex items-center gap-2 print:text-black">
              <Sparkles className="w-3.5 h-3.5" />
              {t('resume.profileTitle', 'Executive Profile')}
            </h2>
            <p className="text-sm leading-relaxed text-cyber-secondary print:text-gray-700">
              {t('resume.profileSummary', `${portfolioData.personal.bio} Nearly 5 years of production experience architecting mission-critical platforms across Healthcare AI, Web3 & High-Frequency Fintech, Job-Tech, and LLM agent orchestration. Proven record delivering 99.9% uptime, 40% latency reductions, and compressing release cycles from 2 hours to 15 minutes.`)}
            </p>
          </section>

          {/* Two-Column Layout for Experience and Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">
            {/* Main Column: Work Experience */}
            <div className="lg:col-span-8 space-y-8">
              <section>
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyber-accent mb-6 flex items-center gap-2 print:text-black">
                  <Briefcase className="w-4 h-4" />
                  {t('resume.experienceTitle', 'Professional Work Experience')}
                </h2>

                <div className="space-y-8">
                  {portfolioData.experience.map((exp, idx) => {
                    const roleTitle = t(`resume.exp${idx + 1}.role`, exp.role);
                    const period = t(`resume.exp${idx + 1}.period`, exp.period);
                    const company = t(`resume.exp${idx + 1}.company`, exp.company);
                    const location = t(`resume.exp${idx + 1}.location`, exp.location);

                    return (
                      <article
                        key={idx}
                        className="relative pl-6 border-l-2 border-cyber-accent/30 print:border-gray-400 space-y-3"
                      >
                        <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-cyber-accent print:bg-black" />

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h3 className="text-lg font-bold text-white print:text-black">
                            {roleTitle}
                          </h3>
                          <span className="text-xs font-mono text-cyber-accent print:text-gray-600">
                            {period}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan print:text-gray-700">
                          <span className="font-semibold">{company}</span>
                          <span>·</span>
                          <span>{location}</span>
                        </div>

                        <ul className="space-y-2 text-xs sm:text-sm text-cyber-secondary print:text-gray-700">
                          {exp.highlights.map((highlight, hIdx) => {
                            const translatedHighlight = t(`resume.exp${idx + 1}.h${hIdx + 1}`, highlight);
                            return (
                              <li key={hIdx} className="flex items-start gap-2">
                                <span className="text-cyber-accent print:text-black font-mono">›</span>
                                <span>{translatedHighlight}</span>
                              </li>
                            );
                          })}
                        </ul>

                        {exp.skills && exp.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-surface2 border border-cyber-border text-cyber-secondary print:bg-gray-100 print:text-black print:border-gray-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>

              {/* Key Architectural Deployments */}
              <section className="pt-4 border-t border-cyber-border print:border-gray-300">
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyber-accent mb-4 flex items-center gap-2 print:text-black">
                  <Activity className="w-4 h-4" />
                  {t('resume.systemsTitle', 'Key Production Systems')}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {portfolioData.projects.map((proj, pIdx) => {
                    const projTitle = t(`resume.proj${pIdx + 1}.title`, proj.title);
                    const projDesc = t(`resume.proj${pIdx + 1}.desc`, proj.description);
                    const projImpact = t(`resume.proj${pIdx + 1}.impact`, proj.impact);

                    return (
                      <div
                        key={proj.id}
                        className="p-4 rounded-xl bg-cyber-surface2/60 border border-cyber-border print:border-gray-300 print:bg-gray-50 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white print:text-black">
                            {projTitle}
                          </h4>
                          <span className="text-[10px] font-mono text-cyber-cyan print:text-gray-600">
                            {proj.category}
                          </span>
                        </div>
                        <p className="text-xs text-cyber-secondary print:text-gray-600 line-clamp-2">
                          {projDesc}
                        </p>
                        <div className="text-[11px] font-mono text-cyber-green print:text-gray-800 font-medium">
                          {projImpact}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Sidebar Column: Education, Awards, Skills */}
            <div className="lg:col-span-4 space-y-8">
              {/* Education */}
              <section className="p-5 rounded-xl bg-cyber-surface2/50 border border-cyber-border print:border-gray-300 print:bg-gray-50 space-y-3">
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyber-accent flex items-center gap-2 print:text-black">
                  <GraduationCap className="w-4 h-4" />
                  {t('resume.educationTitle', 'Education')}
                </h2>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    {t('resume.institution', portfolioData.education.institution)}
                  </h3>
                  <p className="text-xs font-medium text-cyber-cyan print:text-gray-700">
                    {t('resume.degree', portfolioData.education.degree)}
                  </p>
                  <p className="text-xs font-mono text-cyber-secondary print:text-gray-600">
                    {portfolioData.education.period}
                  </p>
                  <div className="pt-2">
                    <span className="inline-block px-2.5 py-1 rounded text-xs font-mono font-bold bg-cyber-green/15 text-cyber-green border border-cyber-green/30 print:border-black print:text-black print:bg-transparent">
                      GPA: {portfolioData.education.gpa}
                    </span>
                  </div>
                </div>
              </section>

              {/* Honors & Awards */}
              <section className="p-5 rounded-xl bg-cyber-surface2/50 border border-cyber-border print:border-gray-300 print:bg-gray-50 space-y-4">
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyber-accent flex items-center gap-2 print:text-black">
                  <Award className="w-4 h-4" />
                  {t('resume.honorsTitle', 'Honors & Recognition')}
                </h2>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white print:text-black">
                      {t('resume.award1.title', 'Technical Excellence Award')}
                    </h4>
                    <p className="text-[11px] font-mono text-cyber-accent print:text-gray-600">
                      {t('resume.award1.sub', 'ITH Technologies · 2023')}
                    </p>
                    <p className="text-[11px] text-cyber-secondary print:text-gray-600">
                      {t('resume.award1.desc', 'Awarded for architectural ownership, microservices migration, and high-frequency trading platform delivery.')}
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-cyber-border print:border-gray-200">
                    <h4 className="text-xs font-bold text-white print:text-black">
                      {t('resume.award2.title', 'Most Promising Newcomer')}
                    </h4>
                    <p className="text-[11px] font-mono text-cyber-cyan print:text-gray-600">
                      {t('resume.award2.sub', 'ITH Technologies · 2023')}
                    </p>
                    <p className="text-[11px] text-cyber-secondary print:text-gray-600">
                      {t('resume.award2.desc', 'Recognized for exceptional technical execution and rapid product iteration.')}
                    </p>
                  </div>
                </div>
              </section>

              {/* Categorized Skills */}
              <section className="p-5 rounded-xl bg-cyber-surface2/50 border border-cyber-border print:border-gray-300 print:bg-gray-50 space-y-4">
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyber-accent flex items-center gap-2 print:text-black">
                  <Code2 className="w-4 h-4" />
                  {t('resume.skillsTitle', 'Core Competencies')}
                </h2>

                {Object.entries(portfolioData.skills).map(([category, skills]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="text-[11px] font-mono uppercase text-cyber-cyan font-semibold print:text-gray-700">
                      {t(`resume.skills.${category}`, category)}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-dark/80 border border-cyber-border text-cyber-secondary print:bg-white print:border-gray-300 print:text-black"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </div>

          {/* Footer on Resume */}
          <div className="pt-6 border-t border-cyber-border print:border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-cyber-muted print:text-gray-500">
            <span>{t('resume.footer', 'Yash Jangid · Senior Full Stack & AI Platform Engineer')}</span>
            <span>gityash2024@gmail.com</span>
          </div>
        </div>
      </main>
    </div>
  );
}
