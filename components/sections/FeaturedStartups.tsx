import Link from 'next/link'

export default function FeaturedStartups() {
  // Placeholder for featured startups - will be replaced with real data later
  const featuredStartups = [
    {
      name: 'Your Startup Here',
      description: 'Get featured and reach 10,000+ PropTech professionals',
      category: 'Property Management',
    },
  ]

  return (
    <section className="bg-neutral-50 border-y border-neutral-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-3">
              Featured Startups
            </h2>
            <p className="text-neutral-600 text-lg">
              Innovative PropTech companies making waves in real estate technology
            </p>
          </div>
          <Link
            href="/feature-startup"
            className="hidden md:inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Submit Your Startup →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredStartups.map((startup, index) => (
            <div
              key={index}
              className="bg-white border border-neutral-200 rounded-lg p-6 hover:border-primary-300 transition-colors"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full">
                  {startup.category}
                </span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-neutral-900 mb-2">
                {startup.name}
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                {startup.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/feature-startup"
            className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-md hover:bg-white hover:border-primary-300 transition-colors"
          >
            Feature Your Startup
          </Link>
        </div>
      </div>
    </section>
  )
}
