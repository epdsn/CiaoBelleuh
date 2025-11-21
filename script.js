/**
 * CiaoBelleuh Nails - Main JavaScript
 * Handles form validation, submission, and smooth interactions
 */

// Configuration - Choose ONE of these email service options:
const CONFIG = {
    // OPTION 1: EmailJS (Recommended - Free, 200 emails/month)
    // Sign up at https://www.emailjs.com
    emailService: 'emailjs', // Options: 'emailjs', 'formspree', 'web3forms'
    
    emailjs: {
        serviceId: 'YOUR_EMAILJS_SERVICE_ID',
        templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
        publicKey: 'YOUR_EMAILJS_PUBLIC_KEY'
    },
    
    // OPTION 2: Formspree (Easy - Free, 50 submissions/month)
    // Sign up at https://formspree.io
    formspree: {
        endpoint: 'YOUR_FORMSPREE_ENDPOINT' // Example: 'https://formspree.io/f/xyzabc123'
    },
    
    // OPTION 3: Web3Forms (Simple - Free, unlimited)
    // Get API key at https://web3forms.com
    web3forms: {
        accessKey: 'YOUR_WEB3FORMS_ACCESS_KEY'
    }
};

// DOM Elements
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitButton = contactForm.querySelector('.submit-button');
const buttonText = submitButton.querySelector('.button-text');
const buttonLoader = submitButton.querySelector('.button-loader');

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    // Basic phone validation - accepts various formats
    if (!phone) return true; // Phone is optional
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

function setLoadingState(isLoading) {
    if (isLoading) {
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'inline-block';
    } else {
        submitButton.disabled = false;
        buttonText.style.display = 'inline';
        buttonLoader.style.display = 'none';
    }
}

// Email service handlers
const emailServices = {
    emailjs: async (formData) => {
        // Load EmailJS if not already loaded
        if (typeof emailjs === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            document.head.appendChild(script);
            await new Promise(resolve => script.onload = resolve);
            emailjs.init(CONFIG.emailjs.publicKey);
        }
        
        return emailjs.send(
            CONFIG.emailjs.serviceId,
            CONFIG.emailjs.templateId,
            {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone || 'Not provided',
                service: formData.service,
                message: formData.message
            }
        );
    },
    
    formspree: async (formData) => {
        const response = await fetch(CONFIG.formspree.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Formspree submission failed');
        }
        
        return response.json();
    },
    
    web3forms: async (formData) => {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                access_key: CONFIG.web3forms.accessKey,
                name: formData.name,
                email: formData.email,
                phone: formData.phone || 'Not provided',
                subject: `New ${formData.service} inquiry from ${formData.name}`,
                message: formData.message
            })
        });
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Web3Forms submission failed');
        }
        
        return result;
    }
};

// Handle form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        service: document.getElementById('service').value,
        message: document.getElementById('message').value.trim()
    };
    
    // Validate form data
    if (!formData.name || formData.name.length < 2) {
        showMessage('Please enter a valid name', 'error');
        return;
    }
    
    if (!validateEmail(formData.email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    if (!validatePhone(formData.phone)) {
        showMessage('Please enter a valid phone number', 'error');
        return;
    }
    
    if (!formData.service) {
        showMessage('Please select a service', 'error');
        return;
    }
    
    if (!formData.message || formData.message.length < 10) {
        showMessage('Please enter a message (at least 10 characters)', 'error');
        return;
    }
    
    // Check if email service is configured
    const service = CONFIG.emailService;
    if (!service || !emailServices[service]) {
        showMessage('⚠️ Email service not configured. Please check script.js', 'error');
        console.error('Please configure CONFIG.emailService in script.js');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    formMessage.style.display = 'none';
    
    try {
        // Send using selected service
        await emailServices[service](formData);
        
        showMessage('✨ Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'success');
        contactForm.reset(); // Clear the form
    } catch (error) {
        console.error('Error submitting form:', error);
        showMessage('❌ Oops! Something went wrong. Please try again or call us directly.', 'error');
    } finally {
        setLoadingState(false);
    }
});

// Gallery item animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInOnScroll 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    observer.observe(item);
});

// Handle image loading errors
document.querySelectorAll('.gallery-image img').forEach(img => {
    img.addEventListener('error', function() {
        // Create a placeholder if image fails to load
        this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23f5e6e8'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='20' fill='%23d4a5a5' text-anchor='middle' dy='.3em'%3ENail Art%3C/text%3E%3C/svg%3E`;
    });
});

// Add hover effect sound or haptic feedback (optional)
document.querySelectorAll('.cta-button, .submit-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        if (!this.disabled) {
            this.style.transform = 'translateY(0)';
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Log initialization
console.log('🎨 CiaoBelleuh Nails website loaded successfully!');
console.log('📧 Email service:', CONFIG.emailService);
console.log('⚠️ Remember to configure your email service credentials in script.js');
