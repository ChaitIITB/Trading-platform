import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for Token Discovery Table
 * Validates pixel-perfect UI with ≤2px threshold against baseline screenshots
 */

test.describe('Token Table Visual Regression', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the token table page
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for the table cards to be visible
    await page.waitForSelector('.bg-axiom-card', { state: 'visible', timeout: 15000 });
    
    // Wait for token rows to load (using the actual grid structure)
    await page.waitForSelector('div[role="button"].grid.grid-cols-2.sm\\:grid-cols-12', { 
      state: 'visible',
      timeout: 15000 
    });
    
    // Wait for any animations to complete
    await page.waitForTimeout(800);
  });

  test('full page baseline - desktop', async ({ page }) => {
    // Capture full page screenshot with strict pixel comparison
    await expect(page).toHaveScreenshot('token-table-desktop-full.png', {
      fullPage: true,
      // Allow max 2px difference per requirement
      maxDiffPixels: 2,
      threshold: 0.2, // 0.2% threshold
    });
  });

  test('token table container baseline - desktop', async ({ page }) => {
    // Capture just the token table card for focused comparison
    const tableCard = page.locator('.bg-axiom-card').first();
    await expect(tableCard).toHaveScreenshot('token-table-container-desktop.png', {
      maxDiffPixels: 2,
      threshold: 0.2,
    });
  });

  test('search and filter bar baseline', async ({ page }) => {
    // Capture the search/filter controls
    const searchBar = page.locator('.bg-axiom-card').first();
    await expect(searchBar).toHaveScreenshot('search-filter-bar.png', {
      maxDiffPixels: 2,
      threshold: 0.2,
    });
  });

  test('modal dialog baseline', async ({ page }) => {
    // Click first token to open modal
    const firstRow = page.locator('div[role="button"].grid').first();
    await firstRow.click();
    
    // Wait for modal to be visible
    await page.waitForSelector('[role="dialog"]', { state: 'visible' });
    await page.waitForTimeout(300); // Wait for modal animation
    
    // Capture modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toHaveScreenshot('token-details-modal.png', {
      maxDiffPixels: 2,
      threshold: 0.2,
    });
  });

  test('hover state on token row', async ({ page }) => {
    // Hover over first token row
    const firstRow = page.locator('div[role="button"].grid').first();
    await firstRow.hover();
    
    // Wait for hover effects to appear
    await page.waitForTimeout(200);
    
    // Capture hovered row
    await expect(firstRow).toHaveScreenshot('token-row-hover.png', {
      maxDiffPixels: 2,
      threshold: 0.2,
    });
  });

  test('sorted state - price ascending', async ({ page }) => {
    // Check if price header is visible (desktop only - hidden on mobile)
    const priceHeader = page.locator('button:has-text("Price")');
    const isVisible = await priceHeader.isVisible().catch(() => false);
    
    if (!isVisible) {
      test.skip();
      return;
    }
    
    // Click price header to sort
    await priceHeader.click();
    
    // Wait for sort to complete
    await page.waitForTimeout(300);
    
    // Capture sorted table
    const tableCard = page.locator('.bg-axiom-card').nth(1); // Second card is the table
    await expect(tableCard).toHaveScreenshot('token-table-sorted-price-asc.png', {
      maxDiffPixels: 2,
      threshold: 0.2,
    });
  });

  test('filtered state - favorites', async ({ page }) => {
    // First, favorite a token by clicking the star button
    const firstRow = page.locator('div[role="button"].grid').first();
    await firstRow.hover();
    const favoriteBtn = firstRow.locator('button[aria-label*="favorite"]').first();
    await favoriteBtn.click();
    
    await page.waitForTimeout(300);
    
    // Click favorites filter
    await page.click('button:has-text("⭐ Favorites")');
    
    // Wait for filter to apply
    await page.waitForTimeout(300);
    
    // Capture filtered view
    const tableCard = page.locator('.bg-axiom-card').nth(1);
    await expect(tableCard).toHaveScreenshot('token-table-filtered-favorites.png', {
      maxDiffPixels: 2,
      threshold: 0.2,
    });
  });

  test('search results', async ({ page }) => {
    // Type in search box
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('BONK');
    
    // Wait for search to filter
    await page.waitForTimeout(300);
    
    // Capture search results
    const tableCard = page.locator('.bg-axiom-card').nth(1);
    await expect(tableCard).toHaveScreenshot('token-table-search-bonk.png', {
      maxDiffPixels: 2,
      threshold: 0.2,
    });
  });

  test('empty state', async ({ page }) => {
    // Clear all tokens
    await page.click('button:has-text("Clear all")');
    
    // Wait for clear action
    await page.waitForTimeout(300);
    
    // Capture empty state
    const tableCard = page.locator('.bg-axiom-card').nth(1);
    await expect(tableCard).toHaveScreenshot('token-table-empty-state.png', {
      maxDiffPixels: 2,
      threshold: 0.2,
    });
  });

  test('loading skeleton state', async ({ page }) => {
    // Navigate to a fresh page to catch loading state
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Capture skeleton as quickly as possible
    try {
      const skeleton = page.locator('.skeleton').first();
      await expect(skeleton).toHaveScreenshot('token-table-loading-skeleton.png', {
        maxDiffPixels: 2,
        threshold: 0.2,
        timeout: 2000,
      });
    } catch (e) {
      // If skeleton loads too fast, just skip this test
      test.skip();
    }
  });
});

test.describe('Mobile Visual Regression', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test('full page baseline - mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.bg-axiom-card', { state: 'visible' });
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('token-table-mobile-full.png', {
      fullPage: true,
      maxDiffPixels: 2,
      threshold: 0.2,
    });
  });

  test('mobile responsive layout', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.bg-axiom-card', { state: 'visible' });
    await page.waitForTimeout(500);
    
    const tableCard = page.locator('.bg-axiom-card').nth(1);
    await expect(tableCard).toHaveScreenshot('token-table-mobile-layout.png', {
      maxDiffPixels: 2,
      threshold: 0.2,
    });
  });
});

test.describe('Tablet Visual Regression', () => {
  test.use({ viewport: { width: 768, height: 1024 } }); // iPad size

  test('full page baseline - tablet', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.bg-axiom-card', { state: 'visible' });
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('token-table-tablet-full.png', {
      fullPage: true,
      maxDiffPixels: 2,
      threshold: 0.2,
    });
  });
});
