// Completely rebuilt RSS sync service - runs in browser
export class RSSSync {
  constructor() {
    this.RSS_URL = 'https://feeds.captivate.fm/jamesbrowninterviews/'
    this.CORS_PROXY = 'https://api.allorigins.win/get?url='
    this.supabase = null
  }

  async init() {
    // Dynamic import to avoid circular dependencies
    const { default: supabase } = await import('../lib/supabase')
    this.supabase = supabase
    return this
  }

  // Parse RSS feed using CORS proxy
  async fetchRSSFeed() {
    try {
      console.log('🔄 Fetching RSS feed via CORS proxy...')
      
      const proxyUrl = `${this.CORS_PROXY}${encodeURIComponent(this.RSS_URL)}`
      const response = await fetch(proxyUrl)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      const rssText = data.contents
      
      console.log('✅ RSS feed fetched successfully')
      return this.parseRSSText(rssText)
    } catch (error) {
      console.error('❌ RSS fetch error:', error)
      throw error
    }
  }

  // Parse RSS XML text
  parseRSSText(rssText) {
    try {
      console.log('📄 Parsing RSS XML...')
      
      // Create a DOM parser
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(rssText, 'text/xml')
      
      // Check for parsing errors
      const parserError = xmlDoc.querySelector('parsererror')
      if (parserError) {
        throw new Error('XML parsing failed')
      }
      
      // Extract items
      const items = xmlDoc.querySelectorAll('item')
      console.log(`📄 Found ${items.length} items in RSS feed`)
      
      const blogPosts = []
      
      items.forEach((item, index) => {
        try {
          const title = this.getElementText(item, 'title')
          const description = this.getElementText(item, 'description')
          const pubDate = this.getElementText(item, 'pubDate')
          const link = this.getElementText(item, 'link')
          const enclosure = item.querySelector('enclosure')
          const audioUrl = enclosure?.getAttribute('url')
          
          if (!title || !description || !pubDate) {
            console.warn(`⚠️ Skipping item ${index}: missing required fields`)
            return
          }
          
          // Clean description
          const cleanDescription = this.cleanHTML(description)
          
          if (cleanDescription.length < 10) {
            console.warn(`⚠️ Skipping item ${index}: description too short`)
            return
          }
          
          // Create slug
          const slug = this.createSlug(title)
          
          if (!slug || slug.length < 3) {
            console.warn(`⚠️ Skipping item ${index}: invalid slug`)
            return
          }
          
          // Parse date
          let publishedDate
          try {
            publishedDate = new Date(pubDate).toISOString()
          } catch (dateError) {
            console.warn(`⚠️ Skipping item ${index}: invalid date ${pubDate}`)
            return
          }
          
          const excerpt = cleanDescription.substring(0, 200) + 
            (cleanDescription.length > 200 ? '...' : '')
          
          blogPosts.push({
            title: title.trim(),
            slug,
            content: cleanDescription,
            excerpt,
            published_date: publishedDate,
            audio_url: audioUrl || null,
            source: 'rss',
            tags: ['podcast', 'daily-note', 'wisdom']
          })
          
          console.log(`✅ Parsed: "${title.substring(0, 50)}..."`)
        } catch (error) {
          console.warn(`⚠️ Error parsing item ${index}:`, error.message)
        }
      })
      
      console.log(`✅ Successfully parsed ${blogPosts.length} blog posts`)
      return { success: true, data: blogPosts }
    } catch (error) {
      console.error('❌ RSS parsing error:', error)
      return { success: false, error: error.message }
    }
  }

  // Helper methods
  getElementText(parent, tagName) {
    const element = parent.querySelector(tagName)
    if (!element) return null
    
    // Handle CDATA
    if (element.textContent.includes('<![CDATA[')) {
      return element.textContent.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim()
    }
    
    return element.textContent.trim()
  }

  cleanHTML(html) {
    if (!html) return ''
    return html
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim()
  }

  createSlug(title) {
    if (!title) return ''
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 100)
  }

  // Sync posts to Supabase
  async syncToDatabase(posts) {
    if (!this.supabase) {
      throw new Error('Supabase not initialized')
    }

    console.log(`📝 Syncing ${posts.length} posts to database...`)
    
    let inserted = 0
    let skipped = 0
    let errors = 0
    
    for (const post of posts) {
      try {
        // Check if post exists
        const { data: existing } = await this.supabase
          .from('blog_posts_daily_note_2024')
          .select('id')
          .eq('slug', post.slug)
          .single()
        
        if (existing) {
          console.log(`⚠️ Skipped existing: ${post.title}`)
          skipped++
          continue
        }
        
        // Insert new post
        const { error } = await this.supabase
          .from('blog_posts_daily_note_2024')
          .insert([post])
        
        if (error) {
          console.error(`❌ Error inserting "${post.title}":`, error.message)
          errors++
        } else {
          console.log(`✅ Inserted: ${post.title}`)
          inserted++
        }
        
        // Small delay to be nice to the database
        await new Promise(resolve => setTimeout(resolve, 200))
      } catch (error) {
        console.error(`❌ Error processing "${post.title}":`, error.message)
        errors++
      }
    }
    
    return { inserted, skipped, errors, total: posts.length }
  }

  // Main sync method
  async sync() {
    try {
      console.log('🚀 Starting RSS sync...')
      
      if (!this.supabase) {
        await this.init()
      }
      
      // Fetch and parse RSS
      const rssResult = await this.fetchRSSFeed()
      if (!rssResult.success) {
        throw new Error(rssResult.error)
      }
      
      const posts = rssResult.data
      if (posts.length === 0) {
        return {
          success: true,
          message: 'No posts found in RSS feed',
          inserted: 0,
          skipped: 0,
          errors: 0,
          total: 0
        }
      }
      
      // Sync to database
      const syncResult = await this.syncToDatabase(posts)
      
      const message = `RSS sync completed: ${syncResult.inserted} inserted, ${syncResult.skipped} skipped, ${syncResult.errors} errors`
      console.log('🎉', message)
      
      return {
        success: true,
        message,
        ...syncResult
      }
    } catch (error) {
      console.error('❌ RSS sync failed:', error)
      return {
        success: false,
        error: error.message,
        inserted: 0,
        skipped: 0,
        errors: 1,
        total: 0
      }
    }
  }
}

// Export a singleton instance
export const rssSync = new RSSSync()

// Export convenience function
export const syncRSSFeed = async () => {
  return await rssSync.sync()
}