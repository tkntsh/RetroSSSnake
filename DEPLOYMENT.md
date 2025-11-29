# Deployment Guide - Snake Game

This guide will walk you through deploying your Snake game to Vercel.

## Prerequisites

Before deploying, ensure you have:
- [Node.js](https://nodejs.org/) installed (v16 or higher)
- [Git](https://git-scm.com/) installed
- A [GitHub](https://github.com/) account
- A [Vercel](https://vercel.com/) account (free tier works perfectly)

---

## Step 1: Prepare Your Codebase

### 1.1 Verify Build Works Locally

```bash
# Install dependencies
npm install

# Test the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

If all commands run successfully, your codebase is ready for deployment!

### 1.2 Files Already Configured

Your project already includes:
- ✅ `package.json` - Build scripts configured
- ✅ `vite.config.js` - Vite build settings
- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `.gitignore` - Git ignore rules

---

## Step 2: Initialize Git Repository

If you haven't already initialized a Git repository:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Snake game with Game Boy aesthetic"
```

---

## Step 3: Push to GitHub

### 3.1 Create a New Repository on GitHub

1. Go to [GitHub](https://github.com/)
2. Click the **+** icon in the top right
3. Select **New repository**
4. Name it (e.g., `snake-game`)
5. **Do NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

### 3.2 Link Your Local Repository to GitHub

GitHub will show you commands. Use these:

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/snake-game.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 4: Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Go to [Vercel](https://vercel.com/)**
2. **Sign in** with your GitHub account
3. **Click "Add New Project"**
4. **Import your GitHub repository:**
   - Select your `snake-game` repository
   - Click **Import**
5. **Configure Project:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build` (should be auto-detected)
   - **Output Directory:** `dist` (should be auto-detected)
   - **Install Command:** `npm install` (should be auto-detected)
6. **Click "Deploy"**

Vercel will:
- Install dependencies
- Build your project
- Deploy to a production URL
- Provide you with a live link (e.g., `https://snake-game-xyz.vercel.app`)

### Method 2: Vercel CLI

Alternatively, use the Vercel CLI:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy (follow the prompts)
vercel

# Deploy to production
vercel --prod
```

---

## Step 5: Verify Deployment

1. **Visit your Vercel URL** (provided after deployment)
2. **Test all features:**
   - ✅ Main menu loads
   - ✅ Game starts and runs smoothly
   - ✅ Controls work (keyboard, touch, mobile D-pad)
   - ✅ Score and high score persist
   - ✅ Particle effects display
   - ✅ Pause and game over screens work
   - ✅ Tech stack page loads with animated background
   - ✅ Mobile responsiveness

---

## Step 6: Custom Domain (Optional)

To use a custom domain:

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

---

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update: improved particle effects"
git push

# Vercel automatically detects the push and redeploys
```

Every push to `main` triggers a new deployment!

---

## Troubleshooting

### Build Fails

**Check the build logs in Vercel Dashboard:**
- Ensure `package.json` has correct scripts
- Verify all dependencies are listed
- Check for JavaScript errors

### Game Doesn't Load

**Common issues:**
- Clear browser cache
- Check browser console for errors
- Verify all assets are in the `dist` folder after build

### High Score Not Persisting

- LocalStorage works on the same domain
- Different Vercel preview URLs have separate storage
- Production URL will maintain consistent storage

---

## Project Structure

```
snake-game/
├── index.html              # Main game page
├── stack.html              # Tech stack page
├── style.css               # Main styles
├── stack.css               # Tech stack styles
├── src/
│   ├── main.js            # Game entry point
│   ├── game.js            # Game loop
│   ├── snake.js           # Snake class
│   ├── food.js            # Food class
│   ├── particles.js       # Particle system
│   ├── controls.js        # Input handling
│   ├── ui.js              # UI manager
│   └── stack-demo.js      # Animated demo
├── package.json           # Dependencies
├── vite.config.js         # Vite config
├── vercel.json            # Vercel config
└── .gitignore             # Git ignore
```

---

## Environment Variables

This project doesn't require environment variables. Everything runs client-side!

---

## Performance Tips

Your game is already optimized, but here are some tips:

- ✅ **60fps gameplay** - RequestAnimationFrame loop
- ✅ **Minified build** - Vite automatically minifies
- ✅ **No external dependencies** - Vanilla JS for speed
- ✅ **Efficient rendering** - Canvas-based graphics
- ✅ **Lazy loading** - Only loads what's needed

---

## Support

If you encounter issues:

1. **Check Vercel Logs:** Dashboard → Deployments → Click deployment → View logs
2. **Browser Console:** F12 → Console tab
3. **Vercel Documentation:** [vercel.com/docs](https://vercel.com/docs)

---

## Next Steps

After deployment:
- Share your game URL!
- Add to your portfolio
- Customize further (new maps, power-ups, etc.)
- Monitor analytics in Vercel Dashboard

---

**🎮 Happy Gaming! Your Snake game is now live on the web!**
