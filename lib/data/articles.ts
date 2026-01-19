import { Article, Category } from '../types'
import { wordpressService } from '../services/wordpress'

// Fallback sample data
export const categories: Record<Category, { name: string; description: string }> = {
  startups: {
    name: 'Startups',
    description: 'Emerging PropTech companies and innovations',
  },
  funding: {
    name: 'Funding',
    description: 'Investment rounds, acquisitions, and market moves',
  },
  insights: {
    name: 'Insights',
    description: 'Analysis, trends, and deep dives',
  },
  policy: {
    name: 'Policy',
    description: 'Regulatory changes and policy impacts',
  },
  global: {
    name: 'Global',
    description: 'International PropTech developments',
  },
}

// Sample articles (fallback when WordPress is not configured)
export const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'PropTech Unicorn Raises $200M Series C to Expand AI-Powered Property Management',
    slug: 'proptech-unicorn-raises-200m-series-c',
    excerpt: 'The funding round, led by Sequoia Capital, will accelerate the company\'s expansion into European markets and enhance its AI capabilities for property managers.',
    content: `
      <p>In a landmark deal for the PropTech sector, PropertyAI has secured $200 million in Series C funding, valuing the company at $1.8 billion. The round was led by Sequoia Capital, with participation from existing investors including Andreessen Horowitz and Bessemer Venture Partners.</p>
      
      <p>The San Francisco-based startup has developed an AI-powered platform that helps property managers automate maintenance requests, optimize tenant communications, and predict maintenance needs before they become costly issues.</p>
      
      <p>"This funding validates our vision of making property management more efficient and tenant-friendly through AI," said CEO Sarah Chen. "We're seeing incredible demand from property managers who want to reduce operational costs while improving tenant satisfaction."</p>
      
      <p>The company plans to use the capital to expand into European markets, starting with the UK and Germany, and to double its engineering team to accelerate product development.</p>
      
      <h2>Market Impact</h2>
      <p>The PropTech sector has seen explosive growth over the past three years, with total funding reaching $32 billion globally in 2023. PropertyAI's raise is the largest Series C in the property management software category this year.</p>
      
      <p>Industry analysts predict that AI-powered property management tools will become standard in the next five years, as property owners seek to reduce costs and improve operational efficiency in an increasingly competitive rental market.</p>
    `,
    author: {
      name: 'Michael Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    category: 'funding',
    featured: true,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop',
    publishedAt: '2024-01-15T10:00:00Z',
    readTime: 5,
    tags: ['AI', 'Property Management', 'Series C', 'Sequoia'],
  },
  {
    id: '2',
    title: 'How Virtual Reality is Transforming Real Estate Showings',
    slug: 'virtual-reality-transforming-real-estate-showings',
    excerpt: 'VR technology is revolutionizing how properties are marketed and shown, especially in luxury markets where international buyers are common.',
    content: `
      <p>Virtual reality has moved beyond gaming and is now transforming how real estate professionals market and show properties. Companies like Matterport and Zillow are leading the charge, offering immersive 3D tours that allow potential buyers to explore properties from anywhere in the world.</p>
      
      <p>For luxury properties and international buyers, VR showings have become essential. A buyer in London can now tour a penthouse in New York without booking a flight, saving time and money for both parties.</p>
      
      <p>Real estate agents report that properties with VR tours receive 40% more inquiries and sell 31% faster than those with traditional photos alone.</p>
    `,
    author: {
      name: 'Emily Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    category: 'insights',
    featured: true,
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200&h=600&fit=crop',
    publishedAt: '2024-01-14T14:30:00Z',
    readTime: 4,
    tags: ['VR', 'Technology', 'Real Estate'],
  },
  {
    id: '3',
    title: 'New PropTech Startup Aims to Decarbonize Commercial Buildings',
    slug: 'proptech-startup-decarbonize-commercial-buildings',
    excerpt: 'GreenBuild Tech launches with $15M seed round to help commercial property owners reduce carbon emissions through IoT sensors and AI analytics.',
    content: `
      <p>GreenBuild Tech, a new PropTech startup based in Boston, has raised $15 million in seed funding to help commercial building owners reduce their carbon footprint.</p>
      
      <p>The company's platform uses IoT sensors to monitor energy usage in real-time and AI algorithms to optimize heating, cooling, and lighting systems. Early customers have reported 25-30% reductions in energy consumption.</p>
      
      <p>"Commercial buildings account for 40% of global energy consumption," said founder James Park. "Our technology makes it easy for property owners to meet sustainability goals while reducing costs."</p>
    `,
    author: {
      name: 'David Kim',
    },
    category: 'startups',
    featured: false,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
    publishedAt: '2024-01-13T09:00:00Z',
    readTime: 3,
    tags: ['Sustainability', 'IoT', 'Commercial Real Estate'],
  },
  {
    id: '4',
    title: 'EU Proposes New Regulations for Short-Term Rental Platforms',
    slug: 'eu-proposes-regulations-short-term-rental-platforms',
    excerpt: 'The European Commission has unveiled new rules that would require platforms like Airbnb to share data with local authorities and verify host identities.',
    content: `
      <p>The European Commission has proposed new regulations that would significantly impact short-term rental platforms operating in the EU. The rules would require platforms to share data with local authorities and verify the identity of hosts.</p>
      
      <p>The proposal comes as cities across Europe struggle with housing shortages and rising rents, which some attribute to the growth of short-term rentals.</p>
      
      <p>Platforms would need to automatically transmit booking data to local authorities, including the number of nights booked and the address of the property. This would help cities enforce existing regulations on short-term rentals.</p>
    `,
    author: {
      name: 'Sophie Martin',
    },
    category: 'policy',
    featured: false,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop',
    publishedAt: '2024-01-12T16:00:00Z',
    readTime: 4,
    tags: ['Regulation', 'EU', 'Short-Term Rentals'],
  },
  {
    id: '5',
    title: 'Singapore PropTech Ecosystem Sees Record Investment in 2023',
    slug: 'singapore-proptech-ecosystem-record-investment-2023',
    excerpt: 'Singapore-based PropTech companies raised over $500M last year, making it the leading PropTech hub in Southeast Asia.',
    content: `
      <p>Singapore's PropTech ecosystem has reached new heights, with companies raising over $500 million in 2023, a 45% increase from the previous year.</p>
      
      <p>The city-state's strong regulatory framework, tech talent pool, and strategic location have made it an attractive base for PropTech startups targeting Southeast Asian markets.</p>
      
      <p>Notable raises include property management platform Propspace ($80M Series B) and construction tech startup BuildSmart ($50M Series A).</p>
    `,
    author: {
      name: 'Raj Patel',
    },
    category: 'global',
    featured: false,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&h=600&fit=crop',
    publishedAt: '2024-01-11T11:00:00Z',
    readTime: 3,
    tags: ['Singapore', 'Southeast Asia', 'Investment'],
  },
  {
    id: '6',
    title: 'PropTech Platform Raises $50M to Expand Rental Marketplace',
    slug: 'proptech-platform-raises-50m-rental-marketplace',
    excerpt: 'RentFlow secures Series B funding to expand its B2B rental marketplace connecting property managers with service providers.',
    content: `
      <p>RentFlow, a PropTech platform that connects property managers with service providers, has raised $50 million in Series B funding led by General Catalyst.</p>
      
      <p>The platform streamlines the process of finding and hiring contractors, cleaners, and maintenance professionals for rental properties. Property managers can request quotes, schedule services, and manage payments all in one place.</p>
      
      <p>The company plans to expand from 15 to 50 markets over the next 18 months.</p>
    `,
    author: {
      name: 'Michael Rodriguez',
    },
    category: 'funding',
    featured: false,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop',
    publishedAt: '2024-01-10T08:00:00Z',
    readTime: 3,
    tags: ['Marketplace', 'B2B', 'Series B'],
  },
]

/**
 * Check if WordPress is configured
 */
function isWordPressConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_WORDPRESS_API_URL
}

/**
 * Get article by slug (WordPress or fallback)
 */
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  if (isWordPressConfigured()) {
    const article = await wordpressService.getArticleBySlug(slug)
    return article || undefined
  }
  return sampleArticles.find(article => article.slug === slug)
}

/**
 * Get articles by category (WordPress or fallback)
 */
export async function getArticlesByCategory(category: Category): Promise<Article[]> {
  if (isWordPressConfigured()) {
    return wordpressService.getArticlesByCategory(category)
  }
  return sampleArticles.filter(article => article.category === category)
}

/**
 * Get featured articles (WordPress or fallback)
 */
export async function getFeaturedArticles(): Promise<Article[]> {
  if (isWordPressConfigured()) {
    return wordpressService.getFeaturedArticles()
  }
  return sampleArticles.filter(article => article.featured)
}

/**
 * Get latest articles (WordPress or fallback)
 */
export async function getLatestArticles(limit?: number): Promise<Article[]> {
  if (isWordPressConfigured()) {
    return wordpressService.getLatestArticles(limit)
  }
  const sorted = [...sampleArticles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  return limit ? sorted.slice(0, limit) : sorted
}

/**
 * Get all articles for static generation (WordPress or fallback)
 */
export async function getAllArticles(): Promise<Article[]> {
  if (isWordPressConfigured()) {
    return wordpressService.getArticles()
  }
  return sampleArticles
}
