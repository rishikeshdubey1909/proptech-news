interface NewsletterCTAProps {
  variant?: 'default' | 'compact' | 'inline'
}

export default function NewsletterCTA({ variant = 'default' }: NewsletterCTAProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-serif font-semibold text-neutral-900 mb-1">
              Stay Updated
            </h3>
            <p className="text-sm text-neutral-600">
              Weekly PropTech insights delivered to your inbox
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 md:p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-serif font-bold text-white mb-2">
            Get Weekly PropTech Intelligence
          </h3>
          <p className="text-primary-100 mb-6 text-sm md:text-base">
            Join 10,000+ founders, investors, and industry leaders
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-md hover:bg-neutral-100 transition-colors whitespace-nowrap text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
          Stay Ahead of PropTech
        </h2>
        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Weekly insights on funding rounds, startup launches, and industry trends 
          delivered to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-md hover:bg-neutral-100 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        <p className="text-sm text-primary-200">
          Join 10,000+ PropTech professionals. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
