<script lang="ts">
  import type { BlueSamuraiIcon } from '../types';

  import s1 from '$lib/games/bluesamurai/icons/s1.png';
  import s2 from '$lib/games/bluesamurai/icons/s2.png';
  import s3 from '$lib/games/bluesamurai/icons/s3.png';
  import s4 from '$lib/games/bluesamurai/icons/s4.png';
  import s5 from '$lib/games/bluesamurai/icons/s5.png';
  import s6 from '$lib/games/bluesamurai/icons/s6.png';
  import s7 from '$lib/games/bluesamurai/icons/s7.png';
  import s8 from '$lib/games/bluesamurai/icons/s8.png';
  import s9 from '$lib/games/bluesamurai/icons/s9.png';
  import scatter from '$lib/games/bluesamurai/icons/scatter.png';
  import wild from '$lib/games/bluesamurai/icons/wild.png';
  import samurai from '$lib/games/bluesamurai/icons/samurai.png';

  const iconMap: Record<BlueSamuraiIcon, string> = {
    s1,
    s2,
    s3,
    s4,
    s5,
    s6,
    s7,
    s8,
    s9,
    scatter,
    wild,
    samurai,
  };

  const { icon }: { icon: BlueSamuraiIcon } = $props();
</script>

<img class={['relative scale-100 object-fill']} src={iconMap[icon]} alt={icon} />
