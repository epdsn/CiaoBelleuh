# 🚀 Deployment Guide - CiaoBelleuh Nails Website

This guide will help you deploy your CiaoBelleuh Nails website to production.

## 📋 Pre-Deployment Checklist

Before deploying, make sure you've completed:

- [ ] Added your nail art images to `images/` folder
- [ ] Updated business information in `index.html` (address, phone, hours)
- [ ] Changed social media links to your actual accounts
- [ ] Customized colors (optional)
- [ ] Tested the website locally

## 🌐 Deployment Options

### Option 1: GitHub Pages (Recommended for Beginners - FREE)

**Pros**: Free, easy to set up, automatic updates
**Cons**: Contact form requires Azure Function separately

**Steps:**

1. **Create a GitHub account** (if you don't have one)
   - Go to [github.com](https://github.com)
   - Sign up for free

2. **Create a new repository**
   - Click "+" in top right → "New repository"
   - Name it: `ciaobelleuh-nails`
   - Make it Public
   - Click "Create repository"

3. **Upload your code**
   ```bash
   # In your project folder
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/ciaobelleuh-nails.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: / (root)
   - Click Save

5. **Access your site**
   - Your site will be at: `https://YOUR-USERNAME.github.io/ciaobelleuh-nails/`
   - Takes 2-5 minutes to deploy

6. **Custom Domain** (Optional)
   - Add your domain in GitHub Pages settings
   - Update DNS records at your domain provider

---

### Option 2: Netlify (Best for Static Sites - FREE)

**Pros**: Free tier, drag-and-drop deployment, custom domains, automatic SSL
**Cons**: Contact form requires Azure Function separately

**Method A: Drag and Drop (Easiest)**

1. Go to [netlify.com](https://www.netlify.com)
2. Sign up (free)
3. Drag your entire project folder to the upload area
4. Your site is live! (Takes ~30 seconds)

**Method B: GitHub Integration (Recommended)**

1. Push code to GitHub (see GitHub Pages steps 1-3)
2. Sign up at [netlify.com](https://www.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub
5. Select your repository
6. Click "Deploy site"

**Custom Domain on Netlify:**
1. Domain settings → Add custom domain
2. Follow DNS setup instructions
3. SSL certificate is automatic!

---

### Option 3: Azure Static Web Apps (Full Stack Solution)

**Pros**: Integrates perfectly with Azure Functions, free tier available
**Cons**: Slightly more complex setup

**Steps:**

1. **Install Azure CLI**
   ```bash
   # Windows (with Chocolatey)
   choco install azure-cli
   
   # macOS
   brew install azure-cli
   
   # Linux
   curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
   ```

2. **Login to Azure**
   ```bash
   az login
   ```

3. **Create a Static Web App**
   ```bash
   az staticwebapp create \
     --name ciaobelleuh-nails \
     --resource-group ciaobelleuh-rg \
     --source . \
     --location "eastus2" \
     --branch main \
     --app-location "/" \
     --api-location "azure-function"
   ```

4. **Deploy**
   - Push to GitHub
   - Azure automatically deploys from your repository

5. **Access your site**
   - Azure provides a URL: `https://ciaobelleuh-nails.azurestaticapps.net`
   - Custom domains available in Azure Portal

---

### Option 4: Vercel (Developer-Friendly - FREE)

**Pros**: Super fast deployment, great developer experience
**Cons**: Primarily for Next.js/React (but works with static sites)

**Steps:**

1. Install Vercel CLI
   ```bash
   npm install -g vercel
   ```

2. Deploy
   ```bash
   cd /path/to/your/project
   vercel
   ```

3. Follow the prompts
   - Login/signup when prompted
   - Confirm settings
   - Your site is live!

4. Custom domain
   ```bash
   vercel domains add yourdomain.com
   ```

---

## 📧 Deploying the Azure Function (Contact Form)

### Prerequisites

- Azure account (free tier available)
- Azure Functions Core Tools installed
- SMTP credentials (Gmail, Outlook, etc.)

### Quick Deployment

1. **Navigate to function folder**
   ```bash
   cd azure-function
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Login to Azure**
   ```bash
   az login
   ```

4. **Create Function App**
   ```bash
   az functionapp create \
     --resource-group ciaobelleuh-rg \
     --consumption-plan-location eastus \
     --runtime node \
     --runtime-version 18 \
     --functions-version 4 \
     --name ciaobelleuh-contact-fn \
     --storage-account ciaobelleuhstorage
   ```

5. **Configure environment variables** (see azure-function/README.md)

6. **Deploy**
   ```bash
   func azure functionapp publish ciaobelleuh-contact-fn
   ```

7. **Update website**
   - Get your function URL from Azure Portal
   - Update `CONFIG.azureFunctionUrl` in `script.js`
   - Redeploy website

**Full details**: See `azure-function/README.md`

---

## 🔐 SSL/HTTPS Setup

### GitHub Pages
- Automatic HTTPS (enable in settings)

### Netlify
- Automatic SSL certificate
- Works with custom domains

### Azure
- Automatic SSL
- Custom domains supported

### Custom Domain
- Most providers offer free SSL (Let's Encrypt)
- Update DNS records as instructed by your hosting provider

---

## 🎯 After Deployment

### 1. Test Everything
- [ ] Visit your live site
- [ ] Test on mobile devices
- [ ] Try the contact form
- [ ] Click all social media links
- [ ] Check all images load

### 2. Performance Check
- [ ] Test site speed: [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Optimize images if needed
- [ ] Enable caching

### 3. SEO Setup
- [ ] Submit to Google Search Console
- [ ] Add Google Analytics (optional)
- [ ] Create sitemap.xml (optional)

### 4. Social Media
- [ ] Update Instagram bio with website link
- [ ] Share on Facebook
- [ ] Pin to Pinterest
- [ ] Add to TikTok profile

---

## 🔄 Updating Your Site

### GitHub Pages / Netlify (GitHub integration)
```bash
# Make your changes
git add .
git commit -m "Update content"
git push
# Site updates automatically!
```

### Netlify (drag-and-drop)
1. Make changes locally
2. Drag updated folder to Netlify
3. New version deployed!

### Azure Static Web Apps
```bash
git add .
git commit -m "Update"
git push
# Deploys automatically via GitHub Actions
```

---

## 💰 Cost Estimate

### Free Tier (Most Small Businesses)
- **Website Hosting**: $0 (GitHub Pages, Netlify, Vercel free tiers)
- **Azure Function**: $0 (first 1M requests free)
- **Domain**: $10-15/year (optional, from any registrar)
- **Email**: $0 (using Gmail SMTP)

**Total Monthly Cost: $0-2**

### Paid Options (If you exceed free tier)
- **Netlify Pro**: $19/month (100GB bandwidth)
- **Azure Function**: $0.20 per million requests
- **Premium Email**: $5-10/month (optional)

---

## 🆘 Troubleshooting

### Site Not Loading
1. Wait 5-10 minutes after initial deployment
2. Clear browser cache (Ctrl+Shift+R)
3. Check deployment logs in your hosting dashboard

### Contact Form Not Working
1. Verify Azure Function is deployed
2. Check `CONFIG.azureFunctionUrl` in `script.js`
3. Test function directly with Postman/curl
4. Check Azure Function logs

### Images Not Displaying
1. Verify images are committed to git
2. Check file paths are relative (`images/filename.jpg`)
3. Ensure files are under 5MB each

### Custom Domain Issues
1. Wait 24-48 hours for DNS propagation
2. Verify DNS records are correct
3. Check domain registrar settings

---

## 📞 Getting Help

1. **GitHub Pages**: [GitHub Docs](https://docs.github.com/pages)
2. **Netlify**: [Netlify Docs](https://docs.netlify.com)
3. **Azure**: [Azure Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps)
4. **Azure Functions**: [Azure Functions Docs](https://docs.microsoft.com/azure/azure-functions)

---

## ✅ Deployment Complete!

Once deployed, share your beautiful new website:
- 📱 Add to Instagram bio
- 📧 Include in email signature  
- 🖨️ Print on business cards
- 📍 Add to Google My Business
- 📣 Share on social media

**Your salon website is now live! 🎉💅**
