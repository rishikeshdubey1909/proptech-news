export default function Hero() {
  return (
    <section className="bg-white border-b border-neutral-200 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 mb-6 leading-tight">
            PropTech Intelligence for
            <span className="block text-primary-600">Founders & Investors</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 mb-8 leading-relaxed">
            Stay ahead with funding rounds, startup launches, and market insights 
            across India and global PropTech markets.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Covering PropTech across India & Global Markets
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Trusted by 10,000+ Industry Leaders
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
