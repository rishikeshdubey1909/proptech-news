import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PropTech Reports',
  description: 'In-depth research reports and market intelligence on the PropTech industry. Coming soon.',
}

export default function ReportsPage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
          PropTech Reports
        </h1>
        <p className="text-xl text-neutral-600 mb-12">
          In-depth research and market intelligence
        </p>

        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-neutral-50 border-2 border-dashed border-neutral-300 rounded-lg p-12 text-center">
            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-lg text-neutral-700 mb-6">
              We're building a comprehensive library of PropTech research reports, market analysis, 
              and industry intelligence.
            </p>
            <p className="text-neutral-600 mb-8">
              Our reports will cover:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-3 text-neutral-700">
              <li>• Quarterly funding reports</li>
              <li>• Market trend analysis</li>
              <li>• Category deep dives</li>
              <li>• Geographic market studies</li>
              <li>• Startup ecosystem maps</li>
              <li>• Investor activity reports</li>
            </ul>
          </div>

          <div className="mt-12 bg-primary-50 border border-primary-200 rounded-lg p-8">
            <h3 className="text-xl font-serif font-semibold text-neutral-900 mb-4">
              Get Notified
            </h3>
            <p className="text-neutral-700 mb-6">
              Be the first to know when our reports are available. Subscribe to our newsletter 
              for updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-serif font-semibold text-neutral-900 mb-4">
              Interested in Commissioning a Report?
            </h3>
            <p className="text-neutral-700 mb-6">
              We also offer custom research and market intelligence services for companies, 
              investors, and organizations. Contact us to discuss your needs.
            </p>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
              <p className="text-neutral-900 font-semibold mb-2">Contact our research team:</p>
              <p className="text-primary-600 text-lg">research@proptechnews.com</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
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
