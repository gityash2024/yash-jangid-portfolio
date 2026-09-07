'use client';

import React, { useState } from 'react';
import { caseStudiesData, getCaseStudyById } from '@/data/case-studies';
import { ProjectCard } from './project-card';
import { CaseStudyModal } from './case-study-modal';
import { cn } from '@/lib/utils';

interface ProjectGridProps {
  initialProjectId?: string | null;
}

export function ProjectGrid({ initialProjectId = null }: ProjectGridProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(initialProjectId);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Healthcare AI', 'Web3 / Fintech', 'Talent Tech'];

  const filteredProjects =
    filterCategory === 'All'
      ? caseStudiesData
      : caseStudiesData.filter((p) => p.category === filterCategory);

  const selectedCaseStudy = selectedProjectId ? getCaseStudyById(selectedProjectId) || null : null;

  const handleOpenModal = (id: string) => {
    setSelectedProjectId(id);
  };

  const handleCloseModal = () => {
    setSelectedProjectId(null);
  };

  const handleNavigateModal = (id: string) => {
    setSelectedProjectId(id);
  };

  return (
    <section id="projects" className="space-y-10">
      {/* Header & Category Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyber-border pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyber-accent">
              Architectural Case Studies
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Flagship Engineering Deployments
          </h2>
          <p className="text-sm text-cyber-secondary max-w-xl">
            Production systems delivered across Healthcare AI, High-Frequency Trading, and Web3 Infrastructure. Click any deployment to inspect architectural blueprints, tradeoffs, and verified metrics.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-cyber-surface2/80 border border-cyber-border overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all',
                filterCategory === cat
                  ? 'bg-cyber-accent text-cyber-dark font-semibold shadow-glow-accent'
                  : 'text-cyber-secondary hover:text-white hover:bg-white/5'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {filteredProjects.map((project, index) => {
          // Make the first item prominent (panoramic layout across 12 cols if in 'All' view)
          const isFeatured = index === 0 && filterCategory === 'All';

          return (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              category={project.category}
              role={project.role}
              period={project.period}
              description={project.summary}
              image={project.heroImage}
              tags={project.techStack.flatMap((ts) => ts.technologies)}
              impact={project.verifiedOutcomes[0] ? `${project.verifiedOutcomes[0].metric} ${project.verifiedOutcomes[0].label}` : undefined}
              onOpenCaseStudy={handleOpenModal}
              priority={isFeatured}
              isFeatured={isFeatured}
              className={isFeatured ? 'md:col-span-12' : 'md:col-span-6'}
            />
          );
        })}
      </div>

      {/* Case Study Modal Drawer Component */}
      <CaseStudyModal
        isOpen={Boolean(selectedProjectId)}
        onClose={handleCloseModal}
        caseStudy={selectedCaseStudy}
        onNavigate={handleNavigateModal}
        allCaseStudies={caseStudiesData}
      />
    </section>
  );
}
