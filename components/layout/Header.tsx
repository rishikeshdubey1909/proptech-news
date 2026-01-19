import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-serif font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
              PropTech
            </span>
            <span className="text-sm font-medium text-neutral-500">News</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/category/startups" 
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Startups
            </Link>
            <Link 
              href="/category/funding" 
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Funding
            </Link>
            <Link 
              href="/category/insights" 
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Insights
            </Link>
            <Link 
              href="/category/policy" 
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Policy
            </Link>
            <Link 
              href="/category/global" 
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Global
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/advertise"
              className="hidden lg:inline-block text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Advertise
            </Link>
            <Link
              href="/newsletter"
              className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
