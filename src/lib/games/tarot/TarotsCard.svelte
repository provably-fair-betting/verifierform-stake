<script lang="ts">
  import { TarotArcanaType } from '$lib/types';

  const { arcanaType, multiplier }: { arcanaType: TarotArcanaType; multiplier: number } = $props();

  const isMinor = $derived(arcanaType === TarotArcanaType.MINOR);
  const colorScheme = $derived(
    isMinor
      ? {
          bg: 'bg-gray-100 dark:bg-gray-900/30',
          border: 'border-gray-400 dark:border-gray-500',
          text: 'text-gray-700 dark:text-gray-400',
        }
      : {
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          border: 'border-yellow-400 dark:border-yellow-500',
          text: 'text-yellow-700 dark:text-yellow-400',
        }
  );
  const flooredMultiplier = $derived((Math.floor(multiplier * 100) / 100).toFixed(2));
</script>

<div
  class={[
    'flex h-32 w-full flex-col items-center justify-center rounded-lg border-2 transition-all',
    colorScheme.bg,
    colorScheme.border,
    colorScheme.text,
  ]}
>
  <!-- Arcana type label -->
  <div class="mb-1 text-xs font-medium opacity-70">
    {isMinor ? 'Minor' : 'Major'} Arcana
  </div>
  <!-- Multiplier -->
  <div class="text-lg font-bold">{flooredMultiplier}x</div>
</div>
