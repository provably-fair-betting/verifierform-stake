<script lang="ts">
  import type { Snippet } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  const { className, children }: { className?: string; children: Snippet } = $props();
</script>

<div class={twMerge('bg-gray-200 dark:bg-gray-800', 'text-gray-500 dark:text-gray-400', className)}>
  {@render children()}
</div>
