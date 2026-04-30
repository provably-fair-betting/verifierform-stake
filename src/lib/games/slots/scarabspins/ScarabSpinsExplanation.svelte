<script lang="ts">
  import IconComponent from '$lib/games/slots/scarabspins/ScarabSpinsIcon.svelte';
  import SlotExplanation from '$lib/games/slots/SlotExplanation.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
</script>

<SlotExplanation {formValues} {IconComponent} />
