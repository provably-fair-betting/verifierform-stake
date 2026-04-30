<script lang="ts">
  import CardSuitIcon from '$lib/games/cards/CardSuitIcon.svelte';
  import { CardSuit } from '$lib/types';

  const { value, suit }: { value: string; suit: CardSuit } = $props();
</script>

<div
  class="flex h-24 flex-col items-center justify-center rounded-lg border-2 border-gray-300 bg-white p-3 shadow-md transition-transform dark:border-gray-600 dark:bg-gray-800"
>
  <div class="mb-1 text-2xl font-bold">{value}</div>
  <div class="hidden dark:block">
    <CardSuitIcon {suit} />
  </div>
  <div class="block dark:hidden">
    <CardSuitIcon {suit} dark={true} />
  </div>
</div>
