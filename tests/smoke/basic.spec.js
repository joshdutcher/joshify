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

    // Check for main content sections - use first() for elements that appear multiple times
    await expect(page.getByRole('heading', { name: /Made for you/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Top hits/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Side projects/i }).first()).toBeVisible();
  });

  test('sidebar filters work', async ({ page }) => {
    await page.goto('/');

    // Test filter buttons in sidebar - use first() since "All" button appears in multiple contexts
    const allButton = page.getByRole('button', { name: 'All' }).first();
    const collectionsButton = page.getByRole('button', { name: 'Collections' }).first();
    const projectsButton = page.getByRole('button', { name: 'Projects' }).first();

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

  test('no critical console errors on page load', async ({ page }) => {
    const criticalErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Filter out expected errors:
        // - Canvas video loading errors (videos deployed via GitHub Releases)
        // - 404 errors for missing assets (expected during deployment validation)
        if (!text.includes('Video loading error') &&
            !text.includes('canvases/') &&
            !text.includes('404') &&
            !text.includes('Failed to load resource')) {
          criticalErrors.push(text);
        }
      }
    });

    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check that there are no critical console errors
    expect(criticalErrors).toHaveLength(0);
  });
});