'use client';

import React, { useState, useMemo } from 'react';
import {
  Activity,
  Layers,
  Database,
  Cpu,
  Server,
  Zap,
  CheckCircle2,
  Sliders,
  Shield,
  Clock,
  ArrowRight,
  Info,
  X,
  Sparkles,
} from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { cn } from '@/lib/utils';

export interface PipelineStage {
  id: string;
  stepNumber: number;
  name: string;
  category: string;
  icon: React.ElementType;
  accentColor: string; // 'accent', 'cyan', 'green', 'lavender'
  description: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  deepDive: {
    problemStatement: string;
    architectureSolution: string;
    tradeoffs: string;
    productionImpact: string;
  };
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'ingestion',
    stepNumber: 1,
    name: 'Ingestion & Gateway',
    category: 'Gateway / Transport',
    icon: Server,
    accentColor: 'text-cyber-accent',
    description:
      'High-throughput API gateway routing DICOM medical study streams and Web3 order book feeds with TLS termination and token authentication.',
    techStack: ['Nginx', 'Express', 'WebSockets', 'Orthanc PACS', 'JWT'],
    metrics: [
      { label: 'Throughput', value: '10,000+ req/min' },
      { label: 'Ingestion Protocol', value: 'DICOM C-STORE & WSS' },
      { label: 'TLS Handshake', value: '< 8ms' },
    ],
    deepDive: {
      problemStatement:
        'Large multi-gigabyte CT/MRI volumes and bursty crypto order book feeds created network bottlenecks and memory bloat on unbuffered endpoints.',
      architectureSolution:
        'Engineered an event-driven reverse proxy layer with streaming chunk transfers to Orthanc PACS and WebSocket multiplexing for financial tickers.',
      tradeoffs:
        'Chose asynchronous stream buffering over synchronous disk persistence, avoiding disk I/O stalls during concurrent scan ingestion.',
      productionImpact:
        'Sustained 10,000+ req/min during peak trading and medical scan uploads without memory leakage.',
    },
  },
  {
    id: 'processing',
    stepNumber: 2,
    name: 'Processing & Caching',
    category: 'Data Layer',
    icon: Database,
    accentColor: 'text-cyber-cyan',
    description:
      'Distributed Redis in-memory cache and Kafka queues maintaining sub-100ms critical paths and absorbing sudden traffic surges.',
    techStack: ['Redis', 'Kafka', 'Node.js', 'MongoDB', 'Zod'],
    metrics: [
      { label: 'Latency Drop', value: '40% reduction' },
      { label: 'Cache Hit Ratio', value: '94.2% sustained' },
      { label: 'Hot Path Time', value: '< 42ms p50' },
    ],
    deepDive: {
      problemStatement:
        'Repeated database queries for order book states and clinical study metadata drove p99 latency past 250ms under heavy concurrency.',
      architectureSolution:
        'Implemented Redis cluster multi-level caching with TTL jitter and pub/sub fan-out to invalidate stale market data within 5ms.',
      tradeoffs:
        'Accepted eventual consistency for non-critical audit records in exchange for sub-100ms real-time throughput on active trading pairs.',
      productionImpact:
        'Cut server latency by 40% across all API services and prevented MongoDB connection pool exhaustion during flash volatility.',
    },
  },
  {
    id: 'ai-orchestration',
    stepNumber: 3,
    name: 'AI Orchestration & Agents',
    category: 'Agentic Intelligence',
    icon: Cpu,
    accentColor: 'text-cyber-lavender',
    description:
      'Model Context Protocol (MCP) tool registry dispatching 3D U-Net PyTorch tumor inference and deterministic LLM clinical summaries.',
    techStack: ['MCP', 'PyTorch', '3D U-Net', 'SimpleITK', 'LLM Agents'],
    metrics: [
      { label: 'Model Confidence', value: '98.4% Dice Score' },
      { label: 'Inference Speed', value: '310ms tensor exec' },
      { label: 'Protocol', value: 'MCP JSON-RPC 2.0' },
    ],
    deepDive: {
      problemStatement:
        'Radiologists required automated tumor boundary delineation and deterministic structured summaries without non-deterministic hallucinations.',
      architectureSolution:
        'Built an MCP-compliant agent tool layer executing 3D U-Net volume segmentation, converting voxel arrays into standardized JSON clinical findings.',
      tradeoffs:
        'Enforced strict Pydantic/Zod schema validation on agent outputs, terminating and re-evaluating non-conformant model responses.',
      productionImpact:
        'Delivered 98.4% model segmentation precision with sub-second clinical summary generation ready for clinician review.',
    },
  },
  {
    id: 'delivery',
    stepNumber: 4,
    name: 'Delivery & Client UI',
    category: 'Product Experience',
    icon: Layers,
    accentColor: 'text-cyber-green',
    description:
      'Zero-lag browser presentation via OHIF diagnostic viewer and React 19 UI, deployed via 15-minute automated Docker CI/CD pipelines.',
    techStack: ['React 19', 'OHIF Viewer', 'Redux Toolkit', 'Docker', 'GitHub Actions'],
    metrics: [
      { label: 'Production Uptime', value: '99.9% SLA' },
      { label: 'Deploy Cycle', value: '2h → 15m (70%+ faster)' },
      { label: 'Active Users', value: '10,000+ daily' },
    ],
    deepDive: {
      problemStatement:
        'Manual 2-hour deployment cycles caused release anxiety, and rendering 512x512 volumetric scans client-side caused browser tab freezing.',
      architectureSolution:
        'Containerized all microservices with Docker and multi-stage builds on GitHub Actions, integrating OHIF Cornerstone.js with WebGL acceleration.',
      tradeoffs:
        'Utilized client-side GPU WebGL shaders for MRI slice rendering instead of server-side frame generation, drastically lowering server GPU compute costs.',
      productionImpact:
        'Cut deployment time from 2 hours to 15 minutes and achieved smooth 60 FPS scan scrubbing for medical specialists.',
    },
  },
];

export function SystemMetricsVisualizer({ className }: { className?: string }) {
  const { playClick, playHover, playTerminalKey } = useSound();

  // Load slider state: 1,000 to 50,000 req/min
  const [loadReqPerMin, setLoadReqPerMin] = useState<number>(14820);
  const [selectedStage, setSelectedStage] = useState<PipelineStage | null>(null);

  // Dynamic calculations based on load slider
  const metrics = useMemo(() => {
    // Normalization factor 0 to 1
    const factor = (loadReqPerMin - 1000) / (50000 - 1000);

    // Req per sec
    const reqPerSec = Math.round(loadReqPerMin / 60);

    // Latency p50: starts ~28ms at 1K, grows to ~68ms at 50K (showing Redis effectiveness!)
    const latencyP50 = Math.round(28 + factor * 40);

    // Latency p99: starts ~55ms at 1K, grows to ~118ms at 50K
    const latencyP99 = Math.round(55 + factor * 63);

    // Cache hit rate: stays high (96.8% at 1K down to 91.5% at 50K)
    const cacheHitRate = (96.8 - factor * 5.3).toFixed(1);

    // Stage saturations
    const gatewayLoad = Math.min(100, Math.round(18 + factor * 65));
    const redisLoad = Math.min(100, Math.round(22 + factor * 58));
    const aiLoad = Math.min(100, Math.round(15 + factor * 72));
    const deliveryLoad = Math.min(100, Math.round(12 + factor * 55));

    return {
      reqPerSec,
      latencyP50,
      latencyP99,
      cacheHitRate,
      gatewayLoad,
      redisLoad,
      aiLoad,
      deliveryLoad,
    };
  }, [loadReqPerMin]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadReqPerMin(Number(e.target.value));
    if (Math.random() > 0.6) {
      playTerminalKey();
    }
  };

  const handleStageClick = (stage: PipelineStage) => {
    playClick();
    setSelectedStage(stage);
  };

  return (
    <div className={cn('w-full space-y-8', className)}>
      {/* Visualizer Container */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyber-border bg-[#080d16] space-y-8 shadow-2xl relative overflow-hidden">
        {/* Subtle background ambient pulse */}
        <div className="absolute -right-24 -top-24 w-72 h-72 bg-cyber-accent/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header & Telemetry Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-cyber-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyber-accent mb-1">
              <Activity className="w-4 h-4 text-cyber-accent animate-pulse" />
              <span>LIVE CLUSTER TELEMETRY &amp; ARCHITECTURE LAB</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              4-Stage Distributed Pipeline Visualizer
            </h3>
            <p className="text-xs sm:text-sm text-cyber-secondary mt-1 max-w-xl">
              Simulate traffic load to inspect how distributed caching, queue decoupling, and MCP agent orchestration maintain sub-100ms response targets under pressure.
            </p>
          </div>

          {/* Interactive Load Slider Control */}
          <div className="lg:w-80 p-4 rounded-xl bg-cyber-surface2/80 border border-cyber-border space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-cyber-muted flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyber-accent" />
                Simulated Load:
              </span>
              <span className="text-white font-bold px-2 py-0.5 rounded bg-cyber-accent/15 border border-cyber-accent/30 text-cyber-accent">
                {loadReqPerMin.toLocaleString()} req/min
              </span>
            </div>

            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={loadReqPerMin}
              onChange={handleSliderChange}
              aria-label="Simulated load slider from 1,000 to 50,000 requests per minute"
              className="w-full h-1.5 bg-cyber-border rounded-lg appearance-none cursor-pointer accent-cyber-accent focus:outline-none"
            />

            <div className="flex justify-between text-[10px] font-mono text-cyber-muted">
              <span>1K (Idle)</span>
              <span>25K (Heavy)</span>
              <span>50K (Stress Surge)</span>
            </div>

            {/* Quick Benchmark Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-white/5">
              <span className="text-[10px] font-mono text-cyber-muted mr-0.5">Presets:</span>
              {[
                { label: '1.5K Idle', val: 1500 },
                { label: '14.8K SLA', val: 14820 },
                { label: '28K DICOM', val: 28000 },
                { label: '50K Peak', val: 50000 },
              ].map((preset) => (
                <button
                  key={preset.val}
                  type="button"
                  onClick={() => {
                    setLoadReqPerMin(preset.val);
                    playTerminalKey();
                  }}
                  className={cn(
                    'px-2 py-0.5 rounded text-[10px] font-mono transition-all',
                    loadReqPerMin === preset.val
                      ? 'bg-cyber-accent text-cyber-dark font-bold shadow-sm'
                      : 'bg-black/40 border border-white/5 text-cyber-secondary hover:text-white hover:border-cyber-accent/40'
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Dynamic Dials */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-cyber-surface2/50 border border-cyber-border space-y-1">
            <span className="text-[10px] font-mono uppercase text-cyber-muted tracking-wider">
              Instant Throughput
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white flex items-baseline gap-1">
              <span>{metrics.reqPerSec}</span>
              <span className="text-xs font-sans text-cyber-accent font-normal">req / sec</span>
            </div>
            <div className="w-full bg-cyber-border/40 h-1 rounded-full overflow-hidden mt-2">
              <div
                className="bg-cyber-accent h-full transition-all duration-300"
                style={{ width: `${(metrics.reqPerSec / 833) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-cyber-surface2/50 border border-cyber-border space-y-1">
            <span className="text-[10px] font-mono uppercase text-cyber-muted tracking-wider">
              Server Latency (p50)
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-cyber-cyan flex items-baseline gap-1">
              <span>{metrics.latencyP50}</span>
              <span className="text-xs font-sans text-cyber-secondary font-normal">ms</span>
            </div>
            <span className="text-[10px] text-cyber-green font-mono">
              ✓ Hot path target &lt; 100ms
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-cyber-surface2/50 border border-cyber-border space-y-1">
            <span className="text-[10px] font-mono uppercase text-cyber-muted tracking-wider">
              Tail Latency (p99)
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-cyber-lavender flex items-baseline gap-1">
              <span>{metrics.latencyP99}</span>
              <span className="text-xs font-sans text-cyber-secondary font-normal">ms</span>
            </div>
            <span className="text-[10px] text-cyber-muted font-mono">
              Bounded queue execution
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-cyber-surface2/50 border border-cyber-border space-y-1">
            <span className="text-[10px] font-mono uppercase text-cyber-muted tracking-wider">
              Redis Cache Hit Ratio
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-cyber-green flex items-baseline gap-1">
              <span>{metrics.cacheHitRate}%</span>
              <span className="text-xs font-sans text-cyber-secondary font-normal">hits</span>
            </div>
            <span className="text-[10px] text-cyber-green font-mono">
              High hot-key retention
            </span>
          </div>
        </div>

        {/* 4-Stage Interactive Pipeline Flow */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-cyber-muted">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyber-accent" />
              Interactive Nodes (Click any node to view architecture &amp; tradeoffs)
            </span>
            <span className="hidden sm:inline">Data packet pulses active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {PIPELINE_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = selectedStage?.id === stage.id;

              const stageSaturation =
                stage.id === 'ingestion'
                  ? metrics.gatewayLoad
                  : stage.id === 'processing'
                  ? metrics.redisLoad
                  : stage.id === 'ai-orchestration'
                  ? metrics.aiLoad
                  : metrics.deliveryLoad;

              return (
                <div
                  key={stage.id}
                  onClick={() => handleStageClick(stage)}
                  onMouseEnter={playHover}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleStageClick(stage);
                    }
                  }}
                  className={cn(
                    'group relative rounded-xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-accent',
                    isSelected
                      ? 'bg-cyber-surface2 border-cyber-accent shadow-glow-accent ring-1 ring-cyber-accent'
                      : 'bg-cyber-surface2/60 border-cyber-border hover:border-cyber-accent/40 hover:bg-cyber-surface2 hover:shadow-lg'
                  )}
                >
                  {/* Stage number & status */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/40 border border-white/10 text-cyber-muted">
                      STAGE 0{stage.stepNumber}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono">
                      <span
                        className={cn(
                          'w-2 h-2 rounded-full',
                          stageSaturation > 85 ? 'bg-amber-400 animate-ping' : 'bg-cyber-green'
                        )}
                      />
                      <span className="text-cyber-muted">{stageSaturation}% load</span>
                    </div>
                  </div>

                  {/* Icon & Name */}
                  <div className="space-y-2">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center border transition-all',
                        isSelected
                          ? 'bg-cyber-accent/20 border-cyber-accent text-cyber-accent'
                          : 'bg-white/5 border-white/10 text-cyber-secondary group-hover:border-cyber-accent/40 group-hover:text-white'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-white group-hover:text-cyber-accent transition-colors">
                      {stage.name}
                    </h4>
                    <p className="text-xs text-cyber-secondary line-clamp-2 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-white/5">
                    {stage.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 text-cyber-muted border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {stage.techStack.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 text-cyber-muted">
                        +{stage.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Prompt to inspect */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-cyber-accent pt-1">
                    <span>Inspect Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Deep-Dive Modal / Panel */}
        {selectedStage && (
          <div className="relative rounded-xl p-6 bg-cyber-surface2 border border-cyber-accent/40 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setSelectedStage(null)}
              aria-label="Close stage details"
              className="absolute top-4 right-4 p-1.5 rounded-lg border border-cyber-border text-cyber-muted hover:text-white hover:bg-white/5 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cyber-accent/15 border border-cyber-accent/30 flex items-center justify-center text-cyber-accent">
                  <selectedStage.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyber-accent/15 text-cyber-accent border border-cyber-accent/30">
                      STAGE 0{selectedStage.stepNumber} SPECIFICATION
                    </span>
                    <span className="text-xs font-mono text-cyber-muted">
                      {selectedStage.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mt-1">{selectedStage.name}</h4>
                </div>
              </div>

              {/* Deep-Dive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-lg bg-black/40 border border-cyber-border space-y-1.5">
                  <span className="font-mono text-cyber-accent font-semibold flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    Engineering Challenge:
                  </span>
                  <p className="text-cyber-secondary leading-relaxed">
                    {selectedStage.deepDive.problemStatement}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-black/40 border border-cyber-border space-y-1.5">
                  <span className="font-mono text-cyber-cyan font-semibold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Architectural Solution:
                  </span>
                  <p className="text-cyber-secondary leading-relaxed">
                    {selectedStage.deepDive.architectureSolution}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-black/40 border border-cyber-border space-y-1.5">
                  <span className="font-mono text-cyber-lavender font-semibold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    Key Tradeoffs Evaluated:
                  </span>
                  <p className="text-cyber-secondary leading-relaxed">
                    {selectedStage.deepDive.tradeoffs}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-black/40 border border-cyber-border space-y-1.5">
                  <span className="font-mono text-cyber-green font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Measurable Outcome:
                  </span>
                  <p className="text-cyber-secondary leading-relaxed">
                    {selectedStage.deepDive.productionImpact}
                  </p>
                </div>
              </div>

              {/* Technologies & Metrics row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-cyber-border">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyber-muted">Stack:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStage.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-cyber-surface2 text-cyber-secondary border border-cyber-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {selectedStage.metrics.map((m) => (
                    <div key={m.label} className="text-right font-mono text-xs">
                      <span className="text-cyber-muted text-[10px] block">{m.label}</span>
                      <span className="text-white font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SystemMetricsVisualizer;
