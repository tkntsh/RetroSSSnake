# Git Push & Vercel Deployment Guide

This guide will help you push your changes to Git and trigger an automatic Vercel redeployment.

---

## 📝 Changes Made

The following stack-related files have been removed:
- `stack.html` - Tech stack page
- `stack.css` - Tech stack styles
- `src/stack-demo.js` - AI demo script
- STACK button removed from main menu

---

## 🚀 Step-by-Step Git Push Instructions

### Step 1: Check Current Status

```bash
# See what files have changed
git status
```

You should see:
- Modified: `index.html`
- Deleted: `stack.html`, `stack.css`, `src/stack-demo.js`

---

### Step 2: Stage All Changes

```bash
# Add all changes (modifications and deletions)
git add .
```

Or stage specific files:
```bash
git add index.html
git add stack.html
git add stack.css
git add src/stack-demo.js
```

---

### Step 3: Commit Changes

```bash
# Commit with a descriptive message
git commit -m "Remove tech stack page and button"
```

---

### Step 4: Push to GitHub

```bash
# Push to main branch (or your default branch)
git push origin main
```

If your default branch is named differently (e.g., `master`):
```bash
git push origin master
```

---

## ✅ What Happens Next

### Automatic Vercel Deployment

1. **GitHub receives your push**
   - Changes are uploaded to your repository

2. **Vercel detects the push**
   - Webhook triggers automatic build

3. **Build process starts**
   - Runs: `npm install`
   - Runs: `npm run build`
   - Creates production bundle in `dist/`

4. **Deployment**
   - New version deployed to production URL
   - Old version remains accessible (rollback available)
   - Deployment typically takes 1-2 minutes

5. **Notification**
   - Vercel sends deployment status (if configured)
   - Check Vercel dashboard for deployment logs

---

## 🔍 Verify Deployment

### Check Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. View **Deployments** tab
4. Latest deployment should show:
   - Status: "Ready" (green checkmark)
   - Commit message: "Remove tech stack page and button"
   - Build time: ~1-2 minutes

### Test Your Live Site

1. Visit your Vercel URL (e.g., `https://your-project.vercel.app`)
2. Verify:
   - ✅ Main menu loads
   - ✅ STACK button is gone
   - ✅ Only START and HOW TO PLAY buttons remain
   - ✅ Game functions normally
   - ✅ No 404 errors in console

---

## 🔄 Complete Command Sequence

Here's the full sequence to copy-paste:

```bash
# 1. Check status
git status

# 2. Stage all changes
git add .

# 3. Commit
git commit -m "Remove tech stack page and button"

# 4. Push to GitHub
git push origin main

# 5. Wait for Vercel deployment (1-2 minutes)
# 6. Visit your live URL to verify
```

---

## 🛠️ Troubleshooting

### Push Rejected

If you get "push rejected" error:
```bash
# Pull latest changes first
git pull origin main

# Then push again
git push origin main
```

### Merge Conflicts

If there are conflicts:
```bash
# Resolve conflicts in your editor
# Then:
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

### Vercel Build Fails

1. Check Vercel dashboard for error logs
2. Common issues:
   - Missing dependencies: Run `npm install` locally
   - Build errors: Run `npm run build` locally to test
   - Configuration issues: Check `vercel.json`

### Deployment Not Triggering

1. Verify GitHub-Vercel connection:
   - Go to Vercel dashboard
   - Settings → Git
   - Ensure repository is connected

2. Check webhook:
   - GitHub repository → Settings → Webhooks
   - Vercel webhook should be listed and active

---

## 📊 Deployment Timeline

```
0:00 - Push to GitHub
0:05 - Vercel detects push
0:10 - Build starts (npm install)
0:30 - Build runs (npm run build)
1:00 - Deployment begins
1:30 - DNS propagation
2:00 - ✅ Live on production URL
```

---

## 🔙 Rollback (If Needed)

If something goes wrong:

1. Go to Vercel dashboard
2. Click on your project
3. Go to **Deployments** tab
4. Find previous working deployment
5. Click **⋯** (three dots)
6. Select **Promote to Production**

This instantly reverts to the previous version.

---

## 📝 Git Best Practices

### Commit Message Format
```bash
# Good commit messages:
git commit -m "Remove tech stack page and button"
git commit -m "Fix: Snake collision detection"
git commit -m "Add: New particle effects"

# Avoid:
git commit -m "updates"
git commit -m "fix"
```

### Before Pushing
```bash
# Always test locally first
npm run build
npm run preview

# Check for errors
# Verify game works
# Then push
```

---

## 🎯 Next Steps

After successful deployment:

1. **Test thoroughly**
   - Play the game
   - Test all buttons
   - Check mobile responsiveness

2. **Monitor**
   - Check Vercel analytics
   - Watch for any errors

3. **Share**
   - Your game is live!
   - Share the URL

---

## 📞 Need Help?

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Git Docs:** [git-scm.com/doc](https://git-scm.com/doc)
- **Check Logs:** Vercel dashboard → Deployments → Click deployment → View logs

---

**Your changes are ready to push! Run the commands above to deploy.** 🚀
