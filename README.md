# PropTech News & Intelligence Platform

A fast, SEO-first, content-heavy media site built with Next.js (App Router), Tailwind CSS, and headless WordPress CMS integration.

## 🚀 Features

- **Premium Editorial Design** - Bloomberg/TechCrunch-style layout
- **SEO Optimized** - Meta tags, schema markup, Open Graph
- **Headless WordPress** - GraphQL and REST API ready
- **Conversion Focused** - Newsletter signups, startup features, job postings
- **Mobile First** - Responsive, fast-loading design
- **Performance** - Optimized images, caching, Core Web Vitals friendly

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **CMS Ready**: Designed for WordPress Headless or Strapi integration

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Project Structure

```
/app
  /(routes)          # Main routes
  /layout.tsx        # Root layout
  /globals.css       # Global styles
/components
  /ui                # Reusable UI components
  /sections          # Page sections
/lib
  /data              # Sample data
  /types             # TypeScript types
  /utils             # Utility functions
```

## Features

- SEO-optimized with meta tags and schema markup
- Premium editorial design
- Mobile-first responsive layout
- Category-based content organization
- Newsletter integration ready
- Monetization pages (Ads, Featured Startups, Jobs)
- Headless WordPress CMS integration (REST API + GraphQL)

## Deployment on Render

### Environment Variables

Add these in Render Dashboard → Environment:

```env
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://yourwordpresssite.com/graphql
```

Or for REST API:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://yourwordpresssite.com
NEXT_PUBLIC_WORDPRESS_POST_TYPE=posts
```

See `RENDER_WORDPRESS_SETUP.md` for complete setup guide.
