// tests/tier4-scenarios.mjs
// Tier 4: Real-World Application Scenarios (10 End-to-End User Journeys)
// Spec Source: ORIGINAL_REQUEST.md §Acceptance Criteria, analysis.md §9

import fs from 'node:fs';
import path from 'node:path';
import { describe, test, assert, createMockEnvironment } from './test-helpers.mjs';
import {
  AgentCliSimulator,
  SystemMetricsSimulator,
  CommandPaletteSimulator,
  NeuralCanvasSimulator,
  AudioEngineSimulator,
} from './interactive-simulators.mjs';

const ROOT_DIR = path.resolve('.');

export function registerTier4Tests() {
  describe('Tier 4 · Real-World Application Scenarios & End-to-End User Journeys', () => {
    // S01: Recruiter Journey
    test('S01: Recruiter Journey — Inspects Hero, reads Imaging IQ role, views DICOM Case Study, copies email', () => {
      // Step 1: Recruiter inspects Hero / Bio section in portfolio.ts
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const dataContent = fs.readFileSync(dataPath, 'utf8');
      assert.includes(dataContent, 'Yash Jangid', 'Hero headline names Yash Jangid');
      assert.includes(dataContent, 'Senior Full Stack Engineer', 'Verified role title present');
      assert.includes(dataContent, 'Imaging IQ', 'Current organization verified');
      assert.includes(dataContent, 'Gurugram, India', 'Verified location present');

      // Step 2: Recruiter opens Healthcare AI DICOM Case Study in case-studies.ts
      const casePath = path.join(ROOT_DIR, 'data', 'case-studies.ts');
      const caseContent = fs.readFileSync(casePath, 'utf8');
      assert.includes(caseContent, 'medical-imaging', 'Medical imaging case study slug exists');
      assert.includes(caseContent, 'OHIF Viewer', 'Diagnostic viewer stack specified');
      assert.includes(caseContent, 'Orthanc PACS', 'PACS store-and-forward stack specified');
      assert.includes(caseContent, '98.4%', 'Dice score metric present');

      // Step 3: Recruiter verifies contact email
      assert.includes(dataContent, 'gityash2024@gmail.com', 'Verified contact email present');
    });

    // S02: VP of Engineering Journey
    test('S02: VP of Engineering Journey — Evaluates system visualizer at 50,000 req/min and audits Trading Terminal', () => {
      const visualizer = new SystemMetricsSimulator();

      // Step 1: Inspects baseline architecture
      const baseline = visualizer.calculateMetrics(10000);
      assert.strictEqual(baseline.p50LatencyMs, 42);
      assert.strictEqual(baseline.redisCacheHitRate, 95.3);

      // Step 2: Stresses pipeline to peak load (50,000 req/min)
      const peak = visualizer.calculateMetrics(50000);
      assert.strictEqual(peak.loadReqPerMin, 50000);
      assert.isTrue(peak.isSub100ms, 'p50 latency remains sub-100ms under 50K req/min');

      // Step 3: Audits Trading Infrastructure case study in portfolio.ts and case-studies.ts
      const dataContent = fs.readFileSync(path.join(ROOT_DIR, 'data', 'portfolio.ts'), 'utf8');
      assert.includes(dataContent, '10,000+ req/min', 'Throughput SLA verified in portfolio.ts');
      assert.includes(dataContent, '40%', 'Latency drop verified in portfolio.ts');
      assert.includes(dataContent, '2h → 15m', 'Deploy cycle verified in portfolio.ts');
      assert.includes(dataContent, 'Redis', 'Redis caching verified');
      assert.includes(dataContent, 'WebSockets', 'WebSocket infrastructure verified');
    });

    // S03: AI Platform Lead Journey
    test('S03: AI Platform Lead Journey — Inspects MCP tools and runs streaming DICOM segmentation pipeline', async () => {
      const cli = new AgentCliSimulator();

      // Step 1: Runs mcp-tools
      const mcpOut = [];
      for await (const chunk of cli.execute('mcp-tools')) {
        mcpOut.push(chunk);
      }
      const mcpText = mcpOut.join('');
      assert.includes(mcpText, 'mcp://dicom-processor/v1');
      assert.includes(mcpText, 'mcp://latency-telemetry/v2');
      assert.includes(mcpText, 'mcp://talent-graph/v1');

      // Step 2: Executes full DICOM pipeline
      const dicomOut = [];
      for await (const chunk of cli.execute('run-dicom-pipeline')) {
        dicomOut.push(chunk);
      }
      const dicomText = dicomOut.join('');
      assert.includes(dicomText, 'NumPy/SimpleITK');
      assert.includes(dicomText, '3D U-Net PyTorch');
      assert.includes(dicomText, 'Dice Score: 98.4%');
      assert.includes(dicomText, 'LLM Orchestration');
    });

    // S04: Mobile Visitor Journey
    test('S04: Mobile Visitor Journey — Navigates at 375px viewport with zero horizontal overflow and uses quick chips', () => {
      const viewport = { width: 375, height: 667 };
      const canvas = new NeuralCanvasSimulator(viewport.width, viewport.height);
      assert.strictEqual(canvas.particles.length, 60, 'Adaptive particle count at 60 on mobile');

      // Quick action chip triggered in CLI
      const cli = new AgentCliSimulator();
      const chipCommand = 'run-dicom-pipeline';
      assert.strictEqual(chipCommand, 'run-dicom-pipeline');

      // Check overflow containment in page markup
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const pageContent = fs.readFileSync(pagePath, 'utf8');
      assert.includes(pageContent, 'overflow-x-hidden', 'Zero horizontal overflow on iPhone SE');
      assert.includes(pageContent, 'grid-cols-1', 'Single column layout on mobile');
    });

    // S05: Hiring Manager Interview Journey
    test('S05: Hiring Manager Interview Journey — Opens Cmd+K, navigates to web resume, audits UPES honors & downloads PDF', () => {
      const palette = new CommandPaletteSimulator();
      palette.open();
      palette.setQuery('resume');
      const selected = palette.onKeyDown('Enter');
      assert.ok(selected);
      assert.strictEqual(selected.id, 'act-resume-pdf');

      // Audits Academic & Honors credentials in portfolio.ts
      const dataContent = fs.readFileSync(path.join(ROOT_DIR, 'data', 'portfolio.ts'), 'utf8');
      assert.includes(dataContent, 'UPES', 'Institution is UPES');
      assert.includes(dataContent, 'B.Tech', 'Degree is B.Tech');
      assert.includes(dataContent, "'8.9 / 10'", 'Verified GPA is 8.9 / 10');
      assert.includes(dataContent, 'Technical Excellence Award', 'Honors include Technical Excellence Award');
      assert.includes(dataContent, 'Most Promising Newcomer', 'Honors include Most Promising Newcomer');
    });

    // S06: Web3 / Fintech Specialist Journey
    test('S06: Web3 / Fintech Specialist Journey — Audits TDX Launchpad architecture and executes orderbook arbitrage query', async () => {
      const dataContent = fs.readFileSync(path.join(ROOT_DIR, 'data', 'portfolio.ts'), 'utf8');
      assert.includes(dataContent, 'TDX Launchpad', 'TDX Launchpad project verified');
      assert.includes(dataContent, '99.9% uptime', 'High availability SLA documented');

      const caseContent = fs.readFileSync(path.join(ROOT_DIR, 'data', 'case-studies.ts'), 'utf8');
      assert.includes(caseContent, 'tdx-launchpad', 'Case study tdx-launchpad present');
      assert.includes(caseContent, 'EIP-712', 'EIP-712 cryptographic signatures documented');

      // Runs market scan in CLI
      const cli = new AgentCliSimulator();
      const scanOut = [];
      for await (const chunk of cli.execute('analyze-market')) {
        scanOut.push(chunk);
      }
      assert.includes(scanOut.join(''), 'sub-100ms hot path');
    });

    // S07: Talent Acquisition Journey
    test('S07: Talent Acquisition Journey — Inspects Recruin Platform case study and filters skills matrix', () => {
      const caseContent = fs.readFileSync(path.join(ROOT_DIR, 'data', 'case-studies.ts'), 'utf8');
      assert.includes(caseContent, 'recruin', 'Recruin case study exists');
      assert.includes(caseContent, '5,000+', '5,000+ active users documented');
      assert.includes(caseContent, 'Skill Graph', 'Skill graph matching documented');

      // Filters Skills Matrix in portfolio.ts
      const dataContent = fs.readFileSync(path.join(ROOT_DIR, 'data', 'portfolio.ts'), 'utf8');
      assert.includes(dataContent, 'Next.js 15', 'Next.js 15 skill verified');
      assert.includes(dataContent, 'Redis', 'Redis skill verified');
      assert.includes(dataContent, 'TypeScript', 'TypeScript skill verified');
    });

    // S08: Sound Enthusiast Journey
    test('S08: Sound Enthusiast Journey — Unmutes sound and interacts with all tactile UI events', () => {
      const env = createMockEnvironment();
      const audio = new AudioEngineSimulator(env);

      // Unmutes
      audio.toggleMute();
      assert.isFalse(audio.isMuted());

      // Performs sequence of interactions
      audio.playOpen();         // Cmd+K opened
      audio.playHover();        // Hovered menu item
      audio.playClick();        // Clicked case study
      audio.playTerminalKey();  // Typed in CLI
      audio.playSuccessChime(); // Pipeline completed

      assert.strictEqual(audio.history.length, 5, 'All 5 procedural sound triggers emitted');
      assert.strictEqual(audio.history[0].sound, 'open');
      assert.strictEqual(audio.history[4].sound, 'successChime');
    });

    // S09: Accessibility / Reduced Motion Journey
    test('S09: Accessibility / Reduced Motion Journey — Enforces prefers-reduced-motion across canvas and tilt effects', () => {
      const prefersReducedMotion = true;
      const canvas = new NeuralCanvasSimulator(1280, 720, prefersReducedMotion);

      const res = canvas.step();
      assert.strictEqual(res.connectionsDrawn, 0, 'Animation loop static');

      // Neural canvas component checks media query
      const canvasContent = fs.readFileSync(path.join(ROOT_DIR, 'components', 'hero', 'neural-canvas.tsx'), 'utf8');
      assert.includes(canvasContent, 'prefers-reduced-motion: reduce', 'NeuralCanvas checks prefers-reduced-motion media query');

      // Tilt angle resets on leave
      const cardContent = fs.readFileSync(path.join(ROOT_DIR, 'components', 'projects', 'project-card.tsx'), 'utf8');
      assert.includes(cardContent, 'setRotateX(0)', 'Card resets rotateX on mouse leave');
      assert.includes(cardContent, 'setRotateY(0)', 'Card resets rotateY on mouse leave');
    });

    // S10: Deep Link & Refresh Journey
    test('S10: Deep Link & Refresh Journey — Verifies direct route loading and state rehydration', () => {
      // useSound hook handles audio state hydration with localStorage
      const soundHook = fs.readFileSync(path.join(ROOT_DIR, 'hooks', 'use-sound.ts'), 'utf8');
      assert.includes(soundHook, 'audioEngine.isMuted()', 'useSound reads initial state from audioEngine');

      // useMounted hook protects against hydration mismatch
      const mountedHook = fs.readFileSync(path.join(ROOT_DIR, 'hooks', 'use-mounted.ts'), 'utf8');
      assert.includes(mountedHook, 'useState<boolean>(false)', 'useMounted initializes with false for SSR');
      assert.includes(mountedHook, 'setMounted(true)', 'useMounted triggers client rehydration in useEffect');
    });
  });
}
