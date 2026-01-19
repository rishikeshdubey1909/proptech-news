import type { Metadata } from 'next'
import NewsletterCTA from '@/components/sections/NewsletterCTA'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Subscribe to PropTech News newsletter for weekly insights on funding, startups, and industry trends.',
}

export default function NewsletterPage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
          Subscribe to Our Newsletter
        </h1>
        <p className="text-xl text-neutral-600 mb-12">
          Stay ahead of PropTech with weekly insights
        </p>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg text-neutral-700 mb-6">
            Join 10,000+ PropTech professionals who receive our weekly newsletter with:
          </p>
          <ul className="space-y-3 text-neutral-700">
            <li>• <strong>Weekly Funding Roundup:</strong> All the latest investment news</li>
            <li>• <strong>Startup Spotlights:</strong> Featured companies and product launches</li>
            <li>• <strong>Industry Insights:</strong> Analysis and trends from our editorial team</li>
            <li>• <strong>Job Opportunities:</strong> Curated PropTech job postings</li>
            <li>• <strong>Event Calendar:</strong> Upcoming PropTech events and webinars</li>
          </ul>

          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mt-8 mb-8">
            <p className="text-neutral-700">
              <strong>What to expect:</strong> One email per week, every Tuesday morning. 
              No spam, unsubscribe anytime.
            </p>
          </div>
        </div>

        <NewsletterCTA />
      </div>
    </div>
  )
}
