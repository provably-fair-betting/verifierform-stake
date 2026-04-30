<script lang="ts">
  import SlotResult from '$lib/games/slots/SlotResult.svelte';
  import IconComponent from '$lib/games/slots/scarabspins/ScarabSpinsIcon.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
</script>

<SlotResult {formValues} {IconComponent} />
