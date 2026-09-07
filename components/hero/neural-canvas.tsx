'use client';

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
  color: string;
}

interface WaveRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export function NeuralCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isPaused = false;

    // Viewport dimensions
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Retina display scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      radius: 160,
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const ripples: WaveRipple[] = [];

    // Calculate node count and max edge distance by viewport width
    const getNodeCount = (w: number) => {
      if (w < 640) return 40;
      if (w < 1024) return 65;
      if (w < 1440) return 95;
      return 120;
    };

    const getMaxDistance = (w: number) => (w < 768 ? 100 : 135);

    let maxDistance = getMaxDistance(width);

    // Initialize particles with cyber palette (accent indigo, cyan, lavender)
    const colors = [
      'rgba(124, 140, 255,', // cyber-accent
      'rgba(140, 216, 255,', // cyber-cyan
      'rgba(184, 168, 255,', // cyber-lavender
      'rgba(120, 230, 188,', // cyber-green
    ];

    let particles: Particle[] = Array.from({ length: getNodeCount(width) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.6 + 1.2,
      baseAlpha: Math.random() * 0.4 + 0.35,
      pulsePhase: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      maxDistance = getMaxDistance(width);

      // Rebalance particles if screen changed significantly
      const targetCount = getNodeCount(width);
      if (Math.abs(particles.length - targetCount) > 15) {
        particles = Array.from({ length: targetCount }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.6 + 1.2,
          baseAlpha: Math.random() * 0.4 + 0.35,
          pulsePhase: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        }));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };

    // Click / tap creates outward kinetic wave ripple
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      ripples.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: 220,
        alpha: 0.6,
      });

      // Momentarily push nearby particles outward
      for (const p of particles) {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.hypot(dx, dy);
        if (dist < 180 && dist > 0) {
          const impulse = (180 - dist) / 180;
          p.vx += (dx / dist) * impulse * 2.8;
          p.vy += (dy / dist) * impulse * 2.8;
        }
      }
    };

    // IntersectionObserver to pause when scrolled away
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isPaused = !entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    const handleMotionPreference = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionPreference);

    // Frame rendering loop
    const render = () => {
      if (isPaused) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 3.5;
        rip.alpha *= 0.96;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(140, 216, 255, ${rip.alpha * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (rip.alpha < 0.01 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.pulsePhase += 0.025;

          // Velocity dampening back to nominal speed
          p.vx *= 0.985;
          p.vy *= 0.985;

          // Ensure minimum drift
          const speed = Math.hypot(p.vx, p.vy);
          if (speed < 0.2) {
            p.vx += (Math.random() - 0.5) * 0.05;
            p.vy += (Math.random() - 0.5) * 0.05;
          }

          p.x += p.vx;
          p.y += p.vy;

          // Boundary screen wrap with buffer
          if (p.x < -20) p.x = width + 20;
          else if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          else if (p.y > height + 20) p.y = -20;

          // Cursor attraction/repulsion physics
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 0) {
            // Gentle repulsive force
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 1.6;
            p.y -= (dy / dist) * force * 1.6;
          }
        }

        // Particle pulse alpha
        const alpha = Math.max(
          0.15,
          p.baseAlpha + Math.sin(p.pulsePhase) * 0.2
        );

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${alpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < maxDistance) {
            const edgeAlpha = (1 - dist / maxDistance) * 0.24;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(124, 140, 255, ${edgeAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect node to cursor if within range
        const cursorDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (cursorDist < mouse.radius) {
          const mAlpha = (1 - cursorDist / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(140, 216, 255, ${mAlpha})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      mediaQuery.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className || 'absolute inset-0 pointer-events-auto z-0 opacity-75'}
      style={{ touchAction: 'none' }}
    />
  );
}

export default NeuralCanvas;
