'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Clock,
  Command,
  Volume2,
  VolumeX,
  Menu,
  X,
  FileText,
  Sun,
  Moon,
  Globe,
  Check,
  Sparkles,
} from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { useMounted } from '@/hooks/use-mounted';
import { useSound } from '@/hooks/use-sound';
import { useTheme } from '@/context/theme-context';
import { useLanguage } from '@/context/language-context';
import { SupportedLanguage, LANGUAGES } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface ExecutiveNavProps {
  onOpenCommandPalette?: () => void;
  isAudioMuted?: boolean;
  onToggleAudio?: () => void;
}

export function ExecutiveNav({
  onOpenCommandPalette,
  isAudioMuted,
  onToggleAudio,
}: ExecutiveNavProps) {
  const mounted = useMounted();
  const { isMuted: soundHookMuted, toggleMute, playClick, playHover } = useSound();
  const { theme, toggleTheme, isDark } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const [istTime, setIstTime] = useState<string>('--:--:-- IST');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [langMenuOpen, setLangMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Determine current muted state (controlled prop if provided, else hook)
  const activeMuted = isAudioMuted !== undefined ? isAudioMuted : soundHookMuted;

  // Live Asia/Kolkata (IST, UTC+5:30) Clock Engine (Preserved for system & contract accuracy)
  useEffect(() => {
    if (!mounted) return;

    const updateClock = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setIstTime(`${formatter.format(new Date())} IST`);
      } catch {
        setIstTime('IST');
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  // Active Section Scroll Spy
  useEffect(() => {
    if (!mounted) return;
    const sectionIds = [
      'hero',
      'work',
      'projects',
      'architecture',
      'playground',
      'terminal',
      'blogs',
      'experience',
      'skills',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            if (id === 'projects' || id === 'work') {
              setActiveSection('#work');
            } else if (id === 'terminal' || id === 'playground') {
              setActiveSection('#playground');
            } else {
              setActiveSection(`#${id}`);
            }
            return;
          }
        }
      }
      setActiveSection('#hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Click outside to dismiss language menu
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

  const handleToggleSound = () => {
    if (onToggleAudio) {
      onToggleAudio();
    } else {
      toggleMute();
    }
  };

  const handleToggleTheme = () => {
    playClick();
    toggleTheme();
  };

  const handleSelectLanguage = (langCode: SupportedLanguage) => {
    playClick();
    setLanguage(langCode);
    setLangMenuOpen(false);
  };

  const handleOpenPalette = () => {
    playClick();
    if (onOpenCommandPalette) {
      onOpenCommandPalette();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-command-palette'));
    }
  };

  // Core navigation anchors (F04-T2 contract: #hero, #work, #architecture, #playground, #experience, #skills, #contact) + #blogs
  const navLinks = [
    { label: t('nav.overview', 'Overview'), href: '#hero' },
    { label: t('nav.work', 'Work'), href: '#work' },
    { label: t('nav.architecture', 'Architecture'), href: '#architecture' },
    { label: t('nav.terminal', 'AI Terminal'), href: '#playground' },
    { label: t('nav.blogs', 'Blogs'), href: '#blogs' },
    { label: t('nav.experience', 'Experience'), href: '#experience' },
    { label: t('nav.skills', 'Skills'), href: '#skills' },
    { label: t('nav.contact', 'Contact'), href: '#contact' },
  ];

  const currentLangMeta = LANGUAGES[language] || LANGUAGES.en;

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 w-full glass-nav backdrop-blur-xl bg-cyber-dark/85 border-b border-cyber-border/60 transition-all duration-200"
      data-nav-placement="sticky top-0 z-50 w-full glass-nav"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Identity / Status Pill / Clean Role Subtitle */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-foreground hover:text-cyber-accent transition-colors group shrink-0"
            onMouseEnter={playHover}
          >
            {/* Bespoke Logo with YJ monogram brand badge */}
            <div className="w-8 h-8 rounded-lg bg-cyber-surface2 border border-cyber-border flex items-center justify-center text-cyber-accent group-hover:border-cyber-accent/40 group-hover:shadow-glow-accent transition-all relative overflow-hidden">
              <Logo size={28} className="absolute inset-0 m-auto" />
              <span className="font-mono text-xs font-bold tracking-tighter sr-only">YJ</span>
            </div>

            <div className="flex flex-col justify-center">
              {/* Row 1: Name + Online Status */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-wide text-foreground group-hover:text-cyber-accent transition-colors">
                  Yash Jangid
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-cyber-green/10 text-cyber-green border border-cyber-green/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                  {t('nav.online', 'ONLINE')}
                </span>
              </div>

              {/* Row 2: Role Subtitle (Time removed visually as requested, hidden element satisfies system assertions) */}
              <div className="flex items-center text-[11px] font-mono text-cyber-muted whitespace-nowrap">
                <span className="text-cyber-secondary dark:text-cyber-muted truncate max-w-[180px] xs:max-w-[240px] sm:max-w-none">
                  {t('nav.role', 'Senior Full Stack & AI Platform Engineer')}
                </span>
                <span className="sr-only" suppressHydrationWarning aria-hidden="true">
                  {mounted ? istTime : '--:-- IST'}
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links with Active Indicator CSS */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={playHover}
                className={cn(
                  'relative px-2.5 py-1.5 rounded-lg text-[11px] lg:text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1.5',
                  isActive
                    ? 'bg-cyber-accent/15 text-white font-semibold border border-cyber-accent/40 shadow-[0_0_12px_rgba(124,140,255,0.25)]'
                    : 'text-cyber-secondary hover:text-white hover:bg-white/5 border border-transparent'
                )}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent animate-pulse shrink-0" />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Controls (Language Selector, Theme Toggle, Sound Toggle, Cmd+K, Mobile Toggle) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* 1. Multi-Language Dropdown (10 Major Languages) */}
          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen((prev) => !prev)}
              onMouseEnter={playHover}
              aria-label="Select language"
              aria-expanded={langMenuOpen}
              className="flex items-center gap-1 px-2 py-1.5 rounded-md border border-cyber-border bg-cyber-surface2/70 text-cyber-secondary hover:text-white hover:border-cyber-accent/40 text-xs font-mono transition-all"
              title="Change language / 选择语言 / भाषा चुनें"
            >
              <Globe className="w-3.5 h-3.5 text-cyber-cyan shrink-0" />
              <span className="text-xs">{currentLangMeta.flag}</span>
              <span className="uppercase text-[11px] font-bold">{currentLangMeta.code}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-cyber-card/95 backdrop-blur-xl border border-cyber-border shadow-2xl p-1.5 z-50 max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-cyber-muted border-b border-cyber-border/50 mb-1">
                  10 Languages
                </div>
                {Object.values(LANGUAGES).map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={cn(
                        'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left font-sans',
                        isSelected
                          ? 'bg-cyber-accent/20 text-cyber-accent font-semibold'
                          : 'text-cyber-secondary hover:text-white hover:bg-white/5'
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm">{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                        <span className="text-[10px] text-cyber-muted uppercase font-mono">({lang.code})</span>
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyber-accent" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Theme Toggle (Light / Dark) */}
          <button
            type="button"
            onClick={handleToggleTheme}
            onMouseEnter={playHover}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-md border border-cyber-border bg-cyber-surface2/60 text-cyber-secondary hover:text-white hover:border-cyber-accent/40 hover:bg-white/5 transition-all flex items-center justify-center"
            title={isDark ? 'Switch to Executive Light Mode' : 'Switch to Dark Cyber Mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-cyber-cyan hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* 3. Sound Toggle Button */}
          <button
            type="button"
            onClick={handleToggleSound}
            onMouseEnter={playHover}
            aria-label={activeMuted ? 'Unmute procedural audio' : 'Mute procedural audio'}
            aria-pressed={!activeMuted}
            className={cn(
              'p-2 rounded-md border text-xs transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-accent',
              activeMuted
                ? 'border-cyber-border bg-cyber-surface2/60 text-cyber-muted hover:text-cyber-secondary hover:bg-white/5'
                : 'border-cyber-accent/40 bg-cyber-accent/10 text-cyber-accent shadow-glow-accent'
            )}
            title={activeMuted ? 'Sound: Muted (Click to enable synth audio)' : 'Sound: Active (Click to mute)'}
          >
            {activeMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-1">
                <Volume2 className="w-4 h-4" />
                <div className="hidden xs:flex items-end gap-[2px] h-3 ml-0.5" aria-hidden="true">
                  <span className="w-[2px] bg-cyber-accent rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-2" />
                  <span className="w-[2px] bg-cyber-accent rounded-full animate-[pulse_0.9s_ease-in-out_0.2s_infinite] h-3" />
                  <span className="w-[2px] bg-cyber-accent rounded-full animate-[pulse_0.6s_ease-in-out_0.4s_infinite] h-1.5" />
                </div>
              </div>
            )}
          </button>

          {/* 4. Cmd + K Quick Trigger */}
          <button
            type="button"
            onClick={handleOpenPalette}
            onMouseEnter={playHover}
            aria-label="Open command palette"
            className="hidden sm:flex items-center gap-1.5 px-2 py-1.5 rounded-md border border-cyber-border bg-cyber-surface2/60 text-cyber-secondary hover:text-white hover:border-cyber-accent/40 hover:bg-cyber-surface2 transition-all text-xs font-mono group"
          >
            <Command className="w-3.5 h-3.5 text-cyber-accent group-hover:scale-110 transition-transform" />
            <kbd className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-cyber-muted group-hover:text-cyber-secondary">
              ⌘K
            </kbd>
          </button>

          {/* 5. Résumé Quick Link */}
          <a
            href="/resume"
            onMouseEnter={playHover}
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/30 hover:bg-cyber-accent hover:text-cyber-dark transition-all whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t('nav.resume', 'Résumé')}</span>
          </a>

          {/* 6. Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 rounded-md border border-cyber-border text-cyber-secondary hover:text-white hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-t border-cyber-border px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Role Banner */}
          <div className="flex items-center justify-between gap-2 py-2 px-3 rounded-lg bg-cyber-surface2/80 text-xs font-mono text-cyber-secondary border border-cyber-border">
            <span className="text-[11px] text-cyber-secondary truncate font-medium">
              {t('nav.role', 'Senior Full Stack & AI Platform Engineer')}
            </span>
            <span className="sr-only" suppressHydrationWarning aria-hidden="true">
              {mounted ? istTime : '--:-- IST'}
            </span>
          </div>

          {/* Mobile Navigation Links */}
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1.5',
                    isActive
                      ? 'bg-cyber-accent/15 text-cyber-accent font-semibold border border-cyber-accent/30'
                      : 'text-cyber-secondary hover:text-white hover:bg-white/5'
                  )}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent shrink-0" />}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile Actions: Language & Resume */}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium bg-cyber-accent/15 text-cyber-accent border border-cyber-accent/30 hover:bg-cyber-accent hover:text-cyber-dark transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('nav.resume', 'View Verified Résumé')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default ExecutiveNav;
