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

const testCases = getTestCases();

test('dart test cases', async ({ page }) => {
  await page.goto('/?game=darts&delay=0');

  page.on('console', (msg) => {
    console.log(`[browser console] ${msg.type()}: ${msg.text()}`);
  });

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

    // fill client seed
    const clientSeedInput = page.getByLabel('Client Seed*');
    await clientSeedInput.fill(clientSeed);

    // fill server seed
    const serverSeedInput = page.getByLabel('Server Seed*');
    await serverSeedInput.fill(serverSeed);

    // fill difficulty
    const difficultySelect = page.getByLabel('Difficulty');
    await difficultySelect.selectOption(difficulty);

    // fill nonce
    const nonceInput = page.getByLabel('Nonce*');
    await nonceInput.fill('' + nonce);

    // wait for result - use toFixed(3) to match displayed precision
    const rotationResult = page.getByTestId('rotation');
    await expect(rotationResult).toContainText(rotation.toFixed(3));

    const distanceResult = page.getByTestId('distance');
    await expect(distanceResult).toContainText(distance.toFixed(3));

    const pixelColorResult = page.getByTestId('pixelColor');
    await expect(pixelColorResult).toContainText(pixelColor);

    const multiResult = page.getByTestId('multi');
    await expect(multiResult).toContainText('' + multiplier);

    console.log(
      `passed (clientSeed=${clientSeed} serverSeed=${serverSeed} nonce=${nonce} difficulty=${difficulty})`
    );
  }
});
