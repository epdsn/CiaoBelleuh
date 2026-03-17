# Deploy CiaoBelleuh to AWS Amplify (via GitHub)

This guide walks you through deploying the site to **AWS Amplify** with **GitHub** so every push to `main` automatically deploys.

---

## What you need

- **GitHub**: Your code in a repo (you already have `https://github.com/epdsn/CiaoBelleuh`)
- **AWS account**: [Create one](https://aws.amazon.com) if needed (Amplify free tier is generous)
- **Contact form**: Use one of the client-side options already in `script.js` (EmailJS, Formspree, or Web3Forms) — no backend required on AWS

---

## Step 1: Push your code to GitHub

If you haven’t pushed lately, from your project folder:

```bash
cd /Users/ericperez/Projects/CiaoBelleuh
git add .
git status
git commit -m "Add AWS Amplify build config"
git push -u origin main
```

Your repo should be up to date at: **https://github.com/epdsn/CiaoBelleuh**

---

## Step 2: Sign in to AWS and open Amplify

1. Go to **[AWS Console](https://console.aws.amazon.com)** and sign in.
2. In the search bar, type **Amplify** and open **AWS Amplify**.
3. In the left sidebar, click **Hosting** → **Amplify Hosting** (or **Get started** if it’s your first time).

---

## Step 3: Connect your GitHub repo

1. Click **New app** → **Host web app**.
2. Under **Get started**, choose **GitHub**.
3. Click **Continue**.
4. If asked, **Authorize AWS Amplify** in GitHub:
   - Choose **Only select repositories** and pick **CiaoBelleuh** (or **All repositories** if you prefer).
   - Click **Install & Authorize**.
5. Back in Amplify:
   - **Repository**: select **epdsn/CiaoBelleuh**.
   - **Branch**: select **main**.
   - Click **Next**.

---

## Step 4: Configure build settings

Amplify will detect the app. For this static site:

1. **App name**: e.g. `ciaobelleuh-nails` (or leave default).
2. **Build and test settings**:
   - Amplify should find the **amplify.yml** in your repo. If it shows a build spec, leave it.
   - If it asks for a framework, choose **No framework** or **Other**, so it doesn’t run a Node/React build.
3. **Advanced settings** (optional):
   - Leave defaults unless you need env vars (e.g. for a future API).
4. Click **Next**.

---

## Step 5: Review and deploy

1. Review **Repository**, **Branch**, and **Build settings**.
2. Click **Save and deploy**.

Amplify will:

- Clone the repo
- Run the build (empty for this static site, so it’s quick)
- Deploy files to a URL like:  
  **https://main.xxxxxxxx.amplifyapp.com**

The first deploy usually takes 2–5 minutes. You can watch the build logs in the Amplify console.

---

## Step 6: Open your site

1. When the build shows **Provision → Build → Deploy → Verify** all green, click the site URL (e.g. **https://main.xxxxxxxx.amplifyapp.com**).
2. Check:
   - Home, Gallery, Contact sections
   - Contact form (after you configure EmailJS, Formspree, or Web3Forms in `script.js`)

---

## Step 7 (optional): Custom domain

1. In Amplify: **App settings** → **Domain management**.
2. Click **Add domain** and follow the steps (e.g. add a domain you own).
3. Amplify will show the DNS records to add at your registrar; after DNS propagates, Amplify will issue HTTPS for the domain.

---

## Step 8: Contact form (no Azure/backend)

The contact form in `script.js` uses client-side services. Configure **one** of these and redeploy:

- **Formspree**: Sign up at [formspree.io](https://formspree.io), create a form, set `CONFIG.emailService = 'formspree'` and `CONFIG.formspree.endpoint` in `script.js`.
- **Web3Forms**: Get an access key at [web3forms.com](https://web3forms.com), set `CONFIG.emailService = 'web3forms'` and `CONFIG.web3forms.accessKey`.
- **EmailJS**: Sign up at [emailjs.com](https://www.emailjs.com), set `CONFIG.emailService = 'emailjs'` and the EmailJS IDs/keys in `CONFIG.emailjs`.

Then:

```bash
git add script.js
git commit -m "Configure contact form"
git push
```

Amplify will auto-deploy the update.

---

## Updating the site later

From your project folder:

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

Amplify will build and deploy automatically. Check the **Build** tab in the Amplify console for status and logs.

---

## Troubleshooting

| Issue | What to do |
|-------|------------|
| Build fails | In Amplify, open the failing build and read the log. For this repo, build should be empty; if Amplify runs a framework build, set app to **No framework** and use the provided **amplify.yml**. |
| 404 on refresh | Amplify should serve `index.html` for `/`; for a single-page static site this is usually fine. If you add client-side routing later, enable “Redirects and rewrites” and send `/*` to `/index.html`. |
| Contact form doesn’t send | Configure one of the options in `script.js` (Formspree / Web3Forms / EmailJS) and ensure `CONFIG.emailService` and the related keys/IDs are set. |
| Images missing | Ensure image paths in HTML are relative (e.g. `images/nail-art-1.jpg`) and that the `images/` folder is committed and pushed. |

---

## Summary

1. Push code to **GitHub** (`main`).
2. In **AWS Amplify**, create a new app and connect **epdsn/CiaoBelleuh**, branch **main**.
3. Use the provided **amplify.yml** (no build step).
4. Deploy and open the generated **Amplify URL**.
5. Optionally add a **custom domain** and configure the **contact form** in `script.js`.

After that, every `git push` to `main` will deploy automatically.
