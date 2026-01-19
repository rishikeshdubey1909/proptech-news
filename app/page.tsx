import { getFeaturedArticles, getLatestArticles, getArticlesByCategory, categories } from '@/lib/data/articles'
import ArticleCard from '@/components/ui/ArticleCard'
import ArticleList from '@/components/ui/ArticleList'
import CategorySection from '@/components/sections/CategorySection'
import NewsletterCTA from '@/components/sections/NewsletterCTA'
import FeatureStartupCTA from '@/components/sections/FeatureStartupCTA'
import FeaturedStartups from '@/components/sections/FeaturedStartups'
import Hero from '@/components/sections/Hero'
import { Category } from '@/lib/types'

export default async function HomePage() {
  const featuredArticles = await getFeaturedArticles()
  const latestArticles = await getLatestArticles(8)
  const featuredArticle = featuredArticles[0]
  const otherFeatured = featuredArticles.slice(1, 2)

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Featured / Breaking Story */}
      {featuredArticle && (
        <section className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-6">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
                Featured Story
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ArticleCard article={featuredArticle} variant="featured" />
              </div>
              <div className="space-y-6">
                {otherFeatured.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest News Feed - List Style */}
      <section className="bg-white border-b border-neutral-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900 mb-2">
                Latest News
              </h2>
              <p className="text-neutral-600">
                Stay updated with the latest PropTech developments
              </p>
            </div>
          </div>
          <ArticleList articles={latestArticles} />
        </div>
      </section>

      {/* Newsletter CTA - Primary Conversion */}
      <NewsletterCTA variant="default" />

      {/* Category Sections */}
      {await Promise.all(
        (Object.keys(categories) as Category[]).map(async (category) => {
          const categoryArticles = await getArticlesByCategory(category)
          if (categoryArticles.length === 0) return null
        
          return (
            <CategorySection
              key={category}
              category={category}
              articles={categoryArticles}
              limit={4}
            />
          )
        })
      )}

      {/* Featured Startups Section */}
      <FeaturedStartups />

      {/* Secondary CTA - Feature Your Startup */}
      <FeatureStartupCTA variant="default" />

      {/* Final Newsletter CTA - Inline Variant */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterCTA variant="inline" />
        </div>
      </section>
    </>
  )
}
