# The Daily Note Website

A modern, professional website for The Daily Note podcast with James Brown.

## 📧 Email Configuration

The website uses Hostinger SMTP for sending emails:

### Server Settings
- **SMTP Server**: smtp.hostinger.com
- **Port**: 465 (SSL/TLS)
- **Username**: support@thedailynote.net
- **Security**: SSL/TLS enabled

### Email Features
- ✅ Contact form submissions
- ✅ Speaking inquiry forms  
- ✅ Auto-reply confirmations
- ✅ Professional HTML templates
- ✅ Fallback text versions

### Alternative Server Options (for reference)
- **IMAP**: imap.hostinger.com (Port 993)
- **POP3**: pop.hostinger.com (Port 995)

## 🚀 Deployment

The email service runs on Netlify Functions and automatically handles:
1. Form submissions to Supabase database
2. Email notifications to support@thedailynote.net
3. Auto-reply confirmations to users
4. Error handling and CORS support

## 📝 Email Templates

Professional templates included for:
- Contact form submissions
- Speaking inquiries
- Auto-reply confirmations
- Feedback notifications

## 🔧 Technical Stack

- **Frontend**: React + Vite
- **Database**: Supabase
- **Email**: Hostinger SMTP via Netlify Functions
- **Styling**: Tailwind CSS
- **Hosting**: Netlify

## 📞 Contact

All form submissions are sent to: support@thedailynote.net