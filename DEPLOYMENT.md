# 🚀 Deployment Guide

This guide covers deploying your portfolio using a split architecture:
- **Frontend (React/Vite)** → Vercel
- **Backend (Express API)** → Render

---

## 📋 Prerequisites

- [x] GitHub repository
- [x] Vercel account (sign up at [vercel.com](https://vercel.com))
- [x] Render account (sign up at [render.com](https://render.com))
- [x] Resend API key for emails
- [x] Domain names: rstriana.com, rstriana.dev

---

## 🎨 Part 1: Deploy Backend to Render

### Step 1: Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

```
Name: rstriana-api
Region: Oregon (or closest to your users)
Branch: main (or your production branch)
Root Directory: (leave empty)
Runtime: Node
Build Command: npm install
Start Command: node server/index.js
Plan: Free
```

### Step 2: Add Environment Variables

In Render dashboard, add these environment variables:

```
NODE_ENV=production
PORT=3001
RESEND_API_KEY=your_actual_resend_api_key
FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=me@rstriana.com
ALLOWED_ORIGINS=https://rstriana.com,https://rstriana.dev,https://www.rstriana.com
```

### Step 3: Deploy

- Click **"Create Web Service"**
- Render will automatically build and deploy
- Your API will be available at: `https://rstriana-api.onrender.com`
- Health check endpoint: `https://rstriana-api.onrender.com/api/health`

### Step 4: (Optional) Set Up Custom Domain

1. Go to **Settings** → **Custom Domain**
2. Add: `api.rstriana.com`
3. Add the CNAME record to your DNS provider:
   ```
   Type: CNAME
   Name: api
   Value: rstriana-api.onrender.com
   ```

---

## 💻 Part 2: Deploy Frontend to Vercel

### Step 1: Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect it's a Vite project

### Step 2: Configure Project

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Step 3: Add Environment Variable

Add this environment variable in Vercel:

```
VITE_API_URL=https://rstriana-api.onrender.com
```

Or if you set up custom domain:
```
VITE_API_URL=https://api.rstriana.com
```

### Step 4: Deploy

- Click **"Deploy"**
- Vercel will build and deploy automatically
- Your site will be live at a temporary URL like: `rstriana-dev.vercel.app`

### Step 5: Add Custom Domains

1. Go to **Settings** → **Domains**
2. Add your domains:
   - `rstriana.com`
   - `www.rstriana.com`
   - `rstriana.dev`
   - `www.rstriana.dev`

3. Configure DNS records (in your domain registrar):

**For rstriana.com:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For rstriana.dev:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Vercel will automatically provision SSL certificates

---

## 🔄 Automatic Deployments

### Frontend (Vercel)
- **Automatic**: Every push to `main` branch triggers a new deployment
- **Preview**: Pull requests get unique preview URLs
- **Rollback**: Instant rollback to any previous deployment

### Backend (Render)
- **Automatic**: Every push to `main` branch triggers a new deployment
- **Manual**: Can trigger manual deploys from dashboard
- **Note**: Free tier may have cold starts (spins down after inactivity)

---

## 🧪 Testing Your Deployment

### Test Backend API
```bash
curl https://rstriana-api.onrender.com/api/health
# Should return: {"status":"ok"}
```

### Test Frontend
1. Visit: https://rstriana.com
2. Navigate to contact form
3. Send a test message
4. Check your email (me@rstriana.com)

---

## 📊 Monitoring & Analytics

### Vercel
- Dashboard shows: Build logs, deployment history, analytics
- Web Vitals tracking included
- Real-time error logging

### Render
- Dashboard shows: Logs, metrics, deployment history
- Free tier includes basic metrics
- Set up alerts for service health

---

## 🔧 Troubleshooting

### Issue: CORS Errors
**Solution**: Verify `ALLOWED_ORIGINS` in Render includes all your domains

### Issue: Email Not Sending
**Solution**: Check Resend API key and verify `FROM_EMAIL` is authorized

### Issue: API Cold Starts (Render Free Tier)
**Solution**: 
- Upgrade to paid plan ($7/mo) for always-on instances
- Or accept 30-60 second cold start on first request after inactivity

### Issue: Build Fails on Vercel
**Solution**: 
- Check build logs in Vercel dashboard
- Verify `VITE_API_URL` environment variable is set
- Ensure all dependencies are in `package.json`

---

## 🔐 Security Checklist

- [x] Environment variables stored securely (not in code)
- [x] CORS configured to allow only your domains
- [x] Rate limiting enabled (3 requests per 15 min)
- [x] HTTPS enforced on both platforms
- [x] Input validation on all form fields
- [x] Security headers configured (Helmet.js)

---

## 📈 Post-Deployment Tasks

1. **Submit to Search Engines**
   - [Google Search Console](https://search.google.com/search-console)
   - Submit sitemap: `https://rstriana.com/sitemap.xml`
   - Request indexing

2. **Test Social Media Previews**
   - [Facebook Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

3. **Set Up Analytics** (Optional)
   - Vercel Analytics (built-in)
   - Google Analytics
   - Plausible or Fathom (privacy-friendly)

4. **Monitor Performance**
   - [PageSpeed Insights](https://pagespeed.web.dev/)
   - [GTmetrix](https://gtmetrix.com/)
   - [WebPageTest](https://www.webpagetest.org/)

---

## 🔄 Update Process

### To Deploy Changes:

1. Make changes locally
2. Test locally:
   ```bash
   # Frontend
   npm run dev
   
   # Backend (in separate terminal)
   cd server && node index.js
   ```
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
4. Both platforms auto-deploy!

---

## 💰 Cost Breakdown

| Service | Plan | Cost | Resources |
|---------|------|------|-----------|
| Vercel | Hobby | **Free** | Unlimited bandwidth, 100GB/month |
| Render | Free | **Free** | 750 hours/month (always-on for 1 service) |
| **Total** | | **$0/month** | Perfect for portfolio! |

### If You Need More:
- Render Starter: $7/month (always-on, no cold starts)
- Vercel Pro: $20/month (team features, more analytics)

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Your Email**: me@rstriana.com

---

**🎉 That's it! Your portfolio is now live and production-ready!**

