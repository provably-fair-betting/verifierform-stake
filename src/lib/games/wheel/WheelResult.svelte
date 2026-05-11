<script lang="ts">
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import { useWheelSpin } from './use-wheel-spin.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const wheel = useWheelSpin(() => formValues);
</script>

{#if wheel.isCalculating}
  <Loader />
{:else}
  <ContentBlock className="p-4">
    <div class="flex items-center justify-center">
      <div
        class="flex items-center justify-center rounded border-2 border-green-500 bg-green-50 px-6 py-4 dark:border-green-400 dark:bg-green-900/30"
      >
        <div class="flex flex-col items-center gap-1">
          <span class="text-xs font-medium text-green-600 dark:text-green-400">Payout</span>
          <span data-testid="wheel-result" class="text-2xl font-bold text-green-800 dark:text-green-300">{wheel.payout}x</span>
        </div>
      </div>
    </div>
  </ContentBlock>

  <ContentBlock className="mt-4 p-4">
    <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Wheel Segments</p>
    <div class="grid auto-cols-auto grid-flow-col gap-2">
      {#each wheel.payline as multi, n (n)}
        <div
          class={[
            'flex flex-col items-center justify-center rounded border-2 px-3 py-2',
            multi === wheel.payout!
              ? 'border-green-500 bg-green-50 font-bold text-green-800 ring-2 ring-green-400 dark:border-green-400 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-500'
              : 'border-gray-300 bg-gray-100 text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400',
          ]}
        >
          <span class="text-[10px] text-gray-500 dark:text-gray-500">{n}</span>
          <span class="text-sm font-semibold">{multi}x</span>
        </div>
      {/each}
    </div>
  </ContentBlock>
{/if}
