import React from 'react'
import { motion } from 'framer-motion'
import { 
  Download,
  Windows,
  Apple,
  Monitor,
  FileDown,
  Package,
  Shield,
  Clock,
  CheckCircle,
  ExternalLink,
  Github
} from 'lucide-react'
import { useLanguage } from '../providers/LanguageProvider'

const DownloadPage = () => {
  const { t } = useLanguage()

  const currentVersion = '0.1.5'
  const releaseDate = '2024-12-20'

  const platforms = [
    {
      name: 'Windows',
      icon: Windows,
      description: t('download.platforms.windows.description'),
      requirements: t('download.platforms.windows.requirements'),
      downloads: [
        {
          type: 'installer',
          name: t('download.platforms.windows.installer'),
          size: '25.4 MB',
          url: `https://github.com/chenqi92/inflowave/releases/download/v${currentVersion}/InfloWave_${currentVersion}_x64.msi`,
          recommended: true
        },
        {
          type: 'portable',
          name: t('download.platforms.windows.portable'),
          size: '28.1 MB',
          url: `https://github.com/chenqi92/inflowave/releases/download/v${currentVersion}/InfloWave_${currentVersion}_x64_portable.exe`
        }
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'macOS',
      icon: Apple,
      description: t('download.platforms.macos.description'),
      requirements: t('download.platforms.macos.requirements'),
      downloads: [
        {
          type: 'intel',
          name: t('download.platforms.macos.intel'),
          size: '22.8 MB',
          url: `https://github.com/chenqi92/inflowave/releases/download/v${currentVersion}/InfloWave_${currentVersion}_x64.dmg`,
          recommended: true
        },
        {
          type: 'apple',
          name: t('download.platforms.macos.apple'),
          size: '21.3 MB',
          url: `https://github.com/chenqi92/inflowave/releases/download/v${currentVersion}/InfloWave_${currentVersion}_aarch64.dmg`
        }
      ],
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Linux',
      icon: Monitor,
      description: t('download.platforms.linux.description'),
      requirements: t('download.platforms.linux.requirements'),
      downloads: [
        {
          type: 'appimage',
          name: t('download.platforms.linux.appimage'),
          size: '26.7 MB',
          url: `https://github.com/chenqi92/inflowave/releases/download/v${currentVersion}/InfloWave_${currentVersion}_amd64.AppImage`,
          recommended: true
        },
        {
          type: 'deb',
          name: t('download.platforms.linux.deb'),
          size: '24.2 MB',
          url: `https://github.com/chenqi92/inflowave/releases/download/v${currentVersion}/InfloWave_${currentVersion}_amd64.deb`
        },
        {
          type: 'rpm',
          name: t('download.platforms.linux.rpm'),
          size: '24.8 MB',
          url: `https://github.com/chenqi92/inflowave/releases/download/v${currentVersion}/InfloWave_${currentVersion}_x86_64.rpm`
        }
      ],
      color: 'from-orange-500 to-orange-600'
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
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Download className="w-16 h-16 text-primary-600 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('download.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t('download.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>{t('download.currentVersion', { version: currentVersion })}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{t('download.releaseDate', { date: releaseDate })}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Downloads */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {platforms.map((platform, index) => {
              const Icon = platform.icon
              return (
                <motion.div
                  key={platform.name}
                  variants={itemVariants}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover-lift"
                >
                  {/* Platform Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {platform.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {platform.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {platform.requirements}
                    </p>
                  </div>

                  {/* Download Options */}
                  <div className="space-y-4">
                    {platform.downloads.map((download, downloadIndex) => (
                      <div
                        key={downloadIndex}
                        className={`relative p-4 border-2 rounded-lg transition-all duration-200 ${
                          download.recommended
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        {download.recommended && (
                          <div className="absolute -top-2 -right-2">
                            <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                              Recommended
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {download.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {download.size}
                            </p>
                          </div>
                          <FileDown className="w-5 h-5 text-gray-400" />
                        </div>
                        
                        <a
                          href={download.url}
                          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                            download.recommended
                              ? 'bg-primary-600 hover:bg-primary-700 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                          }`}
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Installation Guide */}
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
              Installation Instructions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Quick setup guide for each platform
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                platform: 'Windows',
                icon: Windows,
                steps: [
                  'Download the .msi installer',
                  'Run the installer as administrator',
                  'Follow the installation wizard',
                  'Launch InfloWave from Start Menu'
                ]
              },
              {
                platform: 'macOS',
                icon: Apple,
                steps: [
                  'Download the .dmg file',
                  'Open the .dmg file',
                  'Drag InfloWave to Applications',
                  'Launch from Launchpad or Applications'
                ]
              },
              {
                platform: 'Linux',
                icon: Monitor,
                steps: [
                  'Download AppImage or package',
                  'Make file executable (chmod +x)',
                  'Run directly or install package',
                  'Launch from applications menu'
                ]
              }
            ].map((guide, index) => {
              const Icon = guide.icon
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <Icon className="w-6 h-6 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {guide.platform}
                    </h3>
                  </div>
                  
                  <ol className="space-y-3">
                    {guide.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-sm font-medium">
                          {stepIndex + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              System Requirements
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Minimum specifications for optimal performance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Minimum Requirements
                </h3>
                <ul className="space-y-2">
                  {[
                    'RAM: 4GB (8GB recommended)',
                    'Storage: 100MB free space',
                    'CPU: 64-bit processor',
                    'Network: Internet connection for updates'
                  ].map((req, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Supported Databases
                </h3>
                <ul className="space-y-2">
                  {[
                    'InfluxDB 1.8.x and later',
                    'InfluxDB 2.0.x and later',
                    'InfluxDB Cloud',
                    'OSS and Enterprise editions'
                  ].map((db, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{db}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Need Help?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <a
                href="https://github.com/chenqi92/inflowave"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <Github className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 mx-auto mb-3 transition-colors duration-200" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('nav.github')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Source code and issues
                </p>
              </a>
              
              <a
                href={`https://github.com/chenqi92/inflowave/releases/tag/v${currentVersion}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <FileDown className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 mx-auto mb-3 transition-colors duration-200" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('download.releaseNotes')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  What's new in v{currentVersion}
                </p>
              </a>
              
              <a
                href="https://github.com/chenqi92/inflowave/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <ExternalLink className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 mx-auto mb-3 transition-colors duration-200" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Get Support
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Report bugs or get help
                </p>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default DownloadPage