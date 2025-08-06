import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');

    // Check if the main heading is visible
    await expect(page.locator('h1')).toContainText('Jolly Games');

    // Check if navigation is present
    await expect(page.locator('nav')).toBeVisible();

    // Check if hero section is present
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
  });

  test('should navigate to different pages', async ({ page }) => {
    await page.goto('/');

    // Test navigation to forum
    await page.click('text=Foro');
    await expect(page).toHaveURL('/forum');

    // Test navigation to leaderboard
    await page.click('text=Leaderboard');
    await expect(page).toHaveURL('/leaderboard');

    // Test navigation to community
    await page.click('text=Comunidad');
    await expect(page).toHaveURL('/events');
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('nav')).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('nav')).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('nav')).toBeVisible();
  });
});
