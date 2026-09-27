import { test, expect } from '@playwright/test';

test('Switch visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-switch--default');
  await expect(page.locator('[data-slot="switch"]')).toHaveScreenshot('switch-default.png');
});
