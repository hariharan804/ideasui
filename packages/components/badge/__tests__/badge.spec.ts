import { test, expect } from '@playwright/test';

test('Badge visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-badge--default');
  await expect(page.locator('[data-slot="badge"]')).toHaveScreenshot('badge-default.png');
});
