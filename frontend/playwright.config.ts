import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for visual regression testing
 * Tests verify pixel-perfect UI with ≤2px threshold
 */
export default defineConfig({
  testDir: './tests',
  
  // Timeout for each test
  timeout: 30 * 1000,
  
  // Test configuration
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html'],
    ['list']
  ],
  
  use: {
    // Base URL for tests
    baseURL: 'http://localhost:3000',
    
    // Screenshot settings for visual regression
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    
    // Viewport size for consistent screenshots
    viewport: { width: 1280, height: 720 },
  },

  // Project configurations for different browsers/viewports
  projects: [
    {
      name: 'chromium-desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'chromium-mobile',
      use: { 
        ...devices['iPhone 12'],
        // Override to use chromium instead of webkit
        ...devices['Desktop Chrome'],
        viewport: devices['iPhone 12'].viewport,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],

  // Run local dev server before starting tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
