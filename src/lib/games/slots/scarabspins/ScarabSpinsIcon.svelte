<script lang="ts">
  import type { ScarabSpinsTomeOfLifeIcon } from '../types';

  import one from '$lib/games/slots/scarabspins/icons/one.svg';
  import two from '$lib/games/slots/scarabspins/icons/two.svg';
  import three from '$lib/games/slots/scarabspins/icons/three.svg';
  import four from '$lib/games/slots/scarabspins/icons/four.svg';
  import five from '$lib/games/slots/scarabspins/icons/five.svg';
  import nine from '$lib/games/slots/scarabspins/icons/nine.svg';
  import ten from '$lib/games/slots/scarabspins/icons/ten.svg';
  import jack from '$lib/games/slots/scarabspins/icons/jack.svg';
  import queen from '$lib/games/slots/scarabspins/icons/queen.svg';
  import king from '$lib/games/slots/scarabspins/icons/king.svg';
  import ace from '$lib/games/slots/scarabspins/icons/ace.svg';
  import wild from '$lib/games/slots/scarabspins/icons/wild.svg';
  import scatter from '$lib/games/slots/scarabspins/icons/scatter.svg';

  const iconMap: Record<ScarabSpinsTomeOfLifeIcon, string> = {
    one,
    two,
    three,
    four,
    five,
    nine,
    ten,
    jack,
    queen,
    king,
    ace,
    wild,
    scatter,
  };

  const { icon }: { icon: ScarabSpinsTomeOfLifeIcon } = $props();
</script>

<img class={['relative scale-100 object-fill']} src={iconMap[icon]} alt={icon} />
