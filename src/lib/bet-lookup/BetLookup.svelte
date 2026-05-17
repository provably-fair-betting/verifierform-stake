<script lang="ts">
  import { slide, fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { lookupBet, type BetLookupError } from './bet-lookup.js';

  let open = $state(false);
  let betId = $state('');
  let loading = $state(false);
  let error = $state<BetLookupError | null>(null);
  let successGame = $state<string | null>(null);

  function dismiss() {
    open = false;
    betId = '';
    error = null;
    successGame = null;
  }

  async function handleLookup() {
    const id = betId.trim();
    if (!id) return;

    loading = true;
    error = null;
    successGame = null;

    const result = await lookupBet(id);

    loading = false;

    if (result.ok) {
      // eslint-disable-next-line svelte/no-navigation-without-resolve
      goto(`?${result.data.params}`);
      const game = result.data.gameName;
      dismiss();
      successGame = game;
      setTimeout(() => (successGame = null), 1500);
    } else {
      error = result.error;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') handleLookup();
    if (e.key === 'Escape') dismiss();
  }

  function errorMessage(e: BetLookupError): string {
    switch (e.type) {
      case 'unsupported_game':
        return `"${e.game}" results can't be auto-verified (game has additional inputs not supported by lookup).`;
      case 'api_error':
        return e.message;
      case 'network_error':
        return 'Could not reach the lookup service. Check your connection.';
    }
  }
</script>

{#snippet searchIcon(cls: string)}
  <svg
    class={cls}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
      clip-rule="evenodd"
    />
  </svg>
{/snippet}

<div class="relative mx-auto mb-4 max-w-xl">
  {#if open}
    <div
      transition:slide={{ duration: 200 }}
      class="rounded-md border border-gray-300 bg-gray-50 px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-700/40 dark:shadow-none"
    >
      <div class="mb-2 flex items-center gap-2">
        {@render searchIcon('h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400')}
        <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">Bet Lookup</span>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          — paste a bet ID to auto-fill the verifier
        </span>
        <button
          onclick={dismiss}
          class="ml-auto rounded p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          aria-label="Dismiss"
        >
          <svg
            class="h-3.5 w-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
            />
          </svg>
        </button>
      </div>

      <div class="flex gap-2">
        <input
          type="text"
          bind:value={betId}
          onkeydown={handleKeydown}
          disabled={loading}
          placeholder="e.g. house:123456789"
          aria-label="Bet ID"
          class="block min-w-0 flex-1 border-0 border-b border-gray-300 bg-transparent px-2 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-400 focus:ring-0 focus:outline-none disabled:opacity-50 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
        />
        <button
          onclick={handleLookup}
          disabled={loading || !betId.trim()}
          class="flex shrink-0 items-center gap-1.5 bg-purple-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-purple-600 focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {#if loading}
            <svg
              class="h-3.5 w-3.5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          {/if}
          Look Up
        </button>
      </div>

      {#if error}
        <p class="mt-2 text-xs text-red-600 dark:text-red-400">{errorMessage(error)}</p>
      {/if}
    </div>
  {:else}
    <button
      onclick={() => (open = true)}
      class="flex w-full items-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-600 shadow-sm transition-colors hover:border-gray-400 hover:bg-gray-100 hover:text-gray-800 dark:border-gray-600 dark:bg-gray-700/40 dark:text-gray-400 dark:shadow-none dark:hover:border-gray-500 dark:hover:bg-gray-700/60 dark:hover:text-gray-200"
    >
      {@render searchIcon('h-3.5 w-3.5 shrink-0 text-purple-500 dark:text-purple-400')}
      Lookup by Bet ID
      <svg
        class="ml-auto h-3.5 w-3.5 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  {/if}

  {#if successGame}
    <div
      transition:fade={{ duration: 200 }}
      class="absolute inset-0 flex items-center gap-2 rounded-md border border-green-300 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 shadow-sm dark:border-green-700 dark:bg-green-900/20 dark:text-green-400"
      role="status"
      aria-live="polite"
    >
      <svg
        class="h-4 w-4 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
          clip-rule="evenodd"
        />
      </svg>
      {successGame} — seeds loaded
      <button
        onclick={() => (successGame = null)}
        class="ml-auto rounded p-0.5 text-green-500 hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/40 dark:hover:text-green-300"
        aria-label="Dismiss"
      >
        <svg
          class="h-3.5 w-3.5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
          />
        </svg>
      </button>
    </div>
  {/if}
</div>
