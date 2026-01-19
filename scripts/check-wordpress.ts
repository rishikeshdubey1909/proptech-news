/**
 * WordPress Connection Checker
 * Run with: npx tsx scripts/check-wordpress.ts
 */

async function checkWordPressSetup() {
  console.log('🔍 Checking Headless WordPress Setup...\n')

  // Check 1: Environment Variables
  console.log('1️⃣ Environment Variables:')
  const restApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  const graphqlUrl = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL
  const postType = process.env.NEXT_PUBLIC_WORDPRESS_POST_TYPE || 'posts'

  if (restApiUrl) {
    console.log('   ✅ REST API URL:', restApiUrl)
  } else {
    console.log('   ❌ REST API URL: Not configured')
  }

  if (graphqlUrl) {
    console.log('   ✅ GraphQL URL:', graphqlUrl)
  } else {
    console.log('   ❌ GraphQL URL: Not configured')
  }

  console.log('   📝 Post Type:', postType)
  console.log('')

  // Check 2: Service Files
  console.log('2️⃣ Service Files:')
  try {
    const wordpressService = await import('../lib/services/wordpress')
    console.log('   ✅ WordPress REST API service: Found')
  } catch (e) {
    console.log('   ❌ WordPress REST API service: Missing')
  }

  try {
    const graphqlService = await import('../lib/services/graphql')
    console.log('   ✅ GraphQL service: Found')
  } catch (e) {
    console.log('   ❌ GraphQL service: Missing')
  }
  console.log('')

  // Check 3: Test REST API Connection
  if (restApiUrl) {
    console.log('3️⃣ Testing REST API Connection:')
    try {
      const response = await fetch(`${restApiUrl}/wp-json/wp/v2/${postType}?per_page=1`)
      if (response.ok) {
        const data = await response.json()
        console.log('   ✅ REST API: Connected successfully')
        console.log('   📊 Response:', Array.isArray(data) ? `${data.length} items` : 'Valid response')
      } else {
        console.log('   ❌ REST API: Connection failed')
        console.log('   📊 Status:', response.status, response.statusText)
      }
    } catch (error: any) {
      console.log('   ❌ REST API: Connection error')
      console.log('   📊 Error:', error.message)
    }
    console.log('')
  }

  // Check 4: Test GraphQL Connection
  if (graphqlUrl) {
    console.log('4️⃣ Testing GraphQL Connection:')
    try {
      const query = `
        query {
          __typename
        }
      `
      const response = await fetch(graphqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.data) {
          console.log('   ✅ GraphQL: Connected successfully')
          console.log('   📊 Schema type:', data.data.__typename || 'Available')
        } else if (data.errors) {
          console.log('   ⚠️  GraphQL: Connected but has errors')
          console.log('   📊 Errors:', data.errors.map((e: any) => e.message).join(', '))
        }
      } else {
        console.log('   ❌ GraphQL: Connection failed')
        console.log('   📊 Status:', response.status, response.statusText)
      }
    } catch (error: any) {
      console.log('   ❌ GraphQL: Connection error')
      console.log('   📊 Error:', error.message)
    }
    console.log('')
  }

  // Check 5: Data Layer Configuration
  console.log('5️⃣ Data Layer Configuration:')
  try {
    const articlesModule = await import('../lib/data/articles')
    console.log('   ✅ Articles data module: Found')
    
    // Check if WordPress is configured
    const isConfigured = !!restApiUrl || !!graphqlUrl
    if (isConfigured) {
      console.log('   ✅ WordPress mode: Enabled (will use WordPress API)')
    } else {
      console.log('   ⚠️  WordPress mode: Disabled (using sample data)')
    }
  } catch (e) {
    console.log('   ❌ Articles data module: Missing')
  }
  console.log('')

  // Summary
  console.log('📋 Summary:')
  const hasRestApi = !!restApiUrl
  const hasGraphql = !!graphqlUrl
  const isConfigured = hasRestApi || hasGraphql

  if (isConfigured) {
    console.log('   ✅ WordPress is configured')
    if (hasRestApi) console.log('   ✅ REST API configured')
    if (hasGraphql) console.log('   ✅ GraphQL configured')
    console.log('   💡 Your Next.js app will fetch data from WordPress')
  } else {
    console.log('   ⚠️  WordPress is NOT configured')
    console.log('   💡 Your Next.js app is using sample data')
    console.log('   📝 To configure: Create .env.local with:')
    console.log('      NEXT_PUBLIC_WORDPRESS_API_URL=https://yourwordpresssite.com')
    console.log('      OR')
    console.log('      NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://yourwordpresssite.com/graphql')
  }
}

// Run check
checkWordPressSetup().catch(console.error)
