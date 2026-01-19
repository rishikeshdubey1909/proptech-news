import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/lib/types'
import { formatDateShort } from '@/lib/utils/date'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'featured' | 'compact'
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <Link href={`/article/${article.slug}`} className="group block">
        <div className="relative h-96 w-full overflow-hidden rounded-lg mb-4">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-600 rounded-full mb-3">
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 group-hover:text-primary-200 transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-neutral-200 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center mt-4 text-sm text-neutral-300">
              <span>{article.author.name}</span>
              <span className="mx-2">•</span>
              <span>{formatDateShort(article.publishedAt)}</span>
              <span className="mx-2">•</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/article/${article.slug}`} className="group block">
        <div className="flex gap-4">
          <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="96px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
              {article.category}
            </span>
            <h3 className="text-base font-serif font-semibold mt-1 mb-2 text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {article.title}
            </h3>
            <div className="flex items-center text-xs text-neutral-500">
              <span>{formatDateShort(article.publishedAt)}</span>
              <span className="mx-2">•</span>
              <span>{article.readTime} min</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <article className="bg-white rounded-lg overflow-hidden border border-neutral-200 hover:border-neutral-300 transition-all hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full mb-3">
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </span>
          <h2 className="text-xl font-serif font-bold mb-2 text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
            {article.title}
          </h2>
          <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center">
              <span>{article.author.name}</span>
              <span className="mx-2">•</span>
              <span>{formatDateShort(article.publishedAt)}</span>
            </div>
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
