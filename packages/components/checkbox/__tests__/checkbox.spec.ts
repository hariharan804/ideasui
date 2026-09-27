import { test, expect } from '@playwright/test';

test('Checkbox visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-checkbox--default');
  await expect(page.locator('[data-slot="checkbox"]')).toBeVisible();
  await expect(page.locator('[data-slot="checkbox"]')).toHaveScreenshot('checkbox-default.png', {
    timeout: 15_000,
  });
});
