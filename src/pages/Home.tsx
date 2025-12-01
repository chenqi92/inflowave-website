import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Download,
  Github,
  Star,
  Database,
  BarChart3,
  Zap,
  Shield,
  Layers,
  Monitor,
  Import,
  Palette,
  ArrowRight,
  Play,
  HardDrive
} from 'lucide-react'
import { useLanguage } from '../providers/LanguageProvider'
import { useLatestVersion } from '../hooks/useRelease'
import { getFeaturedScreenshots } from '../data/screenshots'

const Home = () => {
  const { t, language } = useLanguage()
  const { version, loading: versionLoading } = useLatestVersion()
  const featuredScreenshots = getFeaturedScreenshots()

  const features = [
    {
      icon: Database,
      title: t('features.multiConnection.title'),
      description: t('features.multiConnection.description')
    },
    {
      icon: HardDrive,
      title: t('features.objectStorage.title'),
      description: t('features.objectStorage.description')
    },
    {
      icon: BarChart3,
      title: t('features.visualQuery.title'),
      description: t('features.visualQuery.description')
    },
    {
      icon: Layers,
      title: t('features.charts.title'),
      description: t('features.charts.description')
    },
    {
      icon: Import,
      title: t('features.dataImportExport.title'),
      description: t('features.dataImportExport.description')
    },
    {
      icon: Palette,
      title: t('features.modernUI.title'),
      description: t('features.modernUI.description')
    },
    {
      icon: Monitor,
      title: t('features.crossPlatform.title'),
      description: t('features.crossPlatform.description')
    },
    {
      icon: Shield,
      title: t('features.security.title'),
      description: t('features.security.description')
    },
    {
      icon: Zap,
      title: t('features.performance.title'),
      description: t('features.performance.description')
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-2xl">
              <span className="text-white font-bold text-2xl">IW</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            <span className="block">InfloWave</span>
            <span className="block text-gradient">
              {t('hero.title')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-4xl mx-auto"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              to="/download"
              className="btn-primary flex items-center space-x-2 text-lg px-8 py-4 hover-lift"
            >
              <Download className="w-5 h-5" />
              <span>{t('hero.downloadButton')}</span>
            </Link>
            
            <a
              href="https://github.com/chenqi92/inflowave"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center space-x-2 text-lg px-8 py-4 hover-lift"
            >
              <Github className="w-5 h-5" />
              <span>{t('hero.viewOnGithub')}</span>
            </a>
          </motion.div>

          {/* Version & Platform Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{t('hero.version', { version: versionLoading ? 'Loading...' : (version || '0.1.5') })}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>{t('hero.platforms')}</span>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-750 hover:shadow-lg transition-all duration-300 hover-lift"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Screenshot Showcase */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('screenshots.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('screenshots.subtitle')}
            </p>
          </motion.div>

          {/* Placeholder for Screenshots */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredScreenshots.map((screenshot, index) => (
              <motion.div
                key={screenshot.id}
                variants={itemVariants}
                className="group relative bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover-lift"
              >
                <div className="aspect-video overflow-hidden cursor-pointer relative"
                     onClick={() => {
                       // Create and show modal for image zoom
                       const modal = document.createElement('div')
                       modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'
                       modal.style.zIndex = '9999'
                       modal.innerHTML = `
                         <div class="relative max-w-7xl max-h-full">
                           <img src="/screenshots/${screenshot.filename}" 
                                alt="${screenshot.title.en}" 
                                class="max-w-full max-h-full object-contain rounded-lg shadow-2xl">
                           <button class="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-bold">&times;</button>
                         </div>
                       `
                       document.body.appendChild(modal)
                       
                       // Close modal on click
                       modal.addEventListener('click', (e) => {
                         if (e.target === modal || (e.target as HTMLElement).tagName === 'BUTTON') {
                           document.body.removeChild(modal)
                         }
                       })
                       
                       // Close modal on escape key
                       const handleEscape = (e: KeyboardEvent) => {
                         if (e.key === 'Escape') {
                           document.body.removeChild(modal)
                           document.removeEventListener('keydown', handleEscape)
                         }
                       }
                       document.addEventListener('keydown', handleEscape)
                     }}>
                  <img
                    src={`/screenshots/${screenshot.filename}`}
                    alt={screenshot.title.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium bg-black bg-opacity-50 px-3 py-1 rounded">
                      点击放大
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    {language === 'zh' ? screenshot.title.zh : screenshot.title.en}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {language === 'zh' ? screenshot.description.zh : screenshot.description.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/download"
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg transition-colors duration-200 flex items-center space-x-2 hover-lift"
              >
                <Download className="w-5 h-5" />
                <span>{t('cta.downloadButton')}</span>
              </Link>
              <Link
                to="/features"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center space-x-2 hover-lift"
              >
                <span>{t('cta.learnMore')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home