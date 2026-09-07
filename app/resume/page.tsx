'use client';

import React from 'react';
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
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export default function ResumePage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-foreground selection:bg-cyber-accent/30 selection:text-white print:bg-white print:text-black">
      {/* Top Floating Control Bar (Hidden on Print) */}
      <header className="sticky top-0 z-50 glass-nav border-b border-cyber-border py-4 px-4 sm:px-8 print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyber-secondary hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-cyber-accent" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="mailto:gityash2024@gmail.com"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono bg-cyber-surface2 border border-cyber-border text-cyber-secondary hover:text-white hover:border-cyber-accent/40 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Contact Yash</span>
            </a>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-cyber-accent text-cyber-dark hover:bg-white hover:shadow-glow-accent transition-all duration-200"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
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
                  Verified Executive Curriculum Vitae
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight print:text-black">
                {portfolioData.personal.name}
              </h1>

              <p className="text-base sm:text-lg font-medium text-cyber-cyan font-mono print:text-gray-800">
                {portfolioData.personal.title}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-cyber-secondary print:text-gray-600 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyber-accent print:text-black" />
                  {portfolioData.personal.location}
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

            {/* Portrait Image */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyber-accent/40 flex-shrink-0 print:hidden">
              <Image
                src="/images/yash-jangid.webp"
                alt={portfolioData.personal.name}
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
              Executive Profile
            </h2>
            <p className="text-sm leading-relaxed text-cyber-secondary print:text-gray-700">
              {portfolioData.personal.bio} Nearly 5 years of production experience architecting mission-critical platforms across Healthcare AI, Web3 &amp; High-Frequency Fintech, Job-Tech, and LLM agent orchestration. Proven record delivering 99.9% uptime, 40% latency reductions, and compressing release cycles from 2 hours to 15 minutes.
            </p>
          </section>

          {/* Two-Column Layout for Experience and Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">
            {/* Main Column: Work Experience */}
            <div className="lg:col-span-8 space-y-8">
              <section>
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyber-accent mb-6 flex items-center gap-2 print:text-black">
                  <Briefcase className="w-4 h-4" />
                  Professional Work Experience
                </h2>

                <div className="space-y-8">
                  {portfolioData.experience.map((exp, idx) => (
                    <article
                      key={idx}
                      className="relative pl-6 border-l-2 border-cyber-accent/30 print:border-gray-400 space-y-3"
                    >
                      <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-cyber-accent print:bg-black" />

                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="text-lg font-bold text-white print:text-black">
                          {exp.role}
                        </h3>
                        <span className="text-xs font-mono text-cyber-accent print:text-gray-600">
                          {exp.period}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan print:text-gray-700">
                        <span className="font-semibold">{exp.company}</span>
                        <span>·</span>
                        <span>{exp.location}</span>
                      </div>

                      <ul className="space-y-2 text-xs sm:text-sm text-cyber-secondary print:text-gray-700">
                        {exp.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="text-cyber-accent print:text-black font-mono">›</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
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
                  ))}
                </div>
              </section>

              {/* Key Architectural Deployments */}
              <section className="pt-4 border-t border-cyber-border print:border-gray-300">
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyber-accent mb-4 flex items-center gap-2 print:text-black">
                  <Activity className="w-4 h-4" />
                  Key Production Systems
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {portfolioData.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl bg-cyber-surface2/60 border border-cyber-border print:border-gray-300 print:bg-gray-50 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white print:text-black">
                          {proj.title}
                        </h4>
                        <span className="text-[10px] font-mono text-cyber-cyan print:text-gray-600">
                          {proj.category}
                        </span>
                      </div>
                      <p className="text-xs text-cyber-secondary print:text-gray-600 line-clamp-2">
                        {proj.description}
                      </p>
                      <div className="text-[11px] font-mono text-cyber-green print:text-gray-800 font-medium">
                        {proj.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar Column: Education, Awards, Skills */}
            <div className="lg:col-span-4 space-y-8">
              {/* Education */}
              <section className="p-5 rounded-xl bg-cyber-surface2/50 border border-cyber-border print:border-gray-300 print:bg-gray-50 space-y-3">
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyber-accent flex items-center gap-2 print:text-black">
                  <GraduationCap className="w-4 h-4" />
                  Education
                </h2>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    {portfolioData.education.institution}
                  </h3>
                  <p className="text-xs font-medium text-cyber-cyan print:text-gray-700">
                    {portfolioData.education.degree}
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
                  Honors &amp; Recognition
                </h2>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white print:text-black">
                      Technical Excellence Award
                    </h4>
                    <p className="text-[11px] font-mono text-cyber-accent print:text-gray-600">
                      ITH Technologies · 2023
                    </p>
                    <p className="text-[11px] text-cyber-secondary print:text-gray-600">
                      Awarded for architectural ownership, microservices migration, and high-frequency trading platform delivery.
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-cyber-border print:border-gray-200">
                    <h4 className="text-xs font-bold text-white print:text-black">
                      Most Promising Newcomer
                    </h4>
                    <p className="text-[11px] font-mono text-cyber-cyan print:text-gray-600">
                      ITH Technologies · 2023
                    </p>
                    <p className="text-[11px] text-cyber-secondary print:text-gray-600">
                      Recognized for exceptional technical execution and rapid product iteration.
                    </p>
                  </div>
                </div>
              </section>

              {/* Categorized Skills */}
              <section className="p-5 rounded-xl bg-cyber-surface2/50 border border-cyber-border print:border-gray-300 print:bg-gray-50 space-y-4">
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyber-accent flex items-center gap-2 print:text-black">
                  <Code2 className="w-4 h-4" />
                  Core Competencies
                </h2>

                {Object.entries(portfolioData.skills).map(([category, skills]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="text-[11px] font-mono uppercase text-cyber-cyan font-semibold print:text-gray-700">
                      {category}
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
            <span>Yash Jangid · Senior Full Stack Engineer</span>
            <span>gityash2024@gmail.com</span>
          </div>
        </div>
      </main>
    </div>
  );
}
