<script lang="ts">
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import KenoResultStep from '$lib/games/keno/KenoResultStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import { useKenoNumbers } from './use-keno-numbers.svelte';
  import { getKenoTabClass, getKenoTabSelectedClass } from '$lib/games/keno/keno';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  let resultIndex = $state(0);
  const keno = useKenoNumbers(() => formValues);
</script>

<div class="mt-8 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if keno.isCalculating || !keno.items}
      <Loader />
    {:else}
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">
            Keno numbers drawn in the order shown below.
          </span>
          Click a number to see how it was generated using Stake's provably fair algorithm.
        </p>
      </ContentBlock>

      <div class="mb-7 overflow-x-auto overflow-y-visible" style="padding: 4px 6px 0 4px;">
        <div class="flex gap-2 pb-5" style="min-width: max-content;">
          {#each keno.items as item, i}
            <button
              type="button"
              class={i === resultIndex ? getKenoTabSelectedClass() : getKenoTabClass()}
              onclick={() => (resultIndex = i)}
            >
              <span class="font-bold">{item.chosen}</span>
            </button>
          {/each}
        </div>
      </div>

      {@const selectedItem = keno.items[resultIndex]}

      <FloatGenerationStep
        stepNumber={1}
        {resultIndex}
        seed={keno.seed!}
        float={selectedItem.float}
      />
      <KenoResultStep stepNumber={2} {resultIndex} {...selectedItem} />
    {/if}
  </div>
</div>
