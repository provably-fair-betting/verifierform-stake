<script lang="ts">
  import CardExplanation from '$lib/games/cards/CardExplanation.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
</script>

<CardExplanation {formValues} colorScheme="blackjack" />
