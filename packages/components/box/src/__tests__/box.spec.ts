import { test, expect } from '@playwright/test'

test('Box visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-box--default')
  await expect(page.locator('[data-testid="box"]')).toHaveScreenshot('box-default.png')
})

test('Box variants visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-box--variants')
  await expect(page.locator('.storybook-box-variants')).toHaveScreenshot('box-variants.png')
})