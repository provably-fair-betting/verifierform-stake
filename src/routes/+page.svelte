<script lang="ts">
  import { VerifierForm, type GameEntry } from 'verifierform-lib';
  import BetLookup from '$lib/bet-lookup/BetLookup.svelte';
  import { getContext } from 'svelte';

  const config = getContext<{ betLookupUrl?: string }>('config');

  const games: Record<string, GameEntry> = {
    baccarat: {
      name: 'Baccarat',
      loader: () => import('$lib/games/cards/baccarat').then((m) => m.gameDefinition),
    },
    bars: { name: 'Bars', loader: () => import('$lib/games/bars').then((m) => m.gameDefinition) },
    blackjack: {
      name: 'Blackjack',
      loader: () => import('$lib/games/cards/blackjack').then((m) => m.gameDefinition),
    },
    bluesamurai: {
      name: 'Blue Samurai',
      loader: () => import('$lib/games/bluesamurai').then((m) => m.gameDefinition),
    },
    cases: {
      name: 'Cases',
      loader: () => import('$lib/games/cases').then((m) => m.gameDefinition),
    },
    chicken: {
      name: 'Chicken',
      loader: () => import('$lib/games/chicken').then((m) => m.gameDefinition),
    },
    crash: {
      name: 'Crash',
      loader: () => import('$lib/games/multiplayer/crash').then((m) => m.gameDefinition),
    },
    darts: {
      name: 'Darts',
      loader: () => import('$lib/games/darts').then((m) => m.gameDefinition),
    },
    diamonds: {
      name: 'Diamonds',
      loader: () => import('$lib/games/diamonds').then((m) => m.gameDefinition),
    },
    dice: { name: 'Dice', loader: () => import('$lib/games/dice').then((m) => m.gameDefinition) },
    dragontower: {
      name: 'Dragon Tower',
      loader: () => import('$lib/games/dragontower').then((m) => m.gameDefinition),
    },
    drill: {
      name: 'Drill',
      loader: () => import('$lib/games/drill').then((m) => m.gameDefinition),
    },
    flip: { name: 'Flip', loader: () => import('$lib/games/flip').then((m) => m.gameDefinition) },
    hilo: {
      name: 'Hilo',
      loader: () => import('$lib/games/cards/hilo').then((m) => m.gameDefinition),
    },
    keno: { name: 'Keno', loader: () => import('$lib/games/keno').then((m) => m.gameDefinition) },
    limbo: {
      name: 'Limbo',
      loader: () => import('$lib/games/limbo').then((m) => m.gameDefinition),
    },
    mines: {
      name: 'Mines',
      loader: () => import('$lib/games/mines').then((m) => m.gameDefinition),
    },
    moles: {
      name: 'Moles',
      loader: () => import('$lib/games/moles').then((m) => m.gameDefinition),
    },
    packs: {
      name: 'Packs',
      loader: () => import('$lib/games/packs').then((m) => m.gameDefinition),
    },
    plinko: {
      name: 'Plinko',
      loader: () => import('$lib/games/plinko').then((m) => m.gameDefinition),
    },
    primedice: {
      name: 'PrimeDice',
      loader: () => import('$lib/games/primedice').then((m) => m.gameDefinition),
    },
    pump: { name: 'Pump', loader: () => import('$lib/games/pump').then((m) => m.gameDefinition) },
    rockpaperscissors: {
      name: 'Rock Paper Scissors',
      loader: () => import('$lib/games/rockpaperscissors').then((m) => m.gameDefinition),
    },
    roulette: {
      name: 'Roulette',
      loader: () => import('$lib/games/roulette').then((m) => m.gameDefinition),
    },
    scarabspins: {
      name: 'Scarab Spins',
      loader: () => import('$lib/games/slots/scarabspins').then((m) => m.gameDefinition),
    },
    slide: {
      name: 'Slide',
      loader: () => import('$lib/games/multiplayer/slide').then((m) => m.gameDefinition),
    },
    snakes: {
      name: 'Snakes',
      loader: () => import('$lib/games/snakes').then((m) => m.gameDefinition),
    },
    tarot: {
      name: 'Tarot',
      loader: () => import('$lib/games/tarot').then((m) => m.gameDefinition),
    },
    tomeoflife: {
      name: 'Tome Of Life',
      loader: () => import('$lib/games/slots/tomeoflife').then((m) => m.gameDefinition),
    },
    videopoker: {
      name: 'Video Poker',
      loader: () => import('$lib/games/cards/videopoker').then((m) => m.gameDefinition),
    },
    wheel: {
      name: 'Wheel',
      loader: () => import('$lib/games/wheel').then((m) => m.gameDefinition),
    },
  };
</script>

{#if config.betLookupUrl}
  <div class="pt-4">
    <BetLookup betLookupUrl={config.betLookupUrl!} />
  </div>
{/if}
<VerifierForm {games} />
