'use client';

import React, { useState, useMemo } from 'react';
import {
  Brain,
  Layers,
  Activity,
  Cloud,
  Search,
  CheckCircle,
  Sparkles,
  Zap,
  Cpu,
  Filter,
} from 'lucide-react';
import { skillsTaxonomy, SkillCategory, SkillItem } from '@/data/portfolio';
import { cn } from '@/lib/utils';

export function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { label: string; value: string; icon: React.ElementType }[] = [
    { label: 'All Domains', value: 'All', icon: Sparkles },
    { label: 'AI & Agentic Systems', value: 'AI & Agentic', icon: Brain },
    { label: 'Full Stack Engineering', value: 'Full Stack', icon: Layers },
    { label: 'Healthcare AI & Imaging', value: 'Healthcare AI', icon: Activity },
    { label: 'Cloud & DevOps', value: 'Cloud & DevOps', icon: Cloud },
  ];

  const filteredSkills = useMemo(() => {
    return skillsTaxonomy.filter((skill) => {
      const matchesCategory =
        selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.highlight && skill.highlight.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Proficiency counts
  const proficiencyCounts = useMemo(() => {
    const counts = { Expert: 0, Advanced: 0, Specialized: 0 };
    skillsTaxonomy.forEach((s) => {
      if (counts[s.proficiency] !== undefined) {
        counts[s.proficiency]++;
      }
    });
    return counts;
  }, []);

  return (
    <section id="skills" className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyber-border pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyber-accent">
              Technical Taxonomy
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Multi-Domain Skills Matrix
          </h2>
          <p className="text-sm text-cyber-secondary max-w-xl">
            Categorized production proficiencies spanning Agentic AI, high-load Full Stack systems, Healthcare DICOM pipelines, and Cloud infrastructure.
          </p>
        </div>

        {/* Proficiency Pill Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-cyber-surface2 border border-cyber-accent/30 text-xs font-mono text-cyber-accent flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>{proficiencyCounts.Expert} Expert</span>
          </span>
          <span className="px-3 py-1 rounded-lg bg-cyber-surface2 border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>{proficiencyCounts.Advanced} Advanced</span>
          </span>
          <span className="px-3 py-1 rounded-lg bg-cyber-surface2 border border-cyber-green/30 text-xs font-mono text-cyber-green flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Healthcare Specialized</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-cyber-surface2/80 border border-cyber-border overflow-x-auto scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all',
                  isSelected
                    ? 'bg-cyber-accent text-cyber-dark font-semibold shadow-glow-accent'
                    : 'text-cyber-secondary hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Filter Input */}
        <div className="relative min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. DICOM, Redis)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-cyber-surface2/90 border border-cyber-border text-xs font-mono text-white placeholder:text-cyber-muted focus:outline-none focus:border-cyber-accent/60 focus:ring-1 focus:ring-cyber-accent/30 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-cyber-muted hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className="glass-card rounded-xl p-5 border border-cyber-border hover:border-cyber-accent/40 hover:shadow-glass-card-hover transition-all duration-200 flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-white group-hover:text-cyber-accent transition-colors">
                  {skill.name}
                </h3>
                <span
                  className={cn(
                    'text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider font-semibold border',
                    skill.proficiency === 'Expert'
                      ? 'bg-cyber-accent/10 text-cyber-accent border-cyber-accent/30'
                      : skill.proficiency === 'Advanced'
                      ? 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30'
                      : 'bg-cyber-green/10 text-cyber-green border-cyber-green/30'
                  )}
                >
                  {skill.proficiency}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-cyber-muted">
                <span className="text-cyber-secondary">{skill.category}</span>
                {skill.years && (
                  <>
                    <span>·</span>
                    <span>{skill.years} yrs exp</span>
                  </>
                )}
              </div>

              {skill.highlight && (
                <p className="text-xs text-cyber-secondary leading-relaxed pt-1">
                  {skill.highlight}
                </p>
              )}
            </div>

            {skill.featured && (
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-cyber-accent">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Core Production Pillar
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 rounded-2xl border border-dashed border-cyber-border space-y-2">
          <p className="text-sm font-mono text-cyber-muted">No skills found matching &ldquo;{searchQuery}&rdquo;</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs font-mono text-cyber-accent hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
