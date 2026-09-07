// tests/interactive-simulators.mjs
// Authoritative Opaque-Box Interactive Behavioral Engines
// Spec Source: ORIGINAL_REQUEST.md §R3, PROJECT.md §Feature Inventory, analysis.md §5

import { createMockEnvironment } from './test-helpers.mjs';

// ============================================================================
// 1. AI Agent Playground & CLI Simulator
// ============================================================================
export class AgentCliSimulator {
  constructor() {
    this.buffer = [];
    this.history = [];
    this.isExecuting = false;
    this.registeredCommands = new Map([
      ['help', this.handleHelp.bind(this)],
      ['run-dicom-pipeline', this.handleRunDicomPipeline.bind(this)],
      ['query-metrics', this.handleQueryMetrics.bind(this)],
      ['analyze-market', this.handleAnalyzeMarket.bind(this)],
      ['mcp-tools', this.handleMcpTools.bind(this)],
      ['whoami', this.handleWhoami.bind(this)],
      ['clear', this.handleClear.bind(this)],
    ]);
  }

  // Levenshtein distance for fuzzy matching
  static levenshtein(a, b) {
    const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }
    return dp[a.length][b.length];
  }

  suggestCommand(inputCmd) {
    let closest = null;
    let minDistance = Infinity;
    const clean = inputCmd.toLowerCase().trim();
    for (const cmd of this.registeredCommands.keys()) {
      if (cmd.startsWith(clean) || clean.startsWith(cmd.slice(0, 4)) || cmd.includes(clean)) {
        return cmd;
      }
      const dist = AgentCliSimulator.levenshtein(clean, cmd);
      if (dist < minDistance && dist <= 3) {
        minDistance = dist;
        closest = cmd;
      }
    }
    return closest;
  }

  async *execute(input) {
    const trimmed = (input || '').trim();
    if (!trimmed) {
      yield 'agent@yash-platform:~$ ';
      return;
    }

    this.history.push(trimmed);
    this.isExecuting = true;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const handler = this.registeredCommands.get(cmd);
    if (handler) {
      for await (const chunk of handler(args)) {
        if (chunk === '__CLEAR_BUFFER__') {
          this.buffer = [];
        } else {
          this.buffer.push(chunk);
        }
        yield chunk;
      }
    } else {
      const suggestion = this.suggestCommand(cmd);
      let errMsg = `bash: command not found: '${cmd}'. Type 'help' to see available tools.`;
      if (suggestion) {
        errMsg += `\nDid you mean '${suggestion}'?`;
      }
      this.buffer.push(errMsg);
      yield errMsg;
    }

    this.isExecuting = false;
  }

  async *handleHelp() {
    yield `Yash Jangid AI Platform Runtime — Available Commands:
  • help                : Display available command tool registry
  • run-dicom-pipeline  : Execute 4-stage DICOM/NIfTI tumor segmentation & LLM summary
  • query-metrics       : Fetch real-time system telemetry and latency benchmarks
  • analyze-market      : Run low-latency WebSocket order-book arbitrage scan
  • mcp-tools           : Inspect registered Model Context Protocol server tools
  • whoami              : Display executive engineer identity credentials
  • clear               : Clear terminal buffer`;
  }

  async *handleRunDicomPipeline(args) {
    yield '[1/4] Ingesting DICOM series (192 slices, 512x512) via Orthanc PACS... [DONE in 120ms]\n';
    yield '[2/4] Normalizing voxel spacing & Hounsfield Units via NumPy/SimpleITK... [DONE in 45ms]\n';
    yield '[3/4] Executing 3D U-Net PyTorch inference model (Ensemble v4)... [DONE in 310ms]\n';
    yield '[4/4] Extracting segmentation mask: Tumor volume: 14.8 cm³, Dice Score: 98.4%\n';
    yield '>> Clinical Summary generated via LLM Orchestration agent.\nPipeline completed with 0 errors.';
  }

  async *handleQueryMetrics() {
    yield `------------------------------------------------------------
TELEMETRY SNAPSHOT · GURUGRAM / AWS AP-SOUTH-1
------------------------------------------------------------
Active Users: 10,482 concurrent
API Throughput: 14,820 req/min (Peak: 22,000 req/min)
Server Latency: 42ms p50 | 88ms p99 (-40% vs baseline)
CI/CD Deployment: 14m 42s (Automated Docker + GH Actions)
System Uptime: 99.94% (Last 365 days)
Redis Hit Rate: 94.2%
------------------------------------------------------------`;
  }

  async *handleAnalyzeMarket() {
    yield `[CONNECT] Subscribed to WebSocket feeds (Binance, Bybit, Uniswap v3)...
[SYNC] Order book synchronized at 14,200 events/sec.
[SPREAD] Calculated spread: 0.042% | Routing order across Liquidity Pool 4...
[EXECUTION] Order executed in 84ms via sub-100ms hot path.
Arbitrage strategy status: ACTIVE.`;
  }

  async *handleMcpTools() {
    yield `Registered Model Context Protocol (MCP) Server Endpoints:
  1. mcp://dicom-processor/v1   - Ingestion and DICOM metadata parser
  2. mcp://latency-telemetry/v2  - Real-time metrics collector
  3. mcp://talent-graph/v1       - Candidate skill-graph semantic matcher
  4. mcp://web3-liquidity/v1     - Solana/EVM liquidity pool watcher`;
  }

  async *handleWhoami() {
    yield 'Yash Jangid — Senior Full Stack Engineer & AI Platform Developer (5 years experience, Gurugram, India)';
  }

  async *handleClear() {
    this.buffer = [];
    yield '__CLEAR_BUFFER__';
  }
}

// ============================================================================
// 2. Live System Metrics & Architecture Visualizer Simulator
// ============================================================================
export class SystemMetricsSimulator {
  constructor() {
    this.minLoad = 1000;
    this.maxLoad = 50000;
    this.stages = [
      {
        id: 'ingest',
        title: 'Stage 1: INGESTION & GATEWAY',
        tech: ['Nginx', 'Next.js API Routes', 'Express Gateway', 'WebSockets'],
        metrics: '10,000+ API requests/min throughput, rate-limiting, JWT authentication',
      },
      {
        id: 'process',
        title: 'Stage 2: PROCESSING & CACHING',
        tech: ['Node.js microservices', 'Redis distributed caching', 'RabbitMQ/Kafka'],
        metrics: 'Sub-100ms response paths, 40% server latency reduction, 94%+ cache hit ratio',
      },
      {
        id: 'ai',
        title: 'Stage 3: AI ORCHESTRATION & AGENTS',
        tech: ['LLM Orchestration', 'Model Context Protocol (MCP)', 'PyTorch 3D U-Net', 'Orthanc PACS'],
        metrics: 'Deterministic structured outputs, streaming tool execution, human-in-the-loop review',
      },
      {
        id: 'delivery',
        title: 'Stage 4: DELIVERY & PRODUCT',
        tech: ['React 19', 'OHIF Viewer', 'Redux Toolkit', 'Web3.js', 'Docker', 'GitHub Actions'],
        metrics: '10,000+ active users, 99.9% uptime, 15-minute CI/CD deployment cycle',
      },
    ];
    this.activeStageIndex = 0;
  }

  clampLoad(loadReqPerMin) {
    const num = typeof loadReqPerMin === 'number' && !isNaN(loadReqPerMin) ? loadReqPerMin : 10000;
    return Math.min(Math.max(num, this.minLoad), this.maxLoad);
  }

  calculateMetrics(loadReqPerMin) {
    const load = this.clampLoad(loadReqPerMin);
    // Baseline: 10,000 req/min -> p50 = 42ms, p99 = 88ms, Redis hit = 94.2%
    // Even at 50,000 req/min, Redis absorption keeps p50 sub-100ms
    const p50LatencyMs = Math.round(35 + (load / 10000) * 7);
    const p99LatencyMs = Math.round(p50LatencyMs * 2.1);
    const activeUsers = Math.round(load * 0.707);
    const redisCacheHitRate = parseFloat((Math.max(91.0, 96.0 - (load / 50000) * 3.5)).toFixed(1));
    const dataPacketVelocity = parseFloat(((load / 10000) * 1.5).toFixed(2));
    const uptime = 99.94;

    return {
      loadReqPerMin: load,
      p50LatencyMs,
      p99LatencyMs,
      activeUsers,
      redisCacheHitRate,
      dataPacketVelocity,
      uptime,
      isSub100ms: p50LatencyMs < 100,
    };
  }

  setActiveStage(index) {
    if (index >= 0 && index < this.stages.length) {
      this.activeStageIndex = index;
      return this.stages[index];
    }
    throw new Error(`Invalid stage index: ${index}`);
  }

  getActiveStage() {
    return this.stages[this.activeStageIndex];
  }
}

// ============================================================================
// 3. Global Command Palette (`Cmd+K`) Simulator
// ============================================================================
export class CommandPaletteSimulator {
  constructor() {
    this.isOpen = false;
    this.query = '';
    this.selectedIndex = 0;
    this.commands = [
      // Navigation
      { id: 'nav-hero', category: 'Navigation', title: 'Jump to Hero', desc: 'Scroll to portfolio top', keywords: ['home', 'hero', 'top'] },
      { id: 'nav-work', category: 'Navigation', title: 'Jump to Selected Work', desc: 'Explore flagship engineering projects', keywords: ['work', 'projects', 'bento'] },
      { id: 'nav-arch', category: 'Navigation', title: 'Jump to Architecture Visualizer', desc: 'Inspect live 4-stage pipeline telemetry', keywords: ['system', 'pipeline', 'metrics'] },
      { id: 'nav-cli', category: 'Navigation', title: 'Jump to AI Terminal Playground', desc: 'Execute simulated agentic tools', keywords: ['cli', 'terminal', 'agent', 'dicom'] },
      { id: 'nav-exp', category: 'Navigation', title: 'Jump to Experience & Timeline', desc: 'Career history at Imaging IQ & ITH Technologies', keywords: ['experience', 'timeline', 'career', 'jobs'] },
      { id: 'nav-skills', category: 'Navigation', title: 'Jump to Skills Matrix', desc: 'Categorized technical capabilities', keywords: ['skills', 'stack', 'tech', 'languages'] },
      { id: 'nav-contact', category: 'Navigation', title: 'Jump to Contact', desc: 'Direct communication coordinates', keywords: ['contact', 'email', 'reach'] },
      
      // Deep-Dive Case Studies
      { id: 'case-dicom', category: 'Case Studies', title: 'Open Case Study: AI Medical Imaging Pipeline', desc: 'DICOM/NIfTI tumor segmentation & Orthanc PACS', keywords: ['dicom', 'nifti', 'medical', 'imaging', 'orthanc', 'ohif'] },
      { id: 'case-trading', category: 'Case Studies', title: 'Open Case Study: CEX/DEX Strategy Portal', desc: 'Low-latency algorithmic trading infrastructure', keywords: ['trading', 'orderbook', 'crypto', 'arbitrage', 'redis'] },
      { id: 'case-recruin', category: 'Case Studies', title: 'Open Case Study: Recruin Platform', desc: 'AI talent matching & skill graph platform', keywords: ['recruin', 'talent', 'matching', 'graph'] },
      { id: 'case-tdx', category: 'Case Studies', title: 'Open Case Study: TDX Launchpad', desc: 'Web3 token launchpad with smart contracts', keywords: ['tdx', 'launchpad', 'web3', 'token'] },
      
      // Executive Actions
      { id: 'act-resume-pdf', category: 'Actions', title: 'Download Résumé (PDF)', desc: 'Download official executive resume', keywords: ['resume', 'cv', 'pdf', 'download'] },
      { id: 'act-resume-web', category: 'Actions', title: 'View Web Résumé', desc: 'Navigate to printable online resume', keywords: ['resume', 'cv', 'view', 'web'] },
      { id: 'act-copy-email', category: 'Actions', title: 'Copy Contact Email', desc: 'Copy gityash2024@gmail.com to clipboard', keywords: ['email', 'copy', 'contact'] },
      { id: 'act-sound-toggle', category: 'Actions', title: 'Toggle Sound Engine (Mute / Unmute)', desc: 'Switch Web Audio API sound state', keywords: ['sound', 'audio', 'mute', 'volume'] },
      { id: 'act-dicom-run', category: 'Actions', title: 'Run DICOM Pipeline Simulation', desc: 'Launch terminal and run tumor segmentation', keywords: ['dicom', 'pipeline', 'run', 'simulate'] },
    ];
  }

  open() {
    this.isOpen = true;
    this.query = '';
    this.selectedIndex = 0;
  }

  close() {
    this.isOpen = false;
    this.query = '';
    this.selectedIndex = 0;
  }

  setQuery(q) {
    this.query = q || '';
    this.selectedIndex = 0;
    return this.getFilteredCommands();
  }

  getFilteredCommands() {
    if (!this.query.trim()) {
      return [...this.commands];
    }
    const q = this.query.toLowerCase().trim();
    return this.commands.filter(cmd => {
      return (
        cmd.title.toLowerCase().includes(q) ||
        cmd.desc.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q) ||
        cmd.keywords.some(kw => kw.toLowerCase().includes(q))
      );
    }).sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(q);
      const bTitle = b.title.toLowerCase().includes(q);
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      return 0;
    });
  }

  onKeyDown(key) {
    if (!this.isOpen) return null;
    const items = this.getFilteredCommands();
    if (items.length === 0) return null;

    if (key === 'ArrowDown') {
      this.selectedIndex = (this.selectedIndex + 1) % items.length;
      return items[this.selectedIndex];
    } else if (key === 'ArrowUp') {
      this.selectedIndex = (this.selectedIndex - 1 + items.length) % items.length;
      return items[this.selectedIndex];
    } else if (key === 'Enter') {
      const selected = items[this.selectedIndex];
      this.close();
      return selected;
    } else if (key === 'Escape') {
      this.close();
      return null;
    }
    return null;
  }
}

// ============================================================================
// 4. Interactive 3D / Canvas Neural Constellation Hero Simulator
// ============================================================================
export class NeuralCanvasSimulator {
  constructor(width = 1280, height = 720, prefersReducedMotion = false) {
    this.width = width;
    this.height = height;
    this.prefersReducedMotion = prefersReducedMotion;
    this.particles = [];
    this.ripples = [];
    this.pointer = { x: -1000, y: -1000, isOver: false };
    this.connectionThreshold = 120;
    this.pointerInteractionRadius = 140;
    this.init();
  }

  getAdaptiveParticleCount() {
    if (this.width <= 480) return 60; // mobile
    if (this.width <= 768) return 80; // tablet
    if (this.width <= 1440) return 100; // desktop
    return 140; // ultra-wide 1920px+
  }

  init() {
    const count = this.getAdaptiveParticleCount();
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: 1.5 + Math.random() * 1.3,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  setViewport(width, height) {
    this.width = width;
    this.height = height;
    this.init();
  }

  setPointer(x, y, isOver = true) {
    this.pointer.x = x;
    this.pointer.y = y;
    this.pointer.isOver = isOver;
  }

  addClickRipple(x, y) {
    this.ripples.push({
      x,
      y,
      radius: 0,
      maxRadius: 180,
      velocity: 5,
      opacity: 1.0,
    });
  }

  step() {
    if (this.prefersReducedMotion) {
      // In reduced motion mode, maintain static constellation frame
      return { particlesCount: this.particles.length, connectionsDrawn: 0, ripplesActive: 0 };
    }

    // Update particles
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce at boundaries
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Cursor interaction (gentle repulsion/attraction)
      if (this.pointer.isOver) {
        const dx = p.x - this.pointer.x;
        const dy = p.y - this.pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.pointerInteractionRadius && dist > 0) {
          const force = (1 - dist / this.pointerInteractionRadius) * 0.5;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }

      // Ripple interaction
      for (const r of this.ripples) {
        const dx = p.x - r.x;
        const dy = p.y - r.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (Math.abs(dist - r.radius) < 20 && dist > 0) {
          p.x += (dx / dist) * 2;
          p.y += (dy / dist) * 2;
        }
      }
    }

    // Update ripples
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      r.radius += r.velocity;
      r.opacity = Math.max(0, 1 - r.radius / r.maxRadius);
      if (r.radius >= r.maxRadius) {
        this.ripples.splice(i, 1);
      }
    }

    // Calculate connections
    let connectionsDrawn = 0;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= this.connectionThreshold) {
          connectionsDrawn++;
        }
      }
    }

    return {
      particlesCount: this.particles.length,
      connectionsDrawn,
      ripplesActive: this.ripples.length,
    };
  }
}

// ============================================================================
// 5. Procedural Web Audio Engine Simulator
// ============================================================================
export class AudioEngineSimulator {
  constructor(mockEnv) {
    this.env = mockEnv || createMockEnvironment();
    this.ctx = null;
    this.storageKey = 'yash_audio_enabled';
    // Muted by default per specification and browser autoplay policy
    this.muted = true;
    this.history = [];
  }

  ensureContext() {
    if (!this.ctx) {
      this.ctx = new this.env.MockAudioContext();
    }
    return this.ctx;
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    this.env.localStorage.setItem(this.storageKey, String(!this.muted));
    if (!this.muted && this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.muted;
  }

  playClick() {
    if (this.muted) return false;
    const ctx = this.ensureContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    // Descending 1000Hz -> 600Hz over 20ms
    osc.frequency.setValueAtTime(1000);
    osc.frequency.exponentialRampToValueAtTime(600);
    gain.gain.setValueAtTime(0.08);
    gain.gain.exponentialRampToValueAtTime(0.001);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop();
    this.history.push({ sound: 'click', time: Date.now() });
    return true;
  }

  playHover() {
    if (this.muted) return false;
    const ctx = this.ensureContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(350);
    gain.gain.setValueAtTime(0.03);
    gain.gain.exponentialRampToValueAtTime(0.001);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop();
    this.history.push({ sound: 'hover', time: Date.now() });
    return true;
  }

  playTerminalKey() {
    if (this.muted) return false;
    const ctx = this.ensureContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800);
    gain.gain.setValueAtTime(0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop();
    this.history.push({ sound: 'terminalKey', time: Date.now() });
    return true;
  }

  playSuccessChime() {
    if (this.muted) return false;
    const ctx = this.ensureContext();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    // Two-tone chime 523Hz (C5) -> 659Hz (E5)
    osc1.frequency.setValueAtTime(523);
    osc2.frequency.setValueAtTime(659);
    gain.gain.setValueAtTime(0.06);
    this.history.push({ sound: 'successChime', time: Date.now() });
    return true;
  }

  playOpen() {
    if (this.muted) return false;
    const ctx = this.ensureContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(250);
    osc.frequency.exponentialRampToValueAtTime(450);
    gain.gain.setValueAtTime(0.05);
    this.history.push({ sound: 'open', time: Date.now() });
    return true;
  }
}
