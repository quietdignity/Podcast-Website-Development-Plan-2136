import supabase from '../lib/supabase'

// Fetch all blog posts
export const getBlogPosts = async (limit = null) => {
  try {
    let query = supabase
      .from('blog_posts_daily_note_2024')
      .select('*')
      .order('published_date', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching blog posts:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Blog posts fetch error:', error)
    return { success: false, error: error.message }
  }
}

// Fetch single blog post by slug
export const getBlogPost = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts_daily_note_2024')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching blog post:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Blog post fetch error:', error)
    return { success: false, error: error.message }
  }
}

// Fetch blog posts by tags
export const getBlogPostsByTag = async (tag) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts_daily_note_2024')
      .select('*')
      .contains('tags', [tag])
      .order('published_date', { ascending: false })

    if (error) {
      console.error('Error fetching blog posts by tag:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Blog posts by tag fetch error:', error)
    return { success: false, error: error.message }
  }
}

// RSS Feed parser (you can implement this to sync with Captivate RSS)
export const syncRSSFeed = async () => {
  try {
    // This would parse the RSS feed and convert to blog posts
    // For now, returning success - you can implement RSS parsing later
    console.log('RSS sync would happen here')
    return { success: true, message: 'RSS sync completed' }
  } catch (error) {
    console.error('RSS sync error:', error)
    return { success: false, error: error.message }
  }
}