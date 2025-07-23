import { motion } from 'framer-motion'
import { 
  Database,
  BarChart3,
  Layers,
  Import,
  Palette,
  Monitor,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { useLanguage } from '../providers/LanguageProvider'

const Features = () => {
  const { t } = useLanguage()

  const mainFeatures = [
    {
      icon: Database,
      title: t('features.multiConnection.title'),
      description: t('features.multiConnection.description'),
      details: [
        'Simultaneous connections to multiple InfluxDB instances',
        'Intelligent connection pooling and health monitoring',
        'Automatic reconnection and failover handling',
        'Connection status indicators and alerts'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: BarChart3,
      title: t('features.visualQuery.title'),
      description: t('features.visualQuery.description'),
      details: [
        'Syntax highlighting for InfluxQL queries',
        'Smart auto-completion and suggestions',
        'Query history and bookmarks',
        'Real-time result visualization'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Layers,
      title: t('features.charts.title'),
      description: t('features.charts.description'),
      details: [
        'Line charts, bar charts, and scatter plots',
        'Interactive data exploration',
        'Custom chart configurations',
        'Export charts as images or PDFs'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Import,
      title: t('features.dataImportExport.title'),
      description: t('features.dataImportExport.description'),
      details: [
        'Support for CSV, JSON, Excel formats',
        'Batch data processing capabilities',
        'Data validation and error handling',
        'Scheduled import/export operations'
      ],
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Palette,
      title: t('features.modernUI.title'),
      description: t('features.modernUI.description'),
      details: [
        'Clean and intuitive interface design',
        'Dark and light theme support',
        'Responsive layout for all screen sizes',
        'Customizable workspace layouts'
      ],
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Monitor,
      title: t('features.crossPlatform.title'),
      description: t('features.crossPlatform.description'),
      details: [
        'Native apps for Windows, macOS, and Linux',
        'Consistent user experience across platforms',
        'Platform-specific optimizations',
        'Automatic updates and notifications'
      ],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Shield,
      title: t('features.security.title'),
      description: t('features.security.description'),
      details: [
        'Encrypted connection protocols (TLS/SSL)',
        'Local credential storage with encryption',
        'Audit logs and security monitoring',
        'Role-based access control support'
      ],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Zap,
      title: t('features.performance.title'),
      description: t('features.performance.description'),
      details: [
        'Built with Rust for optimal performance',
        'Efficient memory management',
        'Fast query execution and rendering',
        'Minimal resource consumption'
      ],
      color: 'from-yellow-500 to-yellow-600'
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('features.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('features.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-20"
          >
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
                >
                  {/* Feature Info */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>

                    <ul className="space-y-3">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Feature Visual */}
                  <div className="flex-1">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-xl flex items-center justify-center">
                        <div className="text-center">
                          <Icon className={`w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4`} />
                          <p className="text-gray-500 dark:text-gray-400 font-medium">
                            {feature.title} Screenshot
                          </p>
                          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                            Upload feature screenshot here
                          </p>
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className={`absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br ${feature.color} rounded-full opacity-20`}></div>
                      <div className={`absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br ${feature.color} rounded-full opacity-10`}></div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('features.technicalSpecs.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('features.technicalSpecs.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: t('features.technicalSpecs.architecture.title'),
                items: (t('features.technicalSpecs.architecture.items', { returnObjects: true }) as unknown) as string[]
              },
              {
                title: t('features.technicalSpecs.compatibility.title'),
                items: (t('features.technicalSpecs.compatibility.items', { returnObjects: true }) as unknown) as string[]
              },
              {
                title: t('features.technicalSpecs.security.title'),
                items: (t('features.technicalSpecs.security.items', { returnObjects: true }) as unknown) as string[]
              },
              {
                title: t('features.technicalSpecs.performance.title'),
                items: (t('features.technicalSpecs.performance.items', { returnObjects: true }) as unknown) as string[]
              }
            ].map((spec, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 hover-lift"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {spec.title}
                </h3>
                <ul className="space-y-2">
                  {spec.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
              Experience the Power of InfloWave
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Try all these features and more in the full version of InfloWave.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/download"
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg transition-colors duration-200 flex items-center space-x-2 hover-lift"
              >
                <span>Download Now</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/chenqi92/inflowave"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center space-x-2 hover-lift"
              >
                <span>View on GitHub</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Features