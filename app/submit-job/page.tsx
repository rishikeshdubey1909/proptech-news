import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Submit a Job',
  description: 'Post PropTech job openings and reach qualified candidates in the real estate technology industry.',
}

export default function SubmitJobPage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
          Submit a Job
        </h1>
        <p className="text-xl text-neutral-600 mb-12">
          Reach top PropTech talent
        </p>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg text-neutral-700 mb-6">
            Our job board connects PropTech companies with the best talent in real estate technology. 
            Post your open positions and reach engineers, product managers, sales professionals, 
            and executives actively engaged in the PropTech ecosystem.
          </p>

          <h2 className="text-2xl font-serif font-bold text-neutral-900 mt-8 mb-4">
            Why Post on PropTech News?
          </h2>
          <ul className="space-y-3 text-neutral-700">
            <li>• <strong>Targeted Audience:</strong> Reach professionals specifically interested in PropTech</li>
            <li>• <strong>High-Quality Candidates:</strong> Our readers are engaged, informed, and career-focused</li>
            <li>• <strong>Newsletter Distribution:</strong> Jobs featured in our weekly newsletter to 10,000+ subscribers</li>
            <li>• <strong>SEO Benefits:</strong> Job postings are indexed and searchable</li>
            <li>• <strong>Affordable Pricing:</strong> Competitive rates for startups and established companies</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-neutral-900 mt-8 mb-4">
            Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-neutral-200 rounded-lg p-6">
              <h3 className="text-xl font-serif font-semibold text-neutral-900 mb-2">
                Single Post
              </h3>
              <p className="text-3xl font-bold text-primary-600 mb-2">$299</p>
              <p className="text-sm text-neutral-600 mb-4">One-time posting</p>
              <ul className="text-sm text-neutral-700 space-y-2">
                <li>• 30-day listing</li>
                <li>• Featured in newsletter</li>
                <li>• SEO optimized</li>
              </ul>
            </div>

            <div className="border border-primary-200 rounded-lg p-6 bg-primary-50">
              <h3 className="text-xl font-serif font-semibold text-neutral-900 mb-2">
                Featured Post
              </h3>
              <p className="text-3xl font-bold text-primary-600 mb-2">$499</p>
              <p className="text-sm text-neutral-600 mb-4">Premium placement</p>
              <ul className="text-sm text-neutral-700 space-y-2">
                <li>• 60-day listing</li>
                <li>• Top placement in job board</li>
                <li>• Featured in newsletter</li>
                <li>• Social media promotion</li>
                <li>• SEO optimized</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-serif font-bold text-neutral-900 mt-8 mb-4">
            Submit Your Job Posting
          </h2>
          <p className="text-neutral-700 mb-6">
            Fill out the form below or email us at{' '}
            <a href="mailto:jobs@proptechnews.com" className="text-primary-600 hover:text-primary-700">
              jobs@proptechnews.com
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
                Contact Email *
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
              <label htmlFor="job-title" className="block text-sm font-medium text-neutral-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                id="job-title"
                name="job-title"
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Senior Full-Stack Engineer"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., San Francisco, CA or Remote"
              />
            </div>

            <div>
              <label htmlFor="job-type" className="block text-sm font-medium text-neutral-700 mb-2">
                Job Type *
              </label>
              <select
                id="job-type"
                name="job-type"
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select...</option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={8}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Describe the role, requirements, and what makes your company a great place to work..."
              />
            </div>

            <div>
              <label htmlFor="apply-url" className="block text-sm font-medium text-neutral-700 mb-2">
                Application URL *
              </label>
              <input
                type="url"
                id="apply-url"
                name="apply-url"
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://yourcompany.com/careers/apply"
              />
            </div>

            <div>
              <label htmlFor="package" className="block text-sm font-medium text-neutral-700 mb-2">
                Package *
              </label>
              <select
                id="package"
                name="package"
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select...</option>
                <option value="single">Single Post - $299</option>
                <option value="featured">Featured Post - $499</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors"
            >
              Submit Job Posting
            </button>
          </form>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
            <p className="text-neutral-900 font-semibold mb-2">Need help?</p>
            <p className="text-neutral-700">
              Email us at{' '}
              <a href="mailto:jobs@proptechnews.com" className="text-primary-600 hover:text-primary-700">
                jobs@proptechnews.com
              </a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
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
