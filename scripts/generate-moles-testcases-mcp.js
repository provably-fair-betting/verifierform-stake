/**
 * MCP-based script to generate Moles test cases from Stake's calculation page
 *
 * This script uses MCP Playwright to avoid Cloudflare automation detection.
 *
 * Usage:
 *   node scripts/generate-moles-testcases-mcp.js --clientSeed=<seed> --serverSeed=<seed> [--noncesPerMoleCount=5]
 *
 * Example:
 *   node scripts/generate-moles-testcases-mcp.js \
 *     --clientSeed="test-seed" \
 *     --serverSeed="abc123def456" \
 *     --noncesPerMoleCount=10
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import readline from 'readline';
import { writeFile } from 'fs/promises';

// Parse command-line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const params = {
    clientSeed: null,
    serverSeed: null,
    noncesPerMoleCount: 5,
  };

  for (const arg of args) {
    const [key, value] = arg.split('=');
    if (key === '--clientSeed') params.clientSeed = value;
    if (key === '--serverSeed') params.serverSeed = value;
    if (key === '--noncesPerMoleCount') params.noncesPerMoleCount = parseInt(value, 10);
  }

  if (!params.clientSeed || !params.serverSeed) {
    console.error('Error: --clientSeed and --serverSeed are required\n');
    console.log('Usage:');
    console.log('  node scripts/generate-moles-testcases-mcp.js \\');
    console.log('    --clientSeed=<seed> \\');
    console.log('    --serverSeed=<seed> \\');
    console.log('    [--noncesPerMoleCount=5]\n');
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

async function generateMolesTestCases() {
  const params = parseArgs();

  console.log('🚀 Starting Moles test case generator via MCP Playwright...\n');
  console.log(`Client Seed: ${params.clientSeed}`);
  console.log(`Server Seed: ${params.serverSeed}`);
  console.log(`Nonces per mole count: ${params.noncesPerMoleCount}\n`);

  const url = `https://stake.com/provably-fair/calculation?game=moles&clientSeed=${params.clientSeed}&serverSeed=${params.serverSeed}&nonce=0`;

  // Create MCP client
  // Note: MCP Playwright may output diagnostic info to stderr which we inherit
  const transport = new StdioClientTransport({
    command: 'npx',
    args: ['@playwright/mcp@latest'],
    stderr: 'pipe', // Pipe stderr so we can suppress it selectively
  });

  const client = new Client(
    {
      name: 'moles-testcase-generator',
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

    // Navigate to the page
    console.log('📖 Opening Stake Moles calculation page...');
    await client.callTool({
      name: 'browser_navigate',
      arguments: { url },
    });

    console.log('✅ Page opened\n');
    console.log('⏳ Please complete Cloudflare verification if prompted...');
    await waitForEnter('\nPress ENTER once the page is fully loaded... ');

    // Extract ALL test cases in a single browser_run_code call for maximum performance
    console.log('\n🔄 Generating test cases for all mole counts...\n');

    const allResults = await client.callTool({
      name: 'browser_run_code',
      arguments: {
        code: `async (page) => {
          return await page.evaluate(async (params) => {
            const { clientSeed, serverSeed, moleCounts, noncesPerMoleCount } = params;
            const allTestCases = [];

            // Helper: Find the result paragraph
            const findResultParagraph = () => {
              return Array.from(document.querySelectorAll('p')).find(p =>
                p.textContent.includes('Values: [[')
              );
            };

            // Helper: Wait for result paragraph to update
            const waitForResultUpdate = () => {
              return new Promise((resolve) => {
                const resultParagraph = findResultParagraph();

                if (!resultParagraph) {
                  // If no result paragraph exists yet, wait for it to appear
                  const observer = new MutationObserver(() => {
                    if (findResultParagraph()) {
                      observer.disconnect();
                      resolve();
                    }
                  });
                  observer.observe(document.body, { childList: true, subtree: true });
                  setTimeout(() => { observer.disconnect(); resolve(); }, 1000);
                  return;
                }

                // Store the current result
                const currentResult = resultParagraph.textContent;

                // Set up mutation observer to watch for changes
                const observer = new MutationObserver(() => {
                  if (resultParagraph.textContent !== currentResult) {
                    observer.disconnect();
                    resolve();
                  }
                });

                observer.observe(resultParagraph, {
                  childList: true,
                  characterData: true,
                  subtree: true
                });

                // Timeout fallback
                setTimeout(() => {
                  observer.disconnect();
                  resolve();
                }, 500);
              });
            };

            // Helper: Set input value and wait for result update
            const setInputAndWait = async (selector, value) => {
              const element = document.querySelector(selector);
              if (element) {
                element.value = value;
                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new Event('change', { bubbles: true }));
                await waitForResultUpdate();
              }
            };

            // Iterate through mole counts and nonces
            for (const molesCount of moleCounts) {
              // Set the moles count
              await setInputAndWait('[data-testid="calculation-select-molesCount"]', molesCount.toString());

              for (let nonce = 0; nonce < noncesPerMoleCount; nonce++) {
                // Set the nonce
                await setInputAndWait('[data-testid="calculation-input-nonce"]', nonce.toString());

                // Extract the result
                const resultParagraph = findResultParagraph();

                if (!resultParagraph) {
                  allTestCases.push({ molesCount, nonce, error: 'Could not find result paragraph' });
                  continue;
                }

                const match = resultParagraph.textContent.match(/Values: (\\[\\[.*?\\]\\])/);
                if (!match) {
                  allTestCases.push({ molesCount, nonce, error: 'Could not parse result' });
                  continue;
                }

                allTestCases.push({ molesCount, nonce, result: JSON.parse(match[1]) });
              }
            }

            return allTestCases;
          }, {
            moleCounts: [1, 2, 3, 4, 5, 6],
            noncesPerMoleCount: ${params.noncesPerMoleCount}
          });
        }`,
      },
    });

    // Extract and process all results
    const resultText = allResults.content[0].text;

    // Check if this is an error response
    if (resultText.includes('### Error')) {
      const errorStart = resultText.indexOf('### Error\n') + '### Error\n'.length;
      const errorEnd = resultText.indexOf('\n###', errorStart);
      const errorMsg = resultText
        .substring(errorStart, errorEnd > 0 ? errorEnd : resultText.length)
        .trim();
      console.log(`✗ Processing failed: ${errorMsg}`);
      throw new Error(errorMsg);
    }

    const jsonStart = resultText.indexOf('### Result\n') + '### Result\n'.length;
    const jsonEnd = resultText.indexOf('\n### Ran Playwright code');
    const jsonString = resultText.substring(jsonStart, jsonEnd);
    const allTestCases = JSON.parse(jsonString);

    // Process and display results
    const testCases = [];
    let currentMoleCount = null;
    let successCount = 0;
    let errorCount = 0;

    for (const item of allTestCases) {
      // Log progress for each new mole count
      if (item.molesCount !== currentMoleCount) {
        if (currentMoleCount !== null) {
          console.log(`  ✓ Completed ${successCount} successful, ${errorCount} errors\n`);
        }
        currentMoleCount = item.molesCount;
        successCount = 0;
        errorCount = 0;
        console.log(`🔄 Mole count ${currentMoleCount}:`);
      }

      if (item.error) {
        console.log(`  ✗ Nonce ${item.nonce}: ${item.error}`);
        errorCount++;
        continue;
      }

      testCases.push({
        clientSeed: params.clientSeed,
        serverSeed: params.serverSeed,
        nonce: item.nonce,
        molesCount: item.molesCount,
        result: item.result,
      });
      successCount++;
    }

    // Final summary
    if (currentMoleCount !== null) {
      console.log(`  ✓ Completed ${successCount} successful, ${errorCount} errors\n`);
    }

    console.log(`\n✅ Generated ${testCases.length} test cases\n`);

    // Generate the test file content
    let output = `// Generated test cases for Moles\n`;
    output += `// Generated at: ${new Date().toISOString()}\n`;
    output += `// Client Seed: ${params.clientSeed}\n`;
    output += `// Server Seed: ${params.serverSeed}\n\n`;
    output += `it.each([\n`;

    testCases.forEach((tc, index) => {
      const resultString = JSON.stringify(tc.result);
      output += `  [\n`;
      output += `    '${tc.clientSeed}',\n`;
      output += `    '${tc.serverSeed}',\n`;
      output += `    ${tc.nonce},\n`;
      output += `    ${tc.molesCount},\n`;
      output += `    ${resultString}\n`;
      output += `  ]${index < testCases.length - 1 ? ',' : ''}\n`;
    });

    output += `])(\n`;
    output += `  'renders the correct results (clientseed=%s, serverseed=%s, nonce=%s, molesCount=%s)',\n`;
    output += `  async (clientseed, serverseed, nonce, molesCount, expectedResult) => {\n`;
    output += `    const formValues = {\n`;
    output += `      nonce,\n`;
    output += `      clientseed,\n`;
    output += `      serverseed,\n`;
    output += `      molesCount,\n`;
    output += `      game: 'moles'\n`;
    output += `    } as Record<string, unknown>;\n\n`;
    output += `    const screen = render(MolesResult, { formValues });\n`;
    output += `    vi.advanceTimersByTime(350);\n\n`;
    output += `    const resultElement = await screen.findByTestId('moles-result');\n`;
    output += `    const actualResult = JSON.parse(resultElement.textContent || '[]');\n\n`;
    output += `    // Sort both results for comparison since order doesn't matter\n`;
    output += `    const sortedActual = actualResult.map((round: number[]) => [...round].sort((a, b) => a - b));\n`;
    output += `    const sortedExpected = expectedResult.map((round) => [...round].sort((a, b) => a - b));\n\n`;
    output += `    expect(sortedActual).toEqual(sortedExpected);\n`;
    output += `  }\n`;
    output += `);\n`;

    // Save to file with timestamp
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, '-')
      .replace('T', '_')
      .split('.')[0];
    const filename = `tests/generated/moles-testcases-${timestamp}.ts`;

    await writeFile(filename, output);
    console.log(`💾 Test file saved to: ${filename}\n`);

    console.log('✨ Done! Press ENTER to close the browser...');
    await waitForEnter();
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n✨ Cleanup complete!');
  }
}

generateMolesTestCases().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
