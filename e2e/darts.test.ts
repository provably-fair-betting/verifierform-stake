import { expect, test } from '@playwright/test';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const getTestCases = () => {
  // __dirname equivalent in ESM
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Read file relative to the test file
  const filePath = path.join(__dirname, 'testfiles', 'darts-all-testcases.json');
  return JSON.parse(readFileSync(filePath, 'utf-8'));
};

// Full correctness is verified in tests/lib/games/darts/darts.test.ts.
// E2E only needs enough cases to confirm the UI wires the calculation correctly.
const testCases = getTestCases().slice(0, 4);

test('dart test cases', async ({ page }) => {
  await page.goto('/?game=darts&delay=0');

  page.on('console', (msg) => {
    console.log(`[browser console] ${msg.type()}: ${msg.text()}`);
  });

  // Cache locators once — same elements across all iterations
  const clientSeedInput = page.getByLabel('Client Seed*');
  const serverSeedInput = page.getByLabel('Server Seed*');
  const difficultySelect = page.getByLabel('Difficulty');
  const nonceInput = page.getByLabel('Nonce*');
  const rotationResult = page.getByTestId('rotation');
  const distanceResult = page.getByTestId('distance');
  const pixelColorResult = page.getByTestId('pixelColor');
  const multiResult = page.getByTestId('multi');

  let prevClientSeed = '';
  let prevServerSeed = '';

  for (const testCase of testCases) {
    const {
      clientSeed,
      serverSeed,
      nonce,
      difficulty,
      rotation,
      distance,
      pixelColor,
      multiplier,
    } = testCase;

    if (clientSeed !== prevClientSeed) {
      await clientSeedInput.fill(clientSeed);
      prevClientSeed = clientSeed;
    }
    if (serverSeed !== prevServerSeed) {
      await serverSeedInput.fill(serverSeed);
      prevServerSeed = serverSeed;
    }
    await difficultySelect.selectOption(difficulty);
    await nonceInput.fill('' + nonce);

    // Assert all results in parallel
    await Promise.all([
      expect(rotationResult).toContainText(rotation.toFixed(3)),
      expect(distanceResult).toContainText(distance.toFixed(3)),
      expect(pixelColorResult).toContainText(pixelColor),
      expect(multiResult).toContainText('' + multiplier),
    ]);

    console.log(
      `passed (clientSeed=${clientSeed} serverSeed=${serverSeed} nonce=${nonce} difficulty=${difficulty})`
    );
  }
});
