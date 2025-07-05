const nodemailer = require('nodemailer');

// Hostinger SMTP configuration - verified settings
const transporter = nodemailer.createTransporter({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'support@thedailynote.net',
    pass: 'ITwas1ofthem!',
  },
  // Additional options for better reliability
  connectionTimeout: 60000, // 60 seconds
  greetingTimeout: 30000, // 30 seconds
  socketTimeout: 60000, // 60 seconds
});

// Verify connection configuration
const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('❌ SMTP connection failed:', error);
    return false;
  }
};

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Verify connection before sending (optional, for debugging)
    // await verifyConnection();

    const { to, from, subject, html, text, type } = JSON.parse(event.body);

    const mailOptions = {
      from: 'support@thedailynote.net', // Sender address (your Hostinger email)
      to: to || 'support@thedailynote.net', // Recipient
      replyTo: from, // Reply-to address (user's email)
      subject: subject,
      html: html,
      text: text
    };

    console.log(`📧 Sending ${type} email to:`, mailOptions.to);

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        messageId: result.messageId,
        type: type
      })
    };

  } catch (error) {
    console.error('❌ Email sending error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};