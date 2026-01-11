import { test, expect } from '@playwright/test';

test('Ripple visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-ripple--default');
  await expect(page.locator('[data-testid="ripple"]')).toHaveScreenshot('ripple-default.png');
});

test('Ripple variants visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-ripple--variants');
  await expect(page.locator('.storybook-ripple-variants')).toHaveScreenshot('ripple-variants.png');
});
