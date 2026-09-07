'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Search,
  Command,
  ArrowRight,
  Sparkles,
  FileText,
  Volume2,
  VolumeX,
  Copy,
  Terminal,
  Activity,
  Layers,
  Briefcase,
  Mail,
  X,
  ExternalLink,
  CornerDownLeft,
} from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { cn } from '@/lib/utils';

export interface CommandItem {
  id: string;
  category: 'Navigation' | 'Case Studies' | 'Actions';
  title: string;
  subtitle?: string;
  keywords?: string[];
  icon: React.ElementType;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenCaseStudy?: (projectId: string) => void;
}

export function CommandPalette({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  onOpenCaseStudy,
}: CommandPaletteProps) {
  const {
    isMuted,
    toggleMute,
    playClick,
    playHover,
    playPaletteOpen,
    playSuccessChime,
  } = useSound();

  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const isControlled = externalIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  const closePalette = useCallback(() => {
    if (isControlled && externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
    setSearchQuery('');
    setSelectedIndex(0);
  }, [isControlled, externalOnClose]);

  const openPalette = useCallback(() => {
    if (!isOpen) {
      playPaletteOpen();
      if (!isControlled) {
        setInternalIsOpen(true);
      }
    }
  }, [isOpen, isControlled, playPaletteOpen]);

  // Listen to Cmd+K / Ctrl+K and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          closePalette();
        } else {
          openPalette();
        }
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        closePalette();
      }
    };

    const handleCustomOpen = () => {
      openPalette();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen, openPalette, closePalette]);

  // Autofocus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const copyEmailAction = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('gityash2024@gmail.com');
      playSuccessChime();
      showToast('Email copied to clipboard (gityash2024@gmail.com) ✓');
      setTimeout(closePalette, 800);
    }
  };

  const scrollToAnchor = (hash: string) => {
    playClick();
    closePalette();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands: CommandItem[] = useMemo(
    () => [
      // Navigation
      {
        id: 'nav-overview',
        category: 'Navigation',
        title: 'Jump to Overview & Hero',
        subtitle: 'Executive summary, IST clock & production metrics',
        keywords: ['home', 'hero', 'about', 'intro', 'yash'],
        icon: Sparkles,
        action: () => scrollToAnchor('#overview'),
      },
      {
        id: 'nav-projects',
        category: 'Navigation',
        title: 'Jump to Flagship Case Studies',
        subtitle: 'Healthcare AI, Trading, Launchpad, and Recruin',
        keywords: ['work', 'projects', 'portfolio', 'dicom', 'cex', 'dex'],
        icon: Briefcase,
        action: () => scrollToAnchor('#projects'),
      },
      {
        id: 'nav-architecture',
        category: 'Navigation',
        title: 'Jump to System Architecture Lab',
        subtitle: '4-stage pipeline visualizer and load telemetry dial',
        keywords: ['system', 'metrics', 'pipeline', 'redis', 'load', 'diagram'],
        icon: Activity,
        action: () => scrollToAnchor('#architecture'),
      },
      {
        id: 'nav-terminal',
        category: 'Navigation',
        title: 'Jump to AI Agent CLI Playground',
        subtitle: 'Interactive terminal emulator with streaming tools',
        keywords: ['cli', 'terminal', 'agent', 'console', 'bash', 'dicom'],
        icon: Terminal,
        action: () => scrollToAnchor('#terminal'),
      },
      {
        id: 'nav-experience',
        category: 'Navigation',
        title: 'Jump to Career Timeline & Experience',
        subtitle: 'Imaging IQ, ITH Technologies, and UPES honors',
        keywords: ['experience', 'jobs', 'history', 'imaging iq', 'ith', 'resume'],
        icon: Layers,
        action: () => scrollToAnchor('#experience'),
      },
      {
        id: 'nav-contact',
        category: 'Navigation',
        title: 'Jump to Direct Contact & Socials',
        subtitle: 'Email, GitHub (@gityash2024), LinkedIn coordinates',
        keywords: ['contact', 'email', 'github', 'linkedin', 'hire'],
        icon: Mail,
        action: () => scrollToAnchor('#contact'),
      },

      // Case Studies
      {
        id: 'case-medical',
        category: 'Case Studies',
        title: 'AI Medical Imaging Pipeline',
        subtitle: 'DICOM/NIfTI tumor segmentation & OHIF PACS integration',
        keywords: ['healthcare', 'orthanc', 'unet', 'tumor', 'mri', 'ct'],
        icon: Sparkles,
        action: () => {
          playClick();
          closePalette();
          if (onOpenCaseStudy) onOpenCaseStudy('medical-imaging');
          else scrollToAnchor('#projects');
        },
      },
      {
        id: 'case-trading',
        category: 'Case Studies',
        title: 'CEX / DEX Strategy Portal',
        subtitle: 'Sub-100ms algorithmic execution & Redis caching',
        keywords: ['trading', 'crypto', 'orderbook', 'websockets', 'fintech'],
        icon: Activity,
        action: () => {
          playClick();
          closePalette();
          if (onOpenCaseStudy) onOpenCaseStudy('trading-infrastructure');
          else scrollToAnchor('#projects');
        },
      },
      {
        id: 'case-launchpad',
        category: 'Case Studies',
        title: 'TDX Token Launchpad',
        subtitle: 'Web3 public token sale with 99.9% uptime SLA',
        keywords: ['web3', 'solana', 'tokens', 'smart contracts', 'crypto'],
        icon: Layers,
        action: () => {
          playClick();
          closePalette();
          if (onOpenCaseStudy) onOpenCaseStudy('tdx-launchpad');
          else scrollToAnchor('#projects');
        },
      },
      {
        id: 'case-recruin',
        category: 'Case Studies',
        title: 'Recruin Talent Intelligence',
        subtitle: 'Real-time candidate matching for 5,000+ users',
        keywords: ['recruiting', 'ats', 'talent', 'jobtech', 'aws'],
        icon: Briefcase,
        action: () => {
          playClick();
          closePalette();
          if (onOpenCaseStudy) onOpenCaseStudy('recruin-platform');
          else scrollToAnchor('#projects');
        },
      },

      // Actions
      {
        id: 'act-toggle-audio',
        category: 'Actions',
        title: isMuted ? 'Turn Sound Engine ON (Procedural Audio)' : 'Mute Sound Engine',
        subtitle: 'Web Audio API clicks, hovers, and terminal keystrokes',
        keywords: ['audio', 'sound', 'mute', 'music', 'volume', 'unmute', 'synth'],
        icon: isMuted ? Volume2 : VolumeX,
        action: () => {
          toggleMute();
          showToast(isMuted ? 'Sound enabled ✓' : 'Sound muted ✓');
        },
      },
      {
        id: 'act-copy-email',
        category: 'Actions',
        title: 'Copy Email Address',
        subtitle: 'gityash2024@gmail.com',
        keywords: ['email', 'copy', 'mail', 'contact'],
        icon: Copy,
        action: copyEmailAction,
      },
      {
        id: 'act-resume',
        category: 'Actions',
        title: 'View Verified Résumé',
        subtitle: 'Printable executive resume and academic honors',
        keywords: ['resume', 'cv', 'pdf', 'download', 'education', 'gpa'],
        icon: FileText,
        action: () => scrollToAnchor('#experience'),
      },
      {
        id: 'act-run-dicom',
        category: 'Actions',
        title: 'Simulate DICOM Pipeline in Terminal',
        subtitle: 'Jumps to console and triggers run-dicom-pipeline',
        keywords: ['terminal', 'simulate', 'dicom', 'ai', 'script'],
        icon: Terminal,
        action: () => {
          scrollToAnchor('#terminal');
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMuted, toggleMute, onOpenCaseStudy]
  );

  // Filter commands by search query
  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) return commands;
    const q = searchQuery.toLowerCase().trim();

    return commands.filter((cmd) => {
      const matchTitle = cmd.title.toLowerCase().includes(q);
      const matchSub = cmd.subtitle?.toLowerCase().includes(q);
      const matchCat = cmd.category.toLowerCase().includes(q);
      const matchKeywords = cmd.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchSub || matchCat || matchKeywords;
    });
  }, [commands, searchQuery]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Arrow key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredCommands.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const next = prev < filteredCommands.length - 1 ? prev + 1 : 0;
        playHover();
        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const next = prev > 0 ? prev - 1 : filteredCommands.length - 1;
        playHover();
        return next;
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Executive Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md animate-in fade-in-50 duration-150"
      onClick={closePalette}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-[#0a0f18] border border-cyber-border shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-cyber-border bg-[#0c121d]">
          <Search className="w-5 h-5 text-cyber-accent shrink-0" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={filteredCommands.length > 0}
            aria-controls="command-palette-results"
            placeholder="Search commands, case studies, sections, or actions (e.g. 'dicom', 'audio')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-cyber-muted focus:outline-none font-sans"
            autoComplete="off"
            spellCheck="false"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search input"
              className="p-1 rounded text-cyber-muted hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[11px] font-mono text-cyber-muted">
            ESC
          </kbd>
        </div>

        {/* Toast confirmation within modal */}
        {toastMessage && (
          <div className="px-4 py-2 bg-cyber-accent/15 border-b border-cyber-accent/30 text-xs font-mono text-cyber-accent flex items-center gap-2 animate-in slide-in-from-top-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Results List */}
        <div
          ref={listRef}
          id="command-palette-results"
          role="listbox"
          className="max-h-[360px] overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-cyber-border scrollbar-track-transparent"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-cyber-muted text-xs font-mono space-y-2">
              <Command className="w-8 h-8 mx-auto text-cyber-muted/40" />
              <p>No matching commands found for &quot;{searchQuery}&quot;</p>
              <p className="text-[11px]">Try searching for &apos;overview&apos;, &apos;dicom&apos;, or &apos;audio&apos;.</p>
            </div>
          ) : (
            filteredCommands.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    'flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer transition-all text-xs select-none',
                    isSelected
                      ? 'bg-cyber-surface2 border border-cyber-accent/40 shadow-sm'
                      : 'hover:bg-white/5 border border-transparent'
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors',
                        isSelected
                          ? 'bg-cyber-accent/20 border-cyber-accent text-cyber-accent'
                          : 'bg-white/5 border-white/10 text-cyber-secondary'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white truncate">{item.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 border border-white/5 text-cyber-muted shrink-0">
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-[11px] text-cyber-secondary truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-cyber-muted shrink-0">
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-cyber-accent">
                        <span>Select</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0c121d] border-t border-cyber-border text-[11px] font-mono text-cyber-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[10px]">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[10px]">↵</kbd>
              <span>Execute</span>
            </span>
          </div>

          <span className="text-cyber-accent hidden sm:inline">
            Yash Jangid · Senior Full Stack &amp; AI Platform Engineer
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
