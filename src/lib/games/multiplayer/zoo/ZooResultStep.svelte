<script lang="ts">
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';
  import HighlightText from '$lib/games/layout/HighlightText.svelte';
  import ZooAnimalIcon from './ZooAnimalIcon.svelte';
  import { getZooAnimals, ANIMAL_SLOTS } from './zoo';

  const { stepNumber, hmac }: { stepNumber: number; hmac: string } = $props();
  const animals = $derived(getZooAnimals(hmac));
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-5 text-lg">Determine animals from HMAC windows</p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Method</p>
      <p class="leading-relaxed">
        Use first <span class="font-bold text-blue-600 dark:text-blue-400">24</span>
        hex chars, split into
        <span class="font-bold text-blue-600 dark:text-blue-400">3</span>
        windows of
        <span class="font-bold text-blue-600 dark:text-blue-400">8</span>
        chars.
      </p>
      <p class="leading-relaxed">For each window: animal = lookup(parseInt(window, 16) % 20)</p>
    </div>

    {#each animals as result, i}
      <div
        class="mb-6 {i < animals.length - 1
          ? 'border-b border-gray-300 pb-4 dark:border-gray-600'
          : ''}"
      >
        <div class="mb-2 flex items-center gap-3">
          <ZooAnimalIcon animal={result.animal} class="h-10 w-10" />
          <p class="font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
            Animal {i + 1} — window {i + 1}
          </p>
        </div>
        <p class="leading-relaxed">
          window = hmac[{i * 8}..{i * 8 + 7}] = <HighlightText>{result.window}</HighlightText>
        </p>
        <p class="leading-relaxed">
          int = parseInt(<HighlightText>{result.window}</HighlightText>, 16) =
          <span class="font-bold text-blue-600 dark:text-blue-400">{result.int}</span>
        </p>
        <p class="leading-relaxed">
          slot = <HighlightText>{result.int}</HighlightText> % 20 =
          <span class="font-bold text-blue-600 dark:text-blue-400">{result.slot}</span>
        </p>
        <p class="leading-relaxed font-bold">
          animal = <span class="text-green-600 capitalize dark:text-green-400">
            {result.animal}
          </span>
        </p>
      </div>
    {/each}

    <div class="mt-4 border-t border-gray-300 pt-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Reference — animal slots out of 20
      </p>
      <table class="w-full text-left text-xs">
        <thead>
          <tr class="text-gray-500 dark:text-gray-400">
            <th class="pr-3 pb-2">Icon</th>
            <th class="pr-3 pb-2">Slot(s)</th>
            <th class="pr-3 pb-2">Animal</th>
            <th class="pb-2">Chance</th>
          </tr>
        </thead>
        <tbody>
          {#each ANIMAL_SLOTS as row}
            <tr>
              <td class="py-1 pr-3">
                <ZooAnimalIcon animal={row.animal} class="h-6 w-6" />
              </td>
              <td class="py-1 pr-3"><code>{row.slots}</code></td>
              <td class="py-1 pr-3 capitalize"><code>{row.animal}</code></td>
              <td class="py-1"><code>{row.chance}</code></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </ContentBlock>
</div>
