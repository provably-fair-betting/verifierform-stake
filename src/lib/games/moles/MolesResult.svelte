<script lang="ts">
  import { useMolesRounds } from './use-moles-rounds.svelte';
  import MolesBoard from '$lib/games/moles/MolesBoard.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';
  import { MOLES_ROUND_CLASS, MOLES_ROUND_SELECTED_CLASS } from '$lib/games/moles/moles';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const moles = useMolesRounds(() => formValues);

  let selectedRound = $state(0);

  // Reset selected round when rounds change
  $effect(() => {
    if (moles.rounds) {
      selectedRound = 0;
    }
  });
</script>

{#if moles.isCalculating}
  <Loader />
{:else}
  <p data-testid="moles-result" class="hidden">
    {JSON.stringify(moles.rounds!.map((round) => round.map((item) => item.chosen)))}
  </p>

  <ContentBlock className="p-4">
    <div class="flex flex-col gap-4">
      <!-- Board display -->
      <MolesBoard molePositions={moles.rounds![selectedRound].map((item) => item.chosen)} />

      <!-- Round navigation — wrapping strip -->
      <div class="mt-3 flex flex-wrap justify-center gap-2">
        {#each moles.rounds! as _, roundIndex}
          <button
            type="button"
            class={[
              'rounded border px-3.5 py-1.5 text-sm font-medium transition-all',
              selectedRound === roundIndex ? MOLES_ROUND_SELECTED_CLASS : MOLES_ROUND_CLASS,
            ]}
            onclick={() => (selectedRound = roundIndex)}
          >
            R{roundIndex + 1}
          </button>
        {/each}
      </div>
    </div>
  </ContentBlock>
{/if}
