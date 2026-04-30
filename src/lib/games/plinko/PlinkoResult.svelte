<script lang="ts">
  import { usePlinkoPayout } from './use-plinko-payout.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const plinko = usePlinkoPayout(() => formValues);
</script>

{#if plinko.isCalculating}
  <Loader />
{:else}
  <ContentBlock className="p-4">
    <!-- Result display -->
    <div class="flex items-center justify-center">
      <div
        class="flex items-center justify-center rounded border-2 border-green-500 bg-green-50 px-6 py-4 text-center ring-2 ring-green-400 dark:border-green-400 dark:bg-green-900/30 dark:ring-green-500"
      >
        <div class="flex flex-col items-center gap-1">
          <span class="text-xs font-medium text-green-600 dark:text-green-400">Payout</span>
          <span class="text-2xl font-bold text-green-800 dark:text-green-300">
            {plinko.payout}x
          </span>
        </div>
      </div>
    </div>
  </ContentBlock>
{/if}
