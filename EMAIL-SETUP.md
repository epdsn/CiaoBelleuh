# 📧 Email Service Setup Guide

Simple, **no Azure required!** Choose one of these free email services to handle your contact form submissions.

## 🌟 Recommended: EmailJS (Best Overall)

**Free Plan**: 200 emails/month  
**Setup Time**: 5 minutes  
**Difficulty**: ⭐⭐ Easy

### Step-by-Step Setup:

1. **Sign up at [EmailJS.com](https://www.emailjs.com)**
   - Click "Sign Up Free"
   - Use your email (or sign in with Google)

2. **Add Email Service**
   - Go to "Email Services" → "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - For Gmail:
     - Click "Connect Account"
     - Authorize EmailJS
   - Service ID will be generated (copy it!)

3. **Create Email Template**
   - Go to "Email Templates" → "Create New Template"
   - Template Name: "Contact Form"
   - Use this template:
   
   ```
   Subject: New Contact from {{from_name}} - {{service}}
   
   New contact form submission from CiaoBelleuh Nails:
   
   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   Service: {{service}}
   
   Message:
   {{message}}
   
   ---
   Sent from CiaoBelleuh Nails website
   ```
   
   - Save and copy the Template ID

4. **Get Your Public Key**
   - Go to "Account" → "General"
   - Copy your Public Key

5. **Update `script.js`**
   ```javascript
   const CONFIG = {
       emailService: 'emailjs',
       
       emailjs: {
           serviceId: 'service_abc1234',      // Your Service ID
           templateId: 'template_xyz5678',     // Your Template ID
           publicKey: 'your_public_key_here'  // Your Public Key
       }
   };
   ```

6. **Test it!**
   - Open your website
   - Fill out the contact form
   - Check your email inbox

**✅ Done! Emails will be sent to the email account you connected.**

---

## 🚀 Alternative 1: Formspree (Easiest)

**Free Plan**: 50 submissions/month  
**Setup Time**: 2 minutes  
**Difficulty**: ⭐ Very Easy

### Setup:

1. **Sign up at [Formspree.io](https://formspree.io)**

2. **Create a new form**
   - Click "New Form"
   - Name it "CiaoBelleuh Contact"
   - Add your email address(es) where submissions should go

3. **Copy the endpoint URL**
   - Will look like: `https://formspree.io/f/xyzabc123`

4. **Update `script.js`**
   ```javascript
   const CONFIG = {
       emailService: 'formspree',
       
       formspree: {
           endpoint: 'https://formspree.io/f/xyzabc123'  // Your endpoint
       }
   };
   ```

**✅ That's it! Super simple.**

---

## 🎯 Alternative 2: Web3Forms (Unlimited Free)

**Free Plan**: Unlimited emails  
**Setup Time**: 1 minute  
**Difficulty**: ⭐ Very Easy

### Setup:

1. **Get API Key at [Web3Forms.com](https://web3forms.com)**
   - No signup required!
   - Enter your email
   - Verify email
   - Get your Access Key instantly

2. **Update `script.js`**
   ```javascript
   const CONFIG = {
       emailService: 'web3forms',
       
       web3forms: {
           accessKey: 'your-access-key-here'
       }
   };
   ```

3. **Configure email routing (on Web3Forms dashboard)**
   - Add multiple email addresses if needed
   - Set up email templates
   - Enable notifications

**✅ Done! Unlimited emails, forever free.**

---

## 📊 Comparison Table

| Service | Free Limit | Setup Difficulty | Best For |
|---------|-----------|------------------|----------|
| **EmailJS** | 200/month | Easy | Best overall, custom templates |
| **Formspree** | 50/month | Very Easy | Quick setup, simple needs |
| **Web3Forms** | Unlimited | Very Easy | High volume, no limits |

---

## 🔄 Sending to Multiple Email Addresses

### EmailJS:
- In your email template settings, add CC/BCC recipients
- Or forward emails using your email provider's rules

### Formspree:
- In form settings, add multiple "Send To" addresses
- Separate with commas: `email1@example.com, email2@example.com`

### Web3Forms:
- In dashboard, add multiple recipient emails
- Configure in "Email Settings"

---

## 🧪 Testing Your Setup

After configuring, test the form:

1. **Open your website** (http://localhost:8000 or your deployed URL)
2. **Fill out the contact form** with test data
3. **Submit the form**
4. **Check your email inbox** (may take 1-2 minutes)

### Troubleshooting:

**"Email service not configured"**
- Check that you've updated `CONFIG.emailService` in `script.js`
- Verify credentials are correct (no typos)
- Save the file and refresh your browser

**Not receiving emails:**
- Check spam/junk folder
- Verify email address in service dashboard
- Check service dashboard for delivery logs
- Wait a few minutes (some services have delays)

**Form shows error:**
- Open browser console (F12) to see detailed error
- Verify API keys/endpoints are correct
- Check service status page

---

## 💰 Cost Breakdown (All FREE!)

### EmailJS
- **Free**: 200 emails/month
- **Personal ($8/mo)**: 1,000 emails/month
- **Team ($15/mo)**: 5,000 emails/month

### Formspree
- **Free**: 50 submissions/month
- **Gold ($10/mo)**: 1,000 submissions/month

### Web3Forms
- **Free**: Unlimited (forever)
- **Premium ($5/mo)**: Custom branding, priority support

**For a small nail salon: FREE tier is more than enough!**

---

## 🎓 Which Should I Choose?

### Choose **EmailJS** if:
- ✅ You want custom email templates
- ✅ You need 200+ emails/month
- ✅ You want the most professional solution

### Choose **Formspree** if:
- ✅ You want the absolute easiest setup
- ✅ You get fewer than 50 inquiries/month
- ✅ You don't need custom templates

### Choose **Web3Forms** if:
- ✅ You want unlimited free emails
- ✅ You expect high volume
- ✅ You want instant setup (no signup)

---

## 🔐 Security Notes

All three services:
- ✅ Don't expose email credentials in browser
- ✅ Handle spam protection
- ✅ Provide SSL/HTTPS security
- ✅ Are much more secure than client-side email
- ✅ GDPR compliant

---

## ✨ You're All Set!

Your contact form will now work **without Azure Functions** using simple, free email services! 

Choose the service that fits your needs best, follow the 5-minute setup, and you're done! 🎉
