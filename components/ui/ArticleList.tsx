import Link from 'next/link'
import { Article } from '@/lib/types'
import { formatDateShort } from '@/lib/utils/date'

interface ArticleListProps {
  articles: Article[]
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="space-y-0 divide-y divide-neutral-200">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/article/${article.slug}`}
          className="block py-6 hover:bg-neutral-50 transition-colors group"
        >
          <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
                    {article.category}
                  </span>
                  <span className="text-xs text-neutral-400">•</span>
                  <time className="text-xs text-neutral-500" dateTime={article.publishedAt}>
                    {formatDateShort(article.publishedAt)}
                  </time>
                  <span className="text-xs text-neutral-400">•</span>
                  <span className="text-xs text-neutral-500">{article.readTime} min read</span>
                </div>
                <h3 className="text-lg md:text-xl font-serif font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-neutral-600 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center mt-3">
                  <span className="text-xs text-neutral-500">{article.author.name}</span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}
