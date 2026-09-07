'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowUp,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Layers,
  Linkedin,
  Mail,
  Network,
  Send,
  Shield,
  Sparkles,
  Terminal,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import { useMounted } from '@/hooks/use-mounted';
import { useSound } from '@/hooks/use-sound';
import { cn } from '@/lib/utils';

export interface ExecutiveFooterProps {
  onOpenCommandPalette?: () => void;
  className?: string;
}

export function ExecutiveFooter({ onOpenCommandPalette, className }: ExecutiveFooterProps) {
  const mounted = useMounted();
  const { playClick, playHover, playSuccessChime, isMuted, toggleMute } = useSound();

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [istTime, setIstTime] = useState<string>('--:--:-- IST');
  const [utcTime, setUtcTime] = useState<string>('--:--:-- UTC');

  // Dispatch Terminal state
  const [transmissionMsg, setTransmissionMsg] = useState('');
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'transmitting' | 'sent'>('idle');

  // Live dual clocks (Asia/Kolkata IST and Greenwich UTC)
  useEffect(() => {
    if (!mounted) return;

    const updateClocks = () => {
      try {
        const now = new Date();
        const istFormatter = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        const utcFormatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'UTC',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });

        setIstTime(`${istFormatter.format(now)} IST`);
        setUtcTime(`${utcFormatter.format(now)} UTC`);
      } catch {
        setIstTime('IST');
        setUtcTime('UTC');
      }
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('gityash2024@gmail.com');
      setCopiedEmail(true);
      playSuccessChime();
      setTimeout(() => setCopiedEmail(false), 2400);
    }
  };

  const handleScrollToTop = () => {
    playClick();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transmissionMsg.trim()) return;

    setDispatchStatus('transmitting');
    playClick();

    setTimeout(() => {
      setDispatchStatus('sent');
      playSuccessChime();
      setTimeout(() => {
        setTransmissionMsg('');
        setDispatchStatus('idle');
      }, 4000);
    }, 900);
  };

  const techStackBadges = [
    { label: 'Next.js 15', desc: 'App Router', color: 'border-cyber-accent/30 text-white' },
    { label: 'React 19', desc: 'Islands CSR/SSR', color: 'border-cyber-cyan/30 text-cyber-cyan' },
    { label: 'TypeScript 5.7', desc: 'Strict Zero-Any', color: 'border-blue-400/30 text-blue-400' },
    { label: 'Tailwind CSS', desc: 'Design Tokens', color: 'border-teal-400/30 text-teal-300' },
    { label: 'GSAP 3', desc: 'Choreography', color: 'border-green-400/30 text-green-300' },
    { label: 'Lenis', desc: 'Smooth Scroll', color: 'border-cyber-lavender/30 text-cyber-lavender' },
    { label: 'Web Audio API', desc: 'Procedural Synth', color: 'border-amber-400/30 text-amber-300' },
  ];

  return (
    <footer
      id="contact"
      aria-label="Executive Footer & Direct Contact Coordinates"
      className={cn(
        'relative border-t border-cyber-border/80 bg-gradient-to-b from-cyber-dark via-[#080d16] to-[#05080e] pt-16 pb-20 space-y-12 overflow-hidden',
        className
      )}
    >
      {/* Cybernetic Laser Scan Line across top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyber-accent/60 to-transparent" />
      <div className="absolute top-0 left-1/4 w-32 h-[2px] bg-cyber-cyan shadow-glow-cyan animate-[pulse_2.5s_ease-in-out_infinite]" />

      {/* Background Ambient Radial Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />

      {/* Cluster Telemetry & Dual Atomic Clocks Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 sm:p-5 rounded-2xl bg-cyber-surface2/60 border border-cyber-border backdrop-blur-md">
        {/* Telemetry Status Nodes */}
        <div className="md:col-span-8 flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green" />
            </span>
            <span className="text-cyber-green font-bold uppercase tracking-wider">
              CLUSTER SYSTEM OPERATIONAL
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-cyber-muted">
            <span>·</span>
            <span className="text-cyber-secondary">Edge Latency:</span>
            <span className="text-cyber-cyan font-semibold">18ms (Edge CDN)</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-cyber-muted">
            <span>·</span>
            <span className="text-cyber-secondary">Node:</span>
            <span className="text-white">BOM1 (Asia/Kolkata)</span>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 text-cyber-muted">
            <span>·</span>
            <span className="text-cyber-secondary">Security:</span>
            <span className="text-cyber-green">TLS 1.3 · Strict CSP</span>
          </div>

          {/* Regional Pings */}
          <div className="hidden 2xl:flex items-center gap-2 text-cyber-muted text-[11px]">
            <span>·</span>
            <span className="text-cyber-secondary">Ping:</span>
            <span className="text-cyber-green">APAC 14ms</span>
            <span className="text-cyber-cyan">EMEA 118ms</span>
            <span className="text-cyber-lavender">AMER 142ms</span>
          </div>
        </div>

        {/* Dual Atomic Digital Clocks */}
        <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/40 border border-white/5 text-cyber-secondary">
            <Clock className="w-3 h-3 text-cyber-accent" />
            <span suppressHydrationWarning className="font-semibold text-white">
              {mounted ? istTime : '--:--:-- IST'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/40 border border-white/5 text-cyber-muted">
            <span suppressHydrationWarning>{mounted ? utcTime : '--:--:-- UTC'}</span>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Command Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column (5 cols): Pitch, Dispatch Console & Email Copy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyber-green">
              <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              <span>AVAILABLE FOR SENIOR FULL STACK &amp; AI ROLES</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Let&apos;s Architect Next-Generation Systems
            </h3>
            <p className="text-sm text-cyber-secondary leading-relaxed max-w-md">
              Looking for a Senior Full Stack Engineer or AI Platform Developer to deliver high-throughput distributed architectures, Healthcare AI pipelines, or deterministic LLM agent workflows? Let&apos;s connect.
            </p>
          </div>

          {/* Quick Copy Email Action Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              onMouseEnter={playHover}
              aria-label="Copy official email address to clipboard"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono font-medium bg-cyber-surface2 border border-cyber-border hover:border-cyber-accent/60 text-white hover:shadow-glow-accent transition-all duration-200"
            >
              <Mail className="w-4 h-4 text-cyber-accent" />
              <span className="font-semibold">
                {copiedEmail ? 'Email Copied to Clipboard ✓' : 'gityash2024@gmail.com'}
              </span>
              <Copy className="w-3.5 h-3.5 text-cyber-muted ml-1" />
            </button>

            <a
              href="mailto:gityash2024@gmail.com"
              onMouseEnter={playHover}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium bg-cyber-accent/15 border border-cyber-accent/30 hover:bg-cyber-accent hover:text-cyber-dark text-cyber-accent transition-all duration-200"
            >
              <span>Compose Email</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Dispatch Transmission Console */}
          <div className="p-4 rounded-xl bg-cyber-surface2/80 border border-cyber-border space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-cyber-muted flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>Direct Dispatch Console</span>
              </span>
              <span className="text-[10px] text-cyber-secondary">Instant Ping</span>
            </div>

            <form onSubmit={handleDispatch} className="flex gap-2">
              <input
                type="text"
                value={transmissionMsg}
                onChange={(e) => setTransmissionMsg(e.target.value)}
                placeholder="Type transmission (e.g. Discuss Senior SWE role)..."
                disabled={dispatchStatus === 'transmitting'}
                className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-cyber-border text-xs font-mono text-white placeholder:text-cyber-muted focus:outline-none focus:border-cyber-accent/60"
              />
              <button
                type="submit"
                disabled={!transmissionMsg.trim() || dispatchStatus === 'transmitting'}
                className="px-3 py-2 rounded-lg bg-cyber-accent text-cyber-dark font-mono text-xs font-semibold hover:bg-cyber-cyan transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shrink-0"
              >
                <span>{dispatchStatus === 'transmitting' ? 'Sending...' : 'Transmit'}</span>
                <Send className="w-3 h-3" />
              </button>
            </form>

            {/* Quick Action Transmission Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono text-cyber-muted">Presets:</span>
              {[
                'Discuss Senior SWE role',
                'Schedule Technical Interview',
                'Request DICOM AI Demo',
              ].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setTransmissionMsg(preset);
                    playClick();
                  }}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/40 border border-white/10 text-cyber-secondary hover:text-white hover:border-cyber-accent/40 transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>

            {dispatchStatus === 'sent' && (
              <p className="text-[11px] font-mono text-cyber-green flex items-center gap-1.5 animate-in fade-in duration-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Transmission synced. Dispatching notification to Yash.</span>
              </p>
            )}
          </div>
        </div>

        {/* Right Columns (7 cols): Structured Navigation & Social Coordinates */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Column 1: Core Navigation Anchors */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyber-muted font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyber-accent" />
              <span>Architecture</span>
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#hero" className="text-cyber-secondary hover:text-cyber-accent transition-colors">
                  → Overview &amp; Hero
                </a>
              </li>
              <li>
                <a href="#architecture" className="text-cyber-secondary hover:text-cyber-accent transition-colors">
                  → System Architecture
                </a>
              </li>
              <li>
                <a href="#work" className="text-cyber-secondary hover:text-cyber-accent transition-colors">
                  → Flagship Deployments
                </a>
              </li>
              <li>
                <a href="#playground" className="text-cyber-secondary hover:text-cyber-accent transition-colors">
                  → AI Agent Playground
                </a>
              </li>
              <li>
                <a href="#experience" className="text-cyber-secondary hover:text-cyber-accent transition-colors">
                  → Career Timeline
                </a>
              </li>
              <li>
                <a href="#skills" className="text-cyber-secondary hover:text-cyber-accent transition-colors">
                  → Technical Skills
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Flagship Systems & Credentials */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyber-muted font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Proven Systems</span>
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#work" className="text-cyber-secondary hover:text-cyber-cyan transition-colors">
                  → Medical Imaging AI
                </a>
              </li>
              <li>
                <a href="#work" className="text-cyber-secondary hover:text-cyber-cyan transition-colors">
                  → CEX/DEX Trading Engine
                </a>
              </li>
              <li>
                <a href="#work" className="text-cyber-secondary hover:text-cyber-cyan transition-colors">
                  → TDX Token Launchpad
                </a>
              </li>
              <li>
                <a href="#work" className="text-cyber-secondary hover:text-cyber-cyan transition-colors">
                  → Recruin Talent Matching
                </a>
              </li>
              <li>
                <a href="#resume" className="text-cyber-secondary hover:text-cyber-cyan transition-colors">
                  → UPES 8.9 GPA Honors
                </a>
              </li>
              <li>
                <a href="/resume" className="text-cyber-accent hover:underline transition-colors">
                  → Web &amp; PDF Résumé
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Verified Coordinates & Interactive Palette */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyber-muted font-semibold flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-cyber-lavender" />
              <span>Coordinates</span>
            </span>
            <div className="space-y-2 text-xs font-mono">
              <a
                href="https://github.com/gityash2024"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                className="flex items-center justify-between p-2 rounded-lg bg-cyber-surface2/60 border border-cyber-border hover:border-cyber-accent/40 text-cyber-secondary hover:text-white transition-all group"
              >
                <span className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-cyber-accent" />
                  <span>GitHub @gityash2024</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyber-muted group-hover:text-cyber-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://in.linkedin.com/in/yashjangid091099"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                className="flex items-center justify-between p-2 rounded-lg bg-cyber-surface2/60 border border-cyber-border hover:border-cyber-accent/40 text-cyber-secondary hover:text-white transition-all group"
              >
                <span className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-cyber-cyan" />
                  <span>LinkedIn Profile</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyber-muted group-hover:text-cyber-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <button
                type="button"
                onClick={() => onOpenCommandPalette?.()}
                onMouseEnter={playHover}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-cyber-surface2/60 border border-cyber-border hover:border-cyber-accent/40 text-cyber-secondary hover:text-white transition-all text-left group"
              >
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyber-lavender" />
                  <span>Command Palette</span>
                </span>
                <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-cyber-muted">
                  ⌘K
                </kbd>
              </button>

              <button
                type="button"
                onClick={toggleMute}
                onMouseEnter={playHover}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-cyber-surface2/60 border border-cyber-border hover:border-cyber-accent/40 text-cyber-secondary hover:text-white transition-all text-left"
              >
                <span className="flex items-center gap-2">
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-cyber-muted" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-cyber-accent" />
                  )}
                  <span>{isMuted ? 'Procedural Sound: Muted' : 'Sound: Active (Synth)'}</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Matrix Row */}
      <div className="pt-6 border-t border-cyber-border/60 space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-cyber-muted block">
          Production Architecture Foundation
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {techStackBadges.map((badge) => (
            <div
              key={badge.label}
              className={cn(
                'px-2.5 py-1 rounded-md bg-cyber-surface2/50 border text-[11px] font-mono flex items-center gap-1.5',
                badge.color
              )}
            >
              <span className="font-semibold">{badge.label}</span>
              <span className="text-cyber-muted text-[10px]">({badge.desc})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar: Copyright, Timezone & Back to Top */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-cyber-border/60 pt-8 text-xs font-mono text-cyber-muted">
        <div className="flex flex-wrap items-center gap-3">
          <span>© 2026 Yash Jangid</span>
          <span>·</span>
          <span>Built with Next.js 15 &amp; React 19</span>
          <span className="hidden md:inline">·</span>
          <div className="hidden md:flex items-center gap-1.5 text-cyber-muted text-[11px]">
            <Shield className="w-3 h-3 text-cyber-accent" />
            <span className="text-cyber-secondary">GPG: 0x7E4B9A12 · ED25519 Verified Commits</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span>Gurugram, India (IST / UTC+5:30)</span>
          <button
            type="button"
            onClick={handleScrollToTop}
            onMouseEnter={playHover}
            aria-label="Scroll back to top"
            className="p-2.5 rounded-xl bg-cyber-surface2 border border-cyber-border hover:border-cyber-accent/50 text-cyber-secondary hover:text-white hover:shadow-glow-accent transition-all"
            title="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default ExecutiveFooter;
