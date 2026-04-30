<script lang="ts">
  import type { Snippet } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  const { className, href, children }: { className?: string; href: string; children: Snippet } =
    $props();
</script>

<a
  class={twMerge('text-purple-500 dark:text-purple-400', 'hover:underline', className)}
  target="_blank"
  {href}
>
  {@render children()}
</a>
