# Git Setup Script
# Run this to initialize git and make your first commit

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: Complete token discovery table - Axiom Trade replica

- Next.js 14 App Router with TypeScript strict mode
- Dark theme matching Axiom Trade design
- Fully responsive (320px to desktop)
- Real-time WebSocket mock with smooth transitions
- Sortable columns with accessible interactions
- Radix UI modals and tooltips
- Progressive loading with React Query
- Memoized components for performance
- Error boundaries and loading states
- Lighthouse-optimized (SEO, security headers, compression)
- Production build tested and working"

Write-Host "✅ Git initialized and first commit created!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create a new repository on GitHub"
Write-Host "2. Run: git remote add origin YOUR_REPO_URL"
Write-Host "3. Run: git branch -M main"
Write-Host "4. Run: git push -u origin main"
