'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Square,
  Download,
  Eye,
  Clock,
  Calendar,
  Share2,
  Check,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { BlogPost } from '@/data/blogs';
import { useSound } from '@/hooks/use-sound';
import { cn } from '@/lib/utils';

export interface BlogReaderModalProps {
  isOpen: boolean;
  blog: BlogPost | null;
  onClose: () => void;
  viewsCount?: number;
}

export function BlogReaderModal({
  isOpen,
  blog,
  onClose,
  viewsCount,
}: BlogReaderModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { playClick, playHover, playSuccessChime } = useSound();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Stop speech synthesis when modal closes or blog changes
  useEffect(() => {
    if (!isOpen && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [isOpen, blog]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Lock body scroll and synchronize Lenis when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const win = typeof window !== 'undefined' ? (window as unknown as { __lenis?: { stop: () => void; start: () => void } }) : null;
      if (win?.__lenis?.stop) {
        win.__lenis.stop();
      }
      return () => {
        document.body.style.overflow = originalOverflow;
        if (win?.__lenis?.start) {
          win.__lenis.start();
        }
      };
    }
  }, [isOpen]);

  // Keyboard accessibility: Escape closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !blog) return null;

  // Audio Narration Handlers using browser Web Speech API
  const handleStartSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    playClick();

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare readable text from title + excerpt + clean content
    const cleanContent = blog.content
      .replace(/```[\s\S]*?```/g, '') // strip code blocks from audio voice for smooth listening
      .replace(/#{1,6}\s+/g, '')
      .replace(/\*\*/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    const fullNarration = `${blog.title}. Written by Yash Jangid. ${blog.excerpt}. ${cleanContent}`;
    const utterance = new SpeechSynthesisUtterance(fullNarration);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePauseSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    playClick();
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStopSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    playClick();
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  // Download Article as Markdown (.md)
  const handleDownloadMarkdown = () => {
    playClick();
    const markdownContent = `---
title: "${blog.title}"
subtitle: "${blog.subtitle}"
author: "${blog.author.name} (${blog.author.role})"
published: "${blog.publishedAt}"
category: "${blog.category}"
tags: ${JSON.stringify(blog.tags)}
readTime: "${blog.readTime}"
---

# ${blog.title}
> ${blog.subtitle}

**Author:** ${blog.author.name} · ${blog.author.role}  
**Published:** ${blog.publishedAt} | **Category:** ${blog.category} | **Read Time:** ${blog.readTime}

---

${blog.content}

---
*Published on Yash Jangid Portfolio (https://yashjangid.dev)*
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${blog.slug}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    playSuccessChime();
  };

  // Copy Link Handler
  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#blogs-${blog.slug}`);
      setCopiedLink(true);
      playSuccessChime();
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Simple Markdown Parser for technical rendering
  const renderMarkdownContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockLanguage = '';
    let codeBuffer: string[] = [];

    lines.forEach((line, index) => {
      // Code Block Start/End
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockLanguage = line.replace('```', '').trim();
          codeBuffer = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <div
              key={`code-${index}`}
              className="my-5 rounded-xl border border-cyber-border bg-[#080d18] overflow-hidden shadow-lg font-mono text-xs text-cyber-cyan"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-cyber-border/60 text-[11px] text-cyber-muted font-mono">
                <span>{codeBlockLanguage || 'code'}</span>
                <span className="text-[10px] uppercase text-cyber-accent">Yash Jangid Architecture</span>
              </div>
              <pre className="p-4 overflow-x-auto text-[12px] leading-relaxed text-slate-200">
                <code>{codeBuffer.join('\n')}</code>
              </pre>
            </div>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // H2 Headings
      if (line.startsWith('## ')) {
        elements.push(
          <h2
            key={`h2-${index}`}
            className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-8 mb-3 flex items-center gap-2 border-b border-cyber-border/60 pb-2"
          >
            <span className="w-1.5 h-4 rounded-full bg-cyber-accent" />
            <span>{line.replace('## ', '')}</span>
          </h2>
        );
        return;
      }

      // H3 Headings
      if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-lg sm:text-xl font-semibold text-cyber-cyan tracking-tight mt-6 mb-2"
          >
            {line.replace('### ', '')}
          </h3>
        );
        return;
      }

      // Unordered Lists
      if (line.startsWith('- ')) {
        elements.push(
          <li key={`li-${index}`} className="ml-5 list-disc text-sm sm:text-base text-cyber-secondary leading-relaxed my-1">
            <span
              dangerouslySetInnerHTML={{
                __html: line
                  .replace('- ', '')
                  .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                  .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-black/50 border border-cyber-border text-cyber-accent font-mono text-xs">$1</code>'),
              }}
            />
          </li>
        );
        return;
      }

      // Horizontal Rules
      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${index}`} className="my-6 border-cyber-border/60" />);
        return;
      }

      // Normal Paragraphs
      if (line.trim().length > 0) {
        elements.push(
          <p
            key={`p-${index}`}
            className="text-sm sm:text-base text-cyber-secondary leading-relaxed my-3"
            dangerouslySetInnerHTML={{
              __html: line
                .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-black/50 border border-cyber-border text-cyber-accent font-mono text-xs">$1</code>'),
            }}
          />
        );
      }
    });

    return elements;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={blog.title}
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Click backdrop to dismiss */}
      <div
        onClick={onClose}
        className="absolute inset-0 cursor-pointer"
        aria-hidden="true"
      />

      {/* Reader Container */}
      <div
        data-lenis-prevent
        className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-cyber-dark/95 border border-cyber-border/80 shadow-2xl overflow-hidden backdrop-blur-2xl"
      >
        {/* Top Control Header */}
        <div className="flex-none px-4 sm:px-6 py-3.5 border-b border-cyber-border/80 bg-cyber-surface/90 flex items-center justify-between gap-3">
          {/* Category & Status */}
          <div className="flex items-center gap-2 truncate">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-cyber-accent/15 text-cyber-accent border border-cyber-accent/30">
              {blog.category}
            </span>
            <span className="text-xs text-cyber-muted hidden sm:inline font-mono">
              {blog.readTime}
            </span>
            {viewsCount !== undefined && (
              <span className="inline-flex items-center gap-1 text-xs text-cyber-muted font-mono ml-2">
                <Eye className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>{viewsCount.toLocaleString()} views</span>
              </span>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            {/* Audio Voice Narration Controls */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-cyber-surface2 border border-cyber-border">
              {!isPlaying && !isPaused && (
                <button
                  type="button"
                  onClick={handleStartSpeech}
                  onMouseEnter={playHover}
                  className="flex items-center gap-1.5 text-xs font-mono text-cyber-cyan hover:text-white px-1.5 py-0.5 rounded transition-colors"
                  title="Listen to Audio Narration"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Listen</span>
                </button>
              )}

              {isPlaying && (
                <>
                  <button
                    type="button"
                    onClick={handlePauseSpeech}
                    onMouseEnter={playHover}
                    className="flex items-center gap-1 text-xs font-mono text-amber-400 hover:text-amber-300 px-1 py-0.5"
                    title="Pause Narration"
                  >
                    <Pause className="w-3.5 h-3.5" />
                  </button>
                  {/* Animated Voice Wave Bars */}
                  <div className="flex items-end gap-0.5 h-3 mx-1">
                    <span className="w-0.5 bg-cyber-accent rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2.5" />
                    <span className="w-0.5 bg-cyber-cyan rounded-full animate-[pulse_0.8s_ease-in-out_0.2s_infinite] h-3.5" />
                    <span className="w-0.5 bg-cyber-green rounded-full animate-[pulse_0.5s_ease-in-out_0.4s_infinite] h-2" />
                  </div>
                  <button
                    type="button"
                    onClick={handleStopSpeech}
                    onMouseEnter={playHover}
                    className="text-xs font-mono text-red-400 hover:text-red-300 px-1 py-0.5"
                    title="Stop Narration"
                  >
                    <Square className="w-3 h-3" />
                  </button>
                </>
              )}

              {isPaused && (
                <>
                  <button
                    type="button"
                    onClick={handleStartSpeech}
                    onMouseEnter={playHover}
                    className="flex items-center gap-1 text-xs font-mono text-cyber-green hover:text-white px-1.5 py-0.5"
                    title="Resume Narration"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">Resume</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleStopSpeech}
                    onMouseEnter={playHover}
                    className="text-xs font-mono text-red-400 hover:text-red-300 px-1 py-0.5"
                    title="Stop Narration"
                  >
                    <Square className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>

            {/* Markdown Download */}
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              onMouseEnter={playHover}
              aria-label="Download article markdown"
              title="Download as Markdown (.md)"
              className="p-1.5 rounded-lg border border-cyber-border bg-cyber-surface2 text-cyber-secondary hover:text-white hover:border-cyber-accent/40 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              onMouseEnter={playHover}
              aria-label="Copy article link"
              title="Copy link"
              className="p-1.5 rounded-lg border border-cyber-border bg-cyber-surface2 text-cyber-secondary hover:text-white hover:border-cyber-accent/40 transition-colors"
            >
              {copiedLink ? <Check className="w-4 h-4 text-cyber-green" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              onMouseEnter={playHover}
              aria-label="Close reader modal"
              className="p-1.5 rounded-lg border border-cyber-border bg-cyber-surface2 text-cyber-secondary hover:text-white hover:border-red-500/40 hover:bg-red-500/10 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div
          data-lenis-prevent
          tabIndex={0}
          onWheel={(e) => e.stopPropagation()}
          style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
          className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 sm:py-8 space-y-6 custom-scrollbar overscroll-contain touch-pan-y outline-none"
        >
          {/* Article Header */}
          <div className="space-y-3 border-b border-cyber-border/80 pb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {blog.title}
            </h1>
            <p className="text-sm sm:text-base text-cyber-cyan font-mono leading-relaxed">
              {blog.subtitle}
            </p>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cyber-muted pt-2">
              <div className="flex items-center gap-1.5 text-white">
                <span className="w-2 h-2 rounded-full bg-cyber-green" />
                <span>{blog.author.name}</span>
                <span className="text-cyber-muted">· {blog.author.role}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{blog.publishedAt}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{blog.readTime}</span>
              </div>
            </div>

            {/* Tags Ribbon */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyber-surface2/80 border border-white/5 text-cyber-secondary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Rendered Technical Article Markdown */}
          <article className="prose prose-invert max-w-none">
            {renderMarkdownContent(blog.content)}
          </article>

          {/* Author Footer & Next Steps */}
          <div className="mt-12 p-5 rounded-xl bg-cyber-surface2/60 border border-cyber-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyber-accent">Author Profile</span>
              <h4 className="text-base font-bold text-white mt-0.5">{blog.author.name}</h4>
              <p className="text-xs text-cyber-secondary mt-0.5">
                Senior Full Stack & AI Platform Engineer specializing in Healthcare AI, High-Throughput Web3 & Distributed Architectures.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleDownloadMarkdown}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium bg-cyber-accent text-cyber-dark hover:bg-cyber-cyan transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .MD</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                onMouseEnter={playHover}
                className="px-3 py-2 rounded-lg text-xs font-mono bg-cyber-surface2 border border-cyber-border text-white hover:border-cyber-accent/40 transition-colors"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogReaderModal;
