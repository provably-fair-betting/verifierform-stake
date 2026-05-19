<script lang="ts">
  import { VerifierForm, type GameEntry } from 'verifierform-core';
  import BetLookup from '$lib/bet-lookup/BetLookup.svelte';
  import { getContext } from 'svelte';

  const config = getContext<{ betLookupUrl?: string }>('config');

  const games: Record<string, GameEntry> = {
    baccarat: {
      name: 'Baccarat',
      image: '/games/baccarat.webp',
      loader: () => import('$lib/games/cards/baccarat').then((m) => m.gameDefinition),
    },
    bars: {
      name: 'Bars',
      image: '/games/bars.webp',
      loader: () => import('$lib/games/bars').then((m) => m.gameDefinition),
    },
    blackjack: {
      name: 'Blackjack',
      image: '/games/blackjack.webp',
      loader: () => import('$lib/games/cards/blackjack').then((m) => m.gameDefinition),
    },
    bluesamurai: {
      name: 'Blue Samurai',
      image: '/games/bluesamurai.webp',
      loader: () => import('$lib/games/bluesamurai').then((m) => m.gameDefinition),
    },
    cases: {
      name: 'Cases',
      image: '/games/cases.webp',
      loader: () => import('$lib/games/cases').then((m) => m.gameDefinition),
    },
    chicken: {
      name: 'Chicken',
      image: '/games/chicken.webp',
      loader: () => import('$lib/games/chicken').then((m) => m.gameDefinition),
    },
    crash: {
      name: 'Crash',
      image: '/games/crash.webp',
      loader: () => import('$lib/games/multiplayer/crash').then((m) => m.gameDefinition),
    },
    darts: {
      name: 'Darts',
      image: '/games/darts.webp',
      loader: () => import('$lib/games/darts').then((m) => m.gameDefinition),
    },
    diamonds: {
      name: 'Diamonds',
      image: '/games/diamonds.webp',
      loader: () => import('$lib/games/diamonds').then((m) => m.gameDefinition),
    },
    dice: {
      name: 'Dice',
      image: '/games/dice.webp',
      loader: () => import('$lib/games/dice').then((m) => m.gameDefinition),
    },
    dragontower: {
      name: 'Dragon Tower',
      image: '/games/dragontower.webp',
      loader: () => import('$lib/games/dragontower').then((m) => m.gameDefinition),
    },
    drill: {
      name: 'Drill',
      image: '/games/drill.webp',
      loader: () => import('$lib/games/drill').then((m) => m.gameDefinition),
    },
    flip: {
      name: 'Flip',
      image: '/games/flip.webp',
      loader: () => import('$lib/games/flip').then((m) => m.gameDefinition),
    },
    hilo: {
      name: 'Hilo',
      image: '/games/hilo.webp',
      loader: () => import('$lib/games/cards/hilo').then((m) => m.gameDefinition),
    },
    keno: {
      name: 'Keno',
      image: '/games/keno.webp',
      loader: () => import('$lib/games/keno').then((m) => m.gameDefinition),
    },
    limbo: {
      name: 'Limbo',
      image: '/games/limbo.webp',
      loader: () => import('$lib/games/limbo').then((m) => m.gameDefinition),
    },
    mines: {
      name: 'Mines',
      image: '/games/mines.webp',
      loader: () => import('$lib/games/mines').then((m) => m.gameDefinition),
    },
    moles: {
      name: 'Moles',
      image: '/games/moles.webp',
      loader: () => import('$lib/games/moles').then((m) => m.gameDefinition),
    },
    packs: {
      name: 'Packs',
      image: '/games/packs.webp',
      loader: () => import('$lib/games/packs').then((m) => m.gameDefinition),
    },
    plinko: {
      name: 'Plinko',
      image: '/games/plinko.webp',
      loader: () => import('$lib/games/plinko').then((m) => m.gameDefinition),
    },
    primedice: {
      name: 'PrimeDice',
      image: '/games/primedice.webp',
      loader: () => import('$lib/games/primedice').then((m) => m.gameDefinition),
    },
    pump: {
      name: 'Pump',
      image: '/games/pump.webp',
      loader: () => import('$lib/games/pump').then((m) => m.gameDefinition),
    },
    rockpaperscissors: {
      name: 'Rock Paper Scissors',
      image: '/games/rockpaperscissors.webp',
      loader: () => import('$lib/games/rockpaperscissors').then((m) => m.gameDefinition),
    },
    roulette: {
      name: 'Roulette',
      image: '/games/roulette.webp',
      loader: () => import('$lib/games/roulette').then((m) => m.gameDefinition),
    },
    scarabspins: {
      name: 'Scarab Spins',
      image: '/games/scarabspins.webp',
      loader: () => import('$lib/games/slots/scarabspins').then((m) => m.gameDefinition),
    },
    slide: {
      name: 'Slide',
      image: '/games/slide.webp',
      loader: () => import('$lib/games/multiplayer/slide').then((m) => m.gameDefinition),
    },
    snakes: {
      name: 'Snakes',
      image: '/games/snakes.webp',
      loader: () => import('$lib/games/snakes').then((m) => m.gameDefinition),
    },
    tarot: {
      name: 'Tarot',
      image: '/games/tarot.webp',
      loader: () => import('$lib/games/tarot').then((m) => m.gameDefinition),
    },
    tomeoflife: {
      name: 'Tome Of Life',
      image: '/games/tomeoflife.webp',
      loader: () => import('$lib/games/slots/tomeoflife').then((m) => m.gameDefinition),
    },
    videopoker: {
      name: 'Video Poker',
      image: '/games/videopoker.webp',
      loader: () => import('$lib/games/cards/videopoker').then((m) => m.gameDefinition),
    },
    wheel: {
      name: 'Wheel',
      image: '/games/wheel.webp',
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
