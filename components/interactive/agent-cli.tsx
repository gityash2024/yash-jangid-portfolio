'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Cpu,
  CornerDownLeft,
} from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { cn } from '@/lib/utils';

export interface TerminalLogEntry {
  id: string;
  type: 'input' | 'output' | 'success' | 'error' | 'system' | 'table';
  text: string;
  timestamp: string;
}

const QUICK_COMMANDS = [
  { cmd: 'run-dicom-pipeline', label: 'Run DICOM AI' },
  { cmd: 'query-metrics', label: 'Query Metrics' },
  { cmd: 'analyze-market', label: 'Analyze Market' },
  { cmd: 'mcp-tools', label: 'MCP Tools' },
  { cmd: 'whoami', label: 'Whoami' },
  { cmd: 'help', label: 'Help' },
  { cmd: 'clear', label: 'Clear' },
];

const KNOWN_COMMANDS = [
  'help',
  'run-dicom-pipeline',
  'query-metrics',
  'analyze-market',
  'mcp-tools',
  'whoami',
  'experience',
  'skills',
  'clear',
];

function getTimestamp(): string {
  const d = new Date();
  return d.toTimeString().split(' ')[0];
}

// Simple Levenshtein distance for fuzzy command matching
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function findDidYouMean(input: string): string | null {
  const clean = input.trim().toLowerCase();
  let bestMatch: string | null = null;
  let minDistance = 3; // threshold

  for (const cmd of KNOWN_COMMANDS) {
    if (cmd.startsWith(clean) || clean.startsWith(cmd.slice(0, 4)) || cmd.includes(clean)) {
      return cmd;
    }
    const dist = levenshteinDistance(clean, cmd);
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = cmd;
    }
  }
  return bestMatch;
}

export function AgentCLI({ className }: { className?: string }) {
  const { playTerminalKey, playSuccessChime, playErrorBuzz, playClick } = useSound();

  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [logs, setLogs] = useState<TerminalLogEntry[]>([
    {
      id: 'init-1',
      type: 'system',
      text: '⚡ yash-agentic-runtime v2.4.0 [x86_64-node-ts] initialized.',
      timestamp: getTimestamp(),
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Node: Gurugram-Edge-01 (AP-SOUTH-1) · Active Protocols: MCP/1.0, DICOM-Store, RedisPubSub',
      timestamp: getTimestamp(),
    },
    {
      id: 'init-3',
      type: 'output',
      text: "Type 'help' or click quick-action chips below to simulate agentic platform workflows.",
      timestamp: getTimestamp(),
    },
  ]);

  const outputContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [logs, isExecuting]);

  // Focus input when user clicks anywhere in the terminal body
  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const executeCommandAsync = useCallback(
    async (cmdStr: string) => {
      const trimmed = cmdStr.trim();
      if (!trimmed) return;

      const normalized = trimmed.toLowerCase();

      // Add input entry
      const entryId = Math.random().toString(36).substring(2, 9);
      setLogs((prev) => [
        ...prev,
        {
          id: entryId,
          type: 'input',
          text: `agent@yash-platform:~$ ${trimmed}`,
          timestamp: getTimestamp(),
        },
      ]);

      // Add to command history
      setHistory((prev) => [trimmed, ...prev.filter((h) => h !== trimmed)]);
      setHistoryPointer(-1);

      if (normalized === 'clear') {
        setLogs([]);
        playClick();
        return;
      }

      setIsExecuting(true);

      const appendLine = (text: string, type: TerminalLogEntry['type'] = 'output') => {
        setLogs((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            type,
            text,
            timestamp: getTimestamp(),
          },
        ]);
      };

      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      try {
        if (normalized === 'help') {
          await delay(60);
          appendLine('═'.repeat(64), 'system');
          appendLine('⚡ YASH JANGID AGENTIC RUNTIME — COMMAND DIRECTORY', 'system');
          appendLine('═'.repeat(64), 'system');
          appendLine('  run-dicom-pipeline   Simulate 3D UNet tumor detection workflow (Orthanc PACS)');
          appendLine('  query-metrics        Fetch real-time throughput, latency, & uptime telemetry');
          appendLine('  analyze-market       Execute low-latency CEX/DEX arbitrage hot-path scan');
          appendLine('  mcp-tools            Enumerate registered Model Context Protocol endpoints');
          appendLine('  whoami               View principal identity, seniority, and specialization');
          appendLine('  experience           Print verified enterprise engineering track record');
          appendLine('  skills               Display multi-domain AI & Full Stack skills matrix');
          appendLine('  clear                Flush terminal display buffer');
          appendLine('═'.repeat(64), 'system');
          playSuccessChime();
        } else if (normalized.startsWith('run-dicom-pipeline')) {
          appendLine('▶ Initializing clinical imaging agentic workflow...', 'system');
          await delay(90);
          appendLine(
            '[1/4] Ingesting DICOM series (192 slices, 512x512) via Orthanc PACS... [DONE in 120ms]'
          );
          await delay(80);
          appendLine(
            '[2/4] Normalizing voxel spacing & Hounsfield Units via NumPy/SimpleITK... [DONE in 45ms]'
          );
          await delay(90);
          appendLine(
            '[3/4] Executing 3D U-Net PyTorch inference model (Ensemble v4)... [DONE in 310ms]'
          );
          await delay(90);
          appendLine(
            '[4/4] Extracting segmentation mask: Tumor volume: 14.8 cm³, Dice Score: 98.4%',
            'success'
          );
          await delay(70);
          appendLine('>> Clinical Summary generated via LLM Orchestration agent.');
          appendLine('>> OHIF Viewer overlay stream synchronized (OHIF-RT-MASK-2026).');
          appendLine('✓ Pipeline completed with 0 errors in 565ms total.', 'success');
          playSuccessChime();
        } else if (normalized === 'query-metrics') {
          appendLine('Fetching telemetry from cluster monitoring nodes...', 'system');
          await delay(70);
          appendLine('─'.repeat(60), 'system');
          appendLine('TELEMETRY SNAPSHOT · GURUGRAM / AWS AP-SOUTH-1', 'system');
          appendLine('─'.repeat(60), 'system');
          appendLine('  • Active Concurrent Users : 10,482 active');
          appendLine('  • API Throughput          : 14,820 req/min (Peak: 22,000 req/min)');
          appendLine('  • Server Latency          : 42ms p50 | 88ms p99 (-40% via Redis cache)');
          appendLine('  • CI/CD Deployment Cycle  : 14m 42s (Docker + GitHub Actions)');
          appendLine('  • Annual System Uptime    : 99.94% (Zero unbudgeted downtime)');
          appendLine('  • Redis Cache Hit Ratio   : 94.2% (Hot-path order books & DICOM cache)');
          appendLine('─'.repeat(60), 'system');
          appendLine('✓ Telemetry healthy. SLA compliance: 100%.', 'success');
          playSuccessChime();
        } else if (normalized === 'analyze-market') {
          appendLine('Connecting to low-latency WebSocket order-book streams...', 'system');
          await delay(70);
          appendLine('[CONNECT] Subscribed to WebSocket feeds (Binance, Bybit, Uniswap v3)...');
          await delay(80);
          appendLine('[SYNC] Order book synchronized at 14,200 events/sec.');
          await delay(80);
          appendLine(
            '[SPREAD] Calculated cross-exchange spread: 0.042% | Routing order across Liquidity Pool 4...'
          );
          await delay(80);
          appendLine(
            '[EXECUTION] Order executed in 84ms via sub-100ms Redis pub/sub hot path.',
            'success'
          );
          appendLine('✓ Arbitrage strategy status: ACTIVE (0.00% slippage detected).', 'success');
          playSuccessChime();
        } else if (normalized === 'mcp-tools') {
          appendLine('Listing registered Model Context Protocol (MCP) server endpoints:', 'system');
          await delay(60);
          appendLine('  • mcp://dicom-processor/v1     - DICOM metadata parser & volume tensorizer');
          appendLine('  • mcp://latency-telemetry/v2   - Real-time Redis/Kafka metrics collector');
          appendLine('  • mcp://talent-graph/v1        - Candidate skill-graph semantic vector matcher');
          appendLine('  • mcp://web3-liquidity/v1      - Solana & EVM smart contract liquidity pool watcher');
          appendLine('  • mcp://clinical-llm-router/v1 - Deterministic medical imaging report generator');
          appendLine('✓ 5 tools online and responding via JSON-RPC 2.0.', 'success');
          playSuccessChime();
        } else if (normalized === 'whoami') {
          await delay(50);
          appendLine('Yash Jangid — Senior Full Stack Engineer & AI Platform Developer', 'success');
          appendLine('Location: Gurugram, India (Asia/Kolkata IST · UTC+5:30)');
          appendLine('Experience: Nearly 5 years in high-concurrency production systems');
          appendLine('Focus Areas: Healthcare AI (Imaging IQ), FinTech/Web3 (ITH Tech), Agentic Systems');
          appendLine('Education: UPES B.Tech CSE (GPA 8.9/10) · Technical Excellence Award (2023)');
          playSuccessChime();
        } else if (normalized === 'experience') {
          await delay(50);
          appendLine('1. IMAGING IQ (Jan 2026 — Present) | Senior Full Stack Engineer', 'success');
          appendLine('   - Medical imaging pipelines (DICOM/NIfTI), OHIF Viewer, Orthanc PACS, LLM agent workflows.');
          appendLine('2. ITH TECHNOLOGIES (Jul 2022 — Dec 2025) | SDE I & Full Stack Engineer', 'success');
          appendLine('   - 5+ Web3 platforms, 10K+ users, 40% latency drop, 10K req/min trading hot path, 2h->15m CI/CD.');
          playSuccessChime();
        } else if (normalized === 'skills') {
          await delay(50);
          appendLine('• AI & Agentic: LLM Orchestration, MCP, Tool Calling, PyTorch, Cursor, Claude Code', 'output');
          appendLine('• Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Redux', 'output');
          appendLine('• Backend: Node.js, Express, WebSockets, Redis, Kafka, MongoDB, Microservices', 'output');
          appendLine('• Healthcare AI: DICOM, NIfTI, OHIF Viewer, Orthanc PACS, Clinical Pipelines', 'output');
          appendLine('• Cloud & DevOps: Docker, AWS (EC2/S3/Lambda), GitHub Actions, Nginx, CI/CD', 'output');
          playSuccessChime();
        } else {
          await delay(60);
          playErrorBuzz();
          const didYouMean = findDidYouMean(normalized);
          appendLine(
            `bash: command not found: '${trimmed}'.${didYouMean ? ` Did you mean '${didYouMean}'?` : " Type 'help' for available commands."}`,
            'error'
          );
        }
      } finally {
        setIsExecuting(false);
      }
    },
    [playClick, playSuccessChime, playErrorBuzz]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isExecuting) return;
    const cmd = inputVal;
    setInputVal('');
    executeCommandAsync(cmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextPointer = Math.min(historyPointer + 1, history.length - 1);
        setHistoryPointer(nextPointer);
        setInputVal(history[nextPointer]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer > 0) {
        const nextPointer = historyPointer - 1;
        setHistoryPointer(nextPointer);
        setInputVal(history[nextPointer]);
      } else if (historyPointer === 0) {
        setHistoryPointer(-1);
        setInputVal('');
      }
    } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
      // Audio key click on typing
      playTerminalKey();
    }
  };

  const handleChipClick = (cmd: string) => {
    if (isExecuting) return;
    setInputVal('');
    executeCommandAsync(cmd);
  };

  return (
    <div
      className={cn(
        'w-full rounded-2xl border border-cyber-border bg-[#080c14] shadow-2xl overflow-hidden font-mono text-xs flex flex-col',
        className
      )}
      onClick={handleContainerClick}
    >
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0c121d] border-b border-cyber-border select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block" />
          </div>
          <span className="ml-2 text-cyber-muted text-[11px] hidden sm:inline-block">
            yash-agentic-runtime v2.4.0 [bash]
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyber-green/10 text-cyber-green border border-cyber-green/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            ACTIVE_SESSION
          </span>
          <span className="text-cyber-muted hidden md:inline-block">Gurugram-Edge-01</span>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div
        ref={outputContainerRef}
        className="p-4 sm:p-5 overflow-y-auto space-y-2 max-h-[380px] min-h-[260px] scrollbar-thin scrollbar-thumb-cyber-border scrollbar-track-transparent"
      >
        {logs.map((log) => {
          if (log.type === 'input') {
            return (
              <div key={log.id} className="flex items-start gap-2 text-white font-medium">
                <span className="text-cyber-accent select-none">❯</span>
                <span className="break-all">{log.text}</span>
              </div>
            );
          }

          if (log.type === 'system') {
            return (
              <div key={log.id} className="text-cyber-muted text-[11px] leading-relaxed">
                {log.text}
              </div>
            );
          }

          if (log.type === 'success') {
            return (
              <div key={log.id} className="text-cyber-green flex items-start gap-1.5 leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span className="break-words">{log.text}</span>
              </div>
            );
          }

          if (log.type === 'error') {
            return (
              <div key={log.id} className="text-red-400 flex items-start gap-1.5 leading-relaxed">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span className="break-words">{log.text}</span>
              </div>
            );
          }

          return (
            <div key={log.id} className="text-cyber-secondary leading-relaxed pl-5 whitespace-pre-wrap break-words">
              {log.text}
            </div>
          );
        })}

        {isExecuting && (
          <div className="flex items-center gap-2 text-cyber-cyan pl-5 py-1">
            <Cpu className="w-3.5 h-3.5 animate-spin" />
            <span className="animate-pulse">Agent workflow streaming...</span>
          </div>
        )}
      </div>

      {/* Quick Action Suggestion Chips */}
      <div className="px-4 py-2.5 bg-[#0a0f18] border-t border-cyber-border/70 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] text-cyber-muted uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyber-accent" />
          Quick Actions:
        </span>
        {QUICK_COMMANDS.map((chip) => (
          <button
            key={chip.cmd}
            type="button"
            disabled={isExecuting}
            onClick={(e) => {
              e.stopPropagation();
              handleChipClick(chip.cmd);
            }}
            className="shrink-0 px-2.5 py-1 rounded-md bg-cyber-surface2/90 border border-cyber-border text-[11px] text-cyber-secondary hover:text-white hover:border-cyber-accent/40 hover:bg-cyber-surface2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Command Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-4 py-3 bg-[#0a0f19] border-t border-cyber-border"
      >
        <span className="text-cyber-accent text-sm font-bold select-none">agent@yash-platform:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isExecuting}
          placeholder={isExecuting ? 'Awaiting step completion...' : "Type command (e.g. 'run-dicom-pipeline', 'help')..."}
          className="flex-1 bg-transparent text-white placeholder:text-cyber-muted text-xs focus:outline-none font-mono"
          autoCapitalize="none"
          autoComplete="off"
          spellCheck="false"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isExecuting}
          className="px-2.5 py-1 rounded bg-cyber-accent/15 border border-cyber-accent/30 text-cyber-accent hover:bg-cyber-accent hover:text-cyber-dark transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 text-[11px]"
        >
          <span>Run</span>
          <CornerDownLeft className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
}

export default AgentCLI;
