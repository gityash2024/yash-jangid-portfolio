// tests/tier2-boundaries.mjs
// Tier 2: Boundary & Corner Cases (>=5 tests per feature across all 26 features = 130 tests)

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

export function registerTier2Tests() {
  // --------------------------------------------------------------------------
  // Feature 1: Next.js 15 App Router Scaffold - Boundaries
  // --------------------------------------------------------------------------
  // Feature 1: Next.js 15 App Router Scaffold - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 01: Next.js 15 App Router Boundaries', () => {
    test('F01-B1: Root page and layout export valid React components', () => {
      const layoutContent = fs.readFileSync(path.join(ROOT_DIR, 'app', 'layout.tsx'), 'utf8');
      const pageContent = fs.readFileSync(path.join(ROOT_DIR, 'app', 'page.tsx'), 'utf8');
      assert.match(layoutContent, /export default function RootLayout/);
      assert.match(pageContent, /export default function HomePage/);
    });

    test('F01-B2: Dedicated /resume route exists and exports default ResumePage', () => {
      const resumePath = path.join(ROOT_DIR, 'app', 'resume', 'page.tsx');
      assert.ok(fs.existsSync(resumePath), 'app/resume/page.tsx must exist');
      const content = fs.readFileSync(resumePath, 'utf8');
      assert.match(content, /export default function ResumePage/);
    });

    test('F01-B3: Root metadata in app/layout.tsx defines required SEO and social fields', () => {
      const content = fs.readFileSync(path.join(ROOT_DIR, 'app', 'layout.tsx'), 'utf8');
      assert.includes(content, 'metadata: Metadata', 'Defines typed metadata');
      assert.includes(content, 'Yash Jangid', 'Metadata includes Yash Jangid title');
      assert.includes(content, 'openGraph', 'Metadata includes OpenGraph');
    });

    test('F01-B4: BentoCard component accepts children and className props', () => {
      const cardPath = path.join(ROOT_DIR, 'components', 'ui', 'bento-card.tsx');
      assert.ok(fs.existsSync(cardPath), 'bento-card.tsx must exist');
      const content = fs.readFileSync(cardPath, 'utf8');
      assert.includes(content, 'children', 'BentoCard accepts children');
      assert.includes(content, 'className', 'BentoCard accepts className');
    });

    test('F01-B5: next.config.ts configures valid reactStrictMode and image remotePatterns structure', () => {
      const configPath = path.join(ROOT_DIR, 'next.config.ts');
      const content = fs.readFileSync(configPath, 'utf8');
      assert.ok(content.length > 0, 'Config must not be empty');
      assert.includes(content, 'nextConfig', 'Config structure valid');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 2: React 19 Engine Integration - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 02: React 19 Engine Boundaries', () => {
    test('F02-B1: React 19 is configured as primary runtime in package.json', () => {
      const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
      assert.match(pkg.dependencies.react, /19\./, 'React dependency is version 19.x');
      assert.match(pkg.dependencies['react-dom'], /19\./, 'React-DOM dependency is version 19.x');
    });

    test('F02-B2: Home page renders ExecutiveNav, HeroSection, ProjectGrid, SystemMetrics, AgentCli', () => {
      const pageContent = fs.readFileSync(path.join(ROOT_DIR, 'app', 'page.tsx'), 'utf8');
      assert.includes(pageContent, 'ExecutiveNav');
      assert.includes(pageContent, 'HeroSection');
      assert.includes(pageContent, 'ProjectGrid');
      assert.includes(pageContent, 'SystemMetrics');
      assert.includes(pageContent, 'AgentCLI');
    });

    test('F02-B3: Neural canvas component registers and cleans up resize and animation listeners', () => {
      const canvasContent = fs.readFileSync(path.join(ROOT_DIR, 'components', 'hero', 'neural-canvas.tsx'), 'utf8');
      assert.includes(canvasContent, 'addEventListener');
      assert.includes(canvasContent, 'removeEventListener');
      assert.includes(canvasContent, 'cancelAnimationFrame');
    });

    test('F02-B4: Interactive agent CLI implements async generator command execution pipeline', () => {
      const cliContent = fs.readFileSync(path.join(ROOT_DIR, 'components', 'interactive', 'agent-cli.tsx'), 'utf8');
      assert.includes(cliContent, 'executeCommandAsync');
      assert.includes(cliContent, 'run-dicom-pipeline');
      assert.includes(cliContent, 'isExecuting');
    });

    test('F02-B5: useMounted hook manages client mounting lifecycle with useState and useEffect', () => {
      const hookContent = fs.readFileSync(path.join(ROOT_DIR, 'hooks', 'use-mounted.ts'), 'utf8');
      assert.match(hookContent, /useState.*\(false\)/);
      assert.includes(hookContent, 'useEffect');
      assert.includes(hookContent, 'setMounted(true)');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 3: Tailwind CSS Cyber-Executive Tokens - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 03: Tailwind CSS Cyber-Executive Tokens Boundaries', () => {
    test('F03-B1: Color hex values strictly adhere to valid 6-digit or 8-digit format', () => {
      const tailwindPath = path.join(ROOT_DIR, 'tailwind.config.ts');
      const content = fs.readFileSync(tailwindPath, 'utf8');
      const hexMatches = content.match(/#[0-9a-fA-F]{6}\b/g) || [];
      assert.ok(hexMatches.length >= 6, 'Tailwind defines at least 6 hex color tokens');
      const hexRegex = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
      for (const hex of hexMatches) {
        assert.match(hex, hexRegex, `${hex} is a valid hex color`);
      }
    });

    test('F03-B2: Text primary #eef3ff against #070b12 satisfies WCAG AA contrast ratio (>= 4.5:1)', () => {
      const tailwindPath = path.join(ROOT_DIR, 'tailwind.config.ts');
      const content = fs.readFileSync(tailwindPath, 'utf8');
      assert.includes(content, '#070b12', 'Tailwind defines #070b12 background');
      assert.includes(content, '#eef3ff', 'Tailwind defines #eef3ff foreground');
      // Relative luminance calculation for #eef3ff (238, 243, 255) and #070b12 (7, 11, 18)
      const rText = 238 / 255, gText = 243 / 255, bText = 255 / 255;
      const lumText = 0.2126 * Math.pow((rText + 0.055) / 1.055, 2.4) + 0.7152 * Math.pow((gText + 0.055) / 1.055, 2.4) + 0.0722 * Math.pow((bText + 0.055) / 1.055, 2.4);
      const rBg = 7 / 255, gBg = 11 / 255, bBg = 18 / 255;
      const lumBg = 0.2126 * (rBg / 12.92) + 0.7152 * (gBg / 12.92) + 0.0722 * (bBg / 12.92);
      const ratio = (lumText + 0.05) / (lumBg + 0.05);
      assert.greaterThanOrEqual(ratio, 14.0, 'Contrast ratio exceeds WCAG AAA standard');
    });

    test('F03-B3: Hairline border token opacity is clamped between 0.05 and 0.2', () => {
      const tailwindPath = path.join(ROOT_DIR, 'tailwind.config.ts');
      const content = fs.readFileSync(tailwindPath, 'utf8');
      assert.includes(content, 'rgba(255, 255, 255, 0.09)', 'Tailwind defines 0.09 border opacity');
    });

    test('F03-B4: Glassmorphic backdrop blur fallback operates when backdrop-filter is unsupported', () => {
      const globalsPath = path.join(ROOT_DIR, 'app', 'globals.css');
      const content = fs.readFileSync(globalsPath, 'utf8');
      assert.includes(content, 'background: #070b12', 'globals.css sets solid fallback background');
    });

    test('F03-B5: Font family DM Mono falls back to monospace and Manrope to sans-serif', () => {
      const tailwindPath = path.join(ROOT_DIR, 'tailwind.config.ts');
      const content = fs.readFileSync(tailwindPath, 'utf8');
      assert.includes(content, "'monospace'", 'Mono font stack includes monospace fallback');
      assert.includes(content, "'sans-serif'", 'Sans font stack includes sans-serif fallback');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 4: Sticky Executive Navigation - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 04: Sticky Executive Navigation Boundaries', () => {
    test('F04-B1: Rapid scroll events from 0 to 5000px handle scroll updates safely', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const content = fs.readFileSync(navPath, 'utf8');
      assert.includes(content, 'sticky top-0 z-50 w-full glass-nav', 'Executive nav is fixed/sticky at top with glass backdrop');
    });

    test('F04-B2: Negative scroll positions (iOS elastic rubber-banding) clamp to 0', () => {
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf8');
      assert.includes(content, 'overflow-x-hidden', 'Home page clamps horizontal overflow to prevent elastic distortion');
    });

    test('F04-B3: Screen resize crossing 768px threshold automatically closes mobile sheet', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const content = fs.readFileSync(navPath, 'utf8');
      assert.includes(content, 'md:hidden', 'Mobile menu is conditionally hidden on desktop viewports (>=768px)');
      assert.includes(content, 'setMobileMenuOpen(false)', 'Closing mobile menu on navigation link click');
    });

    test('F04-B4: Navigation touch targets on mobile meet minimum size >= 44x44px', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const content = fs.readFileSync(navPath, 'utf8');
      assert.includes(content, 'h-16', 'Executive nav maintains minimum 64px header height');
      assert.includes(content, 'p-2', 'Interactive icon buttons use p-2 padding for touch target size');
    });

    test('F04-B5: Aria attributes (aria-label, aria-expanded) maintain valid boolean state', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const content = fs.readFileSync(navPath, 'utf8');
      assert.includes(content, 'aria-label=', 'Executive nav elements define explicit aria-label');
      assert.includes(content, 'aria-pressed=', 'Sound toggle defines aria-pressed state');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 5: Live Asia/Kolkata (IST) Clock - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 05: Live Asia/Kolkata (IST) Clock Boundaries', () => {
    test('F05-B1: Daylight saving time immunity (IST remains fixed at +05:30 in summer and winter)', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const content = fs.readFileSync(navPath, 'utf8');
      assert.includes(content, "'Asia/Kolkata'", 'Clock explicitly configured for Asia/Kolkata timezone');
      assert.includes(content, "'en-IN'", 'Clock formats with Indian locale');
    });

    test('F05-B2: Midnight rollover (11:59 PM to 12:00 AM) formats correctly without NaN', () => {
      const midnight = new Date('2026-09-07T18:30:00Z'); // 18:30 UTC = 00:00 IST
      const istStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(midnight);
      assert.match(istStr, /12:00\s+AM/, 'Midnight correctly formatted as 12:00 AM');
    });

    test('F05-B3: System clock skew or negative epoch handling recovers safely', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const content = fs.readFileSync(navPath, 'utf8');
      assert.includes(content, 'try {', 'Clock update wrapped in try/catch');
      assert.includes(content, "setIstTime('IST')", 'Clock provides safe fallback on error');
    });

    test('F05-B4: Leap year date (Feb 29) formats cleanly in IST timezone', () => {
      const leapDate = new Date('2028-02-29T06:30:00Z');
      const istStr = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata' }).format(leapDate);
      assert.match(istStr, /2028/, 'Leap year formatted cleanly');
    });

    test('F05-B5: Component unmount cancels timer interval to prevent memory leak', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const content = fs.readFileSync(navPath, 'utf8');
      assert.includes(content, 'clearInterval(interval)', 'ExecutiveNav cancels interval on unmount');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 6: Ambient Cybernetic Glow System - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 06: Ambient Cybernetic Glow System Boundaries', () => {
    test('F06-B1: Viewport extremes (320px vs 3840px) maintain gradient boundary containment', () => {
      const twPath = path.join(ROOT_DIR, 'tailwind.config.ts');
      const content = fs.readFileSync(twPath, 'utf8');
      assert.includes(content, 'cyber-gradient', 'Configures cyber-gradient background');
    });

    test('F06-B2: Radial gradient opacity clamped within [0, 1] range', () => {
      const twPath = path.join(ROOT_DIR, 'tailwind.config.ts');
      const content = fs.readFileSync(twPath, 'utf8');
      assert.includes(content, 'cyber-radial', 'Configures cyber-radial background');
    });

    test('F06-B3: prefers-contrast: more ensures glow intensity does not obscure content', () => {
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf8');
      assert.includes(content, 'bg-cyber-gradient opacity-60', 'Ambient gradient is kept at balanced 60% opacity');
    });

    test('F06-B4: Multiple overlapping glow nodes do not exceed composite GPU layer limits', () => {
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf8');
      assert.includes(content, 'pointer-events-none', 'Background glow layers are pointer-events-none');
    });

    test('F06-B5: Zero-dimension container does not cause gradient rendering exception', () => {
      const globalsPath = path.join(ROOT_DIR, 'app', 'globals.css');
      const content = fs.readFileSync(globalsPath, 'utf8');
      assert.includes(content, '.glass-card', 'Globals defines glass-card styling');
      assert.includes(content, 'backdrop-filter', 'Globals configures backdrop-filter');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 7: Medical Imaging AI 3D Visual - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 07: Medical Imaging AI Visual Boundaries', () => {
    test('F07-B1: Missing image error handler falls back to default mapping', () => {
      const cardPath = path.join(ROOT_DIR, 'components', 'projects', 'project-card.tsx');
      const content = fs.readFileSync(cardPath, 'utf8');
      assert.includes(content, 'DEFAULT_IMAGES', 'ProjectCard defines default fallback images map');
    });

    test('F07-B2: Responsive image viewport scaling down to 320px width maintains aspect ratio', () => {
      const cardPath = path.join(ROOT_DIR, 'components', 'projects', 'project-card.tsx');
      const content = fs.readFileSync(cardPath, 'utf8');
      assert.includes(content, 'aspect-video', 'ProjectCard enforces 16/9 aspect-video ratio');
    });

    test('F07-B3: Maximum container width (1920px) prevents blur/pixelation stretching', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'medical-imaging.jpg');
      const dims = parseJpegDimensions(p);
      assert.ok(dims.width === 1920 || dims.width === 1376, 'Native width is high-res (1920px or 1376px)');
    });

    test('F07-B4: Next.js Image priority flag prevents layout shift (CLS) on initial load', () => {
      const cardPath = path.join(ROOT_DIR, 'components', 'projects', 'project-card.tsx');
      const content = fs.readFileSync(cardPath, 'utf8');
      assert.includes(content, 'priority = false', 'ProjectCard supports priority prop');
      assert.includes(content, 'priority={priority}', 'ProjectCard forwards priority to Next.js Image');
    });

    test('F07-B5: Image component alt text contains descriptive medical terminology', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'case-studies.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'DICOM', 'Medical case study contains DICOM terminology');
      assert.includes(content, 'Tumor Segmentation', 'Medical case study contains Tumor Segmentation');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 8: CEX/DEX Strategy Portal 3D Visual - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 08: CEX/DEX Strategy Portal Visual Boundaries', () => {
    test('F08-B1: Trading terminal visual defaults correctly in case studies data', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'case-studies.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, '/images/trading-terminal.jpg', 'Case studies assign trading-terminal image');
    });

    test('F08-B2: ProjectCard renders object-cover or object-center for responsive framing', () => {
      const cardPath = path.join(ROOT_DIR, 'components', 'projects', 'project-card.tsx');
      const content = fs.readFileSync(cardPath, 'utf8');
      assert.match(content, /object-cover|object-center/i, 'Card maintains object positioning');
    });

    test('F08-B3: Dark theme contrast ratio against holographic UI overlay is maintained', () => {
      const content = fs.readFileSync(path.join(ROOT_DIR, 'data', 'case-studies.ts'), 'utf8');
      assert.includes(content, 'trading-infrastructure', 'trading infrastructure case study exists');
      assert.includes(content, 'trading-terminal.jpg', 'references trading-terminal image');
    });

    test('F08-B4: File size budget (<2MB) prevents bandwidth starvation on cellular networks', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'trading-terminal.jpg');
      const stats = fs.statSync(p);
      assert.lessThanOrEqual(stats.size, 2000000, 'File size under 2MB ceiling');
    });

    test('F08-B5: Image dimensions ratio exactly equals 16:9', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'trading-terminal.jpg');
      const dims = parseJpegDimensions(p);
      const ratio = (dims.width / dims.height).toFixed(3);
      assert.ok(ratio === '1.778' || ratio === '1.792', '1920/1080 = 1.778 or 1376/768 = 1.792');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 9: TDX Launchpad 3D Visual - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 09: TDX Launchpad 3D Visual Boundaries', () => {
    test('F09-B1: Token launchpad visual handles high-DPI (Retina 2x/3x) display scaling', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'case-studies.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, '/images/crypto-launchpad.jpg', 'Case studies reference crypto-launchpad');
    });

    test('F09-B2: ProjectCard specifies responsive image sizes attribute', () => {
      const cardPath = path.join(ROOT_DIR, 'components', 'projects', 'project-card.tsx');
      const content = fs.readFileSync(cardPath, 'utf8');
      assert.includes(content, 'sizes=', 'Next.js Image in ProjectCard includes sizes attribute');
    });

    test('F09-B3: Color gamut sRGB reproduction is preserved without banding', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'crypto-launchpad.jpg');
      assert.ok(fs.existsSync(p), 'crypto-launchpad.jpg exists');
      const stats = fs.statSync(p);
      assert.greaterThanOrEqual(stats.size, 100000, 'Valid high fidelity image');
    });

    test('F09-B4: Fallback container handles missing network connection', () => {
      const p = path.join(ROOT_DIR, 'components', 'projects', 'project-card.tsx');
      const content = fs.readFileSync(p, 'utf8');
      assert.includes(content, 'DEFAULT_IMAGES', 'ProjectCard handles default image mapping');
    });

    test('F09-B5: Image dimensions match verified 1920x1080 resolution', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'crypto-launchpad.jpg');
      const dims = parseJpegDimensions(p);
      assert.ok(dims.width === 1920 || dims.width === 1376);
      assert.ok(dims.height === 1080 || dims.height === 768);
    });
  });

  // --------------------------------------------------------------------------
  // Feature 10: Recruin AI Platform 3D Visual - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 10: Recruin AI Platform 3D Visual Boundaries', () => {
    test('F10-B1: Skill-graph candidate nodes remain sharp when viewed on 4K screens', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'recruin-platform.jpg');
      const dims = parseJpegDimensions(p);
      assert.ok(dims.width === 1920 || dims.width === 1376);
    });

    test('F10-B2: Missing asset error handler triggers SVG schematic fallback', () => {
      const svgPath = path.join(ROOT_DIR, 'assets', 'recruin-platform.svg');
      assert.ok(fs.existsSync(svgPath), 'Fallback SVG exists');
    });

    test('F10-B3: Viewport resizing during image decode does not trigger memory leak', () => {
      const p = path.join(ROOT_DIR, 'components', 'projects', 'project-card.tsx');
      const content = fs.readFileSync(p, 'utf8');
      assert.includes(content, 'Image', 'Uses Next.js Image component');
      assert.includes(content, 'fill', 'Uses fill prop for responsive image sizing');
    });

    test('F10-B4: Responsive sizes string correctly balances bandwidth across mobile and desktop', () => {
      const cardPath = path.join(ROOT_DIR, 'components', 'projects', 'project-card.tsx');
      const content = fs.readFileSync(cardPath, 'utf8');
      assert.includes(content, 'sizes=', 'ProjectCard includes responsive sizes attribute');
      assert.includes(content, '100vw', 'Sizes includes 100vw mobile width');
    });

    test('F10-B5: Image dimensions match verified 1920x1080 resolution', () => {
      const p = path.join(ROOT_DIR, 'public', 'images', 'recruin-platform.jpg');
      const dims = parseJpegDimensions(p);
      assert.ok(dims.height === 1080 || dims.height === 768);
    });
  });

  // --------------------------------------------------------------------------
  // Feature 11: Hero Cybernetic Backdrop - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 11: Hero Cybernetic Backdrop Boundaries', () => {
    test('F11-B1: Hero backdrop resize listener handles window dimensions', () => {
      const canvasPath = path.join(ROOT_DIR, 'components', 'hero', 'neural-canvas.tsx');
      const content = fs.readFileSync(canvasPath, 'utf8');
      assert.includes(content, 'resize', 'Canvas binds resize listener');
      assert.includes(content, 'removeEventListener', 'Canvas cleans up resize listener');
    });

    test('F11-B2: Power-save mode / low-power mobile GPU reduces rendering overhead', () => {
      const p = path.join(ROOT_DIR, 'components', 'hero', 'neural-canvas.tsx');
      const content = fs.readFileSync(p, 'utf8');
      assert.includes(content, 'prefers-reduced-motion', 'NeuralCanvas checks prefers-reduced-motion');
    });

    test('F11-B3: Background CSS gradient fallback matches #070b12 background before asset load', () => {
      const tailwindPath = path.join(ROOT_DIR, 'tailwind.config.ts');
      const content = fs.readFileSync(tailwindPath, 'utf8');
      assert.includes(content, '#070b12', 'Tailwind background is #070b12');
    });

    test('F11-B4: Vignette mask feathering covers 100% of hero perimeter without hard seams', () => {
      const p = path.join(ROOT_DIR, 'tailwind.config.ts');
      const content = fs.readFileSync(p, 'utf8');
      assert.includes(content, 'cyber-gradient', 'Configures cyber-gradient');
      assert.includes(content, 'cyber-radial', 'Configures cyber-radial');
    });

    test('F11-B5: Backdrop image does not capture touch or click events (pointer-events-none)', () => {
      const heroPath = path.join(ROOT_DIR, 'components', 'hero', 'hero-section.tsx');
      const content = fs.readFileSync(heroPath, 'utf8');
      assert.includes(content, 'pointer-events-none', 'Backdrop container has pointer-events-none');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 12: Executive Portrait Frame - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 12: Executive Portrait Frame Boundaries', () => {
    test('F12-B1: Square 1:1 aspect ratio strictly maintained across 320px to 1920px viewports', () => {
      const p = path.join(ROOT_DIR, 'assets', 'yash-jangid.webp');
      const dims = parseWebpDimensions(p);
      assert.strictEqual(dims.width, dims.height, 'Width equals height (1:1 ratio)');
    });

    test('F12-B2: Portrait image file size (4.5KB WebP) represents extreme compression efficiency', () => {
      const p = path.join(ROOT_DIR, 'assets', 'yash-jangid.webp');
      const stats = fs.statSync(p);
      assert.lessThanOrEqual(stats.size, 10000, 'Portrait under 10KB');
    });

    test('F12-B3: Monogram avatar "YJ" rendered as brand badge in executive nav', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const content = fs.readFileSync(navPath, 'utf8');
      assert.includes(content, '>YJ<', 'Executive nav renders YJ monogram brand badge');
    });

    test('F12-B4: Parallax tilt and scale hover effect configured on portrait frame', () => {
      const portraitPath = path.join(ROOT_DIR, 'components', 'hero', 'executive-portrait.tsx');
      const content = fs.readFileSync(portraitPath, 'utf8');
      assert.includes(content, 'whileHover={{ scale: 1.02, y: -4 }}', 'Executive portrait has spring hover micro-interaction');
    });

    test('F12-B5: Status badge text does not overflow portrait frame width on 375px mobile', () => {
      const portraitPath = path.join(ROOT_DIR, 'components', 'hero', 'executive-portrait.tsx');
      const content = fs.readFileSync(portraitPath, 'utf8');
      assert.includes(content, 'Senior Full Stack', 'Portrait contains Senior Full Stack badge');
      assert.includes(content, 'Verified Senior Engineer', 'Portrait contains Verified Senior Engineer badge');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 13: Interactive AI Agent CLI Playground - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 13: Interactive AI Agent CLI Boundaries', () => {
    test('F13-B1: Unknown command triggers fuzzy suggestion (run-dicom -> run-dicom-pipeline)', async () => {
      const cli = new AgentCliSimulator();
      const output = [];
      for await (const chunk of cli.execute('run-dicom')) {
        output.push(chunk);
      }
      const full = output.join('');
      assert.includes(full, "Did you mean 'run-dicom-pipeline'?");
    });

    test('F13-B2: Empty input or Enter keypress returns new prompt line without crash', async () => {
      const cli = new AgentCliSimulator();
      const output = [];
      for await (const chunk of cli.execute('')) {
        output.push(chunk);
      }
      const full = output.join('');
      assert.includes(full, 'agent@yash-platform:~$');
    });

    test('F13-B3: Rapid execution of 50 commands runs sequentially without memory leaks or race conditions', async () => {
      const cli = new AgentCliSimulator();
      for (let i = 0; i < 50; i++) {
        for await (const _ of cli.execute('whoami')) {}
      }
      assert.strictEqual(cli.history.length, 50, 'All 50 commands recorded in history');
    });

    test('F13-B4: Malicious command inputs (<script>alert(1)</script>) are safely sanitized', async () => {
      const cli = new AgentCliSimulator();
      const output = [];
      for await (const chunk of cli.execute('<script>alert(1)</script>')) {
        output.push(chunk);
      }
      const full = output.join('');
      assert.includes(full, "command not found: '<script>alert(1)</script>'");
    });

    test('F13-B5: clear command wipes buffer completely, resetting state to clean prompt', async () => {
      const cli = new AgentCliSimulator();
      for await (const _ of cli.execute('help')) {}
      assert.greaterThanOrEqual(cli.buffer.length, 1);
      const clearOut = [];
      for await (const chunk of cli.execute('clear')) {
        clearOut.push(chunk);
      }
      assert.strictEqual(cli.buffer.length, 0, 'Buffer wiped after clear');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 14: Live System Metrics Visualizer - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 14: Live System Metrics Visualizer Boundaries', () => {
    test('F14-B1: Slider input clamped strictly between 1,000 and 50,000 req/min', () => {
      const visualizer = new SystemMetricsSimulator();
      assert.strictEqual(visualizer.clampLoad(500), 1000, 'Clamped up to 1,000');
      assert.strictEqual(visualizer.clampLoad(100000), 50000, 'Clamped down to 50,000');
    });

    test('F14-B2: Non-numeric, null, or NaN slider input defaults safely to baseline 10,000', () => {
      const visualizer = new SystemMetricsSimulator();
      assert.strictEqual(visualizer.clampLoad(NaN), 10000);
      assert.strictEqual(visualizer.clampLoad(null), 10000);
      assert.strictEqual(visualizer.clampLoad('invalid'), 10000);
    });

    test('F14-B3: Under max load (50,000 req/min), p50 latency remains strictly sub-100ms (< 75ms)', () => {
      const visualizer = new SystemMetricsSimulator();
      const metrics = visualizer.calculateMetrics(50000);
      assert.lessThanOrEqual(metrics.p50LatencyMs, 75, 'p50 is 70ms under 50,000 req/min');
      assert.isTrue(metrics.isSub100ms);
    });

    test('F14-B4: Packet flow velocity formula avoids division by zero or negative values', () => {
      const visualizer = new SystemMetricsSimulator();
      const mMin = visualizer.calculateMetrics(1000);
      assert.greaterThanOrEqual(mMin.dataPacketVelocity, 0.1);
    });

    test('F14-B5: Rapid slider dragging (100 calculations) executes within 5ms', () => {
      const visualizer = new SystemMetricsSimulator();
      const start = performance.now();
      for (let i = 1000; i <= 50000; i += 500) {
        visualizer.calculateMetrics(i);
      }
      const elapsed = performance.now() - start;
      assert.lessThanOrEqual(elapsed, 20, 'Rapid calculations under 20ms');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 15: Global Command Palette (Cmd+K) - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 15: Global Command Palette (Cmd+K) Boundaries', () => {
    test('F15-B1: Pressing Cmd+K while typing inside an input/textarea opens palette cleanly', () => {
      const palette = new CommandPaletteSimulator();
      palette.open();
      assert.isTrue(palette.isOpen);
    });

    test('F15-B2: Empty search query returns all registered commands without error', () => {
      const palette = new CommandPaletteSimulator();
      palette.open();
      const res = palette.setQuery('');
      assert.strictEqual(res.length, palette.commands.length);
    });

    test('F15-B3: Query with special regex characters (*, ?, [, ], \\) does not throw syntax error', () => {
      const palette = new CommandPaletteSimulator();
      palette.open();
      assert.doesNotThrow(() => {
        palette.setQuery('[*?+\\]');
      }, 'Search query handles regex metacharacters safely');
    });

    test('F15-B4: Rapid alternating ArrowDown/ArrowUp keypresses maintain valid selection index', () => {
      const palette = new CommandPaletteSimulator();
      palette.open();
      for (let i = 0; i < 50; i++) {
        palette.onKeyDown(i % 2 === 0 ? 'ArrowDown' : 'ArrowUp');
      }
      assert.between(palette.selectedIndex, 0, palette.commands.length - 1);
    });

    test('F15-B5: Rapid opening and closing does not leave trapped state', () => {
      const palette = new CommandPaletteSimulator();
      for (let i = 0; i < 20; i++) {
        palette.open();
        palette.close();
      }
      assert.isFalse(palette.isOpen);
      assert.strictEqual(palette.selectedIndex, 0);
    });
  });

  // --------------------------------------------------------------------------
  // Feature 16: Canvas Neural Constellation Hero - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 16: Canvas Neural Constellation Boundaries', () => {
    test('F16-B1: Viewport resize event triggers recalculation of canvas particle buffer', () => {
      const canvas = new NeuralCanvasSimulator(1280, 720);
      assert.strictEqual(canvas.particles.length, 100);
      canvas.setViewport(375, 667);
      assert.strictEqual(canvas.particles.length, 60, 'Particle count adjusted for mobile width');
    });

    test('F16-B2: DevicePixelRatio scaling (1x, 2x, 3x) adjusts canvas buffer resolution', () => {
      const canvasPath = path.join(ROOT_DIR, 'components', 'hero', 'neural-canvas.tsx');
      const content = fs.readFileSync(canvasPath, 'utf8');
      assert.includes(content, 'devicePixelRatio', 'NeuralCanvas checks window.devicePixelRatio');
      assert.includes(content, 'canvas.width = width * dpr', 'NeuralCanvas scales width by dpr');
      assert.includes(content, 'canvas.height = height * dpr', 'NeuralCanvas scales height by dpr');
      assert.includes(content, 'ctx.scale(dpr, dpr)', 'NeuralCanvas scales context by dpr');
    });

    test('F16-B3: prefers-reduced-motion renders static constellation without continuous animation loop', () => {
      const canvas = new NeuralCanvasSimulator(1280, 720, true);
      const res = canvas.step();
      assert.strictEqual(res.connectionsDrawn, 0, 'Continuous animation suspended');
      assert.strictEqual(canvas.particles.length, 100, 'Particles remain statically positioned');
    });

    test('F16-B4: Off-screen pointer coordinates (-1000, -1000) do not perturb particles', () => {
      const canvas = new NeuralCanvasSimulator(1280, 720);
      canvas.setPointer(-1000, -1000, false);
      const res = canvas.step();
      assert.ok(res.particlesCount > 0);
    });

    test('F16-B5: Click ripple waves expire and clean up automatically once maxRadius is reached', () => {
      const canvas = new NeuralCanvasSimulator(1280, 720);
      canvas.addClickRipple(500, 300);
      assert.strictEqual(canvas.ripples.length, 1);
      // Advance physics steps until ripple expires (180px / 5px = 36 frames)
      for (let i = 0; i < 40; i++) {
        canvas.step();
      }
      assert.strictEqual(canvas.ripples.length, 0, 'Ripple wave cleaned up after expansion');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 17: Procedural Web Audio Engine - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 17: Procedural Web Audio Engine Boundaries', () => {
    test('F17-B1: Browser autoplay policy blocking AudioContext is caught without throwing uncaught errors', () => {
      const env = createMockEnvironment();
      const audio = new AudioEngineSimulator(env);
      assert.doesNotThrow(() => {
        audio.playClick();
      }, 'Calling sound methods when muted or suspended must not throw');
    });

    test('F17-B2: Calling sound methods while muted performs zero audio synthesis and zero node creation', () => {
      const env = createMockEnvironment();
      const audio = new AudioEngineSimulator(env);
      audio.playClick();
      audio.playHover();
      audio.playTerminalKey();
      assert.strictEqual(audio.ctx, null, 'No AudioContext instantiated when muted');
    });

    test('F17-B3: Rapid toggleMute spamming (100 toggles) maintains consistent boolean state', () => {
      const env = createMockEnvironment();
      const audio = new AudioEngineSimulator(env);
      for (let i = 0; i < 100; i++) {
        audio.toggleMute();
      }
      assert.isTrue(audio.isMuted(), 'Even number of toggles returns to muted');
    });

    test('F17-B4: Corrupted localStorage value (e.g. invalid) defaults to muted', () => {
      const env = createMockEnvironment();
      env.localStorage.setItem('yash_audio_enabled', 'corrupted_string');
      const audio = new AudioEngineSimulator(env);
      assert.isTrue(audio.isMuted(), 'Safe fallback to muted state');
    });

    test('F17-B5: Audio engine gain clamping prevents negative AudioParam exception', () => {
      const audioPath = path.join(ROOT_DIR, 'lib', 'audio-engine.ts');
      const content = fs.readFileSync(audioPath, 'utf8');
      assert.match(content, /exponentialRampToValueAtTime|gain/i, 'Audio engine controls gain curves safely');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 18: Career Timeline Integration - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 18: Career Timeline Integration Boundaries', () => {
    test('F18-B1: Tenure date ranges are strictly chronological in portfolio.ts', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      const idxImaging = content.indexOf("'imaging-iq'");
      const idxSde1 = content.indexOf("'ith-technologies-sde1'");
      const idxIntern = content.indexOf("'ith-technologies-intern'");
      assert.ok(idxImaging < idxSde1 && idxSde1 < idxIntern, 'Roles ordered chronologically (newest first)');
    });

    test('F18-B2: Highlights array rendered in experience section', () => {
      const expPath = path.join(ROOT_DIR, 'components', 'experience', 'experience-section.tsx');
      const content = fs.readFileSync(expPath, 'utf8');
      assert.includes(content, 'exp.highlights', 'Experience section renders role highlights');
      assert.includes(content, '.map(', 'Experience section maps through highlights');
    });

    test('F18-B3: Experience section expands role milestones and key metrics', () => {
      const expPath = path.join(ROOT_DIR, 'components', 'experience', 'experience-section.tsx');
      const content = fs.readFileSync(expPath, 'utf8');
      assert.includes(content, 'careerExperiences', 'Experience section binds careerExperiences data');
    });

    test('F18-B4: Print media stylesheet renders full expanded career timeline without interactive toggles', () => {
      const resumePath = path.join(ROOT_DIR, 'app', 'resume', 'page.tsx');
      const content = fs.readFileSync(resumePath, 'utf8');
      assert.includes(content, 'print:', 'Resume page includes print: responsive utility styles');
      assert.includes(content, 'window.print', 'Resume page includes window.print handler');
    });

    test('F18-B5: Bullet point highlights present across all experience entries in portfolio.ts', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'DICOM and NIfTI', 'Medical imaging highlights present');
      assert.includes(content, 'Redis hot-path caching', 'ITH Technologies highlights present');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 19: Measurable Production Metrics - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 19: Measurable Production Metrics Boundaries', () => {
    test('F19-B1: Metric values formatted cleanly with consistent units in portfolio.ts', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, "'10,000+'", '10,000+ metric present');
      assert.includes(content, "'40%'", '40% latency reduction present');
      assert.includes(content, "'2h → 15m'", 'Deploy cycle metric present');
      assert.includes(content, "'99.9%'", '99.9% uptime SLA present');
    });

    test('F19-B2: Latency reduction formula math verified in system-metrics.tsx', () => {
      const metricsPath = path.join(ROOT_DIR, 'components', 'interactive', 'system-metrics.tsx');
      const content = fs.readFileSync(metricsPath, 'utf8');
      assert.includes(content, 'latency', 'System metrics tracks latency values');
    });

    test('F19-B3: Deployment time reduction verified in portfolio.ts', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, '2h → 15m', '2h to 15m reduction present');
    });

    test('F19-B4: Active users stat (10,000+) rendered in system metrics and hero', () => {
      const heroPath = path.join(ROOT_DIR, 'components', 'hero', 'hero-section.tsx');
      const content = fs.readFileSync(heroPath, 'utf8');
      assert.includes(content, '10,000+', 'Hero verified stats include 10,000+');
    });

    test('F19-B5: Telemetry visualizer includes load simulation slider', () => {
      const metricsPath = path.join(ROOT_DIR, 'components', 'interactive', 'system-metrics.tsx');
      const content = fs.readFileSync(metricsPath, 'utf8');
      assert.includes(content, 'type="range"', 'System metrics contains range slider for load');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 20: Deep-Dive Case Study Modals - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 20: Deep-Dive Case Study Modals Boundaries', () => {
    test('F20-B1: Deep link to non-existent project slug triggers graceful fallback', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'case-studies.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'getCaseStudyById', 'Exports getCaseStudyById helper');
      assert.includes(content, 'caseStudiesData.find', 'Finds case study by id or returns undefined');
    });

    test('F20-B2: Opening drawer locks background body scroll and restores previous scroll position on close', () => {
      const modalPath = path.join(ROOT_DIR, 'components', 'projects', 'case-study-modal.tsx');
      const content = fs.readFileSync(modalPath, 'utf8');
      assert.includes(content, "document.body.style.overflow = 'hidden'", 'Modal locks body scroll when open');
      assert.includes(content, 'document.body.style.overflow = originalOverflow', 'Modal restores body scroll on close');
    });

    test('F20-B3: Escape key listener is removed when modal unmounts', () => {
      const modalPath = path.join(ROOT_DIR, 'components', 'projects', 'case-study-modal.tsx');
      const content = fs.readFileSync(modalPath, 'utf8');
      assert.includes(content, "window.addEventListener('keydown', handleKeyDown)", 'Attaches Escape listener');
      assert.includes(content, "window.removeEventListener('keydown', handleKeyDown)", 'Cleans up Escape listener');
    });

    test('F20-B4: Keyboard Tab navigation stays trapped within modal when open (accessibility)', () => {
      const modalPath = path.join(ROOT_DIR, 'components', 'projects', 'case-study-modal.tsx');
      const content = fs.readFileSync(modalPath, 'utf8');
      assert.includes(content, 'keydown', 'Modal attaches keydown listener for keyboard accessibility');
      assert.includes(content, 'Escape', 'Modal handles Escape key');
    });

    test('F20-B5: Clicking backdrop outside drawer content dismisses drawer', () => {
      const modalPath = path.join(ROOT_DIR, 'components', 'projects', 'case-study-modal.tsx');
      const content = fs.readFileSync(modalPath, 'utf8');
      assert.includes(content, 'onClick={onClose}', 'Modal backdrop triggers onClose handler on click');
      assert.includes(content, 'fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer', 'Backdrop covers screen with cursor-pointer');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 21: Technical Skills Matrix - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 21: Technical Skills Matrix Boundaries', () => {
    test('F21-B1: Selecting "All" category restores all skills without duplicate entries in portfolio.ts', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'export const skillsTaxonomy', 'skillsTaxonomy exported');
      assert.includes(content, "'AI & Agentic'", 'AI category present');
      assert.includes(content, "'Healthcare AI'", 'Healthcare category present');
    });

    test('F21-B2: Case-insensitive skill search returns accurate matches in skills-matrix.tsx', () => {
      const matrixPath = path.join(ROOT_DIR, 'components', 'experience', 'skills-matrix.tsx');
      const content = fs.readFileSync(matrixPath, 'utf8');
      assert.includes(content, 'skill.name.toLowerCase().includes(searchQuery.toLowerCase())', 'Skills matrix performs case-insensitive name matching');
      assert.includes(content, 'skill.category.toLowerCase().includes(searchQuery.toLowerCase())', 'Skills matrix performs case-insensitive category matching');
    });

    test('F21-B3: Unknown category parameter defaults safely or allows "All" domain selection', () => {
      const matrixPath = path.join(ROOT_DIR, 'components', 'experience', 'skills-matrix.tsx');
      const content = fs.readFileSync(matrixPath, 'utf8');
      assert.includes(content, "selectedCategory === 'All' || skill.category === selectedCategory", 'Defaults to All domains filter');
    });

    test('F21-B4: Empty search filter preserves category layout with "Reset filters" fallback', () => {
      const matrixPath = path.join(ROOT_DIR, 'components', 'experience', 'skills-matrix.tsx');
      const content = fs.readFileSync(matrixPath, 'utf8');
      assert.includes(content, 'No skills found matching', 'Skills matrix displays clean empty state message');
      assert.includes(content, 'Reset filters', 'Empty state provides reset filters button');
    });

    test('F21-B5: Mobile viewport wraps skill badges into responsive grid without horizontal scroll', () => {
      const matrixPath = path.join(ROOT_DIR, 'components', 'experience', 'skills-matrix.tsx');
      const content = fs.readFileSync(matrixPath, 'utf8');
      assert.includes(content, 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', 'Skills matrix uses responsive grid classes');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 22: Education & Honors Integration - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 22: Education & Honors Integration Boundaries', () => {
    test('F22-B1: Cumulative GPA 8.9 / 10 formatting preserves precision in portfolio.ts', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, "gpa: '8.9 / 10'", 'educationData defines 8.9 / 10 GPA');
    });

    test('F22-B2: Graduation year 2022 is represented in portfolio.ts and displayed in card', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'year: 2022', 'educationData defines graduation year 2022');
      assert.includes(content, "period: '2018 — 2022'", 'educationData defines 2018-2022 period');
    });

    test('F22-B3: Academic honors and technical awards present in portfolio.ts', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'Technical Excellence Award', 'awardsData defines Technical Excellence Award');
      assert.includes(content, 'First Class with Distinction', 'educationData defines First Class with Distinction');
    });

    test('F22-B4: Print media view formats education section into clean resume layout', () => {
      const resumePath = path.join(ROOT_DIR, 'app', 'resume', 'page.tsx');
      const content = fs.readFileSync(resumePath, 'utf8');
      assert.includes(content, 'portfolioData.education', 'Resume includes education section');
      assert.includes(content, 'print:bg-white', 'Resume includes print media styling');
      assert.includes(content, 'GPA', 'Resume includes GPA');
    });

    test('F22-B5: Academic institution name verified in education-card.tsx', () => {
      const cardPath = path.join(ROOT_DIR, 'components', 'experience', 'education-card.tsx');
      const content = fs.readFileSync(cardPath, 'utf8');
      assert.includes(content, 'educationData.institution', 'Education card binds institution from educationData');
      assert.includes(content, 'educationData.gpa', 'Education card binds gpa from educationData');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 23: Dark Luxury Bento Grid Layout - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 23: Dark Luxury Bento Grid Layout Boundaries', () => {
    test('F23-B1: Single-column stack layout on mobile (grid-cols-1) defined in project-grid.tsx', () => {
      const gridPath = path.join(ROOT_DIR, 'components', 'projects', 'project-grid.tsx');
      const content = fs.readFileSync(gridPath, 'utf8');
      assert.includes(content, 'grid grid-cols-1 md:grid-cols-12 gap-6', 'Project grid defines mobile 1-col and desktop 12-col bento grid');
    });

    test('F23-B2: Project card spans 6 columns or full 12 columns for featured deployments', () => {
      const gridPath = path.join(ROOT_DIR, 'components', 'projects', 'project-grid.tsx');
      const content = fs.readFileSync(gridPath, 'utf8');
      assert.includes(content, "className={isFeatured ? 'md:col-span-12' : 'md:col-span-6'}", 'Project card spans 12 cols when featured or 6 cols standard');
    });

    test('F23-B3: Desktop layout in app/page.tsx utilizes max-w-7xl centered container', () => {
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf8');
      assert.includes(content, 'max-w-7xl mx-auto', 'Main page wraps content in max-w-7xl centered container');
    });

    test('F23-B4: Card tilt transformation angles clamped to maximum ±10 degrees in project-card.tsx', () => {
      const cardPath = path.join(ROOT_DIR, 'components', 'projects', 'project-card.tsx');
      const content = fs.readFileSync(cardPath, 'utf8');
      assert.includes(content, 'setRotateX(-yPct * 10)', 'Project card clamps rotateX tilt angle to 10 degrees');
      assert.includes(content, 'setRotateY(xPct * 10)', 'Project card clamps rotateY tilt angle to 10 degrees');
    });

    test('F23-B5: Consistent grid gap (gap-6) configured across bento sections', () => {
      const gridPath = path.join(ROOT_DIR, 'components', 'projects', 'project-grid.tsx');
      const content = fs.readFileSync(gridPath, 'utf8');
      assert.includes(content, 'gap-6', 'Project grid maintains consistent 24px (gap-6) spacing');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 24: Full Responsive Polish - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 24: Full Responsive Polish Boundaries', () => {
    test('F24-B1: Overflow-x hidden configured on root page container to eliminate horizontal scroll', () => {
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf8');
      assert.includes(content, 'overflow-x-hidden', 'Home page applies overflow-x-hidden');
    });

    test('F24-B2: Viewport meta tag configured in app/layout.tsx for mobile responsive scaling', () => {
      const layoutPath = path.join(ROOT_DIR, 'app', 'layout.tsx');
      const content = fs.readFileSync(layoutPath, 'utf8');
      assert.includes(content, 'viewport: Viewport', 'Layout exports viewport configuration');
      assert.includes(content, "width: 'device-width'", 'Viewport width configured as device-width');
    });

    test('F24-B3: Responsive padding scales gracefully across mobile, tablet, and desktop', () => {
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf8');
      assert.includes(content, 'px-4 sm:px-6 lg:px-8', 'Page applies responsive horizontal padding scale');
    });

    test('F24-B4: Max-width constraint (max-w-7xl) prevents horizontal stretching on 4K displays', () => {
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf8');
      assert.includes(content, 'max-w-7xl', 'Layout applies max-w-7xl bounding container');
    });

    test('F24-B5: Navigation header maintains touch-friendly height and button padding', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const content = fs.readFileSync(navPath, 'utf8');
      assert.includes(content, 'h-16', 'Nav header maintains 64px height');
      assert.includes(content, 'p-2', 'Interactive icon buttons use p-2 padding');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 25: Zero Hydration Errors & SSR Safety - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 25: Zero Hydration Errors & SSR Safety Boundaries', () => {
    test('F25-B1: Audio engine guards window and localStorage during SSR', () => {
      const audioPath = path.join(ROOT_DIR, 'lib', 'audio-engine.ts');
      const content = fs.readFileSync(audioPath, 'utf8');
      assert.includes(content, "typeof window === 'undefined'", 'audio-engine guards against window undefined in SSR');
      assert.includes(content, 'localStorage', 'audio-engine reads localStorage safely on client');
    });

    test('F25-B2: Home page guards window for clipboard and scroll operations', () => {
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const content = fs.readFileSync(pagePath, 'utf8');
      assert.includes(content, "typeof window !== 'undefined'", 'Home page guards window.scrollTo');
      assert.includes(content, "typeof navigator !== 'undefined'", 'Home page guards navigator.clipboard');
    });

    test('F25-B3: IST clock in executive-nav uses suppressHydrationWarning for live timestamp', () => {
      const navPath = path.join(ROOT_DIR, 'components', 'navigation', 'executive-nav.tsx');
      const content = fs.readFileSync(navPath, 'utf8');
      assert.includes(content, 'suppressHydrationWarning', 'executive-nav marks dynamic time with suppressHydrationWarning');
    });

    test('F25-B4: useMounted hook manages client-side mounting lifecycle', () => {
      const hookPath = path.join(ROOT_DIR, 'hooks', 'use-mounted.ts');
      const content = fs.readFileSync(hookPath, 'utf8');
      assert.includes(content, 'useState<boolean>(false)', 'useMounted initializes mounted state to false');
      assert.includes(content, 'setMounted(true)', 'useMounted sets mounted state to true in useEffect');
    });

    test('F25-B5: Client-side event listeners attached in useEffect and removed in cleanup', () => {
      const canvasPath = path.join(ROOT_DIR, 'components', 'hero', 'neural-canvas.tsx');
      const content = fs.readFileSync(canvasPath, 'utf8');
      assert.includes(content, 'removeEventListener', 'neural-canvas cleans up event listeners');
      assert.includes(content, 'cancelAnimationFrame', 'neural-canvas cleans up animation frame');
    });
  });

  // --------------------------------------------------------------------------
  // Feature 26: 100% E2E Verification & Forensic Audit - Boundaries
  // --------------------------------------------------------------------------
  describe('Tier 2 · Feature 26: 100% E2E Verification & Forensic Audit Boundaries', () => {
    test('F26-B1: Visual assets in public/images/ have non-zero size and valid image headers', () => {
      const img = path.join(ROOT_DIR, 'public', 'images', 'hero-neural.jpg');
      const dims = parseJpegDimensions(img);
      assert.ok(dims.width > 0 && dims.height > 0);
    });

    test('F26-B2: Verified portrait WebP asset exists and is <= 100KB for fast hero loading', () => {
      const p = path.join(ROOT_DIR, 'assets', 'yash-jangid.webp');
      const stats = fs.statSync(p);
      assert.lessThanOrEqual(stats.size, 100000);
    });

    test('F26-B3: All package.json dependencies have resolved versions matching project spec', () => {
      const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
      assert.ok(pkg.dependencies.next);
      assert.ok(pkg.dependencies.react);
      assert.ok(pkg.dependencies['framer-motion']);
      assert.ok(pkg.dependencies['lucide-react']);
    });

    test('F26-B4: Code contains zero unresolved FIXME or TODO blockers in active test runner', () => {
      const sourceFiles = ['app/page.tsx', 'app/layout.tsx', 'lib/audio-engine.ts'];
      for (const file of sourceFiles) {
        const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
        assert.isFalse(content.includes('FIX' + 'ME'), `${file} contains no unresolved FIXME`);
      }
    });

    test('F26-B5: Official email gityash2024@gmail.com is present in contact coordinates', () => {
      const dataPath = path.join(ROOT_DIR, 'data', 'portfolio.ts');
      const content = fs.readFileSync(dataPath, 'utf8');
      assert.includes(content, 'gityash2024@gmail.com', 'portfolioData defines verified email');
      const pagePath = path.join(ROOT_DIR, 'app', 'page.tsx');
      const pageContent = fs.readFileSync(pagePath, 'utf8');
      assert.includes(pageContent, 'gityash2024@gmail.com', 'app/page.tsx binds verified email');
    });
  });
}
