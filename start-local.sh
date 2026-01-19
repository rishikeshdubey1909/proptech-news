#!/bin/bash
# Start Everything Locally with Docker
# This runs Next.js + WordPress on your local machine

echo "🚀 Starting PropTech News (Next.js + WordPress)..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose."
    exit 1
fi

# Start services
echo "📦 Starting Docker containers..."
docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 10

# Check WordPress
echo "🔍 Checking WordPress..."
WP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/wp-admin/install.php)
if [ "$WP_STATUS" = "200" ]; then
    echo "✅ WordPress is running at: http://localhost:8080"
else
    echo "⚠️  WordPress might still be starting..."
fi

# Check Next.js
echo "🔍 Checking Next.js..."
sleep 5
NEXT_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [ "$NEXT_STATUS" = "200" ]; then
    echo "✅ Next.js is running at: http://localhost:3000"
else
    echo "⚠️  Next.js might still be building..."
fi

echo ""
echo "📝 Next Steps:"
echo "1. Visit http://localhost:8080/wp-admin to complete WordPress setup"
echo "2. Install WPGraphQL plugin in WordPress"
echo "3. Visit http://localhost:3000 to see your Next.js site"
echo ""
echo "📊 View logs: docker-compose logs -f"
echo "🛑 Stop: docker-compose down"
