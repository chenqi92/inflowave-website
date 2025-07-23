# InfloWave Website Deployment Guide

This guide covers how to deploy the InfloWave website to various hosting platforms.

## 🚀 Quick Deployment

Use the included deployment script:

```bash
./deploy.sh [platform]
```

Available platforms:
- `netlify` - Deploy to Netlify
- `vercel` - Deploy to Vercel  
- `gh-pages` - Deploy to GitHub Pages

## 📋 Pre-deployment Checklist

Before deploying, ensure:

1. ✅ All screenshots are added to appropriate placeholder areas
2. ✅ Favicon and OG images are added to `public/`
3. ✅ All links and URLs are correct
4. ✅ Content is reviewed and up-to-date
5. ✅ Both English and Chinese translations are complete
6. ✅ Build process completes without errors
7. ✅ All responsive layouts work correctly

## 🌐 Platform-Specific Instructions

### Netlify

**Automatic Deployment:**
1. Connect your Git repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Set environment variables if needed
5. Deploy automatically on git push

**Manual Deployment:**
```bash
npm run build
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

**Configuration:**
- The `public/_redirects` file handles SPA routing
- Environment variables can be set in Netlify dashboard

### Vercel

**Automatic Deployment:**
1. Import project to Vercel
2. Vercel automatically detects Vite configuration
3. Deploy automatically on git push

**Manual Deployment:**
```bash
npm run build
npm install -g vercel
vercel login
vercel --prod
```

**Configuration:**
- Create `vercel.json` if custom configuration needed
- Environment variables set in Vercel dashboard

### GitHub Pages

**Setup:**
1. Enable GitHub Pages in repository settings
2. Choose GitHub Actions as source
3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

**Manual Deployment:**
```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

### Custom Server (Nginx/Apache)

**Build and Upload:**
```bash
npm run build
# Upload dist/ contents to your web server
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Apache Configuration (.htaccess):**
```apache
RewriteEngine On
RewriteBase /

# Handle SPA routing
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
</FilesMatch>
```

## 🔧 Environment Variables

Set these environment variables for production:

```env
# Application
VITE_APP_TITLE=InfloWave
VITE_APP_URL=https://inflowave.app

# External Links
VITE_GITHUB_URL=https://github.com/chenqi92/inflowave
VITE_RELEASES_URL=https://github.com/chenqi92/inflowave/releases

# Analytics (optional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_GTAG_ID=GT-XXXXXXXXX
```

## 📊 Performance Optimization

**Pre-deployment optimizations:**

1. **Image Optimization:**
   - Compress all images
   - Use WebP format when possible
   - Implement lazy loading for screenshots

2. **Code Splitting:**
   - Already configured in Vite
   - Verify chunks are properly split

3. **Caching Strategy:**
   - Set appropriate cache headers
   - Use CDN for static assets

4. **SEO Optimization:**
   - Verify meta tags
   - Test Open Graph images
   - Validate structured data

## 🧪 Testing Before Deployment

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build

# Preview build locally
npm run preview

# Test responsive design
# Test both language versions
# Test all navigation paths
# Verify all external links work
```

## 🔍 Post-deployment Verification

After deployment, verify:

1. ✅ All pages load correctly
2. ✅ Language switching works
3. ✅ Theme switching works
4. ✅ All download links are functional
5. ✅ External links open correctly
6. ✅ Mobile responsiveness works
7. ✅ Page loading speed is acceptable
8. ✅ SEO meta tags are present

## 🚨 Troubleshooting

**Common Issues:**

1. **SPA Routing Issues:**
   - Ensure server is configured for SPA routing
   - Check redirect rules are in place

2. **Asset Loading Issues:**
   - Verify base URL configuration
   - Check file paths in build output

3. **Environment Variables:**
   - Confirm all required variables are set
   - Use `VITE_` prefix for client-side variables

4. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review TypeScript errors

## 📞 Support

If you encounter deployment issues:

1. Check the deployment logs
2. Verify all prerequisites are met
3. Review platform-specific documentation
4. Open an issue in the repository

## 🔄 Continuous Deployment

For automatic deployments:

1. Set up webhooks for git pushes
2. Configure build triggers
3. Set up staging environments
4. Implement deployment notifications
5. Monitor deployment health

This ensures your website stays up-to-date with the latest changes automatically.