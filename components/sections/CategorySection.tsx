import Link from 'next/link'
import { Article, Category } from '@/lib/types'
import ArticleCard from '@/components/ui/ArticleCard'
import { categories } from '@/lib/data/articles'

interface CategorySectionProps {
  category: Category
  articles: Article[]
  limit?: number
}

export default function CategorySection({ category, articles, limit = 4 }: CategorySectionProps) {
  const categoryInfo = categories[category]
  const displayedArticles = articles.slice(0, limit)

  if (displayedArticles.length === 0) return null

  return (
    <section className="bg-white border-b border-neutral-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link 
              href={`/category/${category}`}
              className="text-2xl md:text-3xl font-serif font-bold text-neutral-900 hover:text-primary-600 transition-colors block mb-2"
            >
              {categoryInfo.name}
            </Link>
            <p className="text-neutral-600 text-lg">{categoryInfo.description}</p>
          </div>
          <Link
            href={`/category/${category}`}
            className="hidden md:inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View all →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link
            href={`/category/${category}`}
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View all {categoryInfo.name} →
          </Link>
        </div>
      </div>
    </section>
  )
}
