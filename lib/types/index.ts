export type Category = 'startups' | 'funding' | 'insights' | 'policy' | 'global'

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar?: string
  }
  category: Category
  featured: boolean
  image: string
  publishedAt: string
  readTime: number
  tags?: string[]
}

export interface CategoryInfo {
  slug: Category
  name: string
  description: string
}
