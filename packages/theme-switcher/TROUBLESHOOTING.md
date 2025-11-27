# Troubleshooting

## Next.js Font Issues

If you see font resolution errors like:
```
Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'
```

**Solutions:**

1. **Restart dev server**:
   ```bash
   rm -rf .next
   npm run dev
   ```

2. **Update Next.js**:
   ```bash
   npm install next@latest
   ```

3. **Use local fonts instead**:
   ```tsx
   // Instead of next/font/google
   import localFont from 'next/font/local'
   
   const geistMono = localFont({
     src: './fonts/GeistMono.woff2'
   })
   ```

4. **Disable Turbopack temporarily**:
   ```bash
   npm run dev -- --no-turbo
   ```

This is a Next.js/Turbopack issue, not related to the theme-switcher package.