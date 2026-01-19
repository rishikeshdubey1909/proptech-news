import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Advertise With Us',
  description: 'Reach 10,000+ PropTech founders, investors, and industry leaders. Premium advertising opportunities on PropTech News.',
}

export default function AdvertisePage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
          Advertise With Us
        </h1>
        <p className="text-xl text-neutral-600 mb-12">
          Reach the most influential audience in PropTech
        </p>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg text-neutral-700 mb-6">
            PropTech News is the leading destination for PropTech founders, real estate developers, 
            VCs, and industry leaders. Our audience of 10,000+ professionals actively engages with 
            our content, making it the perfect platform to showcase your brand.
          </p>

          <h2 className="text-2xl font-serif font-bold text-neutral-900 mt-8 mb-4">
            Why Advertise With Us?
          </h2>
          <ul className="space-y-3 text-neutral-700">
            <li>• <strong>Premium Audience:</strong> Reach decision-makers at PropTech startups, VCs, and real estate companies</li>
            <li>• <strong>High Engagement:</strong> Our readers spend an average of 5+ minutes per article</li>
            <li>• <strong>SEO Benefits:</strong> High domain authority and strong backlink opportunities</li>
            <li>• <strong>Brand Association:</strong> Align your brand with trusted PropTech journalism</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-neutral-900 mt-8 mb-4">
            Advertising Options
          </h2>
          <div className="space-y-6">
            <div className="border border-neutral-200 rounded-lg p-6">
              <h3 className="text-xl font-serif font-semibold text-neutral-900 mb-2">
                Sponsored Content
              </h3>
              <p className="text-neutral-700 mb-4">
                Native articles that match our editorial style. Perfect for thought leadership, 
                product launches, or company stories.
              </p>
              <p className="text-sm text-neutral-600">
                Starting at $2,500 per article
              </p>
            </div>

            <div className="border border-neutral-200 rounded-lg p-6">
              <h3 className="text-xl font-serif font-semibold text-neutral-900 mb-2">
                Display Advertising
              </h3>
              <p className="text-neutral-700 mb-4">
                Banner ads in premium positions throughout the site. Available in multiple sizes 
                and placements.
              </p>
              <p className="text-sm text-neutral-600">
                Starting at $1,000/month
              </p>
            </div>

            <div className="border border-neutral-200 rounded-lg p-6">
              <h3 className="text-xl font-serif font-semibold text-neutral-900 mb-2">
                Newsletter Sponsorship
              </h3>
              <p className="text-neutral-700 mb-4">
                Reach our 10,000+ subscribers directly in their inbox. High open rates and 
                engagement.
              </p>
              <p className="text-sm text-neutral-600">
                Starting at $1,500 per newsletter
              </p>
            </div>

            <div className="border border-neutral-200 rounded-lg p-6">
              <h3 className="text-xl font-serif font-semibold text-neutral-900 mb-2">
                Event Partnerships
              </h3>
              <p className="text-neutral-700 mb-4">
                Co-host webinars, sponsor events, or partner on content series. Custom packages available.
              </p>
              <p className="text-sm text-neutral-600">
                Custom pricing
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-serif font-bold text-neutral-900 mt-12 mb-4">
            Get Started
          </h2>
          <p className="text-neutral-700 mb-6">
            Ready to reach the PropTech community? Contact us to discuss your advertising needs 
            and get a custom proposal.
          </p>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
            <p className="text-neutral-900 font-semibold mb-2">Contact our advertising team:</p>
            <p className="text-primary-600 text-lg">ads@proptechnews.com</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/feature-startup"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors"
            >
              Feature Your Startup Instead
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-neutral-700 font-semibold rounded-md hover:bg-neutral-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
