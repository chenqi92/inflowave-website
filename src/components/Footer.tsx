import { Link } from 'react-router-dom'
import { Github, ExternalLink, Heart } from 'lucide-react'
import { useLanguage } from '../providers/LanguageProvider'

const Footer = () => {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { label: t('footer.links.home'), href: '/' },
      { label: t('footer.links.features'), href: '/features' },
      { label: t('footer.links.download'), href: '/download' },
      { label: t('nav.changelog'), href: '/changelog' }
    ],
    resources: [
      { 
        label: t('footer.links.github'), 
        href: 'https://github.com/chenqi92/inflowave',
        external: true
      },
      { 
        label: t('footer.links.issues'), 
        href: 'https://github.com/chenqi92/inflowave/issues',
        external: true
      }
    ]
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IW</span>
              </div>
              <span className="text-xl font-bold">InfloWave</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/chenqi92/inflowave"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.links.product')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.links.resources')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-1"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-gray-400">
              <span>{t('footer.copyright', { year: currentYear })}</span>
              <span>•</span>
              <span>{t('footer.license')}</span>
              <span>•</span>
              <Link
                to="/privacy"
                className="hover:text-white transition-colors duration-200"
              >
                {t('footer.privacy')}
              </Link>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for the InfluxDB community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer