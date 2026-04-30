<script lang="ts">
  import jackhammer from '$lib/games/drill/icons/jackhammer-50x50-gray.png';
  import jackhammer_white from '$lib/games/drill/icons/jackhammer-50x50.png';

  const { drillIndex, multiplier }: { drillIndex: number; multiplier: number } = $props();

  // Three different drill colors based on drill index (0, 1, 2)
  const colorSchemes = [
    {
      // Blue drill
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      border: 'border-blue-400 dark:border-blue-500',
      text: 'text-blue-700 dark:text-blue-400',
    },
    {
      // Yellow drill
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      border: 'border-yellow-400 dark:border-yellow-500',
      text: 'text-yellow-700 dark:text-yellow-400',
    },
    {
      // Green drill
      bg: 'bg-green-100 dark:bg-green-900/30',
      border: 'border-green-400 dark:border-green-500',
      text: 'text-green-700 dark:text-green-400',
    },
  ];

  const colors = $derived(colorSchemes[drillIndex % 3]);
  const flooredMultiplier = $derived((Math.floor(multiplier * 100) / 100).toFixed(2));
</script>

<div
  class={[
    'flex h-32 w-full flex-col items-center justify-center rounded-lg border-2 transition-all',
    colors.bg,
    colors.border,
    colors.text,
  ]}
>
  <!-- Jackhammer Icon - gray for light mode, white for dark mode -->
  <img
    src={jackhammer}
    alt="Jackhammer"
    class="mb-1.5 h-10 w-10 object-contain opacity-70 dark:hidden"
  />
  <img
    src={jackhammer_white}
    alt="Jackhammer"
    class="mb-1.5 hidden h-10 w-10 object-contain opacity-80 dark:block"
  />
  <!-- Multiplier -->
  <div class="text-lg font-bold">{flooredMultiplier}x</div>
</div>
