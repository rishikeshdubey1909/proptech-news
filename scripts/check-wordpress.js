/**
 * WordPress Connection Checker (JavaScript version)
 * Run with: node scripts/check-wordpress.js
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

  // Check 2: Test REST API Connection
  if (restApiUrl) {
    console.log('2️⃣ Testing REST API Connection:')
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
    } catch (error) {
      console.log('   ❌ REST API: Connection error')
      console.log('   📊 Error:', error.message)
    }
    console.log('')
  }

  // Check 3: Test GraphQL Connection
  if (graphqlUrl) {
    console.log('3️⃣ Testing GraphQL Connection:')
    try {
      const query = `query { __typename }`
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
          console.log('   📊 Schema available')
        } else if (data.errors) {
          console.log('   ⚠️  GraphQL: Connected but has errors')
          console.log('   📊 Errors:', data.errors.map(e => e.message).join(', '))
        }
      } else {
        console.log('   ❌ GraphQL: Connection failed')
        console.log('   📊 Status:', response.status, response.statusText)
      }
    } catch (error) {
      console.log('   ❌ GraphQL: Connection error')
      console.log('   📊 Error:', error.message)
    }
    console.log('')
  }

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
