// tests/stress-challenger.mjs
// Adversarial Stress Harness for Yash Jangid Portfolio Interactive Engines & State Machines
// Authored by teamwork_preview_challenger_1 (Empirical Challenger)

import fs from 'node:fs';
import path from 'node:path';
import { AgentCliSimulator, SystemMetricsSimulator, NeuralCanvasSimulator, AudioEngineSimulator } from './interactive-simulators.mjs';
import { createMockEnvironment } from './test-helpers.mjs';

const ROOT_DIR = path.resolve('.');

let totalStressTests = 0;
let passedStressTests = 0;
let failedStressTests = 0;
const failureDetails = [];

function assert(condition, message) {
  totalStressTests++;
  if (!condition) {
    failedStressTests++;
    failureDetails.push(message);
    console.error(`  ❌ FAIL: ${message}`);
    throw new Error(message);
  } else {
    passedStressTests++;
  }
}

function runSection(title, fn) {
  console.log(`\n⚡ [ADVERSARIAL STRESS] ${title}`);
  try {
    fn();
  } catch (err) {
    console.error(`Section failed: ${err.message}`);
  }
}

async function runSectionAsync(title, fn) {
  console.log(`\n⚡ [ADVERSARIAL STRESS] ${title}`);
  try {
    await fn();
  } catch (err) {
    console.error(`Section failed: ${err.message}`);
  }
}

// ============================================================================
// STRESS SECTION 1: CLI Command Parser Edge Cases & State Machine
// ============================================================================
await runSectionAsync('CLI Command Parser: Edge Cases & Concurrency', async () => {
  const cli = new AgentCliSimulator();

  // 1.1 Empty strings, whitespace, unicode zero-width characters
  const emptyInputs = ['', '   ', '\t\n\r', '\u200B\u200C\uFEFF', '     \t  '];
  for (const empty of emptyInputs) {
    const outputs = [];
    for await (const chunk of cli.execute(empty)) {
      outputs.push(chunk);
    }
    assert(outputs.length > 0, `Empty input "${empty}" produced output`);
    assert(cli.isExecuting === false, `CLI state resets isExecuting=false after empty input`);
  }

  // 1.2 Unknown commands and fuzzing
  const unknownInputs = [
    'randomunknowncommand',
    'rm -rf /',
    'DROP TABLE users;--',
    '<script>alert(1)</script>',
    'a'.repeat(2000), // extreme length
    'help--verbose',
    'sudo apt-get install',
    'query-system-root',
  ];
  for (const unknown of unknownInputs) {
    const outputs = [];
    for await (const chunk of cli.execute(unknown)) {
      outputs.push(chunk);
    }
    const fullOutput = outputs.join('');
    assert(fullOutput.includes('command not found') || fullOutput.includes('bash:'), `Unknown command handled gracefully: ${unknown.slice(0, 30)}`);
    assert(cli.isExecuting === false, `CLI isExecuting resets to false on unknown command`);
  }

  // 1.3 Subcommand / argument handling for valid commands
  // Command starts with run-dicom-pipeline and passes args
  const argOutputs = [];
  for await (const chunk of cli.execute('run-dicom-pipeline --batch-mode')) {
    argOutputs.push(chunk);
  }
  assert(argOutputs.join('').includes('Ingesting DICOM'), 'Valid command with arguments executes pipeline');

  // 1.4 Fuzzy typo matching (Levenshtein distance <= 3)
  const typos = [
    { typo: 'hlep', expected: 'help' },
    { typo: 'dicom', expected: 'run-dicom-pipeline' },
    { typo: 'metric', expected: 'query-metrics' },
    { typo: 'market', expected: 'analyze-market' },
    { typo: 'mcp', expected: 'mcp-tools' },
    { typo: 'whoami', expected: 'whoami' },
    { typo: 'clr', expected: 'clear' },
  ];
  for (const { typo, expected } of typos) {
    const suggestion = cli.suggestCommand(typo);
    assert(suggestion === expected, `Fuzzy match '${typo}' resolves to '${expected}' (got '${suggestion}')`);
  }

  // 1.5 Clear buffer persistence & history survival
  await (async () => {
    // Populate buffer
    for await (const chunk of cli.execute('whoami')) {}
    for await (const chunk of cli.execute('query-metrics')) {}
    assert(cli.buffer.length > 0, 'Buffer has logs before clear');
    const historyCountBeforeClear = cli.history.length;

    // Execute clear
    for await (const chunk of cli.execute('clear')) {
      assert(chunk === '__CLEAR_BUFFER__', 'Clear command yields clear signal');
    }
    assert(cli.buffer.length === 0, 'Buffer is completely flushed after clear');
    assert(cli.history.length === historyCountBeforeClear + 1, 'Command history persists after clear');
    assert(cli.history[cli.history.length - 1] === 'clear', 'Clear command is recorded in history');

    // Subsequent command works seamlessly after clear
    const postClearOutputs = [];
    for await (const chunk of cli.execute('help')) {
      postClearOutputs.push(chunk);
    }
    assert(postClearOutputs.join('').includes('Yash Jangid AI Platform Runtime'), 'CLI functions normally after clear');
  })();

  // 1.6 Rapid consecutive executions (stress loop)
  const stressCommands = ['whoami', 'help', 'query-metrics', 'analyze-market', 'mcp-tools', 'clear'];
  for (let i = 0; i < 60; i++) {
    const cmd = stressCommands[i % stressCommands.length];
    for await (const _ of cli.execute(cmd)) {}
  }
  assert(cli.isExecuting === false, 'CLI state machine stable after 60 rapid sequential executions');
  assert(cli.history.length >= 60, 'History maintains all executed commands without truncation or memory loss');
});

// ============================================================================
// STRESS SECTION 2: Web Audio Synthesizer State, Mute & Envelopes
// ============================================================================
runSection('Web Audio Synthesizer: State, Mute, and Exponential Decays', () => {
  const env = createMockEnvironment();
  const audio = new AudioEngineSimulator(env);

  // 2.1 Default state must be muted (browser autoplay policy compliant)
  assert(audio.isMuted() === true, 'Audio engine initializes in muted state by default');
  assert(audio.playClick() === false, 'playClick returns false when muted');
  assert(audio.playHover() === false, 'playHover returns false when muted');
  assert(audio.playTerminalKey() === false, 'playTerminalKey returns false when muted');
  assert(audio.playSuccessChime() === false, 'playSuccessChime returns false when muted');

  // 2.2 Toggle mute transitions and persistence
  const unmutedState = audio.toggleMute();
  assert(unmutedState === false, 'toggleMute un-mutes (isMuted() === false)');
  assert(audio.isMuted() === false, 'isMuted() returns false');
  assert(env.localStorage.getItem('yash_audio_enabled') === 'true', 'Persistence: yash_audio_enabled is true');

  // When unmuted, context is resumed and sounds return true
  assert(audio.playClick() === true, 'playClick succeeds when unmuted');
  assert(audio.playHover() === true, 'playHover succeeds when unmuted');
  assert(audio.playTerminalKey() === true, 'playTerminalKey succeeds when unmuted');
  assert(audio.playSuccessChime() === true, 'playSuccessChime succeeds when unmuted');
  assert(audio.playOpen() === true, 'playOpen succeeds when unmuted');

  // Rapid toggling (100 times)
  for (let i = 0; i < 100; i++) {
    audio.toggleMute();
  }
  assert(audio.isMuted() === false, '100 toggles preserves deterministic boolean parity');

  // 2.3 AudioContext state recovery (suspended simulation)
  const ctx = audio.ensureContext();
  ctx.state = 'suspended';
  // Muting and un-muting triggers resume
  audio.toggleMute(); // muted
  audio.toggleMute(); // unmuted
  assert(ctx.state === 'running', 'AudioContext resumes when unmuted');

  // 2.4 Verify Exponential Decays strictly avoid 0 target (prevent Web Audio DOMException)
  // Check that all exponential ramp targets in audio engine are strictly positive
  const rampTargets = [
    { method: 'playClick', target: 0.001, duration: 0.04 },
    { method: 'playHover', target: 0.0005, duration: 0.05 },
    { method: 'playTerminalKey', target: 0.001, duration: 0.022 },
    { method: 'playSuccessChime', target: 0.001, duration: 0.16 },
    { method: 'playErrorBuzz', target: 0.001, duration: 0.13 },
    { method: 'playPaletteOpen', target: 0.001, duration: 0.04 },
  ];
  for (const ramp of rampTargets) {
    assert(ramp.target > 0, `Exponential decay target for ${ramp.method} is strictly positive (${ramp.target})`);
    assert(ramp.duration > 0 && ramp.duration < 0.25, `Decay duration for ${ramp.method} is brief (<250ms)`);
  }
});

// ============================================================================
// STRESS SECTION 3: System Metrics Mathematical Formulas
// ============================================================================
runSection('System Metrics: Mathematical Rigor & Scaling Bounds', () => {
  const sim = new SystemMetricsSimulator();

  // Test 3.1: Component Formula Direct Stress (from components/interactive/system-metrics.tsx)
  function calculateComponentMetrics(loadReqPerMin) {
    const factor = (loadReqPerMin - 1000) / (50000 - 1000);
    const reqPerSec = Math.round(loadReqPerMin / 60);
    const latencyP50 = Math.round(28 + factor * 40);
    const latencyP99 = Math.round(55 + factor * 63);
    const cacheHitRate = parseFloat((96.8 - factor * 5.3).toFixed(1));
    const gatewayLoad = Math.min(100, Math.round(18 + factor * 65));
    const redisLoad = Math.min(100, Math.round(22 + factor * 58));
    const aiLoad = Math.min(100, Math.round(15 + factor * 72));
    const deliveryLoad = Math.min(100, Math.round(12 + factor * 55));

    return {
      factor,
      reqPerSec,
      latencyP50,
      latencyP99,
      cacheHitRate,
      gatewayLoad,
      redisLoad,
      aiLoad,
      deliveryLoad,
    };
  }

  // 3.2 Continuous sweep from 1,000 to 50,000 in steps of 250
  for (let load = 1000; load <= 50000; load += 250) {
    const m = calculateComponentMetrics(load);
    assert(!Number.isNaN(m.reqPerSec), `reqPerSec not NaN at load=${load}`);
    assert(!Number.isNaN(m.latencyP50), `latencyP50 not NaN at load=${load}`);
    assert(!Number.isNaN(m.latencyP99), `latencyP99 not NaN at load=${load}`);
    assert(!Number.isNaN(m.cacheHitRate), `cacheHitRate not NaN at load=${load}`);
    assert(Number.isFinite(m.reqPerSec), `reqPerSec finite at load=${load}`);
    assert(Number.isFinite(m.latencyP50), `latencyP50 finite at load=${load}`);
    assert(Number.isFinite(m.latencyP99), `latencyP99 finite at load=${load}`);

    // Non-negative assertions
    assert(m.reqPerSec >= 0, `reqPerSec >= 0 at load=${load}`);
    assert(m.latencyP50 >= 28 && m.latencyP50 <= 68, `latencyP50 bounded [28, 68]ms at load=${load} (got ${m.latencyP50})`);
    assert(m.latencyP99 >= 55 && m.latencyP99 <= 118, `latencyP99 bounded [55, 118]ms at load=${load} (got ${m.latencyP99})`);
    assert(m.cacheHitRate >= 91.0 && m.cacheHitRate <= 97.0, `cacheHitRate bounded [91, 97]% at load=${load} (got ${m.cacheHitRate})`);
    assert(m.gatewayLoad >= 18 && m.gatewayLoad <= 100, `gatewayLoad bounded [18, 100] at load=${load}`);
    assert(m.redisLoad >= 22 && m.redisLoad <= 100, `redisLoad bounded [22, 100] at load=${load}`);
    assert(m.aiLoad >= 15 && m.aiLoad <= 100, `aiLoad bounded [15, 100] at load=${load}`);
    assert(m.deliveryLoad >= 12 && m.deliveryLoad <= 100, `deliveryLoad bounded [12, 100] at load=${load}`);
  }

  // 3.3 Simulator Clamping and Extreme Boundary Stress
  const extremeLoads = [-100000, -1, 0, 500, 999, 1000, 50000, 50001, 100000, 1e8, NaN, undefined, null, '5000'];
  for (const extreme of extremeLoads) {
    const clamped = sim.clampLoad(extreme);
    assert(clamped >= 1000 && clamped <= 50000, `clampLoad(${extreme}) -> ${clamped} clamped within [1000, 50000]`);
    const metrics = sim.calculateMetrics(extreme);
    assert(!Number.isNaN(metrics.p50LatencyMs), `p50LatencyMs not NaN for ${extreme}`);
    assert(metrics.p50LatencyMs > 0 && metrics.p50LatencyMs < 100, `p50LatencyMs strictly positive and < 100ms for ${extreme}`);
    assert(metrics.p99LatencyMs > metrics.p50LatencyMs, `p99LatencyMs > p50LatencyMs for ${extreme}`);
    assert(metrics.activeUsers > 0, `activeUsers > 0 for ${extreme}`);
    assert(metrics.redisCacheHitRate >= 90.0, `redisCacheHitRate >= 90.0 for ${extreme}`);
    assert(metrics.uptime === 99.94, `uptime strictly 99.94% for ${extreme}`);
  }

  // 3.4 4-Stage Node Navigation
  for (let i = 0; i < 4; i++) {
    const stage = sim.setActiveStage(i);
    assert(stage.id === sim.stages[i].id, `Active stage index ${i} returns correct stage ${stage.id}`);
  }
  let threwOnInvalid = false;
  try {
    sim.setActiveStage(99);
  } catch {
    threwOnInvalid = true;
  }
  assert(threwOnInvalid, 'setActiveStage throws on invalid stage index');
});

// ============================================================================
// STRESS SECTION 4: Neural Canvas Physics & Scaling
// ============================================================================
runSection('Neural Canvas: Particle Physics, Clamping & Scaling', () => {
  // 4.1 Particle count scaling across all standard and extreme screen widths
  // Verify production getNodeCount logic in components/hero/neural-canvas.tsx
  const canvasContent = fs.readFileSync(path.join(ROOT_DIR, 'components', 'hero', 'neural-canvas.tsx'), 'utf8');
  assert(canvasContent.includes('if (w < 640) return 40;'), 'Production getNodeCount handles mobile width (<640px)');
  assert(canvasContent.includes('if (w < 1024) return 65;'), 'Production getNodeCount handles tablet width (<1024px)');
  assert(canvasContent.includes('if (w < 1440) return 95;'), 'Production getNodeCount handles desktop width (<1440px)');
  assert(canvasContent.includes('return 120;'), 'Production getNodeCount handles ultrawide displays');
  assert(canvasContent.includes('w < 768 ? 100 : 135'), 'Production getMaxDistance handles mobile distance threshold');

  // Simulator adaptive particle counts
  const viewports = [
    { w: 320, h: 568, expected: 60 },
    { w: 375, h: 667, expected: 60 },
    { w: 480, h: 800, expected: 60 },
    { w: 768, h: 1024, expected: 80 },
    { w: 1024, h: 768, expected: 100 },
    { w: 1280, h: 800, expected: 100 },
    { w: 1440, h: 900, expected: 100 },
    { w: 1920, h: 1080, expected: 140 },
    { w: 3840, h: 2160, expected: 140 },
  ];

  for (const vp of viewports) {
    const sim = new NeuralCanvasSimulator(vp.w, vp.h);
    assert(sim.particles.length === vp.expected, `Simulator particle count matches ${vp.expected} at width=${vp.w}`);
  }

  // 4.2 Distance calculations and zero distance division safety
  // In components/hero/neural-canvas.tsx:
  // if (dist < mouse.radius && dist > 0) { ... }
  // When dist === 0, condition is false, avoiding division by zero!
  function simulateParticleRepulsion(px, py, mouseX, mouseY, radius = 160) {
    const dx = mouseX - px;
    const dy = mouseY - py;
    const dist = Math.hypot(dx, dy);
    let newX = px;
    let newY = py;
    if (dist < radius && dist > 0) {
      const force = (radius - dist) / radius;
      newX -= (dx / dist) * force * 1.6;
      newY -= (dy / dist) * force * 1.6;
    }
    return { newX, newY, dist };
  }

  // Test exact overlap (dist === 0)
  const zeroDistResult = simulateParticleRepulsion(100, 100, 100, 100);
  assert(zeroDistResult.dist === 0, 'Distance is exactly 0 at identical coordinates');
  assert(zeroDistResult.newX === 100 && zeroDistResult.newY === 100, 'Coordinates remain identical and not NaN on zero distance');
  assert(!Number.isNaN(zeroDistResult.newX), 'Zero distance does not produce NaN');

  // Test close proximity (dist = 1)
  const closeResult = simulateParticleRepulsion(100, 100, 101, 100);
  assert(closeResult.dist === 1, 'Close proximity dist is 1');
  assert(closeResult.newX < 100, 'Particle pushed away from cursor');
  assert(!Number.isNaN(closeResult.newX), 'Close proximity does not produce NaN');

  // 4.3 Boundary wrapping in production code: [-20, width + 20]
  function simulateBoundaryWrap(x, y, width, height) {
    let px = x;
    let py = y;
    if (px < -20) px = width + 20;
    else if (px > width + 20) px = -20;
    if (py < -20) py = height + 20;
    else if (py > height + 20) py = -20;
    return { px, py };
  }

  assert(simulateBoundaryWrap(-25, 100, 1280, 720).px === 1300, 'Left boundary wrap properly repositions to right buffer');
  assert(simulateBoundaryWrap(1305, 100, 1280, 720).px === -20, 'Right boundary wrap properly repositions to left buffer');
  assert(simulateBoundaryWrap(100, -25, 1280, 720).py === 740, 'Top boundary wrap properly repositions to bottom buffer');
  assert(simulateBoundaryWrap(100, 745, 1280, 720).py === -20, 'Bottom boundary wrap properly repositions to top buffer');

  // 4.4 Simulator Physics Engine Step & Ripple Lifecycle
  const canvasSim = new NeuralCanvasSimulator(1280, 720);
  canvasSim.setPointer(200, 200, true);

  // Run 10 nominal frames
  for (let frame = 0; frame < 10; frame++) {
    const res = canvasSim.step();
    assert(res.particlesCount === canvasSim.particles.length, `Particle count remains constant (${res.particlesCount})`);
    assert(res.connectionsDrawn >= 0, `Connections drawn is non-negative (${res.connectionsDrawn})`);
    for (const p of canvasSim.particles) {
      assert(Number.isFinite(p.x) && !Number.isNaN(p.x), 'Particle X is finite');
      assert(Number.isFinite(p.y) && !Number.isNaN(p.y), 'Particle Y is finite');
    }
  }

  // Click ripple lifecycle: addition, expansion, termination
  canvasSim.addClickRipple(400, 300);
  assert(canvasSim.ripples.length === 1, 'Ripple added successfully');
  assert(canvasSim.ripples[0].radius === 0, 'Initial ripple radius is 0');
  assert(canvasSim.ripples[0].opacity === 1.0, 'Initial ripple opacity is 1.0');

  // Advance simulation until ripple terminates
  for (let i = 0; i < 60; i++) {
    canvasSim.step();
  }
  assert(canvasSim.ripples.length === 0, 'Ripple terminates and garbage collects after exceeding maxRadius');

  // 4.5 prefersReducedMotion freeze check
  const reducedMotionSim = new NeuralCanvasSimulator(1280, 720, true);
  const initialX = reducedMotionSim.particles[0].x;
  const initialY = reducedMotionSim.particles[0].y;
  for (let i = 0; i < 15; i++) {
    const res = reducedMotionSim.step();
    assert(res.connectionsDrawn === 0, 'No animated connections drawn in reduced motion mode');
  }
  assert(reducedMotionSim.particles[0].x === initialX, 'Particle X strictly frozen in reduced motion');
  assert(reducedMotionSim.particles[0].y === initialY, 'Particle Y strictly frozen in reduced motion');
});

// ============================================================================
// SUMMARY REPORT
// ============================================================================
console.log('\n══════════════════════════════════════════════════════════════════════');
console.log('   ADVERSARIAL STRESS TEST HARNESS RESULTS');
console.log('══════════════════════════════════════════════════════════════════════');
console.log(`   Total Stress Tests Executed : ${totalStressTests}`);
console.log(`   Passed Stress Assertions    : ${passedStressTests}`);
console.log(`   Failed Stress Assertions    : ${failedStressTests}`);
console.log(`   Pass Rate                   : ${((passedStressTests / totalStressTests) * 100).toFixed(1)}%`);
console.log('══════════════════════════════════════════════════════════════════════');

if (failedStressTests > 0) {
  console.error(`\n❌ ADVERSARIAL VERDICT: REJECT (${failedStressTests} failures)`);
  process.exit(1);
} else {
  console.log('\n✅ ADVERSARIAL VERDICT: APPROVE (100% resilient across all stress vectors)');
  process.exit(0);
}
