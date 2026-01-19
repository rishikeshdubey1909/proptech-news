# WPGraphQL Query Examples

## GraphQL Endpoint
```
https://yourwordpresssite.com/graphql
```

## 1. Homepage Articles Query

Get featured articles and latest news for homepage:

```graphql
query HomepageArticles {
  # Featured articles
  featuredArticles: articles(
    where: {
      metaQuery: {
        relation: AND
        metaArray: [
          {
            key: "featured"
            value: "1"
            compare: EQUAL
          }
        ]
      }
      orderby: { field: DATE, order: DESC }
    }
    first: 3
  ) {
    nodes {
      id
      title
      slug
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      articleCategory {
        nodes {
          name
          slug
        }
      }
      articleFields {
        articleType
        shortSummary
        readTime
        featured
        geography {
          nodes {
            name
            slug
          }
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
    }
  }
  
  # Latest articles
  latestArticles: articles(
    where: {
      orderby: { field: DATE, order: DESC }
    }
    first: 8
  ) {
    nodes {
      id
      title
      slug
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      articleCategory {
        nodes {
          name
          slug
        }
      }
      articleFields {
        readTime
        shortSummary
      }
      author {
        node {
          name
        }
      }
    }
  }
}
```

## 2. Single Article Page Query

Get full article content with related articles:

```graphql
query SingleArticle($slug: String!) {
  articleBy(slug: $slug) {
    id
    title
    slug
    content
    excerpt
    date
    modified
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    articleCategory {
      nodes {
        name
        slug
      }
    }
    articleTag {
      nodes {
        name
        slug
      }
    }
    articleFields {
      articleType
      shortSummary
      readTime
      featured
      sourceAttribution {
        sourceUrl
        sourcePublisher
      }
      geography {
        nodes {
          name
          slug
        }
      }
      companies {
        companyName
        companyUrl
      }
      ctaType
      sponsoredDisclosure
    }
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
  }
  
  # Related articles (same category)
  relatedArticles: articles(
    where: {
      notIn: [$slug]
      orderby: { field: DATE, order: DESC }
    }
    first: 3
  ) {
    nodes {
      id
      title
      slug
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      articleFields {
        readTime
      }
    }
  }
}
```

**Variables:**
```json
{
  "slug": "proptech-unicorn-raises-200m-series-c"
}
```

## 3. Category Page Query

Get articles by category with pagination:

```graphql
query CategoryArticles(
  $categorySlug: String!
  $first: Int
  $after: String
) {
  categoryBy(slug: $categorySlug) {
    id
    name
    description
    slug
  }
  
  articles(
    where: {
      categoryName: $categorySlug
      orderby: { field: DATE, order: DESC }
    }
    first: $first
    after: $after
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    nodes {
      id
      title
      slug
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      articleFields {
        readTime
        shortSummary
        articleType
      }
      author {
        node {
          name
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "categorySlug": "funding",
  "first": 12,
  "after": null
}
```

## 4. Sponsored Content Filter Query

Get only sponsored articles:

```graphql
query SponsoredArticles {
  articles(
    where: {
      metaQuery: {
        relation: AND
        metaArray: [
          {
            key: "article_type"
            value: "sponsored"
            compare: EQUAL
          }
        ]
      }
      orderby: { field: DATE, order: DESC }
    }
    first: 10
  ) {
    nodes {
      id
      title
      slug
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      articleFields {
        articleType
        sponsoredDisclosure
        shortSummary
      }
    }
  }
}
```

## 5. Geography-Based Articles Query

Get articles by geography:

```graphql
query ArticlesByGeography($geographySlug: String!) {
  geographyBy(slug: $geographySlug) {
    id
    name
    slug
  }
  
  articles(
    where: {
      taxonomyFilter: {
        relation: AND
        filters: [
          {
            taxonomy: GEOGRAPHY
            terms: [$geographySlug]
            operator: IN
          }
        ]
      }
      orderby: { field: DATE, order: DESC }
    }
    first: 12
  ) {
    nodes {
      id
      title
      slug
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      articleFields {
        geography {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "geographySlug": "india"
}
```

## 6. Search Articles Query

Search articles by keyword:

```graphql
query SearchArticles($search: String!) {
  articles(
    where: {
      search: $search
      orderby: { field: RELEVANCE }
    }
    first: 20
  ) {
    nodes {
      id
      title
      slug
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      articleFields {
        shortSummary
      }
    }
  }
}
```

**Variables:**
```json
{
  "search": "PropTech funding"
}
```

## 7. Founder Interviews Query

Get founder interview posts:

```graphql
query FounderInterviews {
  founderInterviews(
    where: {
      orderby: { field: DATE, order: DESC }
    }
    first: 10
  ) {
    nodes {
      id
      title
      slug
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      founderInterviewFields {
        founderName
        companyName
        founderPhoto {
          sourceUrl
        }
        linkedinUrl
        twitterHandle
      }
    }
  }
}
```

## 8. Reports Query

Get report posts:

```graphql
query Reports {
  reports(
    where: {
      orderby: { field: DATE, order: DESC }
    }
    first: 10
  ) {
    nodes {
      id
      title
      slug
      excerpt
      date
      reportFields {
        reportType
        reportDate
        reportPdf {
          sourceUrl
        }
        keyFindings
      }
    }
  }
}
```

## 9. Jobs Query

Get job listings:

```graphql
query Jobs {
  jobs(
    where: {
      orderby: { field: DATE, order: DESC }
    }
    first: 20
  ) {
    nodes {
      id
      title
      slug
      excerpt
      date
      jobFields {
        companyName
        jobType
        location
        applicationUrl
        salaryRange
        remote
      }
    }
  }
}
```

## 10. All Categories Query

Get all categories with article counts:

```graphql
query AllCategories {
  articleCategories {
    nodes {
      id
      name
      slug
      description
      count
    }
  }
}
```

## Using These Queries in Next.js

### Example: Homepage

```typescript
// lib/services/graphql.ts
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL

export async function fetchGraphQL(query: string, variables?: any) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error('GraphQL request failed')
  }

  const json = await response.json()
  
  if (json.errors) {
    throw new Error(json.errors[0].message)
  }

  return json.data
}

// Usage in page
const HOMEPAGE_QUERY = `
  query HomepageArticles {
    featuredArticles: articles(where: {...}) { ... }
    latestArticles: articles(where: {...}) { ... }
  }
`

export default async function HomePage() {
  const data = await fetchGraphQL(HOMEPAGE_QUERY)
  // Use data.featuredArticles and data.latestArticles
}
```
