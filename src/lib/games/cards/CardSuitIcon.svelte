<script lang="ts">
  import { CardSuit } from './types';
  import clubIcon from '$lib/games/cards/icons/club-50x50.png';
  import spadeIcon from '$lib/games/cards/icons/spade-50x50.png';
  import heartIcon from '$lib/games/cards/icons/heart-50x50.png';
  import diamondIcon from '$lib/games/cards/icons/diamond-50x50.png';
  import grayClubIcon from '$lib/games/cards/icons/club-50x50-gray.png';
  import graySpadeIcon from '$lib/games/cards/icons/spade-50x50-gray.png';
  import grayHeartIcon from '$lib/games/cards/icons/heart-50x50-gray.png';
  import grayDiamondIcon from '$lib/games/cards/icons/diamond-50x50-gray.png';

  const { suit, small, dark }: { suit: CardSuit; small?: boolean; dark?: boolean } = $props();

  const suitToIcon = $derived<Record<CardSuit, string>>({
    club: dark ? grayClubIcon : clubIcon,
    spade: dark ? graySpadeIcon : spadeIcon,
    diamond: dark ? grayDiamondIcon : diamondIcon,
    heart: dark ? grayHeartIcon : heartIcon,
  });
</script>

<img
  class={[small ? 'inline w-5' : 'relative scale-70 object-scale-down']}
  src={suitToIcon[suit]}
  alt={suit}
/>
