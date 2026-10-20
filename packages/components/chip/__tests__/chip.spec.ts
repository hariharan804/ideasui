import { test, expect } from '@playwright/test';

test('Chip visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-chip--default');
  await expect(page.locator('[data-slot="chip"]')).toHaveScreenshot('chip-default.png');
});
