<script lang="ts">
  interface PayoutRow {
    min: number;
    multiplier: number;
  }

  const {
    payline,
    float,
    isWinner,
    getRowClass = () => '',
    getTextClass = () => '',
  }: {
    payline: PayoutRow[];
    float: number;
    isWinner: (row: PayoutRow) => boolean;
    getRowClass?: (row: PayoutRow) => string;
    getTextClass?: (row: PayoutRow) => string;
  } = $props();
</script>

<!-- Float Value -->
<div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
  <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Float Value</p>
  <p class="leading-relaxed">
    float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
  </p>
</div>

<!-- Payout Table -->
<div class="mb-4">
  <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
    Payout Table — first row where min &le; float
  </p>
  <table class="w-full overflow-x-auto">
    <thead>
      <tr class="border-b border-gray-300 dark:border-gray-600">
        <th
          class="py-2 pr-6 text-left font-sans text-xs text-gray-500 uppercase dark:text-gray-400"
        >
          Min Bound
        </th>
        <th class="py-2 text-left font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Multiplier
        </th>
      </tr>
    </thead>
    <tbody>
      {#each payline as row (row.min)}
        {@const winner = isWinner(row)}
        <tr
          class={['border-b border-gray-200 dark:border-gray-700', winner ? getRowClass(row) : '']}
        >
          <td class={['py-2 pr-6', winner ? getTextClass(row) : '']}>
            {row.min}{float > row.min ? ` (< ${float.toFixed(12)})` : ''}
          </td>
          <td class={['py-2', winner ? getTextClass(row) : '']}>
            {row.multiplier.toFixed(2)}x{winner ? ' ✓' : ''}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
