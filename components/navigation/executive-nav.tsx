'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  Command,
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  FileText,
} from 'lucide-react';
import { useMounted } from '@/hooks/use-mounted';
import { useSound } from '@/hooks/use-sound';
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
  const [istTime, setIstTime] = useState<string>('--:--:-- IST');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Determine current muted state (controlled prop if provided, else hook)
  const activeMuted = isAudioMuted !== undefined ? isAudioMuted : soundHookMuted;

  // Live Asia/Kolkata (IST, UTC+5:30) Clock
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

  const handleToggleSound = () => {
    if (onToggleAudio) {
      onToggleAudio();
    } else {
      toggleMute();
    }
  };

  const handleOpenPalette = () => {
    playClick();
    if (onOpenCommandPalette) {
      onOpenCommandPalette();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-command-palette'));
    }
  };

  // Core navigation anchors (F04-T2 contract: #hero, #work, #architecture, #playground, #experience, #skills, #contact)
  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'Work', href: '#work' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'AI Terminal', href: '#playground' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Identity / Status Pill */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-foreground hover:text-cyber-accent transition-colors group"
            onMouseEnter={playHover}
          >
            <div className="w-8 h-8 rounded-lg bg-cyber-surface2 border border-cyber-border flex items-center justify-center text-cyber-accent group-hover:border-cyber-accent/40 group-hover:shadow-glow-accent transition-all">
              <span className="font-mono text-sm font-bold tracking-tighter">YJ</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-wide text-foreground group-hover:text-white">
                  Yash Jangid
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-cyber-green/10 text-cyber-green border border-cyber-green/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                  ONLINE
                </span>
              </div>
              <span className="text-[11px] text-cyber-muted hidden sm:inline-block">
                Senior Full Stack &amp; AI Platform Engineer
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={playHover}
              className="px-2.5 py-1.5 rounded-md text-xs font-medium text-cyber-secondary hover:text-white hover:bg-white/5 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Fallback Nav for medium-width desktop */}
        <nav className="hidden md:flex xl:hidden items-center gap-1">
          {navLinks.slice(0, 5).map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={playHover}
              className="px-2 py-1.5 rounded-md text-xs font-medium text-cyber-secondary hover:text-white hover:bg-white/5 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Telemetry Widgets (IST Clock, Sound Toggle, Cmd+K, Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live IST Clock */}
          <div
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyber-surface2/60 border border-cyber-border text-cyber-secondary text-xs font-mono"
            title="Current Time in Gurugram, India (Asia/Kolkata)"
          >
            <Clock className="w-3.5 h-3.5 text-cyber-accent" />
            <span suppressHydrationWarning className="text-cyber-secondary font-mono tracking-tight">
              {mounted ? istTime : '--:--:-- IST'}
            </span>
          </div>

          {/* Sound Toggle Button */}
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

          {/* Cmd + K Quick Trigger */}
          <button
            type="button"
            onClick={handleOpenPalette}
            onMouseEnter={playHover}
            aria-label="Open command palette"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-cyber-border bg-cyber-surface2/60 text-cyber-secondary hover:text-white hover:border-cyber-accent/40 hover:bg-cyber-surface2 transition-all text-xs font-mono group"
          >
            <Command className="w-3.5 h-3.5 text-cyber-accent group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-cyber-muted group-hover:text-cyber-secondary">
              ⌘K
            </kbd>
          </button>

          {/* Résumé Quick Link */}
          <a
            href="/resume"
            onMouseEnter={playHover}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/30 hover:bg-cyber-accent hover:text-cyber-dark transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Résumé</span>
          </a>

          {/* Mobile Menu Button */}
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
        <div className="md:hidden glass-nav border-t border-cyber-border px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {/* Mobile IST Time Pill */}
          <div className="flex items-center justify-between py-1.5 px-2 rounded bg-cyber-surface2/80 text-xs font-mono text-cyber-secondary border border-cyber-border mb-3">
            <span className="flex items-center gap-1.5 text-cyber-muted">
              <Clock className="w-3.5 h-3.5 text-cyber-accent" />
              Gurugram, IN
            </span>
            <span suppressHydrationWarning className="text-cyber-accent font-semibold">
              {mounted ? istTime : '--:--:-- IST'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-xs font-medium text-cyber-secondary hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-2">
            <a
              href="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium bg-cyber-accent/15 text-cyber-accent border border-cyber-accent/30 hover:bg-cyber-accent hover:text-cyber-dark transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Verified Résumé</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default ExecutiveNav;
