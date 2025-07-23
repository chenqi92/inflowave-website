# InfloWave Website

Official website for InfloWave - Modern time-series database management tool.

## 🌐 Overview

This is the official portal website for InfloWave, built with React, TypeScript, and Tailwind CSS. The website provides information about the software, features, downloads, and documentation.

## ✨ Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Internationalization** - English and Chinese language support
- **Dark/Light Theme** - Automatic theme switching with manual override
- **Modern UI** - Built with Tailwind CSS and Framer Motion animations
- **Fast Performance** - Optimized build with code splitting
- **SEO Friendly** - Proper meta tags and structured content

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd inflowave-website
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation bar
│   ├── Footer.tsx      # Site footer
│   └── ScrollToTop.tsx # Scroll to top button
├── pages/              # Page components
│   ├── Home.tsx        # Homepage
│   ├── Features.tsx    # Features page
│   ├── Download.tsx    # Download page
│   └── NotFound.tsx    # 404 page
├── providers/          # Context providers
│   ├── ThemeProvider.tsx    # Theme management
│   └── LanguageProvider.tsx # i18n management
├── i18n/              # Internationalization
│   ├── index.ts       # i18n configuration
│   └── locales/       # Translation files
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## 🖼️ Adding Screenshots

To add software screenshots:

1. Create a `public/screenshots/` directory
2. Add your screenshot images (recommended: 1920x1080 or similar 16:9 aspect ratio)
3. Update the screenshot placeholders in the components

Recommended screenshot categories:
- Dashboard overview
- Query editor
- Data visualization
- Connection manager
- Data import/export
- Settings and configuration

## 🌍 Internationalization

The website supports multiple languages. To add a new language:

1. Create a new locale file in `src/i18n/locales/`
2. Add the language to the i18n configuration
3. Update the language selector in the navbar

Current supported languages:
- English (en)
- Chinese (zh)

## 🎨 Customization

### Colors

The website uses a custom color palette defined in `tailwind.config.js`. The primary color is blue, but you can customize it by modifying the color values.

### Fonts

The website uses Inter for body text and JetBrains Mono for code. These are loaded from Google Fonts in `index.html`.

### Animations

Animations are handled by Framer Motion. You can customize or add new animations in the component files.

## 📦 Deployment

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### Vercel

1. Import your repository to Vercel
2. It will automatically detect the Vite configuration
3. Deploy

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

### Custom Server

1. Build the project: `npm run build`
2. Serve the `dist/` directory with any static file server
3. Configure your web server for SPA routing

## 🔧 Configuration

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_APP_TITLE=InfloWave
VITE_GITHUB_URL=https://github.com/chenqi92/inflowave
VITE_RELEASE_API=https://api.github.com/repos/chenqi92/inflowave/releases/latest
```

### Base URL

If deploying to a subdirectory, update the `base` option in `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-subdirectory/',
  // ... other config
})
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the main InfloWave project for details.

## 🔗 Related Links

- [InfloWave Main Repository](https://github.com/chenqi92/inflowave)
- [InfloWave Releases](https://github.com/chenqi92/inflowave/releases)
- [Report Issues](https://github.com/chenqi92/inflowave/issues)