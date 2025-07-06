import supabase from '../lib/supabase'

// Get all posts (including drafts) for admin
export const getAdminBlogPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('blog_posts_daily_note_2024')
      .select(`
        *,
        categories_daily_note_2024(name, slug)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching admin blog posts:', error)
    return { success: false, error: error.message }
  }
}

// Create new blog post
export const createBlogPost = async (postData) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts_daily_note_2024')
      .insert([{
        ...postData,
        author_id: (await supabase.auth.getUser()).data.user?.id
      }])
      .select()

    if (error) throw error
    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Error creating blog post:', error)
    return { success: false, error: error.message }
  }
}

// Update blog post
export const updateBlogPost = async (id, postData) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts_daily_note_2024')
      .update(postData)
      .eq('id', id)
      .select()

    if (error) throw error
    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Error updating blog post:', error)
    return { success: false, error: error.message }
  }
}

// Delete blog post
export const deleteBlogPost = async (id) => {
  try {
    const { error } = await supabase
      .from('blog_posts_daily_note_2024')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return { success: false, error: error.message }
  }
}

// Get categories
export const getCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories_daily_note_2024')
      .select('*')
      .order('name')

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return { success: false, error: error.message }
  }
}

// Create category
export const createCategory = async (categoryData) => {
  try {
    const { data, error } = await supabase
      .from('categories_daily_note_2024')
      .insert([categoryData])
      .select()

    if (error) throw error
    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Error creating category:', error)
    return { success: false, error: error.message }
  }
}

// Generate slug from title
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100)
}