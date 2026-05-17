<script>
  import ContentBlock from '../layout/ContentBlock.svelte';
  import cards from '$lib/paylines/packs-paylines.json';
  import PacksCard from './PacksCard.svelte';
</script>

<p class="mt-5 mb-2 text-center text-base sm:text-lg">
  Float &rarr; Card Correlation Table
  <span class="block text-sm text-gray-600 italic dark:text-white">(reference point)</span>
</p>

<ContentBlock className="p-5 text-xs mb-5">
  <div class="relative mt-5 text-xs sm:text-sm">
    <div class="overflow-x-auto pb-3">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th
              class="sticky left-0 z-10 min-w-[100px] bg-gray-300 p-2 text-left opacity-85 sm:min-w-[115px] dark:bg-gray-700"
            >
              Card
            </th>
            {#each cards as card}
              <td class="p-2">
                <div class="w-32 bg-gray-300 dark:bg-gray-700">
                  <PacksCard cardId={card.cardId} />
                </div>
              </td>
            {/each}
          </tr>
        </thead>
        <tbody class="text-center">
          <tr>
            <th class="sticky left-0 z-10 bg-gray-300 p-2 text-left opacity-85 dark:bg-gray-700">
              Card No
            </th>
            {#each cards as _, n (n)}
              <td class="p-2 text-2xl">
                {n + 1}
              </td>
            {/each}
          </tr>
          <tr>
            <th class="sticky left-0 z-10 bg-gray-300 p-2 text-left opacity-85 dark:bg-gray-700">
              Min Bound
            </th>
            {#each cards as card, n (n)}
              <td class="p-2">
                {card.min}
              </td>
            {/each}
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</ContentBlock>
