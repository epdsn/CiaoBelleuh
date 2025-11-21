const { app } = require('@azure/functions');
const nodemailer = require('nodemailer');

/**
 * Azure Function to handle contact form submissions from CiaoBelleuh Nails website
 * Validates input, sends email notifications, and handles CORS
 */

// Configure email transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

// Validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate phone format (basic validation)
const isValidPhone = (phone) => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Sanitize input to prevent injection
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input.trim().replace(/[<>]/g, '');
};

// Create HTML email template
const createEmailHTML = (formData) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header {
            background: linear-gradient(135deg, #d4a5a5 0%, #c77b7b 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 10px 10px;
        }
        .field {
            margin-bottom: 20px;
        }
        .label {
            font-weight: bold;
            color: #d4a5a5;
            display: block;
            margin-bottom: 5px;
        }
        .value {
            color: #333;
            padding: 10px;
            background: #f5f5f5;
            border-left: 3px solid #d4a5a5;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💅 New Contact Form Submission</h1>
            <p>CiaoBelleuh Nails</p>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">👤 Name:</span>
                <div class="value">${formData.name}</div>
            </div>
            
            <div class="field">
                <span class="label">📧 Email:</span>
                <div class="value">${formData.email}</div>
            </div>
            
            ${formData.phone ? `
            <div class="field">
                <span class="label">📱 Phone:</span>
                <div class="value">${formData.phone}</div>
            </div>
            ` : ''}
            
            <div class="field">
                <span class="label">💅 Service Requested:</span>
                <div class="value">${formData.service}</div>
            </div>
            
            <div class="field">
                <span class="label">💬 Message:</span>
                <div class="value">${formData.message}</div>
            </div>
        </div>
        <div class="footer">
            <p>This email was sent from the CiaoBelleuh Nails contact form</p>
            <p>Received on ${new Date().toLocaleString()}</p>
        </div>
    </div>
</body>
</html>
    `;
};

// Main HTTP trigger function
app.http('sendContactEmail', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Contact form submission received');

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            };
        }

        try {
            // Parse request body
            const body = await request.json();
            
            // Validate required fields
            if (!body.name || !body.email || !body.service || !body.message) {
                return {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        success: false,
                        message: 'Missing required fields'
                    })
                };
            }

            // Sanitize and validate inputs
            const formData = {
                name: sanitizeInput(body.name),
                email: sanitizeInput(body.email),
                phone: sanitizeInput(body.phone || ''),
                service: sanitizeInput(body.service),
                message: sanitizeInput(body.message)
            };

            // Validate email format
            if (!isValidEmail(formData.email)) {
                return {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        success: false,
                        message: 'Invalid email format'
                    })
                };
            }

            // Validate phone if provided
            if (formData.phone && !isValidPhone(formData.phone)) {
                return {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        success: false,
                        message: 'Invalid phone format'
                    })
                };
            }

            // Check if email configuration is set
            if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
                context.error('SMTP credentials not configured');
                return {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        success: false,
                        message: 'Email service not configured'
                    })
                };
            }

            // Create transporter and send email
            const transporter = createTransporter();
            
            const mailOptions = {
                from: process.env.EMAIL_FROM || process.env.SMTP_USER,
                to: process.env.EMAIL_TO || process.env.SMTP_USER,
                subject: `New Contact Form: ${formData.service} - ${formData.name}`,
                html: createEmailHTML(formData),
                replyTo: formData.email
            };

            // Send email
            await transporter.sendMail(mailOptions);
            
            context.log('Email sent successfully');

            // Return success response
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    success: true,
                    message: 'Message sent successfully'
                })
            };

        } catch (error) {
            context.error('Error processing contact form:', error);
            
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    success: false,
                    message: 'An error occurred while sending your message. Please try again.'
                })
            };
        }
    }
});
