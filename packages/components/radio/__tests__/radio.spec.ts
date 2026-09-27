import { test, expect } from '@playwright/test';

test('Radio visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-radio--default');
  await expect(page.locator('[data-slot="radio"]')).toHaveScreenshot('radio-default.png');
});
