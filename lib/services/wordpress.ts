import { Article, Category } from '../types'

// WordPress API Configuration
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || ''
const WORDPRESS_POST_TYPE = process.env.NEXT_PUBLIC_WORDPRESS_POST_TYPE || 'posts'

// WordPress REST API Response Types
interface WordPressPost {
  id: number
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  date: string
  modified: string
  featured_media: number
  categories: number[]
  tags: number[]
  _embedded?: {
    author?: Array<{
      name: string
      avatar_urls?: {
        96?: string
      }
    }>
    'wp:featuredmedia'?: Array<{
      source_url: string
    }>
  }
  acf?: {
    featured?: boolean
    read_time?: number
    category?: Category
  }
}

interface WordPressCategory {
  id: number
  name: string
  slug: string
  description: string
}

// Cache configuration
const CACHE_REVALIDATE = 3600 // 1 hour

/**
 * Fetch posts from WordPress REST API
 */
async function fetchWordPressPosts(params: {
  per_page?: number
  page?: number
  categories?: number[]
  tags?: number[]
  search?: string
  orderby?: string
  order?: 'asc' | 'desc'
  _embed?: boolean
} = {}): Promise<WordPressPost[]> {
  if (!WORDPRESS_API_URL) {
    console.warn('WordPress API URL not configured. Using sample data.')
    return []
  }

  const searchParams = new URLSearchParams({
    per_page: String(params.per_page || 10),
    page: String(params.page || 1),
    _embed: 'true', // Include embedded data (author, featured image)
    ...(params.categories && { categories: params.categories.join(',') }),
    ...(params.tags && { tags: params.tags.join(',') }),
    ...(params.search && { search: params.search }),
    ...(params.orderby && { orderby: params.orderby }),
    ...(params.order && { order: params.order }),
  })

  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/wp/v2/${WORDPRESS_POST_TYPE}?${searchParams}`,
      {
        next: { revalidate: CACHE_REVALIDATE },
      }
    )

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching WordPress posts:', error)
    return []
  }
}

/**
 * Fetch a single post by slug
 */
async function fetchWordPressPostBySlug(slug: string): Promise<WordPressPost | null> {
  if (!WORDPRESS_API_URL) {
    return null
  }

  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/wp/v2/${WORDPRESS_POST_TYPE}?slug=${slug}&_embed=true`,
      {
        next: { revalidate: CACHE_REVALIDATE },
      }
    )

    if (!response.ok) {
      return null
    }

    const posts = await response.json()
    return posts[0] || null
  } catch (error) {
    console.error('Error fetching WordPress post:', error)
    return null
  }
}

/**
 * Fetch categories from WordPress
 */
async function fetchWordPressCategories(): Promise<WordPressCategory[]> {
  if (!WORDPRESS_API_URL) {
    return []
  }

  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/wp/v2/categories?per_page=100`,
      {
        next: { revalidate: CACHE_REVALIDATE },
      }
    )

    if (!response.ok) {
      return []
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching WordPress categories:', error)
    return []
  }
}

/**
 * Transform WordPress post to Article format
 */
function transformWordPressPost(post: WordPressPost): Article {
  const featuredImage =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop'

  const author = post._embedded?.author?.[0] || { name: 'Editor' }
  const authorAvatar = author.avatar_urls?.[96]

  // Extract category from ACF or default to first category
  const category = (post.acf?.category as Category) || 'insights'

  // Calculate read time from content (rough estimate: 200 words per minute)
  const wordCount = post.content.rendered.replace(/<[^>]*>/g, '').split(/\s+/).length
  const readTime = post.acf?.read_time || Math.ceil(wordCount / 200)

  return {
    id: String(post.id),
    title: post.title.rendered,
    slug: post.slug,
    excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 200),
    content: post.content.rendered,
    author: {
      name: author.name,
      avatar: authorAvatar,
    },
    category,
    featured: post.acf?.featured || false,
    image: featuredImage,
    publishedAt: post.date,
    readTime,
    tags: post.tags?.map(String) || [],
  }
}

/**
 * WordPress API Service
 */
export const wordpressService = {
  /**
   * Get all articles
   */
  async getArticles(limit?: number): Promise<Article[]> {
    const posts = await fetchWordPressPosts({
      per_page: limit || 100,
      orderby: 'date',
      order: 'desc',
    })
    return posts.map(transformWordPressPost)
  },

  /**
   * Get article by slug
   */
  async getArticleBySlug(slug: string): Promise<Article | null> {
    const post = await fetchWordPressPostBySlug(slug)
    if (!post) return null
    return transformWordPressPost(post)
  },

  /**
   * Get articles by category
   */
  async getArticlesByCategory(category: Category): Promise<Article[]> {
    // Note: This requires category mapping or using ACF custom field
    // For now, fetch all and filter
    const allPosts = await fetchWordPressPosts({
      per_page: 100,
      orderby: 'date',
      order: 'desc',
    })
    
    return allPosts
      .map(transformWordPressPost)
      .filter((article) => article.category === category)
  },

  /**
   * Get featured articles
   */
  async getFeaturedArticles(): Promise<Article[]> {
    const allPosts = await fetchWordPressPosts({
      per_page: 100,
      orderby: 'date',
      order: 'desc',
    })
    
    return allPosts
      .map(transformWordPressPost)
      .filter((article) => article.featured)
  },

  /**
   * Get latest articles
   */
  async getLatestArticles(limit?: number): Promise<Article[]> {
    return this.getArticles(limit)
  },

  /**
   * Get categories
   */
  async getCategories(): Promise<WordPressCategory[]> {
    return fetchWordPressCategories()
  },
}
