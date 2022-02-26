import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('should render title', async ({ page }) => {
  const title = page.locator('h1')
  await expect(title).toHaveText("Senlima Sun's Blog")
})
