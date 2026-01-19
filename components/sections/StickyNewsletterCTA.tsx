'use client'

import { useState, useEffect } from 'react'

export default function StickyNewsletterCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Show after user scrolls down 50%
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercentage > 50 && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white border-t border-neutral-200 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-neutral-900 mb-1">
            Stay Updated with PropTech News
          </h3>
          <p className="text-xs text-neutral-600">
            Weekly insights for founders and investors
          </p>
        </div>
        <form
          className="flex gap-2 w-full sm:w-auto"
          onSubmit={(e) => {
            e.preventDefault()
            // Handle subscription
            setIsDismissed(true)
          }}
        >
          <input
            type="email"
            placeholder="Your email"
            className="px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900 flex-1 sm:flex-initial sm:w-64"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="px-2 text-neutral-400 hover:text-neutral-600"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}
