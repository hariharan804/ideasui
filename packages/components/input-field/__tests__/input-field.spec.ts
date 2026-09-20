import { test, expect } from '@playwright/test';

test('InputField visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-input-field--default');
  await expect(page.locator('[data-slot="input-field"]')).toHaveScreenshot(
    'input-field-default.png',
  );
});
