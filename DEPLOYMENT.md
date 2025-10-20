# Deployment Guide

## Option 1: Deploy to Vercel (Recommended for Next.js)

Vercel is the easiest option since it's made by the Next.js team.

### Steps:

1. **Push your code to GitHub:**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Done!** Your site will be live at `https://your-project-name.vercel.app`

### Automatic Deployments:
- Every push to `main` branch will automatically redeploy
- Pull requests get preview deployments

---

## Option 2: Deploy to GitHub Pages

GitHub Pages requires static export since it doesn't support server-side rendering.

### Steps:

1. **Update `next.config.js` for static export:**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
     basePath: process.env.NODE_ENV === 'production' ? '/YOUR_REPO_NAME' : '',
   }
   
   module.exports = nextConfig
   ```

2. **Add deployment script to `package.json`:**
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start",
       "lint": "next lint",
       "deploy": "next build && npx gh-pages -d out"
     }
   }
   ```

3. **Install gh-pages:**
   ```powershell
   npm install --save-dev gh-pages
   ```

4. **Push to GitHub:**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

5. **Deploy:**
   ```powershell
   npm run deploy
   ```

6. **Enable GitHub Pages:**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` / `root`
   - Save

7. **Your site will be live at:**
   `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

### Note on GitHub Pages Limitations:
- No server-side rendering (SSR)
- No API routes
- Images need `unoptimized: true`
- Your blog will work fine since it's mostly static content

---

## Recommendation

**Use Vercel** because:
- Zero configuration needed
- Automatic deployments on git push
- Better performance (Edge network)
- No need to modify your code
- Free SSL certificates
- Analytics available
- Built specifically for Next.js

GitHub Pages works but requires static export and has more limitations.
