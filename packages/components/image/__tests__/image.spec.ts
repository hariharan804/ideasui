import { test, expect } from '@playwright/test';

test('Image visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-image--default');
  await expect(page.locator('[data-slot="image-wrapper"]')).toBeVisible();
  await expect(page.locator('[data-slot="image-wrapper"]')).toHaveScreenshot('image-default.png', {
    timeout: 15_000,
  });
});
