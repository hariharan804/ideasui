import { test, expect } from '@playwright/test';

test('Divider visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-divider--default');
  await expect(page.locator('[data-slot="divider"]')).toHaveScreenshot('divider-default.png');
});
