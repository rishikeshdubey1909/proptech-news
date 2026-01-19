import { Article, Category } from '../types'

// GraphQL Configuration
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || ''

// GraphQL Response Types
interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{
    message: string
    locations?: Array<{ line: number; column: number }>
  }>
}

interface GraphQLArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  modified: string
  featuredImage?: {
    node: {
      sourceUrl: string
      altText?: string
    }
  }
  articleCategory?: {
    nodes: Array<{
      name: string
      slug: string
    }>
  }
  articleTag?: {
    nodes: Array<{
      name: string
      slug: string
    }>
  }
  articleFields?: {
    articleType?: string
    shortSummary?: string
    readTime?: number
    featured?: boolean
    sourceAttribution?: {
      sourceUrl?: string
      sourcePublisher?: string
    }
    geography?: {
      nodes: Array<{
        name: string
        slug: string
      }>
    }
    companies?: Array<{
      companyName: string
      companyUrl?: string
    }>
    ctaType?: string
    sponsoredDisclosure?: boolean
  }
  author?: {
    node: {
      name: string
      avatar?: {
        url: string
      }
    }
  }
}

/**
 * Execute GraphQL query
 */
async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  if (!GRAPHQL_ENDPOINT) {
    throw new Error('GraphQL endpoint not configured')
  }

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`)
  }

  const json: GraphQLResponse<T> = await response.json()

  if (json.errors) {
    throw new Error(`GraphQL errors: ${json.errors.map(e => e.message).join(', ')}`)
  }

  if (!json.data) {
    throw new Error('No data returned from GraphQL query')
  }

  return json.data
}

/**
 * Transform GraphQL article to Article format
 */
function transformGraphQLArticle(graphqlArticle: GraphQLArticle): Article {
  const category = graphqlArticle.articleCategory?.nodes[0]?.slug as Category || 'insights'
  const featuredImage = graphqlArticle.featuredImage?.node?.sourceUrl || 
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop'

  return {
    id: graphqlArticle.id,
    title: graphqlArticle.title,
    slug: graphqlArticle.slug,
    excerpt: graphqlArticle.articleFields?.shortSummary || 
      graphqlArticle.excerpt.replace(/<[^>]*>/g, '').substring(0, 200),
    content: graphqlArticle.content,
    author: {
      name: graphqlArticle.author?.node?.name || 'Editor',
      avatar: graphqlArticle.author?.node?.avatar?.url,
    },
    category,
    featured: graphqlArticle.articleFields?.featured || false,
    image: featuredImage,
    publishedAt: graphqlArticle.date,
    readTime: graphqlArticle.articleFields?.readTime || 5,
    tags: graphqlArticle.articleTag?.nodes.map(tag => tag.name) || [],
  }
}

/**
 * GraphQL Service
 */
export const graphqlService = {
  /**
   * Get homepage articles (featured + latest)
   */
  async getHomepageArticles() {
    const query = `
      query HomepageArticles {
        featuredArticles: articles(
          where: {
            metaQuery: {
              relation: AND
              metaArray: [
                {
                  key: "featured"
                  value: "1"
                  compare: EQUAL
                }
              ]
            }
            orderby: { field: DATE, order: DESC }
          }
          first: 3
        ) {
          nodes {
            id
            title
            slug
            excerpt
            date
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            articleCategory {
              nodes {
                name
                slug
              }
            }
            articleFields {
              articleType
              shortSummary
              readTime
              featured
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
          }
        }
        latestArticles: articles(
          where: {
            orderby: { field: DATE, order: DESC }
          }
          first: 8
        ) {
          nodes {
            id
            title
            slug
            excerpt
            date
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            articleCategory {
              nodes {
                name
                slug
              }
            }
            articleFields {
              readTime
              shortSummary
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    `

    const data = await fetchGraphQL<{
      featuredArticles: { nodes: GraphQLArticle[] }
      latestArticles: { nodes: GraphQLArticle[] }
    }>(query)

    return {
      featured: data.featuredArticles.nodes.map(transformGraphQLArticle),
      latest: data.latestArticles.nodes.map(transformGraphQLArticle),
    }
  },

  /**
   * Get article by slug
   */
  async getArticleBySlug(slug: string): Promise<Article | null> {
    const query = `
      query SingleArticle($slug: String!) {
        articleBy(slug: $slug) {
          id
          title
          slug
          content
          excerpt
          date
          modified
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          articleCategory {
            nodes {
              name
              slug
            }
          }
          articleTag {
            nodes {
              name
              slug
            }
          }
          articleFields {
            articleType
            shortSummary
            readTime
            featured
            sourceAttribution {
              sourceUrl
              sourcePublisher
            }
            geography {
              nodes {
                name
                slug
              }
            }
            companies {
              companyName
              companyUrl
            }
            ctaType
            sponsoredDisclosure
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
        }
      }
    `

    const data = await fetchGraphQL<{
      articleBy: GraphQLArticle | null
    }>(query, { slug })

    if (!data.articleBy) {
      return null
    }

    return transformGraphQLArticle(data.articleBy)
  },

  /**
   * Get articles by category
   */
  async getArticlesByCategory(category: Category, limit = 12) {
    const query = `
      query CategoryArticles($categorySlug: String!, $first: Int!) {
        articles(
          where: {
            categoryName: $categorySlug
            orderby: { field: DATE, order: DESC }
          }
          first: $first
        ) {
          nodes {
            id
            title
            slug
            excerpt
            date
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            articleCategory {
              nodes {
                name
                slug
              }
            }
            articleFields {
              readTime
              shortSummary
              articleType
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    `

    const data = await fetchGraphQL<{
      articles: { nodes: GraphQLArticle[] }
    }>(query, { categorySlug: category, first: limit })

    return data.articles.nodes.map(transformGraphQLArticle)
  },

  /**
   * Get featured articles
   */
  async getFeaturedArticles(): Promise<Article[]> {
    const query = `
      query FeaturedArticles {
        articles(
          where: {
            metaQuery: {
              relation: AND
              metaArray: [
                {
                  key: "featured"
                  value: "1"
                  compare: EQUAL
                }
              ]
            }
            orderby: { field: DATE, order: DESC }
          }
          first: 10
        ) {
          nodes {
            id
            title
            slug
            excerpt
            date
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            articleCategory {
              nodes {
                name
                slug
              }
            }
            articleFields {
              readTime
              featured
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    `

    const data = await fetchGraphQL<{
      articles: { nodes: GraphQLArticle[] }
    }>(query)

    return data.articles.nodes.map(transformGraphQLArticle)
  },

  /**
   * Get latest articles
   */
  async getLatestArticles(limit = 10): Promise<Article[]> {
    const query = `
      query LatestArticles($first: Int!) {
        articles(
          where: {
            orderby: { field: DATE, order: DESC }
          }
          first: $first
        ) {
          nodes {
            id
            title
            slug
            excerpt
            date
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            articleCategory {
              nodes {
                name
                slug
              }
            }
            articleFields {
              readTime
              shortSummary
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    `

    const data = await fetchGraphQL<{
      articles: { nodes: GraphQLArticle[] }
    }>(query, { first: limit })

    return data.articles.nodes.map(transformGraphQLArticle)
  },

  /**
   * Get all articles (for static generation)
   */
  async getAllArticles(): Promise<Article[]> {
    const query = `
      query AllArticles {
        articles(
          where: {
            orderby: { field: DATE, order: DESC }
          }
          first: 100
        ) {
          nodes {
            id
            title
            slug
            excerpt
            date
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            articleCategory {
              nodes {
                name
                slug
              }
            }
            articleFields {
              readTime
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    `

    const data = await fetchGraphQL<{
      articles: { nodes: GraphQLArticle[] }
    }>(query)

    return data.articles.nodes.map(transformGraphQLArticle)
  },
}
