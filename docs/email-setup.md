# Email System Documentation

## Overview
The Daily Note website uses Hostinger email services for all email communications.

## Email Configuration

### Hostinger SMTP Settings
```
Host: smtp.hostinger.com
Port: 465
Security: SSL/TLS
Username: support@thedailynote.net
Password: ITwas1ofthem!
```

### Alternative Servers (for reference)
```
IMAP: imap.hostinger.com (Port 993)
POP3: pop.hostinger.com (Port 995)
SMTP: smtp.hostinger.com (Port 465)
```

## Email Flow

### Contact Form Submission
1. User fills out contact form
2. Data saved to Supabase database
3. Email sent to `support@thedailynote.net`
4. Auto-reply sent to user's email
5. Success confirmation shown

### Speaking Inquiry
1. User submits speaking request
2. Data saved to Supabase database  
3. Priority email sent to `support@thedailynote.net`
4. Auto-reply sent to user's email
5. Success confirmation shown

## Email Templates

### Contact Form Email
- Professional HTML layout
- All form data included
- User contact information
- Timestamp and source tracking

### Speaking Inquiry Email
- Marked as priority
- Event details highlighted
- Contact information prominent
- Quick response indicators

### Auto-Reply Email
- Branded Daily Note template
- Response time expectations
- Helpful links included
- Professional signature

## Technical Implementation

### Netlify Functions
Email sending handled by serverless function at:
```
/.netlify/functions/send-email
```

### Error Handling
- CORS support for cross-origin requests
- Graceful fallback if email fails
- Database still saves data
- User receives appropriate feedback

### Security
- Credentials stored in Netlify environment
- SMTP connection encrypted (SSL/TLS)
- Input validation and sanitization
- Rate limiting protection

## Monitoring

### Success Indicators
- Email sent successfully
- Database record created
- Auto-reply delivered
- User confirmation shown

### Error Handling
- SMTP connection failures
- Invalid email addresses
- Network timeouts
- Database errors

## Maintenance

### Regular Checks
- Monitor email delivery rates
- Check spam folder placement
- Verify SMTP connection
- Review error logs

### Troubleshooting
1. Check Netlify function logs
2. Verify Hostinger SMTP status
3. Test email delivery manually
4. Review database connections