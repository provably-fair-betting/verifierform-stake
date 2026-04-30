/**
 * MCP-based script to generate Darts test cases from the local preview app.
 *
 * Runs against localhost:4173 (vite preview) with ?delay=0 to eliminate the
 * 350 ms debounce — making generation ~20× faster than scraping stake.com.
 * No Cloudflare verification required.
 *
 * Prerequisites: run `pnpm build` once before using this script.
 *
 * Usage:
 *   node scripts/generate-darts-testcases-mcp.js --clientSeed=<seed> --serverSeed=<seed> [--nonces=200]
 *
 * Example:
 *   node scripts/generate-darts-testcases-mcp.js \
 *     --clientSeed="2Gb-U__XyD" \
 *     --serverSeed="fad1d904fc884b817775353e8969741728d50b509cfdb0e2d854730ee21e446e" \
 *     --nonces=200
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import readline from 'readline';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command-line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const params = {
    clientSeed: null,
    serverSeed: null,
    nonces: 200,
  };

  for (const arg of args) {
    const [key, value] = arg.split('=');
    if (key === '--clientSeed') params.clientSeed = value;
    if (key === '--serverSeed') params.serverSeed = value;
    if (key === '--nonces') params.nonces = parseInt(value, 10);
  }

  if (!params.clientSeed || !params.serverSeed) {
    console.error('Error: --clientSeed and --serverSeed are required\n');
    console.log('Usage:');
    console.log('  node scripts/generate-darts-testcases-mcp.js \\');
    console.log('    --clientSeed=<seed> \\');
    console.log('    --serverSeed=<seed> \\');
    console.log('    [--nonces=200]\n');
    process.exit(1);
  }

  return params;
}

function waitForEnter(message = 'Press ENTER when ready... ') {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(message, () => {
      rl.close();
      resolve();
    });
  });
}

async function generateDartsTestCases() {
  const params = parseArgs();

  console.log('🚀 Starting Darts test case generator via MCP Playwright...\n');
  console.log(`Client Seed: ${params.clientSeed}`);
  console.log(`Server Seed: ${params.serverSeed}`);
  console.log(`Nonces: 0–${params.nonces - 1} (${params.nonces} total)`);
  console.log(`Difficulties: easy, medium, hard, expert\n`);

  const url = `https://stake.com/provably-fair/calculation?game=darts&clientSeed=${params.clientSeed}&serverSeed=${params.serverSeed}&nonce=0&dartsDifficulty=easy`;

  const transport = new StdioClientTransport({
    command: 'npx',
    args: ['@playwright/mcp@latest'],
    stderr: 'pipe',
  });

  const client = new Client(
    {
      name: 'darts-testcase-generator',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  try {
    console.log('📡 Connecting to MCP Playwright server...');
    await client.connect(transport);
    console.log('✅ Connected\n');

    console.log('📖 Opening Stake Darts calculation page...');
    await client.callTool({
      name: 'browser_navigate',
      arguments: { url },
    });

    console.log('✅ Page opened\n');
    console.log('⏳ Please complete Cloudflare verification if prompted...');
    await waitForEnter('\nPress ENTER once the page is fully loaded... ');

    // Extract all difficulties × all nonces in one browser_run_code call.
    //
    // Strategy: for each nonce, set the nonce input once, then cycle through all
    // 4 difficulty selectors — reading rotation, distance, and dart color after
    // each difficulty change. The color→multiplier lookup is embedded in the
    // browser so no extra round-trips are needed.
    //
    // Waiting strategy: after setting the nonce input we wait for the
    // .dart-wrapper's --distance CSS custom property to change. Svelte sets this
    // synchronously on re-render (it's an inline style, not an animation), so the
    // MutationObserver fires almost immediately — no setTimeout fallback needed in
    // the hot path. Rotation and distance are nonce-only values; difficulty only
    // affects colour zone boundaries, so we compute all 4 difficulties from the
    // same (rotation, distance) pair using inlined colorForDart logic, with zero
    // extra DOM interactions per nonce.
    console.log('\n🔄 Generating test cases for all difficulties and nonces...\n');

    const allResults = await client.callTool({
      name: 'browser_run_code',
      arguments: {
        code: `async (page) => {
          return await page.evaluate(async (params) => {
            const { clientSeed, serverSeed, nonces, difficulties, dartPayTables } = params;

            // ── Wait helper ───────────────────────────────────────────────────────
            // When the nonce input changes, Svelte shows a <Loader /> immediately
            // (the debouncer fires with debouncing=true on the next tick) which
            // REMOVES .dart-wrapper from the DOM. Then after 350 ms the debounce
            // resolves, Svelte re-renders with the new result, and .dart-wrapper
            // is re-inserted with the new --distance / --rotation style values.
            //
            // Strategy: observe document.body broadly and wait until .dart-wrapper
            // is present in the DOM AND its style differs from the pre-input snapshot.
            // This means we skip straight past the Loader phase and resolve only
            // once the final result is rendered — at the fastest possible moment.
            //
            // The 500 ms fallback only triggers if two consecutive nonces produce
            // identical --distance / --rotation values (practically impossible).

            const getDartStyle = () => {
              const w = document.querySelector('.dart-wrapper');
              return w ? w.getAttribute('style') : null;
            };

            const waitForNewResult = (prevStyle) => {
              return new Promise((resolve) => {
                const check = () => {
                  const s = getDartStyle();
                  // Must be present (not null/Loader) AND different from before
                  return s !== null && s !== prevStyle;
                };
                if (check()) { resolve(); return; }

                const observer = new MutationObserver(() => {
                  if (check()) { observer.disconnect(); clearTimeout(timer); resolve(); }
                });
                observer.observe(document.body, {
                  childList: true,
                  subtree: true,
                  attributes: true
                });
                const timer = setTimeout(() => { observer.disconnect(); resolve(); }, 500);
              });
            };

            const setAndWait = async (selector, value) => {
              const el = document.querySelector(selector);
              if (!el) return;
              const prevStyle = getDartStyle();
              el.value = value;
              el.dispatchEvent(new Event('input', { bubbles: true }));
              el.dispatchEvent(new Event('change', { bubbles: true }));
              await waitForNewResult(prevStyle);
            };

            // ── Colour logic — ported directly from src/lib/util/darts.ts ─────────
            // Inlined so we can derive all 4 difficulties from one DOM read per nonce.

            const wedgeColor = (rotation) => {
              const bin = Math.floor((((rotation % 1) + 1) % 1) * 360 / 20);
              if ([1, 5, 9, 13, 15].includes(bin)) return '#fb6120';
              if ([3, 7, 11, 17].includes(bin)) return '#fb053f';
              return '#fcc101';
            };
            const hardWedgeColor = (rotation) => {
              const bin = Math.floor((((rotation % 1) + 1) % 1) * 360 / 20);
              if ([1, 3, 7, 9, 13, 15].includes(bin)) return '#fb6120';
              if ([5, 11, 17].includes(bin)) return '#fb053f';
              return '#fcc101';
            };
            const expertWedgeColor = (rotation) => {
              const bin = Math.floor((((rotation % 1) + 1) % 1) * 360 / 20);
              if ([1, 7, 10, 16].includes(bin)) return '#fb6120';
              if ([4, 13].includes(bin)) return '#fb053f';
              return '#fcc101';
            };
            const colorForDart = (difficulty, rotation, normDist) => {
              const r = normDist * 1000;
              if (difficulty === 'easy') {
                if (r <= 62.5) return '#24e700';
                if (r <= 275)  return '#0e202c';
                if (r <= 375)  return '#213843';
                if (r <  450)  return wedgeColor(rotation);
                return '#0e202c';
              }
              if (difficulty === 'medium') {
                if (r <= 50)  return '#24e700';
                if (r <= 225) return '#0e202c';
                if (r <= 350) return '#213843';
                if (r <  400) return wedgeColor(rotation);
                return '#0e202c';
              }
              if (difficulty === 'hard') {
                if (r <= 30)  return '#24e700';
                if (r <= 200) return '#0e202c';
                if (r <= 330) return '#213843';
                if (r <  375) return hardWedgeColor(rotation);
                return '#0e202c';
              }
              // expert
              if (r <= 10)  return '#24e700';
              if (r <= 250) return '#0e202c';
              if (r <= 355) return '#213843';
              if (r <  375) return expertWedgeColor(rotation);
              return '#0e202c';
            };

            // ── Extract values ────────────────────────────────────────────────────
            // Both --distance and --rotation on .dart-wrapper are the CSS-adjusted
            // values from getCssRotation() / normalisedDistance, not the originals.
            //
            // --distance = normalisedDistance = sqrt(rawDist) / 2  → rawDist = (normDist*2)²
            //
            // --rotation = getCssRotation(r) = -(atan2(-cos(2πr), sin(2πr)) / 2π)
            // Inverted: rawRotation = cssRot * -1 gives atan2 result / 2π, so
            //   atan2val = cssRot * -2π
            //   sin(2πr) = sin(atan2val + π/2) = cos(atan2val)
            //   rawRotation = asin(cos(atan2val)) / 2π  — but this loses quadrant.
            // Simpler: atan2(-cos(2πr), sin(2πr)) = 2πr - π/2
            //   so 2πr = atan2val + π/2 → r = atan2val/(2π) + 0.25
            // where atan2val = cssRot * -2π = -cssRot * 2π
            // Therefore: rawRotation = (-cssRot * 2π + π/2) / (2π) = 0.25 - cssRot
            //
            // Verification: if cssRot = getCssRotation(r) = -(atan2(-cos(2πr),sin(2πr))/2π)
            // and atan2(-cos(θ),sin(θ)) = θ - π/2 for θ=2πr, then
            // cssRot = -(2πr - π/2)/2π = -r + 0.25, so r = 0.25 - cssRot ✓
            const extractValues = () => {
              const wrapper = document.querySelector('.dart-wrapper');
              if (!wrapper) return null;
              const style = wrapper.getAttribute('style') || '';
              const distMatch = style.match(/--distance:\s*([^;]+)/);
              const rotMatch  = style.match(/--rotation:\s*([^;]+)/);
              if (!distMatch || !rotMatch) return null;

              // --distance is already normalisedDistance
              const normDist = parseFloat(distMatch[1]);
              // rawDist = (normDist * 2)^2
              const distance = Math.pow(normDist * 2, 2);

              // Invert getCssRotation: rawRotation = 0.25 - cssRotation
              const cssRotation = parseFloat(rotMatch[1]);
              const rotation = 0.25 - cssRotation;

              return { rotation, distance, normDist };
            };

            // ── Main loop — ONE wait per nonce ────────────────────────────────────
            const allTestCases = [];

            for (let nonce = 0; nonce < nonces; nonce++) {
              await setAndWait('[data-testid="calculation-input-nonce"]', nonce.toString());

              const values = extractValues();
              if (!values) {
                for (const difficulty of difficulties) {
                  allTestCases.push({ nonce, difficulty, error: 'Could not extract result' });
                }
                continue;
              }

              for (const difficulty of difficulties) {
                const pixelColor = colorForDart(difficulty, values.rotation, values.normDist);
                const multiplier = dartPayTables[difficulty][pixelColor];
                allTestCases.push({
                  clientSeed,
                  serverSeed,
                  nonce,
                  difficulty,
                  rotation: values.rotation,
                  distance: values.distance,
                  pixelColor,
                  multiplier
                });
              }
            }

            return allTestCases;
          }, {
            clientSeed: ${JSON.stringify(params.clientSeed)},
            serverSeed: ${JSON.stringify(params.serverSeed)},
            nonces: ${params.nonces},
            difficulties: ['easy', 'medium', 'hard', 'expert'],
            dartPayTables: {
              easy:   { '#0e202c': 0.5, '#213843': 0.8, '#fcc101': 1.2, '#fb6120': 1.5, '#fb053f': 2.7, '#24e700': 8.5 },
              medium: { '#0e202c': 0.4, '#213843': 0.6, '#fcc101': 1.3, '#fb6120': 3.1, '#fb053f': 6,   '#24e700': 16  },
              hard:   { '#0e202c': 0.2, '#213843': 0.5, '#fcc101': 2.5, '#fb6120': 3.6, '#fb053f': 8.8, '#24e700': 63  },
              expert: { '#0e202c': 0.1, '#213843': 0.5, '#fcc101': 4.8, '#fb6120': 9.6, '#fb053f': 42,  '#24e700': 500 }
            }
          });
        }`,
      },
    });

    // ── Parse result ───────────────────────────────────────────────────────────
    const resultText = allResults.content[0].text;

    if (resultText.includes('### Error')) {
      const errorStart = resultText.indexOf('### Error\n') + '### Error\n'.length;
      const errorEnd = resultText.indexOf('\n###', errorStart);
      const errorMsg = resultText
        .substring(errorStart, errorEnd > 0 ? errorEnd : resultText.length)
        .trim();
      throw new Error(errorMsg);
    }

    const jsonStart = resultText.indexOf('### Result\n') + '### Result\n'.length;
    const jsonEnd = resultText.indexOf('\n### Ran Playwright code');
    const allTestCases = JSON.parse(resultText.substring(jsonStart, jsonEnd));

    // ── Report & write file ────────────────────────────────────────────────────
    const errors = allTestCases.filter((c) => c.error);
    const successes = allTestCases.filter((c) => !c.error);

    for (const difficulty of ['easy', 'medium', 'hard', 'expert']) {
      const count = successes.filter((c) => c.difficulty === difficulty).length;
      const errCount = errors.filter((c) => c.difficulty === difficulty).length;
      console.log(
        `📊 ${difficulty}: ${count} successes${errCount > 0 ? `, ${errCount} errors` : ''}`
      );
    }
    errors.forEach((e) => console.log(`  ✗ Nonce ${e.nonce} (${e.difficulty}): ${e.error}`));

    const outputDir = path.join(__dirname, '..', 'e2e', 'generated');
    mkdirSync(outputDir, { recursive: true });

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, '-')
      .replace('T', '_')
      .split('.')[0];
    const outputPath = path.join(outputDir, `darts-testcases-${timestamp}.json`);
    writeFileSync(outputPath, JSON.stringify(successes, null, 2), 'utf-8');

    console.log(`\n✅ ${successes.length} test cases written to: ${outputPath}\n`);

    console.log('✨ Done! Press ENTER to close the browser...');
    await waitForEnter();
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n✨ Cleanup complete!');
  }
}

generateDartsTestCases().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
