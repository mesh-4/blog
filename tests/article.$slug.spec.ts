import { test, expect } from '@playwright/test'

test('should render the heading of the article', async ({ page }) => {
  await page.goto('/articles/blog-reborn-and-reborn')

  const title = page.locator('h1')
  await expect(title).toHaveText('Hi Blog')

  const description = page.locator('h2')
  await expect(description).toHaveText('對於這個專案的心得')
})

test('should render the message when article not found', async ({ page }) => {
  await page.goto('/articles/not-found-article')

  const title = page.locator('h1')
  await expect(title).toHaveText('Not Found Article')
})
