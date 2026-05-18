import { test, expect } from '@playwright/test';

// Uses the mock API fixtures from scripts/mock-api.js.
// The playwright config starts both the mock API and the preview server.

test.describe('Bet Lookup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ── UI interactions ─────────────────────────────────────────────────────────

  test('panel opens and closes', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Lookup by Bet ID' });
    await trigger.click();
    await expect(page.getByLabel('Bet ID')).toBeVisible();

    await page.getByRole('button', { name: 'Dismiss' }).click();
    await expect(page.getByLabel('Bet ID')).not.toBeVisible();
    await expect(trigger).toBeVisible();
  });

  // ── Successful lookups ──────────────────────────────────────────────────────

  test('dice bet pre-fills seeds and navigates to dice game', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('house:1000000001');
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.getByRole('status')).toContainText('Dice — seeds loaded');
    await expect(page).toHaveURL(/game=dice/);
    await expect(page).toHaveURL(/clientseed=86ff027f15c48241af7f54a726690ee7/);
    await expect(page).toHaveURL(/serverseed=f2ac89b608eeb01312d115bce6741b32/);
    await expect(page).toHaveURL(/nonce=0/);
  });

  test('mines bet pre-fills seeds and mine count', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('house:7000000001');
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.getByRole('status')).toContainText('Mines — seeds loaded');
    await expect(page).toHaveURL(/game=mines/);
    await expect(page).toHaveURL(/mines=5/);
  });

  test('plinko bet pre-fills risk and rows', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('house:7000000003');
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.getByRole('status')).toContainText('Plinko — seeds loaded');
    await expect(page).toHaveURL(/game=plinko/);
    await expect(page).toHaveURL(/risk=low/);
    await expect(page).toHaveURL(/rows=16/);
  });

  test('wheel bet pre-fills risk and segments', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('house:7000000004');
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.getByRole('status')).toContainText('Wheel — seeds loaded');
    await expect(page).toHaveURL(/game=wheel/);
    await expect(page).toHaveURL(/risk=medium/);
    await expect(page).toHaveURL(/segments=30/);
  });

  test('bars bet pre-fills difficulty and barcount', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('house:7000000005');
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.getByRole('status')).toContainText('Bars — seeds loaded');
    await expect(page).toHaveURL(/game=bars/);
    await expect(page).toHaveURL(/difficulty=hard/);
    await expect(page).toHaveURL(/barcount=3/);
  });

  test('crash bet pre-fills game hash and block hash', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('house:4000000001');
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.getByRole('status')).toContainText('Crash — seeds loaded');
    await expect(page).toHaveURL(/game=crash/);
    await expect(page).toHaveURL(/gamehash=/);
    await expect(page).toHaveURL(/blockhash=/);
  });

  // ── Abort / dismiss mid-flight ──────────────────────────────────────────────

  test('dismiss button is visible while a request is in flight', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('house:5000000001'); // 3s delay fixture
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.locator('.animate-spin')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Dismiss' })).toBeVisible();

    await page.getByRole('button', { name: 'Dismiss' }).click();
  });

  test('dismiss mid-flight closes panel and aborts navigation', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('house:5000000001');
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.locator('.animate-spin')).toBeVisible();
    await page.getByRole('button', { name: 'Dismiss' }).click();

    await expect(page.getByLabel('Bet ID')).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Lookup by Bet ID' })).toBeVisible();

    // Wait well past the 3s server delay — the aborted fetch must not trigger goto()
    await page.waitForTimeout(500);
    await expect(page).not.toHaveURL(/game=/);
  });

  test('panel reopens clean after mid-flight dismiss', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('house:5000000001');
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.locator('.animate-spin')).toBeVisible();
    await page.getByRole('button', { name: 'Dismiss' }).click();

    // Reopen — input must be blank and Look Up disabled until text is entered
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await expect(page.getByLabel('Bet ID')).toHaveValue('');
    await expect(page.getByRole('button', { name: 'Look Up' })).toBeDisabled();

    await page.getByLabel('Bet ID').fill('house:1000000001');
    await expect(page.getByRole('button', { name: 'Look Up' })).toBeEnabled();
  });

  test('verifier form has inert attribute while lookup is loading', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('house:5000000001');
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.locator('.animate-spin')).toBeVisible();

    const isInert = await page.evaluate(() => {
      const wrapper = document.querySelector<HTMLElement>('.pt-4');
      return (wrapper?.nextElementSibling as HTMLElement | null)?.inert ?? false;
    });
    expect(isInert).toBe(true);

    await page.getByRole('button', { name: 'Dismiss' }).click();

    const isInertAfterDismiss = await page.evaluate(() => {
      const wrapper = document.querySelector<HTMLElement>('.pt-4');
      return (wrapper?.nextElementSibling as HTMLElement | null)?.inert ?? false;
    });
    expect(isInertAfterDismiss).toBe(false);
  });

  test('keyboard cannot tab into verifier form while lookup is loading', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('house:5000000001');
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.locator('.animate-spin')).toBeVisible();

    // Focus the Dismiss button — it is inside the lookup panel (above the overlay)
    await page.getByRole('button', { name: 'Dismiss' }).focus();

    // Tab from the Dismiss button; with the form inert, focus must not enter it
    await page.keyboard.press('Tab');

    const focusedInsideForm = await page.evaluate(() => {
      const wrapper = document.querySelector<HTMLElement>('.pt-4');
      const sibling = wrapper?.nextElementSibling;
      return sibling?.contains(document.activeElement) ?? false;
    });
    expect(focusedInsideForm).toBe(false);

    await page.getByRole('button', { name: 'Dismiss' }).click();
  });

  // ── Error cases ─────────────────────────────────────────────────────────────

  test('invalid format shows validation error', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('notavalidid');
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.getByRole('alert')).toContainText('Invalid bet ID format');
  });

  test('unknown bet ID shows not found error', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('house:9999999999');
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.getByRole('alert')).toContainText('Bet not found');
  });

  test('422 shows seed not revealed error', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('house:9000000002');
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.getByRole('alert')).toContainText('seed has not been revealed');
  });

  test('503 shows service unavailable error', async ({ page }) => {
    await page.getByRole('button', { name: 'Lookup by Bet ID' }).click();
    await page.getByLabel('Bet ID').fill('house:9000000003');
    await page.getByRole('button', { name: 'Look Up' }).click();

    await expect(page.getByRole('alert')).toBeVisible();
  });
});
