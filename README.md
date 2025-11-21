# 💅 CiaoBelleuh Nails - Website

A beautiful, highly stylized one-page website for CiaoBelleuh Nails salon featuring a stunning gallery, contact form with Azure Function integration, and social media links.

## ✨ Features

- 🎨 **Highly Stylized Design**: Modern, elegant aesthetic perfect for a nail salon
- 📱 **Fully Responsive**: Beautiful on all devices - desktop, tablet, and mobile
- 🖼️ **Gallery Showcase**: Display your best nail art work with hover effects
- 📧 **Contact Form**: Integrated with Azure Functions for email notifications
- 🔗 **Social Media Links**: Instagram, Facebook, Pinterest, and TikTok integration
- ⚡ **Fast & Lightweight**: Optimized for quick loading
- 🎭 **Smooth Animations**: Elegant transitions and scroll effects

## 🚀 Quick Start

### Option 1: Simple Local Preview

1. **Clone or download this repository**

2. **Add your nail art images** to the `images/` folder:
   - `nail-art-1.jpg` through `nail-art-6.jpg`
   - Recommended size: 800x800px or larger

3. **Open the website**:
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Or using Node.js
     npx http-server
     ```
   - Visit `http://localhost:8000`

### Option 2: With Contact Form (5-Minute Email Setup)

To enable the contact form functionality - **No Azure required!**

Choose one of these simple, free email services:

**🌟 EmailJS (Recommended)** - 200 free emails/month
```javascript
// In script.js, update:
const CONFIG = {
    emailService: 'emailjs',
    emailjs: {
        serviceId: 'YOUR_SERVICE_ID',
        templateId: 'YOUR_TEMPLATE_ID',
        publicKey: 'YOUR_PUBLIC_KEY'
    }
};
```
Sign up at [EmailJS.com](https://www.emailjs.com) - Takes 5 minutes!

**OR Formspree** - 50 free submissions/month  
**OR Web3Forms** - Unlimited free emails

📖 **Complete setup guide**: See `EMAIL-SETUP.md` for step-by-step instructions for all services.

*(Azure Function option still available in `azure-function/` folder if you prefer that)*

## 📁 Project Structure

```
CiaoBelleuh/
├── index.html              # Main HTML file
├── styles.css              # All styling and animations
├── script.js               # JavaScript for interactions and form
├── images/                 # Nail art gallery images
│   └── README.md          # Image guidelines
├── azure-function/         # Azure Function for contact form
│   ├── package.json
│   ├── host.json
│   ├── local.settings.json
│   ├── src/
│   │   └── functions/
│   │       └── sendContactEmail.js
│   └── README.md          # Detailed deployment guide
└── README.md              # This file
```

## 🎨 Customization Guide

### Update Salon Information

**Edit `index.html`:**

1. **Business Name**: Change "CiaoBelleuh Nails" to your salon name
2. **Contact Details** (lines ~140-155):
   ```html
   <div class="info-item">
       <i class="fas fa-map-marker-alt"></i>
       <p>Your Address Here</p>
   </div>
   ```
3. **Hours**: Update business hours in the contact section
4. **Social Media Links** (lines ~215-230):
   ```html
   <a href="https://instagram.com/your-handle" ...>
   ```

### Change Colors

**Edit `styles.css` (lines 6-16):**

```css
:root {
    --primary-color: #d4a5a5;     /* Main pink/rose color */
    --accent-color: #c77b7b;       /* Darker accent */
    --gold-accent: #d4af37;        /* Gold highlights */
}
```

### Add/Remove Gallery Items

**Edit `index.html`** in the gallery section to add or remove gallery items. Each item follows this structure:

```html
<div class="gallery-item">
    <div class="gallery-image">
        <img src="images/your-image.jpg" alt="Description">
        <div class="gallery-overlay">
            <h3>Title</h3>
            <p>Description</p>
        </div>
    </div>
</div>
```

## 📧 Contact Form Setup (No Backend Required!)

The contact form uses simple, free email services - **no Azure or server needed!**

### 🌟 Recommended: EmailJS

1. Sign up at [EmailJS.com](https://www.emailjs.com) (free)
2. Connect your email account (Gmail, Outlook, etc.)
3. Create a template
4. Copy your Service ID, Template ID, and Public Key
5. Update `script.js` with your credentials

**Setup time: 5 minutes | Free tier: 200 emails/month**

### 🎯 Alternatives:

- **Formspree** - 50 free emails/month, easiest setup (2 min)
- **Web3Forms** - Unlimited free emails, instant setup (1 min)

### 📖 Complete Guide:
See `EMAIL-SETUP.md` for detailed step-by-step instructions for all services.

All emails go directly to your inbox - no server management needed!

## 🌐 Deployment Options

### Static Hosting (Website Only):

1. **GitHub Pages** (Free):
   - Push code to GitHub
   - Enable GitHub Pages in repository settings
   - Custom domain support available

2. **Netlify** (Free tier):
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

3. **Azure Static Web Apps** (Free tier):
   - Drag and drop in Azure Portal
   - Or use VS Code extension

4. **Vercel** (Free tier):
   ```bash
   npm install -g vercel
   vercel
   ```

### Full Stack (Website + Function):

- **Azure**: Website on Static Web Apps + Azure Function
- **Complete guide in `azure-function/README.md`**

## 🖼️ Image Guidelines

For best results with gallery images:

- **Format**: JPG or PNG
- **Size**: 800x800px minimum (1200x1200px optimal)
- **Aspect Ratio**: Square (1:1) works best
- **File Size**: Keep under 500KB each for fast loading
- **Quality**: High-resolution, well-lit photos
- **Naming**: Descriptive names (e.g., `french-manicure-gold.jpg`)

### Image Optimization Tools:
- [TinyPNG](https://tinypng.com/) - Compress images
- [Squoosh](https://squoosh.app/) - Browser-based compression
- Photoshop: "Save for Web" feature

## 🔧 Browser Support

- ✅ Chrome (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Edge (last 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Social Media Setup

Update social media links in `index.html` (footer section):

```html
<a href="https://instagram.com/your-handle" target="_blank">
<a href="https://facebook.com/your-page" target="_blank">
<a href="https://pinterest.com/your-profile" target="_blank">
<a href="https://tiktok.com/@your-handle" target="_blank">
```

## 🐛 Troubleshooting

### Contact Form Not Working:
1. Check browser console for errors (F12)
2. Verify Azure Function URL in `script.js`
3. Ensure Azure Function is running/deployed
4. Check CORS settings on Azure Function

### Images Not Loading:
1. Verify image files exist in `images/` folder
2. Check file names match exactly (case-sensitive)
3. Images will show placeholders if files are missing

### Styling Issues:
1. Clear browser cache (Ctrl+Shift+R)
2. Check that `styles.css` is in the same folder as `index.html`
3. Open browser developer tools to check for CSS errors

## 📚 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid, Flexbox, animations
- **JavaScript (ES6+)**: Form validation and interactions
- **Azure Functions**: Serverless backend for contact form
- **Node.js**: Azure Function runtime
- **Nodemailer**: Email sending library
- **Font Awesome**: Social media icons
- **Google Fonts**: Playfair Display & Poppins

## 🎯 Performance Tips

1. **Optimize Images**: Use compressed JPGs (quality: 80-85%)
2. **Enable Caching**: Configure in your hosting provider
3. **Use CDN**: For Font Awesome and Google Fonts (already configured)
4. **Minimize HTTP Requests**: All CSS/JS in single files
5. **Lazy Loading**: Images load as needed (implemented)

## 📄 License

This project is created for CiaoBelleuh Nails. Feel free to customize and use for your own nail salon website.

## 🤝 Support

For questions or issues:
1. Check `azure-function/README.md` for backend setup
2. Review browser console for JavaScript errors
3. Verify all file paths and names are correct

## 🎉 Next Steps

1. ✅ Add your nail art images to `images/` folder
2. ✅ Customize colors and business info
3. ✅ Set up Azure Function for contact form
4. ✅ Update social media links
5. ✅ Deploy to your hosting provider
6. ✅ Test on mobile devices
7. ✅ Share your beautiful new website!

---

Made with 💅 for CiaoBelleuh Nails