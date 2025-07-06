import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'

// Supabase configuration
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

const RSS_URL = 'https://feeds.captivate.fm/jamesbrowninterviews/'

// Simple XML parser for Node.js environment
const parseXMLString = (xmlString, tagName) => {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi')
  const matches = []
  let match
  while ((match = regex.exec(xmlString)) !== null) {
    matches.push(match[1])
  }
  return matches
}

const extractXMLValue = (xmlString, tagName) => {
  // Handle CDATA sections
  const cdataRegex = new RegExp(`<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tagName}>`, 'i')
  const cdataMatch = xmlString.match(cdataRegex)
  if (cdataMatch) {
    return cdataMatch[1].trim()
  }

  // Handle regular tags
  const regularRegex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i')
  const regularMatch = xmlString.match(regularRegex)
  if (regularMatch) {
    return regularMatch[1].trim()
  }

  return null
}

const extractAttribute = (xmlString, tagName, attributeName) => {
  const regex = new RegExp(`<${tagName}[^>]*${attributeName}=["']([^"']*)["'][^>]*>`, 'i')
  const match = xmlString.match(regex)
  return match ? match[1] : null
}

const parseRSSFeed = async () => {
  try {
    console.log('🔄 Fetching RSS feed from:', RSS_URL)
    
    // Fetch RSS feed with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout
    
    const response = await fetch(RSS_URL, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'The Daily Note GitHub Actions RSS Sync/1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml'
      }
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    // Get the XML content as text
    const rssText = await response.text()
    console.log('✅ RSS feed fetched successfully. Length:', rssText.length)
    
    if (!rssText || rssText.length < 100) {
      throw new Error('RSS feed appears to be empty or too short')
    }
    
    // Check if it's actually XML/RSS
    if (!rssText.includes('<rss') && !rssText.includes('<feed')) {
      throw new Error('Response does not appear to be RSS/XML format')
    }
    
    const items = []
    
    // Extract items using our simple XML parser
    const itemStrings = parseXMLString(rssText, 'item')
    console.log(`📄 Found ${itemStrings.length} items in RSS feed`)
    
    if (itemStrings && itemStrings.length > 0) {
      itemStrings.forEach((itemXml, index) => {
        try {
          // Extract data from each item
          const title = extractXMLValue(itemXml, 'title')
          const description = extractXMLValue(itemXml, 'description')
          const pubDate = extractXMLValue(itemXml, 'pubDate')
          const link = extractXMLValue(itemXml, 'link')
          
          // Extract audio URL from enclosure tag
          const audioUrl = extractAttribute(itemXml, 'enclosure', 'url')
          
          if (title && description && pubDate) {
            // Clean up description (remove HTML tags)
            const cleanDescription = description.replace(/<[^>]*>/g, '').trim()
            
            if (cleanDescription.length < 10) {
              console.warn(`⚠️ Skipping item ${index}: description too short`)
              return
            }
            
            // Create slug from title
            const slug = title.toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .substring(0, 100)
            
            if (!slug || slug.length < 3) {
              console.warn(`⚠️ Skipping item ${index}: invalid slug`)
              return
            }
            
            // Extract excerpt (first 200 chars)
            const excerpt = cleanDescription.substring(0, 200) + (cleanDescription.length > 200 ? '...' : '')
            
            // Parse date
            let publishedDate
            try {
              publishedDate = new Date(pubDate).toISOString()
              if (publishedDate === 'Invalid Date') {
                throw new Error('Invalid date')
              }
            } catch (dateError) {
              console.warn(`⚠️ Skipping item ${index}: invalid date ${pubDate}`)
              return
            }
            
            const blogPost = {
              title,
              slug,
              content: cleanDescription,
              excerpt,
              published_date: publishedDate,
              audio_url: audioUrl || null,
              source: 'rss',
              tags: ['podcast', 'daily-note', 'wisdom']
            }
            
            items.push(blogPost)
            console.log(`✅ Parsed item ${index}: "${title.substring(0, 50)}..."`)
          } else {
            console.warn(`⚠️ Skipping item ${index}: missing required fields`, {
              hasTitle: !!title,
              hasDescription: !!description,
              hasPubDate: !!pubDate
            })
          }
        } catch (error) {
          console.warn(`⚠️ Error parsing item ${index}:`, error.message)
        }
      })
    }
    
    console.log(`✅ Successfully parsed ${items.length} blog posts from RSS`)
    return { success: true, data: items }
  } catch (error) {
    console.error('❌ RSS parsing error:', error.message)
    return { success: false, error: error.message }
  }
}

const syncRSSToSupabase = async () => {
  try {
    console.log('🚀 Starting GitHub Actions RSS sync...')
    
    // Test Supabase connection first
    const { data: testData, error: testError } = await supabase
      .from('blog_posts_daily_note_2024')
      .select('count')
      .limit(1)
    
    if (testError) {
      throw new Error(`Supabase connection failed: ${testError.message}`)
    }
    
    console.log('✅ Supabase connection verified')
    
    // Parse RSS feed
    const rssResult = await parseRSSFeed()
    if (!rssResult.success) {
      throw new Error(`RSS parsing failed: ${rssResult.error}`)
    }
    
    const blogPosts = rssResult.data
    console.log(`📝 Processing ${blogPosts.length} posts...`)
    
    if (blogPosts.length === 0) {
      console.log('ℹ️ No posts found in RSS feed')
      return {
        success: true,
        inserted: 0,
        errors: 0,
        total: 0,
        newPosts: 0,
        message: 'No posts found in RSS feed'
      }
    }
    
    let successCount = 0
    let errorCount = 0
    
    // Process new posts
    for (const post of blogPosts) {
      try {
        console.log(`🔄 Processing: "${post.title.substring(0, 50)}..."`)
        
        // Check if post already exists by slug
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
            console.error(`❌ Error inserting post "${post.title}":`, error.message)
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
        console.error(`❌ Error processing post "${post.title}":`, error.message)
        errorCount++
      }
    }
    
    console.log(`🎉 GitHub Actions RSS sync completed: ${successCount} inserted, ${errorCount} errors`)
    
    return {
      success: true,
      inserted: successCount,
      errors: errorCount,
      total: blogPosts.length,
      newPosts: successCount
    }
  } catch (error) {
    console.error('❌ GitHub Actions RSS sync error:', error.message)
    return {
      success: false,
      error: error.message
    }
  }
}

// Main execution
const main = async () => {
  console.log('🔄 GitHub Actions RSS Sync Starting...')
  console.log('📅 Time:', new Date().toISOString())
  console.log('🌐 RSS URL:', RSS_URL)
  console.log('🔄 Force Sync:', process.env.FORCE_SYNC === 'true')
  
  try {
    const result = await syncRSSToSupabase()
    
    if (result.success) {
      console.log('🎉 SUCCESS!')
      console.log(`📊 Results: ${result.inserted} new posts added`)
      console.log(`📊 Errors: ${result.errors}`)
      console.log(`📊 Total processed: ${result.total}`)
      
      if (result.inserted > 0) {
        console.log(`🚀 ${result.inserted} new blog posts have been added to your website!`)
        console.log('🌐 Visit https://thedailynote.net/blog to see them')
      } else {
        console.log('ℹ️ No new posts to add - everything is up to date')
      }
      
      process.exit(0)
    } else {
      console.error('❌ FAILED!')
      console.error('📊 Error:', result.error)
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ CRITICAL ERROR:', error.message)
    process.exit(1)
  }
}

// Run the sync
main()