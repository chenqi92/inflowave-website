#!/bin/bash

# InfloWave Website Deployment Script

set -e

echo "🚀 Starting InfloWave Website Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run type checking
echo "🔍 Running type check..."
npm run type-check

# Run linting
echo "🧹 Running linter..."
npm run lint

# Build the project
echo "🏗️ Building project for production..."
npm run build:prod

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Verify console.log removal
echo "🔍 Verifying console.log removal..."
if grep -r "console\.log" dist/assets/ > /dev/null 2>&1; then
    echo "❌ WARNING: console.log found in production build!"
    grep -r "console\.log" dist/assets/ | head -5
else  
    echo "✅ SUCCESS: console.log successfully removed from production build"
fi

# Optional: Deploy to specific platforms
case "${1}" in
    "netlify")
        echo "🌐 Deploying to Netlify..."
        npx netlify deploy --prod --dir=dist
        ;;
    "vercel")
        echo "▲ Deploying to Vercel..."
        npx vercel --prod
        ;;
    "gh-pages")
        echo "📄 Deploying to GitHub Pages..."
        npm run deploy
        ;;
    *)
        echo "📁 Build artifacts are ready in dist/ directory"
        echo "💡 To deploy, run:"
        echo "   ./deploy.sh netlify   - Deploy to Netlify"
        echo "   ./deploy.sh vercel    - Deploy to Vercel"
        echo "   ./deploy.sh gh-pages  - Deploy to GitHub Pages"
        ;;
esac

echo "🎉 Deployment process completed!"