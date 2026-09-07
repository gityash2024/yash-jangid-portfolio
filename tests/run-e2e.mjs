// tests/run-e2e.mjs
// Master E2E Test Suite Runner for Yash Jangid Portfolio Modernization
// Usage: node tests/run-e2e.mjs

import fs from 'node:fs';
import { executeAllTests, describe, test, assert, createMockEnvironment } from './test-helpers.mjs';
import { registerTier1Tests } from './tier1-features.mjs';
import { registerTier2Tests } from './tier2-boundaries.mjs';
import { registerTier3Tests } from './tier3-combinations.mjs';
import { registerTier4Tests } from './tier4-scenarios.mjs';

// Baseline Simulator & Environment Verification
describe('Interactive Simulators & Baseline Verification', () => {
  test('Harness: Mock environment instantiates DOM, LocalStorage, and AudioContext stubs', () => {
    const env = createMockEnvironment();
    assert.ok(env.localStorage, 'LocalStorage stub created');
    assert.ok(env.MockAudioContext, 'MockAudioContext stub created');
    assert.ok(env.MockCanvasRenderingContext2D, 'MockCanvasRenderingContext2D stub created');
  });

  test('Harness: All 4 test tier registrations exist and load without syntax errors', () => {
    assert.strictEqual(typeof registerTier1Tests, 'function');
    assert.strictEqual(typeof registerTier2Tests, 'function');
    assert.strictEqual(typeof registerTier3Tests, 'function');
    assert.strictEqual(typeof registerTier4Tests, 'function');
  });
});

// Register all 4 tiers of comprehensive tests
registerTier1Tests();
registerTier2Tests();
registerTier3Tests();
registerTier4Tests();

// Execute test suite
executeAllTests()
  .then((results) => {
    if (results.failed > 0) {
      console.error(`\n❌ Test suite failed with ${results.failed} errors:`);
      if (results.failedList) {
        fs.writeFileSync('tests/failures.json', JSON.stringify(results.failedList, null, 2));
        for (const f of results.failedList) {
          console.error(`  - [${f.test}] -> ${f.error}`);
        }
      }
      process.exit(1);
    } else {
      if (fs.existsSync('tests/failures.json')) {
        try { fs.unlinkSync('tests/failures.json'); } catch {}
      }
      console.log(`\n✅ All ${results.total} tests passed successfully! (100% pass rate)`);
      process.exit(0);
    }
  })
  .catch((err) => {
    console.error('Fatal error during test runner execution:', err);
    process.exit(1);
  });
