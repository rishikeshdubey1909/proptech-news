import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-serif font-bold text-neutral-900 mb-4">404</h1>
        <h2 className="text-2xl font-serif font-semibold text-neutral-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
