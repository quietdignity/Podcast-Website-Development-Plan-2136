import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

const RSS_URL = 'https://feeds.captivate.fm/jamesbrowninterviews/'

async function syncRSS() {
  try {
    console.log('🔄 Fetching RSS feed...')
    
    const response = await fetch(RSS_URL)
    const rssText = await response.text()
    
    // Simple XML parsing
    const items = rssText.match(/<item>[\s\S]*?<\/item>/g) || []
    
    for (const itemXml of items.slice(0, 10)) { // Process latest 10
      const title = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
                    itemXml.match(/<title>(.*?)<\/title>/)?.[1]
      
      const description = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ||
                         itemXml.match(/<description>(.*?)<\/description>/)?.[1]
      
      const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)?.[1]
      const audioUrl = itemXml.match(/<enclosure[^>]+url="([^"]+)"/)?.[1]
      
      if (!title || !description || !pubDate) continue
      
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 100)
      
      // Check if exists
      const { data: existing } = await supabase
        .from('blog_posts_daily_note_2024')
        .select('id')
        .eq('slug', slug)
        .single()
      
      if (!existing) {
        const { error } = await supabase
          .from('blog_posts_daily_note_2024')
          .insert({
            title,
            slug,
            content: description.replace(/<[^>]*>/g, ''),
            excerpt: description.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
            published_date: new Date(pubDate).toISOString(),
            audio_url: audioUrl,
            source: 'rss',
            tags: ['podcast', 'daily-note']
          })
        
        if (error) {
          console.error('❌ Insert error:', error)
        } else {
          console.log('✅ Inserted:', title)
        }
      }
    }
    
    console.log('🎉 RSS sync completed')
  } catch (error) {
    console.error('❌ RSS sync failed:', error)
    process.exit(1)
  }
}

syncRSS()