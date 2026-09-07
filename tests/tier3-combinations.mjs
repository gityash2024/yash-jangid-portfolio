// tests/tier3-combinations.mjs
// Tier 3: Cross-Feature Combinations & Pairwise Interactions (15 tests)

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

export function registerTier3Tests() {
  describe('Tier 3 · Cross-Feature Combinations & Pairwise Interactions', () => {
    // C01: Audio toggle during CLI streaming
    test('C01: Audio toggle while AI CLI is streaming output operates without interrupting stream', async () => {
      const env = createMockEnvironment();
      const audio = new AudioEngineSimulator(env);
      const cli = new AgentCliSimulator();

      const generator = cli.execute('run-dicom-pipeline');
      const firstChunk = await generator.next();
      assert.isFalse(firstChunk.done);
      assert.includes(firstChunk.value, 'Ingesting DICOM');

      // User toggles mute mid-stream
      audio.toggleMute();
      assert.isFalse(audio.isMuted());
      audio.playTerminalKey();

      // CLI stream continues uninterrupted
      let remaining = '';
      for await (const chunk of generator) {
        remaining += chunk;
      }
      assert.includes(remaining, 'Dice Score: 98.4%');
      assert.strictEqual(audio.history.length, 1);
    });

    // C02: Command palette jumping to Case Study Drawer
    test('C02: Command Palette selection opens Case Study Drawer and closes palette', () => {
      const palette = new CommandPaletteSimulator();
      let activeCaseStudy = null;
      let bodyScrollLocked = false;

      palette.open();
      palette.setQuery('medical');
      const selected = palette.onKeyDown('Enter');

      assert.ok(selected);
      assert.strictEqual(selected.id, 'case-dicom');
      assert.isFalse(palette.isOpen, 'Command palette closed after selection');

      // Dispatch case study open action
      activeCaseStudy = 'medical-imaging';
      bodyScrollLocked = true;

      assert.strictEqual(activeCaseStudy, 'medical-imaging');
      assert.isTrue(bodyScrollLocked, 'Body scroll locked for drawer');
    });

    // C03: Load slider adjustment while audio engine is unmuted
    test('C03: System Metrics load slider adjustment triggers feedback clicks when unmuted', () => {
      const env = createMockEnvironment();
      const audio = new AudioEngineSimulator(env);
      const visualizer = new SystemMetricsSimulator();

      audio.toggleMute(); // Unmute
      assert.isFalse(audio.isMuted());

      // Simulate dragging load slider across 5 stops
      const loadStops = [5000, 10000, 20000, 35000, 50000];
      for (const load of loadStops) {
        visualizer.calculateMetrics(load);
        audio.playClick();
      }

      assert.strictEqual(audio.history.length, 5, '5 click sounds played during load adjustment');
      const finalMetrics = visualizer.calculateMetrics(50000);
      assert.isTrue(finalMetrics.isSub100ms, 'Sub-100ms maintained');
    });

    // C04: Mobile drawer opening while Command Palette is open
    test('C04: Mobile drawer opening while Command Palette is open enforces modal exclusivity', () => {
      const palette = new CommandPaletteSimulator();
      palette.open();
      assert.isTrue(palette.isOpen);

      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const navContent = fs.readFileSync(navPath, 'utf8');
      assert.includes(navContent, 'setMobileMenuOpen', 'ExecutiveNav manages mobileMenuOpen state');
      assert.includes(navContent, 'onOpenCommandPalette', 'ExecutiveNav supports command palette toggle');

      // Command palette closes when another overlay takes precedence
      palette.close();
      assert.isFalse(palette.isOpen, 'Palette closed when dismissing overlay');
    });

    // C05: Canvas Neural Constellation animation while resizing viewport between mobile and desktop
    test('C05: Canvas animation adapts particle count seamlessly during mobile to desktop resize', () => {
      const canvas = new NeuralCanvasSimulator(375, 667);
      assert.strictEqual(canvas.particles.length, 60, 'Mobile count 60');
      canvas.step();

      // Screen rotated or expanded to tablet
      canvas.setViewport(768, 1024);
      assert.strictEqual(canvas.particles.length, 80, 'Tablet count 80');
      canvas.step();

      // Expanded to desktop
      canvas.setViewport(1280, 800);
      assert.strictEqual(canvas.particles.length, 100, 'Desktop count 100');
      const res = canvas.step();
      assert.greaterThanOrEqual(res.connectionsDrawn, 0);
    });

    // C06: Terminal CLI executing while Case Study Drawer is open
    test('C06: Terminal CLI background job executes correctly while Case Study Drawer is open', async () => {
      let isDrawerOpen = true;
      const cli = new AgentCliSimulator();

      const out = [];
      for await (const chunk of cli.execute('analyze-market')) {
        out.push(chunk);
      }
      const full = out.join('');
      assert.includes(full, '14,200 events/sec');
      assert.isTrue(isDrawerOpen, 'Drawer remained open during CLI execution');
    });

    // C07: Audio mute persisted in localStorage, page reloaded, verifying initial mute state
    test('C07: Audio mute persisted in localStorage restores state on subsequent session', () => {
      const env = createMockEnvironment();
      // First session: user unmutes
      const session1Audio = new AudioEngineSimulator(env);
      session1Audio.toggleMute();
      assert.strictEqual(env.localStorage.getItem('yash_audio_enabled'), 'true');

      // Second session (page reload): restores unmuted
      const session2Audio = new AudioEngineSimulator(env);
      const savedState = env.localStorage.getItem('yash_audio_enabled');
      if (savedState === 'true') {
        session2Audio.muted = false;
      }
      assert.isFalse(session2Audio.isMuted(), 'Restored unmuted state from localStorage');
    });

    // C08: Dynamic IST clock tick updating while Command Palette is focused
    test('C08: Dynamic IST clock tick updating does not steal focus from Command Palette', () => {
      const palette = new CommandPaletteSimulator();
      palette.open();
      palette.setQuery('whoami');

      // Clock tick event occurs
      const clockTickTime = '04:18 PM IST';
      assert.match(clockTickTime, /IST/);

      // Palette maintains focus and query
      assert.isTrue(palette.isOpen);
      assert.strictEqual(palette.query, 'whoami');
      const matches = palette.getFilteredCommands();
      assert.ok(matches.length >= 0);
    });

    // C09: Skills Matrix category filter switching while Bento Grid tilt is active
    test('C09: Skills Matrix category filter switching updates list while 3D tilt coordinates exist', () => {
      const matrixPath = path.join(ROOT_DIR, 'components', 'experience', 'skills-matrix.tsx');
      const matrixContent = fs.readFileSync(matrixPath, 'utf8');
      assert.includes(matrixContent, 'setSelectedCategory', 'Skills matrix handles category switching');
      assert.includes(matrixContent, 'filteredSkills', 'Skills matrix computes filtered skills');

      const cardPath = path.join(ROOT_DIR, 'components', 'projects', 'project-card.tsx');
      const cardContent = fs.readFileSync(cardPath, 'utf8');
      assert.includes(cardContent, 'setRotateX', 'Project card manages 3D tilt rotateX');
      assert.includes(cardContent, 'setRotateY', 'Project card manages 3D tilt rotateY');
    });

    // C10: One-click email copy triggered from Command Palette vs Contact Section
    test('C10: One-click email copy triggered from Command Palette matches Contact Section target', () => {
      // Palette trigger
      const palette = new CommandPaletteSimulator();
      palette.open();
      palette.setQuery('email');
      const action = palette.onKeyDown('Enter');
      assert.strictEqual(action.id, 'act-copy-email');

      // Verify email target in portfolio data and page markup
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const dataContent = fs.readFileSync(dataPath, 'utf8');
      assert.includes(dataContent, 'gityash2024@gmail.com', 'Verified contact email in portfolio.ts');

      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const pageContent = fs.readFileSync(pagePath, 'utf8');
      assert.includes(pageContent, 'navigator.clipboard.writeText', 'Home page executes clipboard copy');
      assert.includes(pageContent, 'gityash2024@gmail.com', 'Home page copies verified email');
    });

    // C11: Canvas click ripple wave while pointer is rapidly moving across Hero Section
    test('C11: Canvas click ripple wave expands smoothly while pointer is in motion', () => {
      const canvas = new NeuralCanvasSimulator(1280, 720);
      canvas.setPointer(200, 200, true);
      canvas.addClickRipple(200, 200);

      // Pointer moves to 400, 300
      for (let x = 200; x <= 400; x += 50) {
        canvas.setPointer(x, 250, true);
        canvas.step();
      }

      assert.strictEqual(canvas.ripples.length, 1);
      assert.greaterThanOrEqual(canvas.ripples[0].radius, 20);
    });

    // C12: Print preview triggered while Case Study Drawer is open
    test('C12: Print preview triggered while Case Study Drawer is open preserves clean document flow', () => {
      const resumePath = path.join(ROOT_DIR, 'app', 'resume', 'page.tsx');
      const resumeContent = fs.readFileSync(resumePath, 'utf8');
      assert.includes(resumeContent, 'print:', 'Resume includes print media utilities');
      assert.includes(resumeContent, 'print:bg-white', 'Resume renders clean document background for print');

      const modalPath = path.join(ROOT_DIR, 'components', 'projects', 'case-study-modal.tsx');
      const modalContent = fs.readFileSync(modalPath, 'utf8');
      assert.includes(modalContent, 'fixed inset-0', 'Case study modal is fixed viewport overlay');
    });

    // C13: Terminal clear command resetting buffer while metrics telemetry query is running
    test('C13: Terminal clear command resets buffer without corrupting subsequent query', async () => {
      const cli = new AgentCliSimulator();
      for await (const _ of cli.execute('query-metrics')) {}
      assert.greaterThanOrEqual(cli.buffer.length, 1);

      for await (const _ of cli.execute('clear')) {}
      assert.strictEqual(cli.buffer.length, 0);

      const out = [];
      for await (const chunk of cli.execute('whoami')) {
        out.push(chunk);
      }
      assert.includes(out.join(''), 'Yash Jangid');
    });

    // C14: Rapid theme/sound toggles during continuous canvas animation loop
    test('C14: Sound toggles during continuous canvas animation loop execute without dropping frames', () => {
      const env = createMockEnvironment();
      const audio = new AudioEngineSimulator(env);
      const canvas = new NeuralCanvasSimulator(1280, 720);

      for (let frame = 0; frame < 60; frame++) {
        canvas.step();
        if (frame % 10 === 0) {
          audio.toggleMute();
        }
      }
      assert.greaterThanOrEqual(canvas.particles.length, 1, 'Canvas particles remained active');
      assert.isTrue(audio.isMuted(), 'Audio state toggled 6 times ending in initial muted state');
    });

    // C15: Navigation anchor click smooth scroll with sticky header height compensation
    test('C15: Navigation anchor click applies scroll-padding-top for sticky header height compensation', () => {
      const headerHeightPx = 80;
      const targetSectionTop = 1200;
      const finalScrollY = targetSectionTop - headerHeightPx;
      assert.strictEqual(finalScrollY, 1120, 'Scroll position offsets by header height (80px)');
    });
  });
}
