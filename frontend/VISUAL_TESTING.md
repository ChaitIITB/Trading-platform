# 📸 Visual Regression Testing Guide

## Overview

Automated visual regression tests validate pixel-perfect UI with **≤2px threshold** using Playwright's screenshot comparison.

## Quick Start

### 1. Generate Baseline Screenshots (First Time)

```powershell
cd frontend
npm run test:visual:update
```

This creates baseline screenshots in `tests/visual/*.spec.ts-snapshots/`.

### 2. Run Visual Tests

```powershell
# Run all visual tests
npm run test:visual

# Run with interactive UI
npm run test:visual:ui

# View last test report
npm run test:visual:report
```

### 3. Update Baselines (After Intentional UI Changes)

```powershell
npm run test:visual:update
```

---

## Test Coverage

### Desktop Tests (1280×720)
- ✅ Full page baseline
- ✅ Token table container
- ✅ Search and filter bar
- ✅ Modal dialog
- ✅ Hover states
- ✅ Sorted states (price, volume, etc.)
- ✅ Filtered states (favorites, new pairs)
- ✅ Search results
- ✅ Empty state
- ✅ Loading skeleton

### Mobile Tests (375×667)
- ✅ Full page baseline
- ✅ Responsive layout
- ✅ Touch-friendly controls

### Tablet Tests (768×1024)
- ✅ Full page baseline
- ✅ Adaptive grid layout

---

## Threshold Configuration

**Pixel Difference Tolerance:** ≤2px per requirement

```typescript
await expect(page).toHaveScreenshot('baseline.png', {
  maxDiffPixels: 2,      // Max 2 pixels different
  threshold: 0.2,        // 0.2% threshold
});
```

### Why These Settings?

- `maxDiffPixels: 2` enforces the strict ≤2px requirement
- `threshold: 0.2` accounts for sub-pixel rendering differences across environments
- Tests run in CI with consistent Ubuntu runners to avoid false positives

---

## CI/CD Integration

Visual tests run automatically on:
- ✅ Pull requests to `main` or `develop`
- ✅ Pushes to `main` branch
- ✅ Manual workflow dispatch

### GitHub Actions Workflow

Located at `.github/workflows/visual-regression.yml`

**Test Matrix:**
- `chromium-desktop` (1280×720)
- `chromium-mobile` (iPhone 12)

**Artifacts:**
- Playwright report (on failure)
- Test results (always)
- Baseline screenshots (on main branch)

---

## Handling Test Failures

### 1. Review Diff Images

After a failed test, download artifacts from GitHub Actions:

1. Go to Actions tab → Failed workflow
2. Download `playwright-report-*` artifact
3. Open `index.html` to view visual diffs

### 2. Local Debugging

```powershell
# Run tests in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test tests/visual/token-table.spec.ts

# Debug a specific test
npx playwright test --debug
```

### 3. Update Baselines (If Changes Are Intentional)

```powershell
# Update all baselines
npm run test:visual:update

# Update specific test
npx playwright test tests/visual/token-table.spec.ts --update-snapshots
```

**⚠️ Important:** Commit updated baselines to git after verification.

---

## Best Practices

### ✅ Do

- Run tests locally before pushing
- Update baselines after intentional UI changes
- Review diff images carefully in CI failures
- Use consistent viewport sizes
- Wait for animations to complete in tests

### ❌ Don't

- Commit baseline updates without reviewing diffs
- Ignore test failures in CI
- Run tests with unstable internet (affects font loading)
- Update baselines to "fix" unintentional UI changes

---

## Test Structure

```
frontend/
├── tests/
│   └── visual/
│       ├── token-table.spec.ts          # Main visual tests
│       └── token-table.spec.ts-snapshots/
│           ├── token-table-desktop-full-chromium-desktop-linux.png
│           ├── token-table-mobile-full-chromium-mobile-linux.png
│           └── ... (all baseline screenshots)
├── playwright.config.ts                  # Playwright configuration
└── package.json                          # Test scripts
```

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `npm run test:visual` | Run all visual tests |
| `npm run test:visual:ui` | Run with interactive Playwright UI |
| `npm run test:visual:update` | Update baseline screenshots |
| `npm run test:visual:report` | Open last test report |
| `npx playwright test --headed` | Run with visible browser |
| `npx playwright test --debug` | Debug mode with Playwright Inspector |
| `npx playwright show-report` | Show HTML report |

---

## Troubleshooting

### Issue: Tests fail locally but pass in CI

**Cause:** Font rendering differences between OS

**Solution:**
- Use CI as source of truth
- Update baselines in CI using `--update-snapshots` flag

### Issue: Tests are flaky

**Cause:** Animations or timing issues

**Solution:**
- Increase `waitForTimeout()` durations in tests
- Add `state: 'visible'` checks before screenshots
- Disable animations in test environment

### Issue: Baseline images missing

**Cause:** First run hasn't created baselines

**Solution:**
```powershell
npm run test:visual:update
git add tests/**/*.png
git commit -m "Add baseline screenshots"
```

---

## Adding New Visual Tests

1. Create/edit test file in `tests/visual/`
2. Add test case with `toHaveScreenshot()`
3. Run with `--update-snapshots` to create baseline
4. Commit baseline screenshots
5. Verify in CI

Example:
```typescript
test('new component baseline', async ({ page }) => {
  await page.goto('/new-page');
  await page.waitForSelector('.my-component');
  
  await expect(page).toHaveScreenshot('new-component.png', {
    maxDiffPixels: 2,
    threshold: 0.2,
  });
});
```

---

## Resources

- [Playwright Visual Comparisons](https://playwright.dev/docs/test-snapshots)
- [Playwright Configuration](https://playwright.dev/docs/test-configuration)
- [GitHub Actions Artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts)

---

**✅ Visual regression testing is now fully automated!**

All UI changes are validated against ≤2px threshold in CI/CD pipeline.
