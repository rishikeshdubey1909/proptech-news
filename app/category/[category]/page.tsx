import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getArticlesByCategory, categories, sampleArticles } from '@/lib/data/articles'
import { Category } from '@/lib/types'
import ArticleCard from '@/components/ui/ArticleCard'
import NewsletterCTA from '@/components/sections/NewsletterCTA'

interface PageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = params.category as Category
  const categoryInfo = categories[category]

  if (!categoryInfo) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: categoryInfo.name,
    description: categoryInfo.description,
    openGraph: {
      title: `${categoryInfo.name} | PropTech News`,
      description: categoryInfo.description,
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const category = params.category as Category
  const categoryInfo = categories[category]

  if (!categoryInfo) {
    notFound()
  }

  const articles = await getArticlesByCategory(category)

  return (
    <div>
      {/* Category Header */}
      <section className="bg-white border-b border-neutral-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
            {categoryInfo.name}
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            {categoryInfo.description}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-600 text-lg">No articles found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </div>
  )
}
