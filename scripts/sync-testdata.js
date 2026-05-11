#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { spawnSync } from 'node:child_process';

const outputDir = './tests/lib/games/testcases';

if (existsSync(outputDir)) {
  console.warn(`\nWarning: ${outputDir} already exists and testcases have already been generated.`);
  console.warn('These files will be overwritten by the sync.');

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((resolve) => rl.question('Continue? (y/N) ', resolve));
  rl.close();

  if (answer.trim().toLowerCase() !== 'y') {
    console.log('Aborted.');
    process.exit(0);
  }
  console.log('');
}

const result = spawnSync('stake-testdata', ['--output-dir', outputDir], { stdio: 'inherit', shell: true });
process.exitCode = result.status ?? 1;
