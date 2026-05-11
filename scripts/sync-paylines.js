#!/usr/bin/env node
import { existsSync, readdirSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { spawnSync } from 'node:child_process';

const outputDir = './src/lib/paylines';

if (existsSync(outputDir)) {
  const files = readdirSync(outputDir).filter((f) => f.endsWith('.json'));
  console.warn(`\nWarning: ${outputDir} already exists with ${files.length} payline file(s):`);
  for (const file of files) console.warn(`  - ${file}`);
  console.warn('\nThese files will be overwritten by the sync.');

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((resolve) => rl.question('Continue? (y/N) ', resolve));
  rl.close();

  if (answer.trim().toLowerCase() !== 'y') {
    console.log('Aborted.');
    process.exit(0);
  }
  console.log('');
}

const result = spawnSync('stake-paylines', ['--output-dir', outputDir], { stdio: 'inherit', shell: true });
process.exitCode = result.status ?? 1;
