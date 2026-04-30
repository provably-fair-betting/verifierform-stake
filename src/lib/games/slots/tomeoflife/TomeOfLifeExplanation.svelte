<script lang="ts">
  import IconComponent from '$lib/games/slots/tomeoflife/TomeOfLifeIcon.svelte';
  import SlotExplanation from '$lib/games/slots/SlotExplanation.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
</script>

<SlotExplanation {formValues} {IconComponent} />
