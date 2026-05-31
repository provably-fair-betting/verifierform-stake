<script lang="ts">
  import type { ZooAnimal } from './types';

  const { animal, class: className = 'h-10 w-10' }: { animal: ZooAnimal; class?: string } =
    $props();

  const all = import.meta.glob('$lib/games/multiplayer/zoo/animals/*.svg', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>;

  const byName = Object.fromEntries(
    Object.entries(all).map(([path, url]) => [path.split('/').pop()!.replace('.svg', ''), url])
  ) as Record<string, string>;

  const src = $derived(byName[animal]);
</script>

{#if src}
  <img {src} alt={animal} class="{className} rounded-full" />
{/if}
