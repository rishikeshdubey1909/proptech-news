import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getArticleBySlug, getAllArticles } from '@/lib/data/articles'
import { formatDate } from '@/lib/utils/date'
import NewsletterCTA from '@/components/sections/NewsletterCTA'
import FeatureStartupCTA from '@/components/sections/FeatureStartupCTA'
import ArticleCard from '@/components/ui/ArticleCard'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 600,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  // Get related articles (same category, excluding current)
  const allArticles = await getAllArticles()
  const relatedArticles = allArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3)

  // NewsArticle schema markup
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PropTech News',
      logo: {
        '@type': 'ImageObject',
        url: 'https://proptechnews.com/logo.png',
      },
    },
    description: article.excerpt,
    articleSection: article.category,
    keywords: article.tags?.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="bg-white">
        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px] w-full">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
            {/* Category & Meta */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-full mb-4">
                {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center text-neutral-600 space-x-4">
                <div className="flex items-center">
                  {article.author.avatar && (
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      width={40}
                      height={40}
                      className="rounded-full mr-3"
                    />
                  )}
                  <span className="font-medium">{article.author.name}</span>
                </div>
                <span>•</span>
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
                <span>•</span>
                <span>{article.readTime} min read</span>
              </div>
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm text-neutral-600 bg-neutral-100 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16">
          <NewsletterCTA />
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-neutral-50 py-16 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Feature Startup CTA */}
        <div className="mt-16">
          <FeatureStartupCTA />
        </div>
      </article>
    </>
  )
}
