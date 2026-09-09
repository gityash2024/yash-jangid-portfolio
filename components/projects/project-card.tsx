'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Activity, ArrowUpRight, CheckCircle2, Layers, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';

export interface ProjectCardData {
  id: string;
  title: string;
  category: string;
  role?: string;
  period?: string;
  description: string;
  tags: string[];
  metric?: string;
  impact?: string;
  image?: string;
  metrics?: { label: string; value: string }[];
}

export interface ProjectCardProps {
  project?: ProjectCardData;
  id?: string;
  title?: string;
  category?: string;
  role?: string;
  period?: string;
  description?: string;
  tags?: string[];
  metric?: string;
  impact?: string;
  image?: string;
  onOpenCaseStudy?: (projectId: string) => void;
  className?: string;
  priority?: boolean;
  isFeatured?: boolean;
}

const DEFAULT_IMAGES: Record<string, string> = {
  'medical-imaging': '/images/medical-imaging.jpg',
  'trading-infrastructure': '/images/trading-terminal.jpg',
  'trading-terminal': '/images/trading-terminal.jpg',
  'tdx-launchpad': '/images/crypto-launchpad.jpg',
  'crypto-launchpad': '/images/crypto-launchpad.jpg',
  'recruin-platform': '/images/recruin-platform.jpg',
  'recruin': '/images/recruin-platform.jpg',
};

export function ProjectCard(props: ProjectCardProps) {
  const { t } = useLanguage();
  const {
    project,
    onOpenCaseStudy,
    className,
    priority = false,
    isFeatured = false,
  } = props;

  // Resolve direct props or project object props
  const id = props.id ?? project?.id ?? 'project';
  const title = props.title ?? project?.title ?? 'Production Architecture';
  const category = props.category ?? project?.category ?? 'AI & Systems';
  const role = props.role ?? project?.role;
  const period = props.period ?? project?.period;
  const description = props.description ?? project?.description ?? '';
  const tags = props.tags ?? project?.tags ?? [];
  const impactMetric = props.impact ?? props.metric ?? project?.impact ?? project?.metric;
  const image = props.image ?? project?.image ?? DEFAULT_IMAGES[id] ?? '/images/hero-neural.jpg';

  // 3D Perspective Tilt State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width) - 0.5;
    const yPct = (y / rect.height) - 0.5;

    // Subtle 3D tilt (max ~8 degrees)
    setRotateX(-yPct * 10);
    setRotateY(xPct * 10);
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleTriggerCaseStudy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenCaseStudy) {
      onOpenCaseStudy(id);
    } else {
      // Smooth scroll to architecture section or trigger drawer
      const elem = document.getElementById('architecture') || document.getElementById('projects');
      elem?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className={cn('h-full', className)}
    >
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className={cn(
          'relative h-full flex flex-col justify-between glass-card rounded-2xl border border-cyber-border hover:border-cyber-accent/40 shadow-glass-card hover:shadow-glass-card-hover transition-colors duration-300 group overflow-hidden bg-cyber-card/95 backdrop-blur-xl',
          isFeatured ? 'p-6 sm:p-8' : 'p-5 sm:p-6'
        )}
      >
        {/* Interactive Dynamic Glare Flare */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(124, 140, 255, 0.14), transparent 55%)`,
          }}
        />

        {/* Card Content (Responsive Grid if Featured, Stacked if Normal) */}
        <div className={cn(isFeatured ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full' : 'space-y-4 flex flex-col justify-between flex-1 w-full')}>
          {/* 3D Visual Asset Container */}
          <div
            onClick={handleTriggerCaseStudy}
            className={cn(
              'relative rounded-xl overflow-hidden bg-cyber-surface2 border border-white/5 cursor-pointer group/img',
              isFeatured ? 'lg:col-span-7 h-64 sm:h-80 lg:h-full min-h-[260px]' : 'w-full aspect-video'
            )}
          >
            <Image
              src={image}
              alt={title}
              fill
              priority={priority}
              sizes={isFeatured ? '(max-width: 1024px) 100vw, 650px' : '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px'}
              className="object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Gradient Overlay for Depth and Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-cyber-card/30 to-transparent pointer-events-none" />

            {/* Category Tag Pill (Top-Left) */}
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-cyber-cyan px-2.5 py-1 rounded-md bg-cyber-dark/90 backdrop-blur-md border border-cyber-cyan/30 shadow-sm">
                {category}
              </span>
            </div>

            {/* Period Badge (Top-Right) */}
            {period && (
              <div className="absolute top-3 right-3 z-10 pointer-events-none">
                <span className="text-[10px] font-mono text-cyber-muted px-2 py-0.5 rounded bg-cyber-dark/80 backdrop-blur-md border border-white/10">
                  {period}
                </span>
              </div>
            )}

            {/* Bottom Overlay Tag on Image if featured */}
            {impactMetric && isFeatured && (
              <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-cyber-dark/90 backdrop-blur-md border border-white/10 text-white flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyber-green" />
                  <span>{impactMetric}</span>
                </span>
              </div>
            )}
          </div>

          {/* Text & Action Metadata Content */}
          <div className={cn('flex flex-col justify-between', isFeatured ? 'lg:col-span-5 space-y-5 py-1' : 'space-y-4 pt-1 flex-1')}>
            <div className="space-y-2">
              <h3
                onClick={handleTriggerCaseStudy}
                className="text-lg sm:text-xl font-bold text-white group-hover:text-cyber-accent transition-colors tracking-tight cursor-pointer"
              >
                {title}
              </h3>
              {role && (
                <p className="text-xs font-mono text-cyber-cyan/90">
                  {role}
                </p>
              )}
              <p className="text-xs sm:text-sm text-cyber-secondary leading-relaxed pt-1">
                {description}
              </p>
            </div>

            {/* Bottom Content: Impact Stat, Tech Pills, & Action Trigger */}
            <div className="space-y-4 pt-4 border-t border-cyber-border">
              {/* Impact Stat Badge (if not featured, show here) */}
              {impactMetric && !isFeatured && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-green/10 border border-cyber-green/25 text-cyber-green text-xs font-mono font-medium shadow-sm w-fit">
                  <Zap className="w-3.5 h-3.5 text-cyber-green flex-shrink-0" />
                  <span className="truncate">{impactMetric}</span>
                </div>
              )}

              {/* Tech Tag Pills */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.slice(0, isFeatured ? 8 : 5).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-surface2 text-cyber-secondary border border-cyber-border group-hover:border-cyber-accent/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                  {tags.length > (isFeatured ? 8 : 5) && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyber-surface2/50 text-cyber-muted border border-white/5">
                      +{tags.length - (isFeatured ? 8 : 5)}
                    </span>
                  )}
                </div>
              )}

              {/* "View Architecture & Case Study" Trigger */}
              <button
                type="button"
                onClick={handleTriggerCaseStudy}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-cyber-surface2 hover:bg-cyber-accent/15 border border-cyber-border hover:border-cyber-accent/50 text-cyber-secondary hover:text-white text-xs font-mono transition-all duration-200 group/btn shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-cyber-accent" />
                  <span>{t('projects.viewCaseStudy', 'View Architecture & Case Study')}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-cyber-accent group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
