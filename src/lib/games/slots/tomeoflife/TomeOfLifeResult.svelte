<script lang="ts">
  import SlotResult from '$lib/games/slots/SlotResult.svelte';
  import IconComponent from '$lib/games/slots/tomeoflife/TomeOfLifeIcon.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
</script>

<SlotResult {formValues} {IconComponent} />
