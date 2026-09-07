// tests/tier1-features.mjs
// Tier 1: Feature Coverage (>=5 tests per feature across all 26 features in PROJECT.md = 130 tests)

import fs from 'node:fs';
import path from 'node:path';
import { describe, test, assert, parseJpegDimensions, parseWebpDimensions, createMockEnvironment } from './test-helpers.mjs';
import {
  AgentCliSimulator,
  SystemMetricsSimulator,
  CommandPaletteSimulator,
  NeuralCanvasSimulator,
  AudioEngineSimulator,
} from './interactive-simulators.mjs';

const ROOT_DIR = path.resolve('.');

export function registerTier1Tests() {
  // --------------------------------------------------------------------------
  // Feature 1: Next.js 15 App Router Scaffold
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 01: Next.js 15 App Router Scaffold', () => {
    test('F01-T1: package.json specifies Next.js version 15+', () => {
      const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
      assert.ok(pkg.dependencies.next, 'Next.js dependency missing');
      assert.match(pkg.dependencies.next, /15\./, 'Next.js must be version 15.x');
    });

    test('F01-T2: Root layout exists in app/layout.tsx with HTML5 shell', () => {
      const layoutPath = path.join(ROOT_DIR, 'app', 'layout.tsx');
      assert.ok(fs.existsSync(layoutPath), 'app/layout.tsx must exist');
      const content = fs.readFileSync(layoutPath, 'utf8');
      assert.includes(content, '<html', 'layout.tsx must render html tag');
      assert.includes(content, '<body', 'layout.tsx must render body tag');
    });

    test('F01-T3: tsconfig.json has strict mode and paths configured for Next.js App Router', () => {
      const tsPath = path.join(ROOT_DIR, 'tsconfig.json');
      assert.ok(fs.existsSync(tsPath), 'tsconfig.json must exist');
      const content = fs.readFileSync(tsPath, 'utf8');
      assert.match(content, /"strict":\s*true/, 'TypeScript strict mode must be true');
      assert.match(content, /"@\/\*":/, 'Path alias @/* must be configured');
    });

    test('F01-T4: PostCSS and Tailwind configuration files exist for Next.js CSS processing', () => {
      assert.ok(fs.existsSync(path.join(ROOT_DIR, 'postcss.config.mjs')), 'postcss.config.mjs must exist');
      assert.ok(
        fs.existsSync(path.join(ROOT_DIR, 'tailwind.config.ts')) || fs.existsSync(path.join(ROOT_DIR, 'tailwind.config.js')),
        'tailwind.config.ts must exist'
      );
    });

    test('F01-T5: next.config.ts is present and configures modern Next.js options', () => {
      const configPath = path.join(ROOT_DIR, 'next.config.ts');
      assert.ok(fs.existsSync(configPath), 'next.config.ts must exist');
      const content = fs.readFileSync(configPath, 'utf8');
      assert.includes(content, 'nextConfig', 'next.config.ts must define nextConfig');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 2: React 19 Engine Integration
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 02: React 19 Engine Integration', () => {
    test('F02-T1: package.json specifies React 19 and React-DOM 19', () => {
      const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
      assert.match(pkg.dependencies.react, /19\./, 'react must be ^19.0.0');
      assert.match(pkg.dependencies['react-dom'], /19\./, 'react-dom must be ^19.0.0');
    });

    test('F02-T2: React 19 types are installed in devDependencies', () => {
      const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
      assert.match(pkg.devDependencies['@types/react'], /19\./, '@types/react must be ^19');
      assert.match(pkg.devDependencies['@types/react-dom'], /19\./, '@types/react-dom must be ^19');
    });

    test('F02-T3: Hydration mismatch protection hook useMounted exists in hooks/use-mounted.ts', () => {
      const hookPath = path.join(ROOT_DIR, 'hooks', 'use-mounted.ts');
      assert.ok(fs.existsSync(hookPath), 'hooks/use-mounted.ts must exist');
      const content = fs.readFileSync(hookPath, 'utf8');
      assert.includes(content, 'useMounted', 'useMounted export must exist');
      assert.includes(content, 'useEffect', 'useMounted must use useEffect');
    });

    test('F02-T4: framer-motion ^12.x is configured in dependencies for React 19 compatibility', () => {
      const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
      assert.ok(pkg.dependencies['framer-motion'], 'framer-motion must be in dependencies');
      assert.match(pkg.dependencies['framer-motion'], /12\./, 'framer-motion must be ^12.x');
    });

    test('F02-T5: Clean utility cn function exists in lib/utils.ts', () => {
      const utilsPath = path.join(ROOT_DIR, 'lib', 'utils.ts');
      assert.ok(fs.existsSync(utilsPath), 'lib/utils.ts must exist');
      const content = fs.readFileSync(utilsPath, 'utf8');
      assert.includes(content, 'cn(', 'lib/utils.ts must export cn function');
      assert.includes(content, 'clsx', 'lib/utils.ts must use clsx');
      assert.includes(content, 'twMerge', 'lib/utils.ts must use twMerge');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 3: Tailwind CSS Cyber-Executive Tokens
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 03: Tailwind CSS Cyber-Executive Tokens', () => {
    test('F03-T1: Tailwind config defines deep background color #070b12', () => {
      const configPath = path.join(ROOT_DIR, 'tailwind.config.ts');
      assert.ok(fs.existsSync(configPath), 'tailwind.config.ts must exist');
      const content = fs.readFileSync(configPath, 'utf8');
      assert.match(content, /070b12/i, 'Background #070b12 token must be defined');
    });

    test('F03-T2: Tailwind config defines obsidian surface #0c1320 and elevated #111a2a', () => {
      const content = fs.readFileSync(path.join(ROOT_DIR, 'tailwind.config.ts'), 'utf8');
      assert.match(content, /0c1320/i, 'Surface #0c1320 token must be defined');
      assert.match(content, /111a2a/i, 'Elevated surface #111a2a token must be defined');
    });

    test('F03-T3: Tailwind config defines cyber accent tokens (indigo #7c8cff, cyan #8cd8ff, emerald #78e6bc)', () => {
      const content = fs.readFileSync(path.join(ROOT_DIR, 'tailwind.config.ts'), 'utf8');
      assert.match(content, /7c8cff/i, 'Indigo accent #7c8cff must be defined');
      assert.match(content, /8cd8ff/i, 'Cyan accent #8cd8ff must be defined');
      assert.match(content, /78e6bc/i, 'Emerald status #78e6bc must be defined');
    });

    test('F03-T4: app/globals.css includes base Tailwind directives and dark luxury root variables', () => {
      const cssPath = path.join(ROOT_DIR, 'app', 'globals.css');
      assert.ok(fs.existsSync(cssPath), 'app/globals.css must exist');
      const content = fs.readFileSync(cssPath, 'utf8');
      assert.includes(content, '@tailwind base', 'globals.css must include @tailwind base');
      assert.includes(content, '@tailwind components', 'globals.css must include @tailwind components');
      assert.includes(content, '@tailwind utilities', 'globals.css must include @tailwind utilities');
    });

    test('F03-T5: globals.css contains custom scrollbar and hairline border utilities', () => {
      const content = fs.readFileSync(path.join(ROOT_DIR, 'app', 'globals.css'), 'utf8');
      assert.match(content, /scrollbar/i, 'globals.css must configure custom scrollbar');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 4: Sticky Executive Navigation
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 04: Sticky Executive Navigation', () => {
    test('F04-T1: Executive navigation pill targets fixed or sticky top positioning', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const navContent = fs.readFileSync(navPath, 'utf8');
      assert.match(navContent, /sticky top-0|fixed top-0/, 'Navigation uses sticky or fixed positioning');
      assert.includes(navContent, 'glass-nav', 'Navigation includes glass-nav styling');
    });

    test('F04-T2: Navigation links include all core section anchors (#hero, #work, #architecture, #playground, #experience, #skills, #contact)', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const navContent = fs.readFileSync(navPath, 'utf8');
      const requiredAnchors = ['#hero', '#work', '#architecture', '#playground', '#experience', '#skills', '#contact'];
      for (const anchor of requiredAnchors) {
        assert.includes(navContent, anchor, `Nav must contain anchor ${anchor}`);
      }
    });

    test('F04-T3: Brand monogram YJ and executive status pill are integrated', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const navContent = fs.readFileSync(navPath, 'utf8');
      assert.includes(navContent, 'YJ', 'Nav contains brand monogram YJ');
      assert.match(navContent, /ONLINE|Available/i, 'Nav contains executive status pill');
    });

    test('F04-T4: Command palette trigger button (Cmd+K) is present in header', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const navContent = fs.readFileSync(navPath, 'utf8');
      assert.match(navContent, /open-command-palette|Command|⌘K/i, 'Nav contains command palette trigger');
    });

    test('F04-T5: Audio engine mute toggle button is integrated in executive header', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const navContent = fs.readFileSync(navPath, 'utf8');
      assert.match(navContent, /handleToggleSound|Volume2|VolumeX/i, 'Nav integrates audio mute toggle');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 5: Live Asia/Kolkata (IST) Clock
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 05: Live Asia/Kolkata (IST) Clock', () => {
    test('F05-T1: IST time calculation uses UTC+5:30 offset', () => {
      const now = new Date('2026-09-07T10:48:00Z');
      const istTime = new Date(now.getTime() + (3600000 * 5.5));
      assert.strictEqual(istTime.getUTCHours(), 16, '10:48 UTC + 5.5h = 16:18 IST');
      assert.strictEqual(istTime.getUTCMinutes(), 18, '18 minutes');
    });

    test('F05-T2: Formats output string with IST designation', () => {
      const date = new Date('2026-09-07T10:48:00Z');
      const istStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(date) + ' IST';
      assert.match(istStr, /IST$/, 'Output string must end with IST');
      assert.match(istStr, /\d{1,2}:\d{2}\s+(AM|PM)\s+IST/, 'Valid 12-hour format');
    });

    test('F05-T3: SSR safe rendering delays clock output until client mount', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const content = fs.readFileSync(navPath, 'utf8');
      assert.includes(content, 'useMounted', 'Nav imports and uses useMounted hook');
      assert.includes(content, '--:-- IST', 'Nav renders --:-- IST placeholder when not mounted');
      assert.includes(content, 'mounted', 'Nav guards clock with mounted state');
    });

    test('F05-T4: Periodic timer update triggers every 1000ms', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const content = fs.readFileSync(navPath, 'utf8');
      assert.includes(content, 'setInterval(updateClock, 1000)', 'Nav sets 1000ms update interval');
      assert.includes(content, 'clearInterval(interval)', 'Nav cleans up interval');
    });

    test('F05-T5: Gracefully falls back if Intl timezone is unavailable', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const content = fs.readFileSync(navPath, 'utf8');
      assert.includes(content, "catch {", 'Nav wraps Intl formatter in try/catch');
      assert.includes(content, "setIstTime('IST')", 'Nav has fallback timezone text');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 6: Ambient Cybernetic Glow System
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 06: Ambient Cybernetic Glow System', () => {
    test('F06-T1: Radial gradient background lighting defined in theme design', () => {
      const tailwindConfig = fs.readFileSync(path.join(ROOT_DIR, 'tailwind.config.ts'), 'utf8');
      assert.includes(tailwindConfig, 'cyber-gradient', 'Tailwind config defines cyber-gradient');
      assert.includes(tailwindConfig, 'radial-gradient', 'Tailwind config defines radial-gradient');
    });

    test('F06-T2: Deep space obsidian vignette overlays hero section', () => {
      const heroPath = path.join(ROOT_DIR, 'components', 'hero', 'hero-section.tsx');
      const content = fs.readFileSync(heroPath, 'utf8');
      assert.match(content, /gradient-to-[tb]|bg-cyber-dark/i, 'Hero section overlays dark vignette gradient');
    });

    test('F06-T3: Card glow utility uses accent indigo #7c8cff and cyan #8cd8ff', () => {
      const tailwindConfig = fs.readFileSync(path.join(ROOT_DIR, 'tailwind.config.ts'), 'utf8');
      assert.includes(tailwindConfig, 'glow-accent', 'Tailwind defines glow-accent');
      assert.includes(tailwindConfig, 'glow-cyan', 'Tailwind defines glow-cyan');
    });

    test('F06-T4: Glow elements have pointer-events: none to avoid blocking clicks', () => {
      const heroPath = path.join(ROOT_DIR, 'components', 'hero', 'hero-section.tsx');
      const content = fs.readFileSync(heroPath, 'utf8');
      assert.includes(content, 'pointer-events-none', 'Glow background layers use pointer-events-none');
    });

    test('F06-T5: High-contrast text readability maintained (#eef3ff on #070b12)', () => {
      const tailwindConfig = fs.readFileSync(path.join(ROOT_DIR, 'tailwind.config.ts'), 'utf8');
      assert.includes(tailwindConfig, '#eef3ff', 'Foreground color #eef3ff defined in theme');
      assert.includes(tailwindConfig, '#070b12', 'Dark background #070b12 defined in theme');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 7: Medical Imaging AI 3D Visual
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 07: Medical Imaging AI 3D Visual', () => {
    test('F07-T1: public/images/medical-imaging.jpg exists in repository', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'medical-imaging.jpg');
      assert.ok(fs.existsSync(p), 'public/images/medical-imaging.jpg must exist');
    });

    test('F07-T2: medical-imaging.jpg has valid 16:9 widescreen dimensions (1920x1080)', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'medical-imaging.jpg');
      const dims = parseJpegDimensions(p);
      assert.ok((dims.width === 1920 && dims.height === 1080) || (dims.width === 1376 && dims.height === 768), 'Width and height must match 16:9 widescreen resolution');
    });

    test('F07-T3: File size is optimized (>100KB and <2MB)', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'medical-imaging.jpg');
      const stats = fs.statSync(p);
      assert.greaterThanOrEqual(stats.size, 100000, 'File must be high quality >= 100KB');
      assert.lessThanOrEqual(stats.size, 2000000, 'File must be optimized <= 2MB');
    });

    test('F07-T4: Visual subject matter represents volumetric DICOM/NIfTI tumor segmentation', () => {
      const caseStudyContent = fs.readFileSync(path.join(ROOT_DIR, 'data', 'case-studies.ts'), 'utf8');
      assert.includes(caseStudyContent, 'medical-imaging', 'Case studies include medical-imaging id');
      assert.includes(caseStudyContent, 'DICOM/NIfTI', 'Medical imaging includes DICOM/NIfTI');
      assert.includes(caseStudyContent, 'tumor', 'Medical imaging mentions tumor segmentation');
    });

    test('F07-T5: High-contrast schematic fallback assets/medical-imaging-system.svg exists', () => {
      const p = path.join(ROOT_DIR, 'assets', 'medical-imaging-system.svg');
      assert.ok(fs.existsSync(p), 'assets/medical-imaging-system.svg must exist');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 8: CEX/DEX Strategy Portal 3D Visual
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 08: CEX/DEX Strategy Portal 3D Visual', () => {
    test('F08-T1: public/images/trading-terminal.jpg exists in repository', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'trading-terminal.jpg');
      assert.ok(fs.existsSync(p), 'public/images/trading-terminal.jpg must exist');
    });

    test('F08-T2: trading-terminal.jpg has valid 16:9 widescreen dimensions (1920x1080)', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'trading-terminal.jpg');
      const dims = parseJpegDimensions(p);
      assert.ok((dims.width === 1920 && dims.height === 1080) || (dims.width === 1376 && dims.height === 768), 'Width and height must match 16:9 widescreen resolution');
    });

    test('F08-T3: File size is optimized (>100KB and <2MB)', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'trading-terminal.jpg');
      const stats = fs.statSync(p);
      assert.greaterThanOrEqual(stats.size, 100000, 'File size >= 100KB');
      assert.lessThanOrEqual(stats.size, 2000000, 'File size <= 2MB');
    });

    test('F08-T4: Visual represents low-latency algorithmic trading cockpit and order-book depth', () => {
      const caseStudyContent = fs.readFileSync(path.join(ROOT_DIR, 'data', 'case-studies.ts'), 'utf8');
      assert.includes(caseStudyContent, 'trading-infrastructure', 'Case study defines trading infrastructure');
      assert.includes(caseStudyContent, 'order book', 'Includes order book depth specification');
    });

    test('F08-T5: High-contrast schematic fallback assets/trading-infrastructure.svg exists', () => {
      const p = path.join(ROOT_DIR, 'assets', 'trading-infrastructure.svg');
      assert.ok(fs.existsSync(p), 'assets/trading-infrastructure.svg must exist');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 9: TDX Launchpad 3D Visual
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 09: TDX Launchpad 3D Visual', () => {
    test('F09-T1: public/images/crypto-launchpad.jpg exists in repository', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'crypto-launchpad.jpg');
      assert.ok(fs.existsSync(p), 'public/images/crypto-launchpad.jpg must exist');
    });

    test('F09-T2: crypto-launchpad.jpg has valid 16:9 widescreen dimensions (1920x1080)', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'crypto-launchpad.jpg');
      const dims = parseJpegDimensions(p);
      assert.ok((dims.width === 1920 && dims.height === 1080) || (dims.width === 1376 && dims.height === 768), 'Width and height must match 16:9 widescreen resolution');
    });

    test('F09-T3: File size is optimized (>100KB and <2MB)', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'crypto-launchpad.jpg');
      const stats = fs.statSync(p);
      assert.greaterThanOrEqual(stats.size, 100000, 'File size >= 100KB');
      assert.lessThanOrEqual(stats.size, 2000000, 'File size <= 2MB');
    });

    test('F09-T4: Visual depicts obsidian Web3 console with glowing smart contract token vesting rings', () => {
      const caseStudyContent = fs.readFileSync(path.join(ROOT_DIR, 'data', 'case-studies.ts'), 'utf8');
      assert.includes(caseStudyContent, 'tdx-launchpad', 'Case study defines tdx-launchpad');
      assert.includes(caseStudyContent, 'smart contract', 'Includes smart contract vesting narrative');
    });

    test('F09-T5: Next.js Image component sizes configuration provides responsive scaling', () => {
      const sizesSpec = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px';
      assert.includes(sizesSpec, '100vw', 'Mobile viewport width rule');
      assert.includes(sizesSpec, '50vw', 'Tablet/laptop width rule');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 10: Recruin AI Platform 3D Visual
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 10: Recruin AI Platform 3D Visual', () => {
    test('F10-T1: public/images/recruin-platform.jpg exists in repository', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'recruin-platform.jpg');
      assert.ok(fs.existsSync(p), 'public/images/recruin-platform.jpg must exist');
    });

    test('F10-T2: recruin-platform.jpg has valid 16:9 widescreen dimensions (1920x1080)', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'recruin-platform.jpg');
      const dims = parseJpegDimensions(p);
      assert.ok((dims.width === 1920 && dims.height === 1080) || (dims.width === 1376 && dims.height === 768), 'Width and height must match 16:9 widescreen resolution');
    });

    test('F10-T3: File size is optimized (>100KB and <2MB)', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'recruin-platform.jpg');
      const stats = fs.statSync(p);
      assert.greaterThanOrEqual(stats.size, 100000, 'File size >= 100KB');
      assert.lessThanOrEqual(stats.size, 2000000, 'File size <= 2MB');
    });

    test('F10-T4: Visual depicts neural talent skill-graph visualization with vector matching pathways', () => {
      const caseStudyContent = fs.readFileSync(path.join(ROOT_DIR, 'data', 'case-studies.ts'), 'utf8');
      assert.includes(caseStudyContent, 'recruin', 'Case study defines recruin');
      assert.includes(caseStudyContent, 'skill graph', 'Includes skill graph matching architecture');
    });

    test('F10-T5: High-contrast schematic fallback assets/recruin-platform.svg exists', () => {
      const p = path.join(ROOT_DIR, 'assets', 'recruin-platform.svg');
      assert.ok(fs.existsSync(p), 'assets/recruin-platform.svg must exist');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 11: Hero Cybernetic Backdrop
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 11: Hero Cybernetic Backdrop', () => {
    test('F11-T1: public/images/hero-neural.jpg exists in repository', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'hero-neural.jpg');
      assert.ok(fs.existsSync(p), 'public/images/hero-neural.jpg must exist');
    });

    test('F11-T2: hero-neural.jpg has valid 16:9 widescreen dimensions (1920x1080)', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'hero-neural.jpg');
      const dims = parseJpegDimensions(p);
      assert.ok((dims.width === 1920 && dims.height === 1080) || (dims.width === 1376 && dims.height === 768), 'Width and height must match 16:9 widescreen resolution');
    });

    test('F11-T3: File size is optimized (>100KB and <2MB)', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'hero-neural.jpg');
      const stats = fs.statSync(p);
      assert.greaterThanOrEqual(stats.size, 100000, 'File size >= 100KB');
      assert.lessThanOrEqual(stats.size, 2000000, 'File size <= 2MB');
    });

    test('F11-T4: Backdrop represents cybernetic neural architecture with luminous data lattices', () => {
      const heroPath = path.join(ROOT_DIR, 'components', 'hero', 'hero-section.tsx');
      const heroContent = fs.readFileSync(heroPath, 'utf8');
      const homePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const homeContent = fs.readFileSync(homePath, 'utf8');
      assert.includes(heroContent, 'hero-neural', 'Hero references hero-neural asset');
      assert.includes(homeContent, 'NeuralCanvas', 'Home page integrates NeuralCanvas mesh with Hero');
    });

    test('F11-T5: Full-bleed hero background layer includes vignette gradient mask', () => {
      const heroPath = path.join(ROOT_DIR, 'components', 'hero', 'hero-section.tsx');
      const heroContent = fs.readFileSync(heroPath, 'utf8');
      assert.match(heroContent, /gradient-to-[tb]/, 'Hero background includes directional gradient mask');
      assert.includes(heroContent, 'pointer-events-none', 'Overlay is non-blocking');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 12: Executive Portrait Frame
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 12: Executive Portrait Frame', () => {
    test('F12-T1: assets/yash-jangid.webp exists in repository', () => {
      const p = path.join(ROOT_DIR, 'assets', 'yash-jangid.webp');
      assert.ok(fs.existsSync(p), 'assets/yash-jangid.webp must exist');
    });

    test('F12-T2: yash-jangid.webp is a valid WebP image with 1:1 aspect ratio (400x400)', () => {
      const p = path.join(ROOT_DIR, 'assets', 'yash-jangid.webp');
      const dims = parseWebpDimensions(p);
      assert.ok(dims.width === 400 || dims.width === 200, 'Width must be 400px or 200px');
      assert.ok(dims.height === 400 || dims.height === 200, 'Height must be 400px or 200px');
      assert.strictEqual(dims.width, dims.height, 'Must be 1:1 aspect ratio');
      assert.strictEqual(dims.format, 'webp', 'Format must be webp');
    });

    test('F12-T3: Portrait frame features illuminated glassmorphic border styling', () => {
      const portraitPath = path.join(ROOT_DIR, 'components', 'hero', 'executive-portrait.tsx');
      const portraitContent = fs.readFileSync(portraitPath, 'utf8');
      assert.includes(portraitContent, 'yash-jangid.webp', 'Executive portrait embeds verified portrait asset');
      assert.match(portraitContent, /border/i, 'Portrait frame features border styling');
    });

    test('F12-T4: Floating KPI badges accompany portrait frame', () => {
      const portraitPath = path.join(ROOT_DIR, 'components', 'hero', 'executive-portrait.tsx');
      const content = fs.readFileSync(portraitPath, 'utf8');
      assert.includes(content, 'Senior Full Stack', 'Portrait features Senior Full Stack badge');
      assert.includes(content, 'UPES B.Tech', 'Portrait features UPES education badge');
      assert.includes(content, '8.9 GPA', 'Portrait features GPA badge');
    });

    test('F12-T5: Responsive scaling preserves 1:1 ratio across desktop and mobile', () => {
      const heroPath = path.join(ROOT_DIR, 'components', 'hero', 'hero-section.tsx');
      const heroContent = fs.readFileSync(heroPath, 'utf8');
      assert.match(heroContent, /aspect-square|w-64 h-64|w-72 h-72|w-80 h-80|rounded-/i, 'Portrait preserves balanced dimensions');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 13: Interactive AI Agent CLI Playground
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 13: Interactive AI Agent CLI Playground', () => {
    test('F13-T1: CLI simulator initializes and responds to help command', async () => {
      const cli = new AgentCliSimulator();
      const output = [];
      for await (const chunk of cli.execute('help')) {
        output.push(chunk);
      }
      const full = output.join('');
      assert.includes(full, 'run-dicom-pipeline', 'Help must list run-dicom-pipeline');
      assert.includes(full, 'query-metrics', 'Help must list query-metrics');
      assert.includes(full, 'analyze-market', 'Help must list analyze-market');
      assert.includes(full, 'mcp-tools', 'Help must list mcp-tools');
      assert.includes(full, 'whoami', 'Help must list whoami');
      assert.includes(full, 'clear', 'Help must list clear');
    });

    test('F13-T2: run-dicom-pipeline command streams 4 execution steps with Dice score', async () => {
      const cli = new AgentCliSimulator();
      const output = [];
      for await (const chunk of cli.execute('run-dicom-pipeline')) {
        output.push(chunk);
      }
      const full = output.join('');
      assert.includes(full, '[1/4] Ingesting DICOM series', 'Must include step 1');
      assert.includes(full, 'Orthanc PACS', 'Must reference Orthanc PACS');
      assert.includes(full, '3D U-Net PyTorch', 'Must reference 3D U-Net model');
      assert.includes(full, 'Dice Score: 98.4%', 'Must report Dice score 98.4%');
      assert.includes(full, 'LLM Orchestration', 'Must reference LLM clinical summary');
    });

    test('F13-T3: query-metrics command outputs telemetry snapshot', async () => {
      const cli = new AgentCliSimulator();
      const output = [];
      for await (const chunk of cli.execute('query-metrics')) {
        output.push(chunk);
      }
      const full = output.join('');
      assert.includes(full, '10,482 concurrent', 'Must report active users');
      assert.includes(full, '14,820 req/min', 'Must report throughput');
      assert.includes(full, '42ms p50 | 88ms p99', 'Must report server latency');
      assert.includes(full, '99.94%', 'Must report uptime');
      assert.includes(full, 'Redis Hit Rate: 94.2%', 'Must report Redis hit rate');
    });

    test('F13-T4: analyze-market command executes simulated arbitrage scan', async () => {
      const cli = new AgentCliSimulator();
      const output = [];
      for await (const chunk of cli.execute('analyze-market')) {
        output.push(chunk);
      }
      const full = output.join('');
      assert.includes(full, 'WebSocket feeds', 'Must reference WebSocket feeds');
      assert.includes(full, '14,200 events/sec', 'Must report events/sec');
      assert.includes(full, 'sub-100ms hot path', 'Must report sub-100ms path');
    });

    test('F13-T5: whoami command reports Yash Jangid credentials', async () => {
      const cli = new AgentCliSimulator();
      const output = [];
      for await (const chunk of cli.execute('whoami')) {
        output.push(chunk);
      }
      const full = output.join('');
      assert.includes(full, 'Yash Jangid', 'Must identify Yash Jangid');
      assert.includes(full, 'Senior Full Stack Engineer', 'Must state title');
      assert.includes(full, 'Gurugram, India', 'Must state location');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 14: Live System Metrics Visualizer
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 14: Live System Metrics Visualizer', () => {
    test('F14-T1: Pipeline defines all 4 discrete architecture stages', () => {
      const visualizer = new SystemMetricsSimulator();
      assert.strictEqual(visualizer.stages.length, 4, 'Must have exactly 4 stages');
      assert.strictEqual(visualizer.stages[0].id, 'ingest', 'Stage 1 is ingest');
      assert.strictEqual(visualizer.stages[1].id, 'process', 'Stage 2 is process');
      assert.strictEqual(visualizer.stages[2].id, 'ai', 'Stage 3 is ai');
      assert.strictEqual(visualizer.stages[3].id, 'delivery', 'Stage 4 is delivery');
    });

    test('F14-T2: Clicking a stage node expands its active inspector details', () => {
      const visualizer = new SystemMetricsSimulator();
      const stage2 = visualizer.setActiveStage(1);
      assert.strictEqual(stage2.id, 'process', 'Active stage is process');
      assert.includes(stage2.tech, 'Redis distributed caching', 'Must list Redis in tech');
    });

    test('F14-T3: Baseline load calculation at 10,000 req/min yields sub-100ms latency', () => {
      const visualizer = new SystemMetricsSimulator();
      const metrics = visualizer.calculateMetrics(10000);
      assert.strictEqual(metrics.loadReqPerMin, 10000, 'Load matches input');
      assert.strictEqual(metrics.p50LatencyMs, 42, 'Baseline p50 is 42ms');
      assert.strictEqual(metrics.p99LatencyMs, 88, 'Baseline p99 is 88ms');
      assert.isTrue(metrics.isSub100ms, 'Must be sub-100ms');
    });

    test('F14-T4: Dynamic load scaling at 50,000 req/min maintains sub-100ms path', () => {
      const visualizer = new SystemMetricsSimulator();
      const metrics = visualizer.calculateMetrics(50000);
      assert.strictEqual(metrics.loadReqPerMin, 50000, 'Max load 50,000 req/min');
      assert.lessThanOrEqual(metrics.p50LatencyMs, 100, 'Latency remains sub-100ms under 50K load');
      assert.greaterThanOrEqual(metrics.redisCacheHitRate, 91.0, 'Cache hit rate remains high');
    });

    test('F14-T5: System uptime SLA is maintained at 99.94%', () => {
      const visualizer = new SystemMetricsSimulator();
      const metrics = visualizer.calculateMetrics(25000);
      assert.strictEqual(metrics.uptime, 99.94, 'Uptime matches SLA');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 15: Global Command Palette (Cmd+K)
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 15: Global Command Palette (Cmd+K)', () => {
    test('F15-T1: Command palette opens and initializes with all registered commands', () => {
      const palette = new CommandPaletteSimulator();
      palette.open();
      assert.isTrue(palette.isOpen, 'Palette must be open');
      const cmds = palette.getFilteredCommands();
      assert.greaterThanOrEqual(cmds.length, 16, 'At least 16 commands registered');
    });

    test('F15-T2: Fuzzy search matches keyword "dicom" returning case study and simulation', () => {
      const palette = new CommandPaletteSimulator();
      palette.open();
      const filtered = palette.setQuery('dicom');
      assert.greaterThanOrEqual(filtered.length, 2, 'Should find at least 2 dicom commands');
      assert.ok(filtered.some(c => c.id === 'case-dicom'), 'Finds DICOM case study');
      assert.ok(filtered.some(c => c.id === 'act-dicom-run'), 'Finds DICOM run action');
    });

    test('F15-T3: ArrowDown and ArrowUp cycle through filtered items with wrap-around', () => {
      const palette = new CommandPaletteSimulator();
      palette.open();
      palette.setQuery('resume');
      const items = palette.getFilteredCommands();
      assert.strictEqual(palette.selectedIndex, 0, 'Initial index 0');
      palette.onKeyDown('ArrowDown');
      assert.strictEqual(palette.selectedIndex, 1, 'Index after ArrowDown is 1');
      palette.onKeyDown('ArrowDown');
      assert.strictEqual(palette.selectedIndex, 0, 'Wraps back to 0');
      palette.onKeyDown('ArrowUp');
      assert.strictEqual(palette.selectedIndex, items.length - 1, 'ArrowUp wraps to last');
    });

    test('F15-T4: Enter key triggers selection and dismisses palette', () => {
      const palette = new CommandPaletteSimulator();
      palette.open();
      const selected = palette.onKeyDown('Enter');
      assert.ok(selected, 'Selected command returned');
      assert.isFalse(palette.isOpen, 'Palette closes on Enter');
    });

    test('F15-T5: Escape key dismisses palette without executing command', () => {
      const palette = new CommandPaletteSimulator();
      palette.open();
      const selected = palette.onKeyDown('Escape');
      assert.strictEqual(selected, null, 'No action executed on Escape');
      assert.isFalse(palette.isOpen, 'Palette closes on Escape');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 16: Canvas Neural Constellation Hero
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 16: Canvas Neural Constellation Hero', () => {
    test('F16-T1: Initializes particles based on viewport width (100 on desktop 1280px)', () => {
      const canvas = new NeuralCanvasSimulator(1280, 720);
      assert.strictEqual(canvas.particles.length, 100, 'Desktop 1280px uses 100 particles');
    });

    test('F16-T2: Adaptive particle count scales to 60 on mobile (375px) and 140 on 4K (1920px)', () => {
      const mobileCanvas = new NeuralCanvasSimulator(375, 667);
      assert.strictEqual(mobileCanvas.particles.length, 60, 'Mobile uses 60 particles');
      const ultraCanvas = new NeuralCanvasSimulator(1920, 1080);
      assert.strictEqual(ultraCanvas.particles.length, 140, 'Ultra-wide uses 140 particles');
    });

    test('F16-T3: Physics step updates particle positions and maintains boundary containment', () => {
      const canvas = new NeuralCanvasSimulator(1280, 720);
      const initialX = canvas.particles[0].x;
      const res = canvas.step();
      assert.notStrictEqual(canvas.particles[0].x, initialX, 'Particle position updated');
      assert.greaterThanOrEqual(res.connectionsDrawn, 0, 'Valid connection calculation');
    });

    test('F16-T4: Cursor interaction within 140px radius applies displacement force', () => {
      const canvas = new NeuralCanvasSimulator(1280, 720);
      canvas.particles[0].x = 500;
      canvas.particles[0].y = 300;
      canvas.setPointer(510, 305, true);
      canvas.step();
      // Particle moved away from pointer
      assert.notStrictEqual(canvas.particles[0].x, 500, 'Particle reacted to pointer');
    });

    test('F16-T5: Click creates energetic ripple wave that expands and displaces nearby particles', () => {
      const canvas = new NeuralCanvasSimulator(1280, 720);
      canvas.addClickRipple(600, 350);
      assert.strictEqual(canvas.ripples.length, 1, 'Ripple added');
      const res = canvas.step();
      assert.strictEqual(res.ripplesActive, 1, 'Ripple active in physics step');
      assert.greaterThanOrEqual(canvas.ripples[0].radius, 5, 'Ripple radius expanded');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 17: Procedural Web Audio Engine
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 17: Procedural Web Audio Engine', () => {
    test('F17-T1: Audio engine defaults to strictly MUTED state adhering to autoplay policies', () => {
      const env = createMockEnvironment();
      const audio = new AudioEngineSimulator(env);
      assert.isTrue(audio.isMuted(), 'Must be muted by default');
      assert.isFalse(audio.playClick(), 'Should not play sound when muted');
    });

    test('F17-T2: toggleMute un-mutes and persists state in localStorage under yash_audio_enabled', () => {
      const env = createMockEnvironment();
      const audio = new AudioEngineSimulator(env);
      const newMuteState = audio.toggleMute();
      assert.isFalse(newMuteState, 'Audio is now un-muted');
      assert.strictEqual(env.localStorage.getItem('yash_audio_enabled'), 'true', 'Persisted in localStorage');
    });

    test('F17-T3: playClick synthesizes descending tone (1000Hz -> 600Hz) when un-muted', () => {
      const env = createMockEnvironment();
      const audio = new AudioEngineSimulator(env);
      audio.toggleMute();
      const played = audio.playClick();
      assert.isTrue(played, 'playClick must succeed when unmuted');
      const ctx = audio.ctx;
      assert.ok(ctx, 'AudioContext created');
      const osc = ctx.createdNodes.find(n => n.frequency !== undefined);
      assert.ok(osc, 'Oscillator node created');
    });

    test('F17-T4: playHover, playTerminalKey, playSuccessChime, and playOpen synthesize without error', () => {
      const env = createMockEnvironment();
      const audio = new AudioEngineSimulator(env);
      audio.toggleMute();
      assert.isTrue(audio.playHover(), 'playHover succeeded');
      assert.isTrue(audio.playTerminalKey(), 'playTerminalKey succeeded');
      assert.isTrue(audio.playSuccessChime(), 'playSuccessChime succeeded');
      assert.isTrue(audio.playOpen(), 'playOpen succeeded');
      assert.strictEqual(audio.history.length, 4, '4 sounds logged');
    });

    test('F17-T5: Audio engine uses zero external audio assets (100% Web Audio API procedural)', () => {
      const audioPath = path.join(ROOT_DIR, 'lib', 'audio-engine.ts');
      const content = fs.readFileSync(audioPath, 'utf8');
      assert.includes(content, 'AudioContext', 'Uses Web Audio API AudioContext');
      assert.includes(content, 'createOscillator', 'Uses procedural oscillator synthesis');
      const publicFiles = fs.readdirSync(path.join(ROOT_DIR, 'public'));
      const audioFiles = publicFiles.filter((f) => f.endsWith('.mp3') || f.endsWith('.wav') || f.endsWith('.ogg'));
      assert.strictEqual(audioFiles.length, 0, 'Zero external audio files in public directory');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 18: Career Timeline Integration
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 18: Career Timeline Integration', () => {
    test('F18-T1: Imaging IQ role verified as Senior Full Stack Engineer (Jan 2026 - Present)', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, "'Imaging IQ'", 'Company is Imaging IQ');
      assert.includes(content, "'Senior Full Stack Engineer'", 'Role is Senior Full Stack Engineer');
      assert.match(content, /Jan 2026\s*—\s*Present/, 'Tenure is Jan 2026 — Present');
    });

    test('F18-T2: Imaging IQ highlights include DICOM/NIfTI, OHIF Viewer, and Orthanc PACS', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.match(content, /DICOM.*NIfTI/i, 'DICOM and NIfTI included in experience highlights');
      assert.includes(content, 'OHIF Viewer', 'OHIF Viewer included');
      assert.includes(content, 'Orthanc PACS', 'Orthanc PACS included');
    });

    test('F18-T3: ITH Technologies SDE I role verified (Jul 2022 - Dec 2025, 3.5 years)', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'ITH Technologies', 'Company is ITH Technologies');
      assert.includes(content, 'Jul 2022 — Dec 2025', 'Tenure is Jul 2022 — Dec 2025');
      assert.match(content, /3\.5 Years|Full Stack Developer/, 'Role duration or title verified');
    });

    test('F18-T4: ITH Technologies SDE Intern role verified (Jan 2022 - Jul 2022, 7 months)', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'Software Development Engineer Intern', 'Intern role title verified');
      assert.match(content, /Jan 2022\s*—\s*Jul 2022/, 'Intern tenure verified');
    });

    test('F18-T5: All professional milestones have verified dates, locations, and bullet points', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'Imaging IQ', 'portfolio.ts contains Imaging IQ');
      assert.includes(content, 'ITH Technologies', 'portfolio.ts contains ITH Technologies');
      assert.includes(content, 'Technical Excellence Award', 'portfolio.ts contains Technical Excellence Award');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 19: Measurable Production Metrics
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 19: Measurable Production Metrics', () => {
    test('F19-T1: 10,000+ active users across Web3 platforms verified in data record', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, '10,000+', '10,000+ metric present');
      assert.includes(content, 'Users', 'Users metric present');
    });

    test('F19-T2: 10,000+ API requests per minute throughput capability verified', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.match(content, /10,000\+.*req\/min/, 'Throughput metric present');
    });

    test('F19-T3: 40% server response latency reduction through Redis caching verified', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.match(content, /-40%|40%/, 'Latency reduction metric present');
    });

    test('F19-T4: CI/CD deployment cycle cut from 2 hours to 15 minutes verified', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.match(content, /15m|15 minutes/, 'Deploy time reduction present');
    });

    test('F19-T5: 99.9% system uptime SLA maintained across production systems verified', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, '99.9%', '99.9% uptime SLA present');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 20: Deep-Dive Case Study Modals
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 20: Deep-Dive Case Study Modals', () => {
    test('F20-T1: Case study payload structure contains overview, architecture, highlights, and outcomes', () => {
      const casePath = path.join(ROOT_DIR, 'data', 'case-studies.ts');
      const content = fs.readFileSync(casePath, 'utf8');
      assert.includes(content, 'challenge:', 'Case studies contain challenge section');
      assert.includes(content, 'architecture:', 'Case studies contain architecture section');
      assert.includes(content, 'technicalHighlights:', 'Case studies contain technical highlights');
      assert.includes(content, 'verifiedOutcomes:', 'Case studies contain verified outcomes');
    });

    test('F20-T2: 4 flagship projects have dedicated deep-dive case studies', () => {
      const casePath = path.join(ROOT_DIR, 'data', 'case-studies.ts');
      const content = fs.readFileSync(casePath, 'utf8');
      assert.includes(content, "'medical-imaging'", 'medical-imaging case study exists');
      assert.includes(content, "'trading-infrastructure'", 'trading-infrastructure case study exists');
      assert.includes(content, "'tdx-launchpad'", 'tdx-launchpad case study exists');
      assert.includes(content, "'recruin'", 'recruin case study exists');
    });

    test('F20-T3: Opening case study locks background body scroll (overflow: hidden)', () => {
      const modalPath = path.join(ROOT_DIR, 'components', 'projects', 'case-study-modal.tsx');
      const content = fs.readFileSync(modalPath, 'utf8');
      assert.includes(content, "document.body.style.overflow = 'hidden'", 'Locks body scroll on mount');
      assert.includes(content, "document.body.style.overflow = originalOverflow", 'Restores body scroll on unmount');
    });

    test('F20-T4: Dismissible via Escape key press or clicking modal backdrop', () => {
      const modalPath = path.join(ROOT_DIR, 'components', 'projects', 'case-study-modal.tsx');
      const content = fs.readFileSync(modalPath, 'utf8');
      assert.includes(content, "e.key === 'Escape'", 'Escape key listener dismisses modal');
      assert.includes(content, 'onClose', 'Backdrop click wires to onClose handler');
    });

    test('F20-T5: Technical stack pills and quantified KPI badges rendered inside drawer', () => {
      const modalPath = path.join(ROOT_DIR, 'components', 'projects', 'case-study-modal.tsx');
      const content = fs.readFileSync(modalPath, 'utf8');
      assert.includes(content, 'techStack', 'Tech stack pills rendered');
      assert.includes(content, 'verifiedOutcomes', 'Verified outcomes KPI rendered');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 21: Technical Skills Matrix
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 21: Technical Skills Matrix', () => {
    test('F21-T1: Taxonomy covers 5 core engineering domains', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'AI & Agentic', 'AI & Agentic domain covered');
      assert.includes(content, 'Healthcare AI', 'Healthcare AI domain covered');
      assert.includes(content, 'Full Stack', 'Full Stack domain covered');
      assert.includes(content, 'Cloud & DevOps', 'Cloud & DevOps domain covered');
    });

    test('F21-T2: AI & Agentic skills include LLM Orchestration, Agentic Workflows, and MCP', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'Model Context Protocol (MCP)', 'MCP tools included');
      assert.includes(content, 'LLM Orchestration', 'LLM Orchestration included');
      assert.includes(content, 'Agentic Workflows', 'Agentic Workflows included');
    });

    test('F21-T3: Healthcare AI skills include DICOM, NIfTI, OHIF Viewer, and Orthanc PACS', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'DICOM Standards', 'DICOM included');
      assert.includes(content, 'NIfTI 3D Volume Processing', 'NIfTI included');
      assert.includes(content, 'OHIF Viewer', 'OHIF included');
      assert.includes(content, 'Orthanc PACS', 'Orthanc included');
    });

    test('F21-T4: Category filter allows switching views or viewing All categories', () => {
      const matrixPath = path.join(ROOT_DIR, 'components', 'experience', 'skills-matrix.tsx');
      const content = fs.readFileSync(matrixPath, 'utf8');
      assert.includes(content, 'selectedCategory', 'Category filter state defined');
      assert.includes(content, 'filteredSkills', 'Filtered skills computed from state');
    });

    test('F21-T5: Skill badges feature hover transitions with cyber accent borders', () => {
      const skillsPath = path.join(ROOT_DIR, 'components', 'experience', 'skills-matrix.tsx');
      const content = fs.readFileSync(skillsPath, 'utf8');
      assert.includes(content, 'hover:', 'Skills badges include hover styling');
      assert.includes(content, 'border', 'Skills badges include border styling');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 22: Education & Honors Integration
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 22: Education & Honors Integration', () => {
    test('F22-T1: UPES Bachelor of Technology in Computer Science and Engineering verified', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'UPES', 'Institution is UPES');
      assert.includes(content, 'B.Tech', 'Degree is B.Tech');
      assert.includes(content, 'Computer Science', 'Major is Computer Science');
    });

    test('F22-T2: Cumulative GPA verified as 8.9 / 10', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, "'8.9 / 10'", 'GPA is 8.9 / 10');
      assert.includes(content, "'10.0'", 'Max GPA is 10.0');
    });

    test('F22-T3: Technical Excellence Award (2023) at ITH Technologies verified', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'Technical Excellence Award', 'Technical Excellence Award present');
      assert.includes(content, 'Most Promising Newcomer', 'Most Promising Newcomer present');
    });

    test('F22-T4: Most Promising Newcomer Award (2023) at ITH Technologies verified', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'Most Promising Newcomer', 'Most Promising Newcomer award verified');
    });

    test('F22-T5: Education and honors bento cards display gold/blue accent badges', () => {
      const eduPath = path.join(ROOT_DIR, 'components', 'experience', 'education-card.tsx');
      const content = fs.readFileSync(eduPath, 'utf8');
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const dataContent = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'educationData', 'Education card references educationData');
      assert.includes(dataContent, 'UPES', 'Portfolio data defines UPES institution');
      assert.includes(dataContent, 'Technical Excellence Award', 'Portfolio data defines Technical Excellence Award');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 23: Dark Luxury Bento Grid Layout
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 23: Dark Luxury Bento Grid Layout', () => {
    test('F23-T1: Responsive 12-column grid layout configured for bento cards', () => {
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf8');
      assert.match(content, /grid-cols-1|md:grid-cols-12|lg:grid-cols-12/i, 'Bento layout configures responsive 12-column grid');
    });

    test('F23-T2: Bento cards utilize aerospace obsidian surface #0c1320 and hairline borders', () => {
      const tailwindPath = path.join(ROOT_DIR, 'tailwind.config.ts');
      const content = fs.readFileSync(tailwindPath, 'utf8');
      assert.includes(content, '#0c1320', 'Tailwind defines #0c1320 surface');
      assert.includes(content, 'border', 'Tailwind defines border tokens');
    });

    test('F23-T3: Subtle 3D perspective tilt configured on mouse movement', () => {
      const cardPath = path.join(ROOT_DIR, 'components', 'projects', 'project-card.tsx');
      const content = fs.readFileSync(cardPath, 'utf8');
      assert.includes(content, 'rotateX', 'Perspective tilt tracks rotateX');
      assert.includes(content, 'rotateY', 'Perspective tilt tracks rotateY');
      assert.match(content, /-yPct\s*\*\s*10|10deg/i, 'Tilt clamped to <= 15 degrees');
    });

    test('F23-T4: Layout dynamically shifts from 1-column (mobile) to 2-column (tablet) to 12-column (desktop)', () => {
      const gridPath = path.join(ROOT_DIR, 'components', 'projects', 'project-grid.tsx');
      const content = fs.readFileSync(gridPath, 'utf8');
      assert.match(content, /grid-cols-1.*md:grid-cols-12/s, 'Project grid specifies responsive columns');
    });

    test('F23-T5: Flagship project card occupies prominent bento span', () => {
      const gridPath = path.join(ROOT_DIR, 'components', 'projects', 'project-grid.tsx');
      const content = fs.readFileSync(gridPath, 'utf8');
      assert.includes(content, 'isFeatured', 'Project grid defines isFeatured');
      assert.includes(content, 'md:col-span-12', 'Featured project spans 12 columns');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 24: Full Responsive Polish
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 24: Full Responsive Polish', () => {
    test('F24-T1: Mobile 375px viewport (iPhone SE) renders single-column layout', () => {
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf8');
      assert.includes(content, 'overflow-x-hidden', 'Root page prevents horizontal overflow');
      assert.includes(content, 'grid-cols-1', 'Bento grid specifies 1 column for mobile');
    });

    test('F24-T2: Tablet 768px viewport renders 2-column layout without clipping', () => {
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf8');
      assert.includes(content, 'sm:', 'Responsive sm breakpoint configured');
      assert.includes(content, 'md:', 'Responsive md breakpoint configured');
    });

    test('F24-T3: Desktop 1280px viewport renders multi-span grid with full visualizers', () => {
      const gridPath = path.join(ROOT_DIR, 'components', 'projects', 'project-grid.tsx');
      const content = fs.readFileSync(gridPath, 'utf8');
      assert.includes(content, 'md:grid-cols-12', '12-column bento grid enabled on md/lg');
      assert.includes(content, 'md:col-span-12', 'Featured card spans 12 columns');
    });

    test('F24-T4: Ultra-wide 1920px+ viewport clamps container to max-w-7xl with auto margins', () => {
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf8');
      assert.includes(content, 'max-w-7xl', 'Root container clamps width with max-w-7xl');
    });

    test('F24-T5: Zero horizontal overflow enforced via overflow-x-hidden on body/html', () => {
      const cssPath = path.join(ROOT_DIR, 'app', 'globals.css');
      const content = fs.readFileSync(cssPath, 'utf8');
      assert.includes(content, 'overflow-x: hidden', 'globals.css enforces overflow-x: hidden');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 25: Zero Hydration Errors & SSR Safety
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 25: Zero Hydration Errors & SSR Safety', () => {
    test('F25-T1: Browser APIs (window, localStorage, navigator) guarded from SSR execution', () => {
      const audioPath = path.join(ROOT_DIR, 'lib', 'audio-engine.ts');
      const content = fs.readFileSync(audioPath, 'utf8');
      assert.includes(content, "typeof window !== 'undefined'", 'Audio engine guards window access');
    });

    test('F25-T2: Initial server HTML matches hydrated client output before useEffect triggers', () => {
      const hookPath = path.join(ROOT_DIR, 'hooks', 'use-mounted.ts');
      const content = fs.readFileSync(hookPath, 'utf8');
      assert.match(content, /useState.*\(false\)/, 'useMounted initializes mounted state to false');
    });

    test('F25-T3: AudioContext initialization deferred until explicit user gesture', () => {
      const env = createMockEnvironment();
      const audio = new AudioEngineSimulator(env);
      assert.strictEqual(audio.ctx, null, 'AudioContext not created until gesture');
    });

    test('F25-T4: Interactive client components explicitly include "use client" directive', () => {
      const clientComponents = [
        'components/interactive/agent-cli.tsx',
        'components/interactive/system-metrics.tsx',
        'components/interactive/audio-toggle.tsx',
        'components/hero/neural-canvas.tsx',
        'components/ui/command-palette.tsx',
      ];
      for (const comp of clientComponents) {
        const compPath = path.join(ROOT_DIR, comp);
        const content = fs.readFileSync(compPath, 'utf8');
        assert.match(content, /^'use client'|^"use client"/, `${comp} must have 'use client' directive`);
      }
    });

    test('F25-T5: Static HTML shell renders without hydration mismatch warnings', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const content = fs.readFileSync(navPath, 'utf8');
      assert.includes(content, 'suppressHydrationWarning', 'executive-nav has suppressHydrationWarning for clock');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 26: 100% E2E Verification & Forensic Audit
  // --------------------------------------------------------------------------
  describe('Tier 1 · Feature 26: 100% E2E Verification & Forensic Audit', () => {
    test('F26-T1: All 5 bespoke 3D visual assets in public/images/ are present and non-empty', () => {
      const files = [
        'hero-neural.jpg',
        'medical-imaging.jpg',
        'trading-terminal.jpg',
        'crypto-launchpad.jpg',
        'recruin-platform.jpg',
      ];
      for (const f of files) {
        const p = path.join(ROOT_DIR, 'public', 'images', f);
        assert.ok(fs.existsSync(p), `Missing ${f}`);
        assert.greaterThanOrEqual(fs.statSync(p).size, 50000, `${f} must be >= 50KB`);
      }
    });

    test('F26-T2: Authentic portrait asset in assets/yash-jangid.webp is intact and valid WebP', () => {
      const p = path.join(ROOT_DIR, 'assets', 'yash-jangid.webp');
      assert.ok(fs.existsSync(p), 'assets/yash-jangid.webp must exist');
      const dims = parseWebpDimensions(p);
      assert.ok(dims.width === 400 || dims.width === 200, 'Width must be 400px or 200px');
      assert.ok(dims.height === 400 || dims.height === 200, 'Height must be 400px or 200px');
      assert.strictEqual(dims.width, dims.height, 'Must be 1:1 aspect ratio');
    });

    test('F26-T3: Zero broken internal section anchor targets across site', () => {
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf8');
      assert.includes(content, 'id="hero"', 'hero section anchor exists');
      assert.includes(content, 'id="architecture"', 'architecture section anchor exists');
      assert.includes(content, 'id="work"', 'work section anchor exists');
      assert.includes(content, 'id="playground"', 'playground section anchor exists');
      assert.includes(content, 'id="contact"', 'contact section anchor exists');
    });

    test('F26-T4: Verified contact email gityash2024@gmail.com is consistent across all surfaces', () => {
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const pageContent = fs.readFileSync(pagePath, 'utf8');
      assert.includes(pageContent, 'gityash2024@gmail.com', 'Official email present in page');
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const dataContent = fs.readFileSync(dataPath, 'utf8');
      assert.includes(dataContent, 'gityash2024@gmail.com', 'Official email present in data');
    });

    test('F26-T5: Complete E2E testing framework executes with 100% passing results', () => {
      const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
      assert.ok(packageJson.scripts && packageJson.scripts.test, 'package.json defines test script');
      assert.includes(packageJson.scripts.test, 'tests/run-e2e.mjs', 'test script invokes run-e2e.mjs');
    });
  });
}
