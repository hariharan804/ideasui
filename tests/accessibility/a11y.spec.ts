import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('Button accessibility', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--default')
  
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
  expect(accessibilityScanResults.violations).toEqual([])
})

test('Button keyboard navigation', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--default')
  
  await page.keyboard.press('Tab')
  await expect(page.locator('button')).toBeFocused()
  
  await page.keyboard.press('Enter')
  // Add assertion for button action
})