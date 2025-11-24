# 🧪 Quick Test Guide

## Test All New Features in 2 Minutes

### 1. Search (10 seconds)
```
✓ Type "BONK" in search bar
✓ Should show only BONK tokens
✓ Clear search → all tokens return
```

### 2. Filters (15 seconds)
```
✓ Click "Favorites" pill → Empty (no favorites yet)
✓ Click "New Pairs" → Shows tokens without finalStretch/migrated
✓ Click "All" → Shows everything
```

### 3. Favorites (20 seconds)
```
✓ Click ☆ on first token → Becomes ⭐
✓ Click "Favorites" filter → Shows only that token
✓ Click ⭐ again → Removes from favorites
```

### 4. Sorting (20 seconds)
```
✓ Click "Price" header → Sorts ascending (↑)
✓ Click again → Sorts descending (↓)
✓ Try "Volume" and "24h" columns
```

### 5. Edit Token (30 seconds)
```
✓ Click any token row → Modal opens
✓ Click "Edit Token" button
✓ Change pair name to "TEST/USDC"
✓ Change price to "1.5000"
✓ Click "Save Changes"
✓ Close modal → Row shows updated data
```

### 6. Delete Token (15 seconds)
```
✓ Hover over any token row
✓ See action buttons appear (eye & trash icons)
✓ Click trash icon
✓ Confirm deletion
✓ Token disappears from list
```

### 7. Load More (10 seconds)
```
✓ Scroll to bottom
✓ Click "Load more" button
✓ 10 new tokens appear
✓ All have unique names (no duplicates)
```

### 8. Clear All (5 seconds)
```
✓ Click "Clear all" button (red)
✓ All tokens removed
✓ Empty state message appears
```

### 9. Real-time Updates (30 seconds)
```
✓ Load some tokens
✓ Watch prices change every 1.5 seconds
✓ Some tokens flash green (price up)
✓ Some tokens flash red (price down)
✓ Changes are realistic (not accumulating infinitely)
```

### 10. Mobile Responsive (15 seconds)
```
✓ Resize browser to 400px width
✓ Search bar stacks vertically
✓ Filter pills scroll horizontally
✓ Volume column hidden
✓ Action buttons hidden (tap row instead)
✓ Touch-friendly sizing
```

---

## Expected Behavior

### ✅ Working Features
- [x] Search filters instantly
- [x] Filters work independently
- [x] Favorites toggle and persist
- [x] Sorting works on all columns
- [x] Edit saves changes immediately
- [x] Delete removes token permanently
- [x] Load more generates unique IDs
- [x] Real-time updates are smooth
- [x] No console errors
- [x] Responsive down to 320px

### 🎯 Key Validations
- Token IDs are always unique (no "Warning: Encountered two children with the same key")
- Price changes stay realistic (not growing infinitely)
- Search + filter work together
- Edit modal updates table immediately
- Delete confirmation prevents accidents
- Hover actions appear smoothly
- Mobile layout is usable

---

## 🐛 Known Limitations (By Design)

1. **Favorites don't persist** - Reloading page resets favorites (would need LocalStorage)
2. **WebSocket is mock** - Real app would use actual WebSocket connection
3. **No backend** - All data is client-side only
4. **Limited tokens** - Only 20 unique token names cycle

---

## 🚀 Quick Demo Script

**For recording the YouTube video:**

1. **Intro (10s)**: "Token discovery table with real-time updates and full CRUD operations"
2. **Search (10s)**: Type "PEPE", show filtering
3. **Sort (10s)**: Click headers, show ascending/descending
4. **Favorite (10s)**: Star a token, filter by favorites
5. **Edit (15s)**: Open modal, edit price, save changes
6. **Delete (10s)**: Hover row, delete token
7. **Real-time (15s)**: Show prices updating live
8. **Responsive (15s)**: Resize to mobile, show adaptiv layout
9. **Load more (10s)**: Add more tokens, show unique IDs
10. **Outro (5s)**: "Fully functional with optimized performance"

**Total: ~2 minutes**

---

Ready to test! App is running on http://localhost:3000 🚀
