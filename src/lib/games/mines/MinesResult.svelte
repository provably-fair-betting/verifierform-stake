<script lang="ts">
  import { useMinesPositions } from './use-mines-positions.svelte';
  import MinesBoard from '$lib/games/mines/MinesBoard.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const mines = useMinesPositions(() => formValues);
  const chosenMines = $derived(mines.items?.map((item) => item.chosen) ?? null);
</script>

{#if mines.isCalculating}
  <Loader />
{:else}
  <p data-testid="mines-result" class="hidden">
    {chosenMines!.join(', ')}
  </p>

  <ContentBlock className="p-4">
    <MinesBoard chosenMines={chosenMines!} />
  </ContentBlock>
{/if}
