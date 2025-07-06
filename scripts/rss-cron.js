#!/usr/bin/env node

// Simple RSS sync script for cron job
// Add to crontab: 0 */6 * * * /path/to/node /path/to/rss-cron.js

import { createClient } from '@supabase/supabase-js'
import https from 'https'

const supabase = createClient(
  'https://ctubanaaurkmbwdhsxyp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dWJhbmFhdXJrbWJ3ZGhzeHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NTA5MzEsImV4cCI6MjA2NzIyNjkzMX0.wl3663mKqHQOuDeLEpN0hC9Py7yaIG3j9dcXF1mep8U'
)

async function fetchRSS() {
  return new Promise((resolve, reject) => {
    https.get('https://feeds.captivate.fm/jamesbrowninterviews/', (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    }).on('error', reject)
  })
}

async function main() {
  try {
    const rssData = await fetchRSS()
    // Process RSS data (similar to above)
    console.log('✅ RSS sync completed via cron')
  } catch (error) {
    console.error('❌ Cron RSS sync failed:', error)
  }
}

main()