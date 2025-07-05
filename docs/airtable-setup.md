# Airtable Database Setup Guide

## Why Airtable?
- ✅ **Visual Interface**: Edit data directly in a spreadsheet-like interface
- ✅ **Reliable API**: Better uptime than complex databases
- ✅ **Easy Management**: No SQL knowledge required
- ✅ **Built-in Forms**: Can create forms directly in Airtable too
- ✅ **Free Tier**: 1,200 records per base (plenty for contact forms)

## Step 1: Create Airtable Account
1. Go to [airtable.com](https://airtable.com)
2. Sign up for a free account
3. Create a new base called "Daily Note Website"

## Step 2: Create Tables

### Table 1: Contact Submissions
Fields to create:
- **Name** (Single line text)
- **Email** (Email)
- **Subject** (Single line text)
- **Message** (Long text)
- **Inquiry Type** (Single select: General, Course Support, Speaking, Advertising, Station)
- **Submitted** (Date & time)
- **Status** (Single select: New, In Progress, Completed)

### Table 2: Speaking Inquiries
Fields to create:
- **Name** (Single line text)
- **Email** (Email)
- **Phone** (Phone number)
- **Organization** (Single line text)
- **Event Type** (Single select: Keynote, Workshop, Coaching, Training, Other)
- **Message** (Long text)
- **Submitted** (Date & time)
- **Status** (Single select: New, Quoted, Booked, Declined)
- **Priority** (Single select: High, Medium, Low)

### Table 3: Newsletter Signups
Fields to create:
- **Email** (Email)
- **Source** (Single select: Website, Social, Referral)
- **Submitted** (Date & time)
- **Status** (Single select: Active, Unsubscribed)

### Table 4: User Feedback
Fields to create:
- **Rating** (Number: 1-5)
- **Comment** (Long text)
- **Email** (Email)
- **Type** (Single select: General, Technical, Content)
- **Submitted** (Date & time)

## Step 3: Get API Credentials

### Get Base ID:
1. Go to [airtable.com/api](https://airtable.com/api)
2. Click on your "Daily Note Website" base
3. Copy the Base ID (starts with "app...")

### Get API Key:
1. Go to [airtable.com/account](https://airtable.com/account)
2. Generate an API key
3. Copy the key (starts with "pat...")

## Step 4: Update Website Code

In `src/services/airtableApi.js`, replace:
```javascript
const AIRTABLE_BASE_ID = 'appXXXXXXXXXXXXXX' // Your base ID
const AIRTABLE_API_KEY = 'patXXXXXXXXXXXXXX' // Your API key
```

## Step 5: Test the Setup

1. Submit a test contact form
2. Check your Airtable base for the new record
3. Verify email notifications (if configured)

## Benefits Over Supabase

### ✅ Easy Management
- View all submissions in a visual table
- Sort, filter, and organize data easily
- Add notes and status updates
- Export data to CSV/Excel anytime

### ✅ No Technical Skills Required
- Edit records directly in browser
- No SQL queries needed
- Drag and drop interface
- Built-in collaboration features

### ✅ Reliable & Simple
- 99.9% uptime guarantee
- Simple REST API
- Automatic backups
- Built-in data validation

## Alternative Email Services

If Hostinger email still has issues, we can use:

### Option 1: EmailJS
- Free tier: 200 emails/month
- Easy setup with templates
- Works directly from frontend

### Option 2: Formspree
- Free tier: 50 submissions/month
- Handles both database and email
- No backend code required

### Option 3: Netlify Forms
- Built into Netlify hosting
- Automatic spam filtering
- Simple form handling

## Next Steps

1. **Set up Airtable** (15 minutes)
2. **Update API credentials** (2 minutes)
3. **Test contact form** (2 minutes)
4. **Choose email service** (if needed)

This will give you a much more reliable and manageable system!