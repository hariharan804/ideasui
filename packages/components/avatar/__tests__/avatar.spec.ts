import { test, expect } from '@playwright/test';

test('Avatar visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-avatar--default');
  await expect(page.locator('[data-slot="avatar"]')).toHaveScreenshot('avatar-default.png');
});
