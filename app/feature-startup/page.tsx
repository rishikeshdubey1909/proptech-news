import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Feature Your Startup',
  description: 'Get your PropTech startup featured on PropTech News. Reach founders, investors, and industry leaders.',
}

export default function FeatureStartupPage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
          Feature Your Startup
        </h1>
        <p className="text-xl text-neutral-600 mb-12">
          Get your PropTech startup in front of the right audience
        </p>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg text-neutral-700 mb-6">
            Our editorial team features the most innovative PropTech startups, helping them 
            reach founders, investors, and industry leaders. If you're building something 
            interesting in real estate technology, we want to hear about it.
          </p>

          <h2 className="text-2xl font-serif font-bold text-neutral-900 mt-8 mb-4">
            What We Cover
          </h2>
          <ul className="space-y-3 text-neutral-700">
            <li>• <strong>Product Launches:</strong> New platforms, tools, and solutions</li>
            <li>• <strong>Funding Announcements:</strong> Seed, Series A, and beyond</li>
            <li>• <strong>Company Spotlights:</strong> Deep dives into innovative startups</li>
            <li>• <strong>Founder Stories:</strong> The journey behind the startup</li>
            <li>• <strong>Industry Impact:</strong> How your solution is changing real estate</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-neutral-900 mt-8 mb-4">
            Submission Guidelines
          </h2>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mb-6">
            <p className="text-neutral-700 mb-4">
              To be considered for editorial coverage, please provide:
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li>• Company name and brief description</li>
              <li>• What problem you're solving</li>
              <li>• Your target market</li>
              <li>• Funding status (if applicable)</li>
              <li>• Key metrics or traction</li>
              <li>• Founder/team background</li>
              <li>• Press kit or high-resolution images</li>
            </ul>
          </div>

          <p className="text-neutral-600 text-sm mb-8">
            <strong>Note:</strong> Editorial coverage is free, but we only feature startups that 
            align with our editorial standards and audience interests. We also offer paid 
            sponsored content options for guaranteed placement.
          </p>

          <h2 className="text-2xl font-serif font-bold text-neutral-900 mt-8 mb-4">
            Submit Your Startup
          </h2>
          <p className="text-neutral-700 mb-6">
            Fill out the form below or email us directly at{' '}
            <a href="mailto:startups@proptechnews.com" className="text-primary-600 hover:text-primary-700">
              startups@proptechnews.com
            </a>
          </p>

          <form className="space-y-6 mb-8">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
                What does your startup do? *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Briefly describe your product, target market, and what makes it unique..."
              />
            </div>

            <div>
              <label htmlFor="funding" className="block text-sm font-medium text-neutral-700 mb-2">
                Funding Status
              </label>
              <input
                type="text"
                id="funding"
                name="funding"
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Seed, $2M Series A, Bootstrapped"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-neutral-700 mb-2">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://yourstartup.com"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors"
            >
              Submit for Review
            </button>
          </form>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
            <p className="text-neutral-900 font-semibold mb-2">Questions?</p>
            <p className="text-neutral-700">
              Email us at{' '}
              <a href="mailto:startups@proptechnews.com" className="text-primary-600 hover:text-primary-700">
                startups@proptechnews.com
              </a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/advertise"
              className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-neutral-700 font-semibold rounded-md hover:bg-neutral-50 transition-colors"
            >
              Learn About Advertising
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
