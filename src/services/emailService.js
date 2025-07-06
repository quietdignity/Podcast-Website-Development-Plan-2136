// Email service for sending emails via Hostinger SMTP

export const sendEmail = async (emailData) => {
  try {
    console.log('📧 Sending email:', emailData.type);

    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'support@thedailynote.net',
        from: emailData.from || emailData.email,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
        type: emailData.type || 'contact'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Email sent successfully:', result);
    return result;

  } catch (error) {
    console.error('❌ Email sending error:', error);
    throw error;
  }
};

// Email templates
export const emailTemplates = {
  contactForm: (data) => ({
    subject: `📧 Contact Form: ${data.subject || 'New Message'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a2238;">📧 New Contact Form Submission</h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.inquiryType ? `<p><strong>Inquiry Type:</strong> ${data.inquiryType}</p>` : ''}
          ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
        </div>
        <div style="background: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #666;">
            Submitted from: The Daily Note website<br>
            Time: ${new Date().toLocaleString()}<br>
            Reply directly to: ${data.email}
          </p>
        </div>
      </div>
    `,
    text: `
📧 New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.inquiryType ? `Inquiry Type: ${data.inquiryType}` : ''}
${data.subject ? `Subject: ${data.subject}` : ''}

Message:
${data.message}

Submitted: ${new Date().toLocaleString()}
Reply to: ${data.email}
    `
  }),

  speakingInquiry: (data) => ({
    subject: `🎤 PRIORITY: Speaking Inquiry from ${data.organization || data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a2238;">🎤 PRIORITY Speaking Inquiry</h2>
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <p style="margin: 0; font-weight: bold; color: #856404;">
            ⚡ PRIORITY RESPONSE REQUIRED - Speaking Opportunity
          </p>
        </div>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          ${data.organization ? `<p><strong>Organization:</strong> ${data.organization}</p>` : ''}
          ${data.eventType ? `<p><strong>Event Type:</strong> ${data.eventType}</p>` : ''}
        </div>
        <div style="background: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
          <h3>Event Details:</h3>
          <p style="white-space: pre-wrap;">${data.eventDetails}</p>
        </div>
        <div style="margin-top: 20px; padding: 15px; background: #d4edda; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #155724;">
            <strong>⏰ Expected Response Time: Within 24 hours</strong><br>
            Submitted: ${new Date().toLocaleString()}<br>
            Reply directly to: ${data.email}
          </p>
        </div>
      </div>
    `,
    text: `
🎤 PRIORITY SPEAKING INQUIRY

⚡ PRIORITY RESPONSE REQUIRED - Speaking Opportunity

Contact Details:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
${data.organization ? `Organization: ${data.organization}` : ''}
${data.eventType ? `Event Type: ${data.eventType}` : ''}

Event Details:
${data.eventDetails}

⏰ Expected Response: Within 24 hours
Submitted: ${new Date().toLocaleString()}
Reply to: ${data.email}
    `
  }),

  autoReply: (data) => ({
    subject: 'Thank you for contacting The Daily Note',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px; background: #1a2238; color: white;">
          <h1>The Daily Note</h1>
          <p>with James A. Brown</p>
        </div>
        <div style="padding: 30px;">
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${data.name},</p>
          <p>Thank you for contacting The Daily Note. We've received your message and will get back to you within 24-48 hours.</p>
          <p>In the meantime, here are some ways to stay connected:</p>
          <ul>
            <li><a href="https://thedailynote.net/listen" style="color: #c19a6b;">Listen to latest episodes</a></li>
            <li><a href="https://jamesbrowntv.substack.com" style="color: #c19a6b;">Subscribe to the email newsletter</a></li>
            <li><a href="https://knowyourpowernow.com" style="color: #c19a6b;">Check out the Know Your Power course</a></li>
          </ul>
          <p>Best regards,<br>
          The Daily Note Team</p>
        </div>
        <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #666;">
          <p>Finding the extraordinary in the ordinary.<br>
          5 days a week, 90 seconds a day, on-air and online from sea to shining sea.</p>
        </div>
      </div>
    `,
    text: `
Thank you for contacting The Daily Note!

Hi ${data.name},

Thank you for reaching out. We've received your message and will get back to you within 24-48 hours.

In the meantime, stay connected:
- Listen to latest episodes: https://thedailynote.net/listen
- Subscribe to newsletter: https://jamesbrowntv.substack.com
- Know Your Power course: https://knowyourpowernow.com

Best regards,
The Daily Note Team

Finding the extraordinary in the ordinary.
5 days a week, 90 seconds a day, on-air and online from sea to shining sea.
    `
  })
};