# 🚀 InternConnect Deployment Guide

## Issues Identified & Solutions

### 1. PDF Files Impact
**Issue**: Your public folder contains sample PDFs (~600KB total) which can slow deployment and increase bundle size.

**Solution Options**:
- **Option A (Recommended)**: Move PDFs to cloud storage (Supabase Storage)
- **Option B**: Keep essential PDFs, remove unnecessary ones
- **Option C**: Use placeholder PDFs with smaller sizes

### 2. AI Mentor Configuration
**Issue**: Uses Lovable API which requires whitelisting for production.

**Solutions**:
- **For Demo**: Keep current setup (works in dev)
- **For Production**: Switch to OpenAI API or configure Lovable API properly

## 🔧 Pre-Deployment Setup

### Step 1: Clean Up Files (Optional but Recommended)
```bash
# Remove large sample files if not needed
rm public/sample-resume.pdf
rm public/reports/*.pdf

# Or move to .gitignore if you want to keep locally
echo "public/sample-resume.pdf" >> .gitignore
echo "public/reports/*.pdf" >> .gitignore
```

### Step 2: Environment Variables Setup
Create these environment variables in your deployment platform:

```env
# Supabase Configuration
VITE_SUPABASE_PROJECT_ID=zeqjdntjzydoncuzcmhd
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplcWpkbnRqenlkb25jdXpjbWhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODU1MzAsImV4cCI6MjA3NTA2MTUzMH0.70yw9WNsG9yImMvS8uzfpNMQRXapQpYixIA4PihL_rY
VITE_SUPABASE_URL=https://zeqjdntjzydoncuzcmhd.supabase.co

# For AI Mentor (if using Lovable API)
LOVABLE_API_KEY=your_lovable_api_key_here

# Alternative AI Setup (Recommended for Production)
OPENAI_API_KEY=your_openai_api_key_here
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

#### Using Vercel CLI:
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow prompts and set environment variables
```

#### Using Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy automatically

### Option 2: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify deploy --build

# For production deployment
netlify deploy --prod --build
```

### Option 3: GitHub Pages (Static only)
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Deploy
npm run build
npm run deploy
```

## 🔧 AI Mentor Whitelisting

### Current Setup (Lovable API)
- **Status**: Works in development
- **Production**: Requires Lovable API whitelisting
- **Action Needed**: Contact Lovable support for production access

### Alternative Setup (OpenAI API)
Replace the AI mentor with OpenAI API for production:

```typescript
// In supabase/functions/soft-skills-mentor/index.ts
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: messages,
  }),
});
```

## 🚀 Step-by-Step Deployment (Vercel)

### 1. Prepare Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy via Vercel Dashboard
1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Add Environment Variables
In Vercel dashboard > Settings > Environment Variables:
- Add all VITE_* variables
- Add LOVABLE_API_KEY (if using Lovable)

### 4. Deploy
- Click "Deploy"
- Wait for build to complete
- Visit your deployed URL

## 🔍 Common Deployment Issues & Solutions

### Issue: Build Fails
**Solution**: Check build command and dependencies
```bash
# Test build locally first
npm run build

# Check for any errors in build output
```

### Issue: Environment Variables Not Working
**Solution**: Ensure variables start with `VITE_` for client-side access
```bash
# ✅ Correct
VITE_SUPABASE_URL=...

# ❌ Incorrect
SUPABASE_URL=...
```

### Issue: Routing Not Working
**Solution**: Vercel.json already configured for SPA routing

### Issue: AI Mentor Not Working in Production
**Solution**: 
1. Check Lovable API key is set
2. Consider switching to OpenAI API
3. Check CORS settings in Supabase function

## 📊 Deployment Checklist

- [ ] Remove/optimize large PDF files
- [ ] Set up environment variables
- [ ] Test build locally (`npm run build`)
- [ ] Choose deployment platform
- [ ] Configure domain (optional)
- [ ] Set up monitoring/analytics
- [ ] Test all features in production
- [ ] Configure AI mentor for production use

## 🆘 Need Help?

1. **Build Issues**: Check the build logs for specific errors
2. **Environment Variables**: Ensure they're properly set in deployment platform
3. **AI Mentor**: Consider switching to OpenAI API for production
4. **PDF Issues**: Move large files to cloud storage

## 🎯 Quick Deploy Commands

For immediate deployment with current setup:

```bash
# Clean build
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod --build
```

Remember to set your environment variables in the deployment platform's dashboard!
