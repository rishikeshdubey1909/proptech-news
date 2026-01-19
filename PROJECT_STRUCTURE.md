# Project Structure

```
ProjectA/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles & Tailwind
│   ├── not-found.tsx            # 404 page
│   ├── article/
│   │   └── [slug]/
│   │       └── page.tsx         # Dynamic article pages
│   ├── category/
│   │   └── [category]/
│   │       └── page.tsx         # Dynamic category pages
│   ├── advertise/
│   │   └── page.tsx             # Advertise page
│   ├── feature-startup/
│   │   └── page.tsx             # Feature startup page
│   ├── submit-job/
│   │   └── page.tsx             # Job submission page
│   ├── reports/
│   │   └── page.tsx             # Reports (coming soon)
│   └── newsletter/
│       └── page.tsx             # Newsletter subscription
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Site header/navigation
│   │   └── Footer.tsx           # Site footer
│   ├── ui/
│   │   └── ArticleCard.tsx      # Reusable article card component
│   └── sections/
│       ├── CategorySection.tsx  # Category section component
│       ├── NewsletterCTA.tsx    # Newsletter CTA block
│       └── FeatureStartupCTA.tsx # Feature startup CTA
│
├── lib/
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   ├── data/
│   │   └── articles.ts          # Sample articles & data utilities
│   └── utils/
│       └── date.ts              # Date formatting utilities
│
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind CSS config
├── next.config.js              # Next.js config
└── README.md                    # Project documentation
```

## Key Features

### Pages
- **Homepage**: Featured stories, latest news, category sections, newsletter CTA
- **Article Pages**: Full article with SEO, schema markup, related articles
- **Category Pages**: Dynamic routing for all categories
- **Monetization Pages**: Advertise, Feature Startup, Submit Job, Reports

### Components
- **ArticleCard**: Three variants (default, featured, compact)
- **CategorySection**: Reusable category display
- **CTA Blocks**: Newsletter and Feature Startup CTAs

### SEO & Performance
- Meta tags and Open Graph on all pages
- NewsArticle schema markup on article pages
- Static generation for articles and categories
- Optimized images with Next.js Image component

### Design System
- Premium editorial typography (serif headings, sans-serif body)
- High contrast, whitespace-heavy layout
- Mobile-first responsive design
- Tailwind CSS with custom color palette

## Next Steps for CMS Integration

1. Replace `lib/data/articles.ts` with API calls to your CMS
2. Update `getArticleBySlug`, `getArticlesByCategory` functions
3. Add ISR (Incremental Static Regeneration) for dynamic content
4. Configure image domains in `next.config.js` for CMS images
