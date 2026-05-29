<script lang="ts">
  import '../app.css';
  import { onMount, setContext } from 'svelte';
  import { base } from '$app/paths';

  let { children } = $props();

  const config = $state<{ betLookupUrl?: string }>({});
  setContext('config', config);

  onMount(async () => {
    try {
      const res = await fetch(`${base}/config.json`);
      if (res.ok) {
        const data = await res.json();
        if (typeof data.betLookupUrl === 'string') {
          config.betLookupUrl = data.betLookupUrl;
        }
      }
    } catch {
      // config.json unavailable — bet lookup remains hidden
    }
  });
</script>

{@render children()}
