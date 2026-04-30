<script lang="ts">
  const { cardId }: { cardId: number } = $props();

  // Build-time glob to get final asset URLs (hashed)
  const all = import.meta.glob('$lib/games/packs/cards/c*.svg', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>;

  // Normalize to filename → url
  const byFileName = Object.fromEntries(
    Object.entries(all).map(([path, url]) => [path.split('/').pop()!, url])
  ) as Record<string, string>;

  const pad3 = (n: number) => String(n).padStart(3, '0');

  const src = $derived(byFileName[`c${pad3(cardId)}.svg`]);
</script>

{#if src}
  <img {src} alt={`Card ${cardId}`} class="h-full w-full" loading="lazy" />
{:else}
  <span>Card asset not found: {cardId}</span>
{/if}
