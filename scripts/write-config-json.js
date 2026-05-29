import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const url = process.env.BET_LOOKUP_URL || 'http://localhost:8080';
writeFileSync(join(root, 'static', 'config.json'), JSON.stringify({ betLookupUrl: url }));
