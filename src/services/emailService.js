// Simple email service using EmailJS
// You can also use other services like Formspree, SendGrid, etc.

class EmailService {
  constructor() {
    // EmailJS configuration
    this.emailjsConfig = {
      serviceId: 'YOUR_EMAILJS_SERVICE_ID', // Replace with your EmailJS service ID
      templateId: 'YOUR_EMAILJS_TEMPLATE_ID', // Replace with your EmailJS template ID
      userId: 'YOUR_EMAILJS_USER_ID', // Replace with your EmailJS user ID
    };
    
    // Formspree configuration - REPLACE WITH YOUR ACTUAL FORM ID
    this.formspreeEndpoint = 'https://formspree.io/f/xdkdpeel'; // Your Formspree form endpoint
  }

  // Send email notification using EmailJS
  async sendEmailJSNotification(safetyCallData) {
    try {
      // Load EmailJS library dynamically
      if (typeof window !== 'undefined' && !window.emailjs) {
        await this.loadEmailJSLibrary();
      }

             const templateParams = {
         to_email: 'connect@nicsanimf.com',
         subject: `New Safety Call Request - ${safetyCallData.product_name || 'Insurance Product'}`,
         message: this.formatEmailMessage(safetyCallData),
         customer_name: safetyCallData.customer_name || 'Unknown',
         product_name: safetyCallData.product_name || 'Unknown',
         phone: safetyCallData.form_data?.['Phone No.'] || 'Not provided',
         request_id: safetyCallData.id
       };

      const response = await window.emailjs.send(
        this.emailjsConfig.serviceId,
        this.emailjsConfig.templateId,
        templateParams,
        this.emailjsConfig.userId
      );

      console.log('Email sent successfully:', response);
      return { success: true, response };
    } catch (error) {
      console.error('Failed to send email via EmailJS:', error);
      return { success: false, error: error.message };
    }
  }

  // Send email notification using Formspree (simpler alternative)
  async sendFormspreeNotification(safetyCallData) {
         try {
       const emailData = {
         email: 'connect@nicsanimf.com',
         subject: `New Safety Call Request - ${safetyCallData.product_name || 'General Inquiry'}`,
         message: this.formatEmailMessage(safetyCallData),
         customer_name: safetyCallData.customer_name || 'Unknown',
         product_name: safetyCallData.product_name || 'General Inquiry',
         phone: safetyCallData.form_data?.phone || safetyCallData.phone_number || 'Not provided',
         request_id: safetyCallData.id
       };

      const response = await fetch(this.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        console.log('Email sent successfully via Formspree');
        return { success: true, response };
      } else {
        throw new Error(`Formspree request failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to send email via Formspree:', error);
      return { success: false, error: error.message };
    }
  }

  // Format email message
  formatEmailMessage(safetyCallData) {
    const currentDate = new Date(safetyCallData.created_at).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });

    const productName = safetyCallData.product_name || (safetyCallData.product_id ? 'Unknown Product' : 'General Inquiry');
    const phoneNumber = safetyCallData.form_data?.phone || safetyCallData.phone_number || 'Not provided';

    return `
🚨 NEW SAFETY CALL REQUEST - NICSAN INSURANCE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 REQUEST DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Request ID: ${safetyCallData.id || 'N/A'}
• Product: ${productName}
• Submitted: ${currentDate}

👤 CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Name: ${safetyCallData.customer_name || 'Not provided'}
• Phone: ${phoneNumber}
• Email: ${safetyCallData.email || 'Not provided'}

📊 FORM DATA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${this.formatFormData(safetyCallData.form_data)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  ACTION REQUIRED: Please contact the customer within 24 hours to schedule the safety call.

Best regards,
Nicsan Insurance Team
📧 connect@nicsanimf.com
📞 080-996655
    `.trim();
  }

  // Helper method to format form data nicely
  formatFormData(formData) {
    if (!formData || Object.keys(formData).length === 0) {
      return 'No additional form data provided.';
    }

    let formattedData = '';
    for (const [key, value] of Object.entries(formData)) {
      if (value && value !== 'Not provided') {
        formattedData += `• ${key}: ${value}\n`;
      }
    }
    
    return formattedData.trim() || 'No additional form data provided.';
  }

  // Load EmailJS library
  async loadEmailJSLibrary() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.onload = () => {
        window.emailjs.init(this.emailjsConfig.userId);
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Send notification (tries EmailJS first, falls back to Formspree)
  async sendNotification(safetyCallData) {
    // Try EmailJS first
    const emailjsResult = await this.sendEmailJSNotification(safetyCallData);
    if (emailjsResult.success) {
      return emailjsResult;
    }

    // Fall back to Formspree
    return await this.sendFormspreeNotification(safetyCallData);
  }
}

const emailService = new EmailService();
export default emailService; 