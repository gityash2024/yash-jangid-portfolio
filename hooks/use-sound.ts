'use client';

import { useState, useEffect, useCallback } from 'react';
import { audioEngine, AudioEngine } from '@/lib/audio-engine';

export interface UseSoundReturn {
  isMuted: boolean;
  toggleMute: () => boolean;
  setMuted: (muted: boolean) => void;
  playClick: () => void;
  playHover: () => void;
  playTerminalKey: () => void;
  playSuccessChime: () => void;
  playErrorBuzz: () => void;
  playPaletteOpen: () => void;
}

export function useSound(): UseSoundReturn {
  const [isMuted, setIsMuted] = useState<boolean>(true);

  useEffect(() => {
    // Synchronize initial state on mount
    setIsMuted(audioEngine.isMuted());

    const handleAudioStateChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isMuted: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.isMuted === 'boolean') {
        setIsMuted(customEvent.detail.isMuted);
      } else {
        setIsMuted(audioEngine.isMuted());
      }
    };

    window.addEventListener('yj-audio-state-changed', handleAudioStateChange);
    return () => {
      window.removeEventListener('yj-audio-state-changed', handleAudioStateChange);
    };
  }, []);

  const toggleMute = useCallback(() => {
    const newState = audioEngine.toggleMute();
    setIsMuted(newState);
    return newState;
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    audioEngine.setMuted(muted);
    setIsMuted(muted);
  }, []);

  const playClick = useCallback(() => audioEngine.playClick(), []);
  const playHover = useCallback(() => audioEngine.playHover(), []);
  const playTerminalKey = useCallback(() => audioEngine.playTerminalKey(), []);
  const playSuccessChime = useCallback(() => audioEngine.playSuccessChime(), []);
  const playErrorBuzz = useCallback(() => audioEngine.playErrorBuzz(), []);
  const playPaletteOpen = useCallback(() => audioEngine.playPaletteOpen(), []);

  return {
    isMuted,
    toggleMute,
    setMuted,
    playClick,
    playHover,
    playTerminalKey,
    playSuccessChime,
    playErrorBuzz,
    playPaletteOpen,
  };
}
