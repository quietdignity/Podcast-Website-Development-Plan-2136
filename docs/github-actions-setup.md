# 🚀 GitHub Actions RSS Sync Setup

## ✅ What's Been Created

### 1. **Automatic RSS Sync**
- **File**: `.github/workflows/rss-sync.yml`
- **Schedule**: Every 6 hours automatically
- **Function**: Fetches RSS feed and syncs new episodes to your blog

### 2. **Manual Sync Button**
- **File**: `.github/workflows/manual-sync.yml`
- **Trigger**: Click button in GitHub Actions tab
- **Function**: Run sync anytime you want

### 3. **Smart Sync Script**
- **File**: `.github/scripts/rss-sync.js`
- **Features**: 
  - ✅ Duplicate detection (won't add same episode twice)
  - ✅ Error handling and detailed logging
  - ✅ RSS feed parsing and validation
  - ✅ Automatic slug generation
  - ✅ Audio URL extraction

## 🔧 **REQUIRED: Add GitHub Secrets**

You need to add these secrets to your GitHub repository:

### Step 1: Go to Repository Settings
1. Go to: `https://github.com/quietdignity/Podcast-Website-Development-Plan-2136/settings/secrets/actions`
2. Click **"New repository secret"**

### Step 2: Add Supabase URL
- **Name**: `SUPABASE_URL`
- **Value**: `https://ctubanaaurkmbwdhsxyp.supabase.co`

### Step 3: Add Supabase Key
- **Name**: `SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dWJhbmFhdXJrbWJ3ZGhzeHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NTA5MzEsImV4cCI6MjA2NzIyNjkzMX0.wl3663mKqHQOuDeLEpN0hC9Py7yaIG3j9dcXF1mep8U`

## 🎯 **How to Use**

### Automatic Sync
- ✅ **Happens automatically every 6 hours**
- ✅ **No action needed from you**
- ✅ **Check GitHub Actions tab for logs**

### Manual Sync
1. Go to: `https://github.com/quietdignity/Podcast-Website-Development-Plan-2136/actions`
2. Click **"Manual RSS Sync"**
3. Click **"Run workflow"**
4. Add optional message (like "Testing new episode")
5. Click **"Run workflow"** button

## 📊 **What You'll See**

### Success Logs
```
🔄 GitHub Actions RSS Sync Starting...
✅ RSS feed fetched successfully
📄 Found 200+ items in RSS feed
✅ Inserted: New Episode Title
🎉 SUCCESS! 1 new posts added
```

### When No New Episodes
```
🔄 Processing 200+ posts...
⚠️ Skipped existing: Episode Already Added
ℹ️ No new posts to add - everything is up to date
```

## 🚨 **Troubleshooting**

### If Sync Fails
1. **Check GitHub Actions logs** for error details
2. **Verify secrets are added correctly**
3. **Try manual sync** to test
4. **Check RSS feed** is accessible: https://feeds.captivate.fm/jamesbrowninterviews/

### Common Issues
- **Missing secrets**: Add SUPABASE_URL and SUPABASE_ANON_KEY
- **Database connection**: Verify Supabase credentials
- **RSS feed down**: Captivate.fm might be temporarily unavailable

## 🎉 **Benefits**

✅ **Fully Automated** - No manual work required
✅ **Reliable** - Runs on GitHub's servers
✅ **Smart** - Won't duplicate episodes
✅ **Logged** - Full visibility into what happened
✅ **Manual Override** - Run anytime you want
✅ **Error Handling** - Graceful failure with details

## 📅 **Schedule**

The automatic sync runs:
- **Every 6 hours** (4 times per day)
- **At**: 12:00 AM, 6:00 AM, 12:00 PM, 6:00 PM (UTC)
- **Days**: Every day of the week

Perfect for catching new episodes quickly! 🎧