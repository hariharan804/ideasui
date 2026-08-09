import { test, expect } from '@playwright/test';

const testCases = [
  { name: 'default', id: 'components-button--default', selector: '[data-testid="button"]' },
  { name: 'variants', id: 'components-button--variants', selector: '.storybook-button-variants' },
  { name: 'radius', id: 'components-button--radius', selector: '.storybook-button-radius' },
  { name: 'colors', id: 'components-button--colors', selector: '.storybook-button-colors' },
  { name: 'sizes', id: 'components-button--sizes', selector: '.storybook-button-sizes' },
  { name: 'loading', id: 'components-button--loading', selector: '[data-testid="button-loading"]' },
  {
    name: 'with-icons',
    id: 'components-button--with-icons',
    selector: '[data-testid="button-with-icons"]',
  },
];

for (const c of testCases) {
  test(`Button ${c.name} visual regression`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${c.id}`);
    await page.waitForLoadState('networkidle');
    await expect(page.locator(c.selector)).toHaveScreenshot(`button-${c.name}.png`, {
      timeout: 15_000,
    });
  });
}
