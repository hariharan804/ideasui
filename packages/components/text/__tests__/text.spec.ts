import { test, expect } from '@playwright/test';

test('Text visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-text--basic');
  await expect(page.locator('[data-slot="text"]')).toBeVisible();
  await expect(page.locator('[data-slot="text"]')).toHaveScreenshot('text-default.png', {
    timeout: 15_000,
  });
});
