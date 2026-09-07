'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { cn } from '@/lib/utils';

interface AudioToggleProps {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
}

export function AudioToggle({
  className,
  showLabel = false,
  compact = false,
}: AudioToggleProps) {
  const { isMuted, toggleMute, playHover } = useSound();

  return (
    <button
      type="button"
      onClick={toggleMute}
      onMouseEnter={playHover}
      aria-label={isMuted ? 'Unmute procedural audio' : 'Mute procedural audio'}
      aria-pressed={!isMuted}
      title={
        isMuted
          ? 'Procedural Audio: Muted (Click to enable synth sounds)'
          : 'Procedural Audio: Active (Click to mute)'
      }
      className={cn(
        'group relative inline-flex items-center gap-2 rounded-lg border text-xs font-mono transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-accent',
        compact ? 'p-1.5' : 'px-2.5 py-1.5',
        isMuted
          ? 'border-cyber-border bg-cyber-surface2/60 text-cyber-muted hover:border-cyber-border/80 hover:bg-cyber-surface2 hover:text-cyber-secondary'
          : 'border-cyber-accent/40 bg-cyber-accent/10 text-cyber-accent shadow-glow-accent hover:bg-cyber-accent/15',
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        {isMuted ? (
          <VolumeX className="w-4 h-4 transition-transform group-hover:scale-105 text-cyber-muted" />
        ) : (
          <div className="flex items-center gap-1">
            <Volume2 className="w-4 h-4 transition-transform group-hover:scale-105 text-cyber-accent" />
            {/* Visual sound wave bars animation */}
            <div className="flex items-end gap-[2px] h-3 ml-0.5" aria-hidden="true">
              <span className="w-[2px] bg-cyber-accent rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-2" />
              <span className="w-[2px] bg-cyber-accent rounded-full animate-[pulse_0.9s_ease-in-out_0.2s_infinite] h-3" />
              <span className="w-[2px] bg-cyber-accent rounded-full animate-[pulse_0.6s_ease-in-out_0.4s_infinite] h-1.5" />
            </div>
          </div>
        )}
      </div>

      {showLabel && (
        <span className="text-[11px] font-medium tracking-wide">
          {isMuted ? 'Sound Off' : 'Sound On'}
        </span>
      )}
    </button>
  );
}

export default AudioToggle;
