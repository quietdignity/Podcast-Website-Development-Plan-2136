// RSS Parser Service - Converts podcast RSS to blog posts

export const parseRSSFeed = async () => {
  try {
    console.log('🔄 Fetching RSS feed...')
    
    // Your Daily Note RSS feed
    const RSS_URL = 'https://feeds.captivate.fm/jamesbrowninterviews/'
    
    // Fetch RSS feed
    const response = await fetch(RSS_URL)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const rssText = await response.text()
    console.log('✅ RSS feed fetched successfully')
    
    // Parse XML
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(rssText, 'text/xml')
    
    // Extract items
    const items = xmlDoc.querySelectorAll('item')
    console.log(`📄 Found ${items.length} episodes`)
    
    const blogPosts = []
    
    items.forEach((item, index) => {
      try {
        const title = item.querySelector('title')?.textContent?.trim()
        const description = item.querySelector('description')?.textContent?.trim()
        const pubDate = item.querySelector('pubDate')?.textContent?.trim()
        const link = item.querySelector('link')?.textContent?.trim()
        const enclosure = item.querySelector('enclosure')
        const audioUrl = enclosure?.getAttribute('url')
        
        // Clean up description (remove HTML tags)
        const cleanDescription = description?.replace(/<[^>]*>/g, '').trim()
        
        // Create slug from title
        const slug = title?.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .substring(0, 100)
        
        // Extract excerpt (first 200 chars)
        const excerpt = cleanDescription?.substring(0, 200) + (cleanDescription?.length > 200 ? '...' : '')
        
        if (title && cleanDescription && pubDate) {
          blogPosts.push({
            title,
            slug,
            content: cleanDescription,
            excerpt,
            published_date: new Date(pubDate).toISOString(),
            audio_url: audioUrl,
            source: 'rss',
            tags: ['podcast', 'daily-note', 'wisdom']
          })
        }
      } catch (error) {
        console.warn(`⚠️ Error parsing item ${index}:`, error)
      }
    })
    
    console.log(`✅ Parsed ${blogPosts.length} blog posts from RSS`)
    return { success: true, data: blogPosts }
    
  } catch (error) {
    console.error('❌ RSS parsing error:', error)
    return { success: false, error: error.message }
  }
}

export const syncRSSToSupabase = async () => {
  try {
    console.log('🚀 Starting RSS to Supabase sync...')
    
    // Parse RSS feed
    const rssResult = await parseRSSFeed()
    if (!rssResult.success) {
      throw new Error(rssResult.error)
    }
    
    const blogPosts = rssResult.data
    console.log(`📝 Processing ${blogPosts.length} posts...`)
    
    // Import Supabase here to avoid circular imports
    const { default: supabase } = await import('../lib/supabase')
    
    let successCount = 0
    let errorCount = 0
    
    // Process posts in batches to avoid overwhelming the database
    for (const post of blogPosts) {
      try {
        // Check if post already exists
        const { data: existingPost } = await supabase
          .from('blog_posts_daily_note_2024')
          .select('id')
          .eq('slug', post.slug)
          .single()
        
        if (!existingPost) {
          // Insert new post
          const { error } = await supabase
            .from('blog_posts_daily_note_2024')
            .insert([post])
          
          if (error) {
            console.error(`❌ Error inserting post "${post.title}":`, error)
            errorCount++
          } else {
            console.log(`✅ Inserted: ${post.title}`)
            successCount++
          }
        } else {
          console.log(`⚠️ Skipped existing: ${post.title}`)
        }
        
        // Small delay to be nice to the database
        await new Promise(resolve => setTimeout(resolve, 100))
        
      } catch (error) {
        console.error(`❌ Error processing post "${post.title}":`, error)
        errorCount++
      }
    }
    
    console.log(`🎉 RSS sync completed: ${successCount} inserted, ${errorCount} errors`)
    
    return {
      success: true,
      inserted: successCount,
      errors: errorCount,
      total: blogPosts.length
    }
    
  } catch (error) {
    console.error('❌ RSS sync error:', error)
    return { success: false, error: error.message }
  }
}