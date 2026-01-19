import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-serif font-bold text-neutral-900">
                PropTech
              </span>
              <span className="text-sm font-medium text-neutral-500">News</span>
            </Link>
            <p className="text-sm text-neutral-600 max-w-md">
              The leading source for PropTech news, funding rounds, startup insights, 
              and real estate technology intelligence.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/startups" className="text-sm text-neutral-600 hover:text-neutral-900">
                  Startups
                </Link>
              </li>
              <li>
                <Link href="/category/funding" className="text-sm text-neutral-600 hover:text-neutral-900">
                  Funding
                </Link>
              </li>
              <li>
                <Link href="/category/insights" className="text-sm text-neutral-600 hover:text-neutral-900">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/category/policy" className="text-sm text-neutral-600 hover:text-neutral-900">
                  Policy
                </Link>
              </li>
              <li>
                <Link href="/category/global" className="text-sm text-neutral-600 hover:text-neutral-900">
                  Global
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/advertise" className="text-sm text-neutral-600 hover:text-neutral-900">
                  Advertise With Us
                </Link>
              </li>
              <li>
                <Link href="/feature-startup" className="text-sm text-neutral-600 hover:text-neutral-900">
                  Feature Your Startup
                </Link>
              </li>
              <li>
                <Link href="/submit-job" className="text-sm text-neutral-600 hover:text-neutral-900">
                  Submit a Job
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-sm text-neutral-600 hover:text-neutral-900">
                  Reports
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 text-center">
            © {new Date().getFullYear()} PropTech News. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
