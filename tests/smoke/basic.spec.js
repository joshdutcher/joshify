import { test, expect } from '@playwright/test';

test.describe('Joshify Portfolio - Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');

    // Check if the page loads and contains essential elements
    await expect(page).toHaveTitle(/Joshify/);

    // Check for main navigation elements
    await expect(page.getByText('My Work')).toBeVisible();

    // Check for time-based greeting
    const greetingPattern = /Good (morning|afternoon|evening)/;
    await expect(page.locator('h1')).toHaveText(greetingPattern);
  });

  test('main sections are visible', async ({ page }) => {
    await page.goto('/');

    // Check for main content sections
    await expect(page.getByText('Made for you')).toBeVisible();
    await expect(page.getByText('Top hits')).toBeVisible();
    await expect(page.getByText('Side projects')).toBeVisible();
  });

  test('sidebar filters work', async ({ page }) => {
    await page.goto('/');

    // Test filter buttons in sidebar
    const allButton = page.getByRole('button', { name: 'All' });
    const collectionsButton = page.getByRole('button', { name: 'Collections' });
    const projectsButton = page.getByRole('button', { name: 'Projects' });

    await expect(allButton).toBeVisible();
    await expect(collectionsButton).toBeVisible();
    await expect(projectsButton).toBeVisible();

    // Test clicking filters
    await collectionsButton.click();
    await projectsButton.click();
    await allButton.click();
  });

  test('responsive design works', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that sidebar is hidden on mobile
    const sidebar = page.locator('[data-sidebar]');
    await expect(sidebar).toHaveClass(/translate-x-full|-translate-x-full/);

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    // Check that sidebar is visible on desktop
    await expect(sidebar).toHaveClass(/translate-x-0/);
  });

  test('no console errors on page load', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check that there are no console errors
    expect(consoleErrors).toHaveLength(0);
  });
});