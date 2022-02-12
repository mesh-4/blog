import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/auth/login')
})

test('should render the /auth/login page', async ({ page }) => {
  const title = page.locator('legend')
  await expect(title).toHaveText('Welcome back')
})

test(`should not allow login with the wrong credentials`, async ({ page }) => {
  await page.fill('input[name="email"]', 'username@email.com')
  await page.fill('input[name="password"]', 'wrongpasswordfor@email.com')
  await page.locator('form button[type="submit"]').click()
  await page.waitForLoadState('networkidle')
  expect(page.url().substring(page.url().lastIndexOf('/'))).toEqual('/')
})

test(`should allow login with the right credentials`, async ({ page }) => {
  await page.fill('input[name="email"]', process.env.TEST_USER_EMAIL || '')
  await page.fill('input[name="password"]', process.env.TEST_USER_PASS || '')
  await page.locator('form button[type="submit"]').click()
  await page.waitForLoadState('networkidle')
  expect(page.url().substring(page.url().lastIndexOf('/'))).toEqual(
    '/dashboard'
  )
  await page.context().storageState({ path: 'tests/state.json' })
})
