import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { writeFileSync, mkdirSync } from 'fs';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// ASSET_PATH_NONCES from packs-assets-extractor.test.ts
const ASSET_PATH_NONCES = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27,
  28, 29, 30, 31, 32, 34, 35, 36, 40, 41, 44, 45, 46, 48, 49, 50, 53, 55, 56, 57, 59, 60, 62, 63,
  65, 66, 67, 69, 70, 72, 74, 75, 77, 79, 81, 82, 83, 84, 85, 91, 95, 96, 98, 100, 102, 106, 107,
  110, 126, 133, 139, 142, 146, 154, 156, 163, 171, 183, 197, 206, 208, 212, 214, 217, 227, 241,
  248, 279, 286, 311, 316, 319, 326, 331, 343, 359, 363, 364, 397, 411, 420, 426, 430, 438, 481,
  499, 512, 554, 608, 629, 634, 639, 658, 750, 759, 824, 974, 1008, 1013, 1136, 1143, 1279, 1338,
  1372, 1438, 1647, 1677, 1684, 1743, 1807, 1838, 1937, 2130, 2269, 2323, 3178, 3261, 3623, 6731,
  6963, 8544, 15487, 29639, 34266, 38891, 39866, 45326, 48283, 130624, 147753, 2024111,
];

const CLIENT_SEED = '2Gb-U__XyD';
const SERVER_SEED = 'fad1d904fc884b817775353e8969741728d50b509cfdb0e2d854730ee21e446e';
const TARGET_URL = `https://stake.com/provably-fair/calculation?game=packs&clientSeed=${CLIENT_SEED}&serverSeed=${SERVER_SEED}&nonce=0`;

async function main() {
  console.log('🚀 Starting pack assets fetcher via MCP Playwright...\n');

  // Create MCP client
  const transport = new StdioClientTransport({
    command: 'npx',
    args: ['@playwright/mcp@latest'],
    stderr: 'pipe',
  });

  const client = new Client(
    { name: 'packs-asset-fetcher', version: '1.0.0' },
    { capabilities: { tools: {} } }
  );

  try {
    console.log('📡 Connecting to MCP Playwright server...');
    await client.connect(transport);
    console.log('✅ Connected\n');

    // Navigate to packs calculation page
    console.log('📖 Opening Stake Packs calculation page...');
    await client.callTool({
      name: 'browser_navigate',
      arguments: { url: TARGET_URL },
    });

    console.log('✅ Page opened\n');
    console.log('⏳ Please complete Cloudflare verification if prompted...');
    await waitForEnter('\nPress ENTER once the page is fully loaded... ');

    // Extract all assets in a single browser_run_code call
    console.log('\n🔄 Extracting assets from all nonces...\n');

    const assetsResult = await client.callTool({
      name: 'browser_run_code',
      arguments: {
        code: `async (page) => {
          return await page.evaluate(async (params) => {
            const { nonces } = params;

            // Fingerprint all cards together — concatenate each card-content's first
            // meaningful token (img src or first 64 chars of innerHTML for SVG cards).
            // A collision requires every card to match across two consecutive nonces,
            // which is practically impossible.
            const getFingerprint = () => {
              const cardsContainer = document.querySelector('.cards-container');
              if (!cardsContainer) return null;
              const cards = cardsContainer.querySelectorAll('.card-content');
              if (!cards.length) return null;
              return Array.from(cards).map((card) => {
                const img = card.querySelector('img');
                if (img && img.src) return img.src;
                const svg = card.querySelector('svg');
                if (svg) return svg.innerHTML.slice(0, 64);
                return card.innerHTML.slice(0, 64);
              }).join('|');
            };

            // Wait until the fingerprint differs from the snapshot taken before the nonce
            // was changed. Falls back after 5 s so we never hang.
            const waitForCardsToChange = (prevFingerprint) => {
              return new Promise((resolve) => {
                // Already changed (or first load where prevFingerprint is null)
                const current = getFingerprint();
                if (current !== null && current !== prevFingerprint) {
                  resolve();
                  return;
                }

                const observer = new MutationObserver(() => {
                  const fp = getFingerprint();
                  if (fp !== null && fp !== prevFingerprint) {
                    observer.disconnect();
                    clearTimeout(timer);
                    resolve();
                  }
                });

                observer.observe(document.body, {
                  childList: true,
                  subtree: true,
                  attributes: true,
                  characterData: true
                });

                const timer = setTimeout(() => {
                  observer.disconnect();
                  resolve();
                }, 5000);
              });
            };

            const setInputAndWait = async (selector, value) => {
              const element = document.querySelector(selector);
              if (!element) return;
              const prevFingerprint = getFingerprint();
              element.value = value;
              element.dispatchEvent(new Event('input', { bubbles: true }));
              element.dispatchEvent(new Event('change', { bubbles: true }));
              await waitForCardsToChange(prevFingerprint);
            };

            // Each card-content holds either an <img> or a <div><svg>…</svg></div>.
            // Collect both kinds from every card-content element.
            const extractAssets = () => {
              const cardsContainer = document.querySelector('.cards-container');
              if (!cardsContainer) return { imgs: [], svgs: [] };

              const imgs = [];
              const svgs = [];

              cardsContainer.querySelectorAll('.card-content').forEach((card) => {
                const img = card.querySelector('img');
                if (img && img.src) {
                  imgs.push(img.src);
                } else {
                  const svg = card.querySelector('svg');
                  if (svg) svgs.push(svg.outerHTML);
                }
              });

              return { imgs, svgs };
            };

            const allImgs = new Set();
            const allSvgs = [];

            for (const nonce of nonces) {
              await setInputAndWait('[data-testid="calculation-input-nonce"]', nonce.toString());
              const assets = extractAssets();

              assets.imgs.forEach(img => allImgs.add(img));
              assets.svgs.forEach(svg => {
                if (!allSvgs.includes(svg)) allSvgs.push(svg);
              });
            }

            return {
              imgs: Array.from(allImgs),
              svgs: allSvgs
            };
          }, { nonces: ${JSON.stringify(ASSET_PATH_NONCES)} });
        }`,
      },
    });

    // Parse the result
    const resultText = assetsResult.content[0].text;

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
    const jsonString = resultText.substring(jsonStart, jsonEnd);
    const assets = JSON.parse(jsonString);

    console.log(`✅ Found ${assets.imgs.length} unique image assets`);
    console.log(`✅ Found ${assets.svgs.length} unique SVG assets\n`);

    // Create output directory
    const outputDir = path.join(__dirname, '..', 'src', 'generated', 'packs-assets');
    mkdirSync(outputDir, { recursive: true });

    // Download all images in a single browser_run_code call — all fetches run concurrently
    // inside the browser so they share the CF-cleared session, and we only pay one MCP
    // round-trip regardless of how many URLs there are.
    console.log('⬇️  Downloading image assets...');
    const downloadResult = await client.callTool({
      name: 'browser_run_code',
      arguments: {
        code: `async (page) => {
          return await page.evaluate(async (urls) => {
            const results = await Promise.all(
              urls.map(async (url) => {
                try {
                  const res = await fetch(url);
                  if (!res.ok) return { url, error: 'HTTP ' + res.status };
                  const buffer = await res.arrayBuffer();
                  // btoa works on binary strings; convert via Uint8Array
                  const bytes = new Uint8Array(buffer);
                  let binary = '';
                  for (const b of bytes) binary += String.fromCharCode(b);
                  return { url, base64: btoa(binary) };
                } catch (e) {
                  return { url, error: e.message };
                }
              })
            );
            return results;
          }, ${JSON.stringify(assets.imgs)});
        }`,
      },
    });

    const dlText = downloadResult.content[0].text;
    if (dlText.includes('### Error')) {
      const errStart = dlText.indexOf('### Error\n') + '### Error\n'.length;
      const errEnd = dlText.indexOf('\n###', errStart);
      throw new Error(dlText.substring(errStart, errEnd > 0 ? errEnd : dlText.length).trim());
    }

    const dlJsonStart = dlText.indexOf('### Result\n') + '### Result\n'.length;
    const dlJsonEnd = dlText.indexOf('\n### Ran Playwright code');
    const downloadedFiles = JSON.parse(dlText.substring(dlJsonStart, dlJsonEnd));

    let dlSuccess = 0;
    let dlError = 0;
    for (const item of downloadedFiles) {
      if (item.error) {
        console.error(`  ✗ Failed to download ${item.url}: ${item.error}`);
        dlError++;
        continue;
      }
      // Derive filename from the last path segment, stripping the cache-buster hash.
      // e.g. "https://stake.com/_app/immutable/assets/c155.9lPoPZh1.svg" → "c155.svg"
      const segment = item.url.split('/').pop() ?? '';
      const name = segment.replace(/\.[^.]+(\.[^.]+)$/, '$1'); // "c155.9lPoPZh1.svg" → "c155.svg"
      if (!name) continue;
      const outputPath = path.join(outputDir, name);
      writeFileSync(outputPath, Buffer.from(item.base64, 'base64'));
      dlSuccess++;
    }
    console.log(`  ✓ Downloaded ${dlSuccess} images${dlError > 0 ? `, ${dlError} failed` : ''}\n`);

    // Save inline SVG files
    console.log('\n💾 Saving SVG assets...');
    assets.svgs.forEach((svg, index) => {
      const name = `c001.svg`;
      const outputPath = path.join(outputDir, name);
      writeFileSync(outputPath, svg);
    });

    console.log(`\n✅ All assets saved to: ${outputDir}\n`);

    console.log('✨ Done! Press ENTER to close the browser...');
    await waitForEnter();
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n✨ Cleanup complete!');
  }
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
