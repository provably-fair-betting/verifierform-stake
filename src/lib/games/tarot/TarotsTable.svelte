<script lang="ts">
  import ContentBlock from '../layout/ContentBlock.svelte';
  import { getCards } from '$lib/games/tarot/tarot';
  import { TarotDifficulty, TarotArcanaType } from '$lib/types';
  import type { TarotCard } from '$lib/types';

  const { difficulty }: { difficulty: TarotDifficulty } = $props();

  const minorArcanaCards: TarotCard[] = $derived(getCards(difficulty, TarotArcanaType.MINOR));
  const majorArcanaCards: TarotCard[] = $derived(getCards(difficulty, TarotArcanaType.MAJOR));
</script>

<p class="mt-5 mb-1 text-center text-base sm:text-lg">Float &rarr; Card Correlation Table</p>
<p class="mb-2 text-center text-sm text-gray-600 italic dark:text-white">(reference point)</p>

<ContentBlock className="p-5 text-xs mb-5">
  <div class="relative mt-5 text-xs sm:text-sm">
    <h3 class="mb-3 text-lg font-semibold">Minor Arcana (Cards 1 & 3)</h3>
    <div class="mb-8 overflow-x-auto pb-3">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th
              class="sticky left-0 z-10 min-w-[100px] bg-gray-300 p-2 text-left opacity-85 sm:min-w-[115px] dark:bg-gray-700"
            >
              Outcome
            </th>
            {#each minorArcanaCards as _, n (n)}
              <th class="p-2 text-center font-medium">#{n + 1}</th>
            {/each}
          </tr>
        </thead>
        <tbody class="text-center">
          <tr>
            <th class="sticky left-0 z-10 bg-gray-300 p-2 text-left opacity-85 dark:bg-gray-700">
              Min Bound
            </th>
            {#each minorArcanaCards as card, n (n)}
              <td class="p-2">
                {card.min}
              </td>
            {/each}
          </tr>
          <tr>
            <th class="sticky left-0 z-10 bg-gray-300 p-2 text-left opacity-85 dark:bg-gray-700">
              Multiplier
            </th>
            {#each minorArcanaCards as card, n (n)}
              <td class="p-2 font-semibold">
                {card.multiplier}x
              </td>
            {/each}
          </tr>
        </tbody>
      </table>
    </div>

    <h3 class="mb-3 text-lg font-semibold">Major Arcana (Card 2)</h3>
    <div class="overflow-x-auto pb-3">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th
              class="sticky left-0 z-10 min-w-[100px] bg-gray-300 p-2 text-left opacity-85 sm:min-w-[115px] dark:bg-gray-700"
            >
              Outcome
            </th>
            {#each majorArcanaCards as _, n (n)}
              <td class="p-2 text-center">#{n + 1}</td>
            {/each}
          </tr>
        </thead>
        <tbody class="text-center">
          <tr>
            <th class="sticky left-0 z-10 bg-gray-300 p-2 text-left opacity-85 dark:bg-gray-700">
              Min Bound
            </th>
            {#each majorArcanaCards as card, n (n)}
              <td class="p-2">
                {card.min}
              </td>
            {/each}
          </tr>
          <tr>
            <th class="sticky left-0 z-10 bg-gray-300 p-2 text-left opacity-85 dark:bg-gray-700">
              Multiplier
            </th>
            {#each majorArcanaCards as card, n (n)}
              <td class="p-2 font-semibold">
                {card.multiplier}x
              </td>
            {/each}
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</ContentBlock>
