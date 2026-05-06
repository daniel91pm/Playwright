import { test, expect } from '@playwright/test';

test('vuelo Avianca MDE SMR', async ({ page }) => {
  await page.goto('https://www.avianca.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/avianca - Encuentra tiquetes y vuelos baratos | Web oficial/);
});