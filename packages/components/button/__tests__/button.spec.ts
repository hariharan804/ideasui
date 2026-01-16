import { test, expect } from '@playwright/test';

test('Button visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--default');
  await expect(page.locator('[data-testid="button"]')).toHaveScreenshot('button-default.png');
});

test('Button variants visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--variants');
  await expect(page.locator('.storybook-button-variants')).toHaveScreenshot('button-variants.png');
});

test('Button radius visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--radius');
  await expect(page.locator('.storybook-button-radius')).toHaveScreenshot('button-radius.png');
});

test('Button colors visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--colors');
  await expect(page.locator('.storybook-button-colors')).toHaveScreenshot('button-colors.png');
});

test('Button sizes visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--sizes');
  await expect(page.locator('.storybook-button-sizes')).toHaveScreenshot('button-sizes.png');
});

test('Button loading visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--loading');
  await expect(page.locator('[data-testid="button-loading"]')).toHaveScreenshot(
    'button-loading.png',
  );
});

test('Button with icons visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--with-icons');
  await expect(page.locator('[data-testid="button-with-icons"]')).toHaveScreenshot(
    'button-with-icons.png',
  );
});
