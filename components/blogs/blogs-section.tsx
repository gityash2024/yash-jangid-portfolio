'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Volume2,
  Download,
  Eye,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  Filter,
  Check,
} from 'lucide-react';
import { blogPosts, BlogPost, downloadBlogPost } from '@/data/blogs';
import { BlogReaderModal } from './blog-reader-modal';
import { useSound } from '@/hooks/use-sound';
import { cn } from '@/lib/utils';

export function BlogsSection() {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [blogViews, setBlogViews] = useState<Record<string, number>>({});
  const { playClick, playHover, playSuccessChime } = useSound();

  // Load and hydrate views from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initialMap: Record<string, number> = {};
    blogPosts.forEach((post) => {
      const stored = localStorage.getItem(`yj_blog_views_${post.id}`);
      if (stored) {
        initialMap[post.id] = parseInt(stored, 10);
      } else {
        initialMap[post.id] = post.initialViews;
      }
    });
    setBlogViews(initialMap);
  }, []);

  const categories = [
    'All',
    'Healthcare AI',
    'Distributed Systems',
    'Web3 & Fintech',
    'AI & LLM',
    'Web Architecture',
    'Engineering Leadership',
  ];

  const handleOpenBlog = (blog: BlogPost) => {
    playClick();
    setSelectedBlog(blog);

    // Increment view count in state & localStorage
    const currentViews = blogViews[blog.id] || blog.initialViews;
    const newViews = currentViews + 1;
    setBlogViews((prev) => ({ ...prev, [blog.id]: newViews }));
    if (typeof window !== 'undefined') {
      localStorage.setItem(`yj_blog_views_${blog.id}`, newViews.toString());
    }
  };

  const handleCloseBlog = () => {
    setSelectedBlog(null);
  };

  const handleQuickDownload = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    downloadBlogPost(post);
    playSuccessChime();
  };

  // Filter and search logic
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === 'All' || post.category === activeCategory;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesQuery =
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query)) ||
      post.category.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  return (
    <section id="blogs" className="space-y-8 pt-4">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyber-border pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyber-green">
              Technical Publications & SEO Knowledge Base
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Insights & System Architecture
          </h2>
          <p className="text-sm text-cyber-secondary max-w-2xl leading-relaxed">
            12 comprehensive, in-depth technical articles authored by Yash Jangid covering DICOM healthcare AI, HFT order books, Redis multi-level caching, Model Context Protocol (MCP) agents, and Next.js 15 concurrency. Includes audio voice narration and markdown downloads.
          </p>
        </div>

        {/* Live Article Count Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-cyber-surface2 border border-cyber-border text-cyber-accent">
            <BookOpen className="w-3.5 h-3.5" />
            <span>12 Published Articles</span>
          </span>
        </div>
      </div>

      {/* Search Bar & Category Filters Dock */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Real-Time Keyword Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, keyword, or technology (e.g. DICOM, Redis, MCP)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-cyber-surface2/90 border border-cyber-border text-white placeholder:text-cyber-muted focus:outline-none focus:border-cyber-accent/60 focus:ring-1 focus:ring-cyber-accent/40 font-mono transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-cyber-surface2/80 border border-cyber-border overflow-x-auto scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  playClick();
                  setActiveCategory(cat);
                }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all',
                  isSelected
                    ? 'bg-cyber-accent text-cyber-dark font-semibold shadow-glow-accent'
                    : 'text-cyber-secondary hover:text-white hover:bg-white/5'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Article Cards Bento Grid */}
      {filteredPosts.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-cyber-surface2/40 border border-cyber-border">
          <p className="text-sm font-mono text-cyber-secondary">
            No articles found matching &quot;{searchQuery}&quot; in {activeCategory}.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="mt-3 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyber-accent/15 text-cyber-accent border border-cyber-accent/30 hover:bg-cyber-accent hover:text-cyber-dark transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const views = blogViews[post.id] || post.initialViews;
            return (
              <article
                key={post.id}
                onMouseEnter={playHover}
                className="group relative flex flex-col justify-between rounded-2xl bg-cyber-card/95 border border-cyber-border hover:border-cyber-accent/40 shadow-glass-card hover:shadow-glass-card-hover transition-all duration-300 overflow-hidden backdrop-blur-xl p-5 sm:p-6"
              >
                {/* Top Badge Row */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/25">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-cyber-muted">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1 text-cyber-cyan">
                        <Eye className="w-3 h-3" />
                        {views.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="space-y-2">
                    <h3
                      onClick={() => handleOpenBlog(post)}
                      className="text-lg font-bold text-white group-hover:text-cyber-accent transition-colors leading-snug cursor-pointer line-clamp-2"
                    >
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyber-secondary leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Bottom Tags & Action Dock */}
                <div className="pt-4 border-t border-cyber-border/60 mt-4 space-y-3">
                  {/* Tag Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyber-surface2 text-cyber-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-cyber-muted">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Actions: Read Full Article + Audio & Download triggers */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => handleOpenBlog(post)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyber-accent group-hover:text-cyber-cyan transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {/* Quick Audio Trigger */}
                      <button
                        type="button"
                        onClick={() => handleOpenBlog(post)}
                        title="Listen with voice narration"
                        aria-label={`Listen to ${post.title}`}
                        className="p-1.5 rounded-lg border border-cyber-border bg-cyber-surface2/80 text-cyber-muted hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Quick Markdown Download */}
                      <button
                        type="button"
                        onClick={(e) => handleQuickDownload(post, e)}
                        title="Download markdown"
                        aria-label={`Download ${post.title}`}
                        className="p-1.5 rounded-lg border border-cyber-border bg-cyber-surface2/80 text-cyber-muted hover:text-cyber-accent hover:border-cyber-accent/40 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Reader Modal */}
      <BlogReaderModal
        isOpen={Boolean(selectedBlog)}
        blog={selectedBlog}
        onClose={handleCloseBlog}
        viewsCount={selectedBlog ? blogViews[selectedBlog.id] || selectedBlog.initialViews : undefined}
      />
    </section>
  );
}

export default BlogsSection;
