# CiaoBelleuh Nails - Azure Function

This Azure Function handles contact form submissions from the CiaoBelleuh Nails website. It validates the input, sends email notifications, and provides proper CORS handling.

## Features

- ✅ Input validation and sanitization
- ✅ Email sending via SMTP (supports Gmail, Outlook, custom SMTP)
- ✅ CORS support for web requests
- ✅ Beautiful HTML email templates
- ✅ Error handling and logging

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)
- An Azure account (for deployment)
- SMTP credentials (Gmail, Outlook, or custom email service)

## Local Development Setup

1. **Install dependencies:**
   ```bash
   cd azure-function
   npm install
   ```

2. **Configure environment variables:**
   
   Edit `local.settings.json` and update the following values:
   
   - `SMTP_USER`: Your email address (e.g., `your-email@gmail.com`)
   - `SMTP_PASS`: Your email app-specific password
   - `EMAIL_FROM`: The "from" address for notifications
   - `EMAIL_TO`: Where to send contact form submissions
   - `ALLOWED_ORIGINS`: Your website domain(s)

   **For Gmail:**
   - Enable 2-factor authentication
   - Generate an [App Password](https://support.google.com/accounts/answer/185833)
   - Use the app password in `SMTP_PASS`

3. **Run locally:**
   ```bash
   npm start
   ```
   
   The function will be available at:
   `http://localhost:7071/api/sendContactEmail`

4. **Test the function:**
   ```bash
   curl -X POST http://localhost:7071/api/sendContactEmail \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "phone": "123-456-7890",
       "service": "manicure",
       "message": "This is a test message"
     }'
   ```

## Deployment to Azure

### Method 1: Using Azure CLI

1. **Login to Azure:**
   ```bash
   az login
   ```

2. **Create a resource group:**
   ```bash
   az group create --name ciaobelleuh-rg --location eastus
   ```

3. **Create a storage account:**
   ```bash
   az storage account create \
     --name ciaobelleuhstorage \
     --resource-group ciaobelleuh-rg \
     --location eastus \
     --sku Standard_LRS
   ```

4. **Create a Function App:**
   ```bash
   az functionapp create \
     --resource-group ciaobelleuh-rg \
     --consumption-plan-location eastus \
     --runtime node \
     --runtime-version 18 \
     --functions-version 4 \
     --name ciaobelleuh-contact-function \
     --storage-account ciaobelleuhstorage
   ```

5. **Configure application settings:**
   ```bash
   az functionapp config appsettings set \
     --name ciaobelleuh-contact-function \
     --resource-group ciaobelleuh-rg \
     --settings \
       SMTP_HOST="smtp.gmail.com" \
       SMTP_PORT="587" \
       SMTP_SECURE="false" \
       SMTP_USER="your-email@gmail.com" \
       SMTP_PASS="your-app-password" \
       EMAIL_FROM="noreply@ciaobelleuh.com" \
       EMAIL_TO="hello@ciaobelleuh.com" \
       ALLOWED_ORIGINS="https://your-domain.com"
   ```

6. **Deploy the function:**
   ```bash
   func azure functionapp publish ciaobelleuh-contact-function
   ```

### Method 2: Using VS Code

1. Install the [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
2. Sign in to Azure
3. Click the Azure icon in the sidebar
4. Click "Deploy to Function App"
5. Follow the prompts

## Update Website Configuration

After deployment, update the `CONFIG.azureFunctionUrl` in `script.js`:

```javascript
const CONFIG = {
    azureFunctionUrl: 'https://ciaobelleuh-contact-function.azurewebsites.net/api/sendContactEmail'
};
```

## Email Service Options

### Gmail
- Host: `smtp.gmail.com`
- Port: `587`
- Requires app-specific password

### Outlook/Hotmail
- Host: `smtp-mail.outlook.com`
- Port: `587`
- Use your regular password

### Custom SMTP
- Configure your own SMTP server settings
- Update `SMTP_HOST`, `SMTP_PORT`, and credentials

## Monitoring & Troubleshooting

### View logs in Azure:
```bash
func azure functionapp logstream ciaobelleuh-contact-function
```

### Common Issues:

1. **"Email service not configured"**
   - Check that SMTP_USER and SMTP_PASS are set correctly

2. **"Authentication failed"**
   - For Gmail: Use an app-specific password, not your regular password
   - Verify 2FA is enabled on your account

3. **CORS errors**
   - Update ALLOWED_ORIGINS with your website domain
   - Ensure the function is deployed and accessible

4. **Timeout errors**
   - Check SMTP server settings
   - Verify firewall/network connectivity

## Security Best Practices

- ✅ Never commit `local.settings.json` with real credentials
- ✅ Use Azure Key Vault for sensitive data in production
- ✅ Enable Azure Application Insights for monitoring
- ✅ Regularly rotate SMTP passwords
- ✅ Keep dependencies updated (`npm audit`)

## Cost Estimation

Azure Functions Consumption Plan:
- First 1M executions/month: FREE
- Additional executions: $0.20 per million
- Expected cost for small salon: ~$0-5/month

## Support

For issues with this function, check:
- [Azure Functions Documentation](https://docs.microsoft.com/azure/azure-functions/)
- [Nodemailer Documentation](https://nodemailer.com/)

## License

This code is part of the CiaoBelleuh Nails website project.
