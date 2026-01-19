import Link from 'next/link'

interface FeatureStartupCTAProps {
  variant?: 'default' | 'subtle'
}

export default function FeatureStartupCTA({ variant = 'default' }: FeatureStartupCTAProps) {
  if (variant === 'subtle') {
    return (
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-serif font-semibold text-neutral-900 mb-1">
              Feature Your Startup
            </h3>
            <p className="text-sm text-neutral-600">
              Reach 10,000+ PropTech professionals
            </p>
          </div>
          <Link
            href="/feature-startup"
            className="px-4 py-2 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-md hover:bg-white hover:border-primary-300 transition-colors whitespace-nowrap"
          >
            Submit →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-white border-y border-neutral-200 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-50 rounded-lg border border-neutral-200 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900 mb-4">
            Feature Your Startup
          </h2>
          <p className="text-neutral-600 mb-6 text-lg leading-relaxed">
            Get your PropTech startup in front of 10,000+ founders, investors, and industry leaders. 
            Our editorial team features the most innovative companies in real estate technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/feature-startup"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors"
            >
              Submit Your Startup
            </Link>
            <Link
              href="/advertise"
              className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-neutral-700 font-semibold rounded-md hover:bg-neutral-50 transition-colors"
            >
              Learn About Advertising
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
