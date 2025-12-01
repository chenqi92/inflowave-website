import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { 
  Download,
  AppWindow,
  Apple,
  Monitor,
  FileDown,
  Package,
  Shield,
  Clock,
  CheckCircle,
  ExternalLink,
  Github,
  RefreshCw,
  AlertCircle,
  Loader2,
  Star,
  Smartphone
} from 'lucide-react'
import { useLanguage } from '../providers/LanguageProvider'
import { useRelease } from '../hooks/useRelease'
import { detectDevice, getBestDownloadRecommendation, getDeviceDescription, type DeviceInfo } from '../utils/deviceDetection'
import type { ParsedDownload } from '../services/githubApi'

const DownloadPage = () => {
  const { t } = useLanguage()
  const { release, loading, error, downloadStats, refetch } = useRelease()
  const [userDevice, setUserDevice] = useState<DeviceInfo | null>(null)
  const [recommendedDownload, setRecommendedDownload] = useState<ParsedDownload | null>(null)
  const [activeTab, setActiveTab] = useState<'windows' | 'macos' | 'linux'>('windows')

  // Detect user device on component mount
  useEffect(() => {
    const device = detectDevice()
    setUserDevice(device)
    // Set active tab based on detected OS
    if (device.os === 'windows' || device.os === 'macos' || device.os === 'linux') {
      setActiveTab(device.os)
    }
  }, [])

  // Update recommended download when release data changes
  useEffect(() => {
    if (release && userDevice) {
      const recommended = getBestDownloadRecommendation(userDevice, release.downloads)
      setRecommendedDownload(recommended)
    }
  }, [release, userDevice])

  // Group downloads by platform
  const groupDownloadsByPlatform = (downloads: ParsedDownload[]) => {
    const grouped = {
      windows: downloads.filter(d => d.platform === 'windows'),
      macos: downloads.filter(d => d.platform === 'macos'),
      linux: downloads.filter(d => d.platform === 'linux')
    }
    return grouped
  }

  const platformConfig = {
    windows: {
      name: 'Windows',
      icon: AppWindow,
      description: t('download.platforms.windows.description'),
      requirements: t('download.platforms.windows.requirements'),
      color: 'from-blue-500 to-blue-600'
    },
    macos: {
      name: 'macOS',
      icon: Apple,
      description: t('download.platforms.macos.description'),
      requirements: t('download.platforms.macos.requirements'),
      color: 'from-gray-500 to-gray-600'
    },
    linux: {
      name: 'Linux',
      icon: Monitor,
      description: t('download.platforms.linux.description'),
      requirements: t('download.platforms.linux.requirements'),
      color: 'from-orange-500 to-orange-600'
    }
  }

  const getDownloadTypeLabel = (download: ParsedDownload) => {
    const labels = {
      installer: t('download.platforms.windows.installer'),
      portable: t('download.platforms.windows.portable'),
      dmg: download.arch === 'aarch64' ? t('download.platforms.macos.apple') : t('download.platforms.macos.intel'),
      appimage: t('download.platforms.linux.appimage'),
      deb: t('download.platforms.linux.deb'),
      rpm: t('download.platforms.linux.rpm')
    }
    return labels[download.type] || download.name
  }

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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">{t('download.loadingReleaseInfo')}</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error && !release) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('download.failedToLoad')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t('common.retry')}</span>
          </button>
        </div>
      </div>
    )
  }

  const groupedDownloads = release ? groupDownloadsByPlatform(release.downloads) : { windows: [], macos: [], linux: [] }

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
                <span>{t('download.currentVersion', { version: release?.version || 'Loading...' })}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{t('download.releaseDate', { date: release?.releaseDate || 'Loading...' })}</span>
              </div>
              {downloadStats && (
                <>
                  <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="flex items-center space-x-2">
                    <FileDown className="w-4 h-4" />
                    <span>{t('download.totalDownloads', { count: downloadStats.totalDownloads.toLocaleString() })}</span>
                  </div>
                </>
              )}
            </div>

            {/* Refresh button for manual update */}
            {release && (
              <div className="mt-4">
                <button
                  onClick={refetch}
                  disabled={loading}
                  className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>{t('download.refreshReleaseInfo')}</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Smart Download Recommendation */}
      {userDevice && recommendedDownload && (
        <section className="py-12 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-primary-200 dark:border-primary-700"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t('download.deviceDetection.recommended')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t('download.deviceDetection.detected', { device: getDeviceDescription(userDevice) })}
                    </p>
                  </div>
                </div>
                <Star className="w-6 h-6 text-yellow-500" />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    {userDevice.os === 'windows' && <AppWindow className="w-6 h-6 text-white" />}
                    {userDevice.os === 'macos' && <Apple className="w-6 h-6 text-white" />}
                    {userDevice.os === 'linux' && <Monitor className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {getDownloadTypeLabel(recommendedDownload)}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {recommendedDownload.size}
                    </p>
                  </div>
                </div>
                <a
                  href={recommendedDownload.url}
                  className="btn-primary flex items-center space-x-2 hover-lift"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('download.deviceDetection.downloadRecommended')}</span>
                </a>
              </div>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                {t('download.deviceDetection.manualSelect')}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Platform Downloads */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {release?.downloads.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('download.noDownloads')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('download.noDownloadsDescription')}
              </p>
              <a
                href={release?.htmlUrl || `https://github.com/chenqi92/inflowave/releases`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center space-x-2 mx-auto"
              >
                <Github className="w-4 h-4" />
                <span>{t('download.viewOnGithub')}</span>
              </a>
            </div>
          ) : (
            <div>
              {/* Tab Navigation */}
              <div className="flex justify-center mb-12">
                <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-2 shadow-lg">
                  {Object.entries(platformConfig).map(([platformKey, platform]) => {
                    const Icon = platform.icon
                    const downloads = groupedDownloads[platformKey as keyof typeof groupedDownloads]
                    const isActive = activeTab === platformKey

                    // Skip platforms with no downloads
                    if (downloads.length === 0) return null

                    return (
                      <button
                        key={platformKey}
                        onClick={() => setActiveTab(platformKey as typeof activeTab)}
                        className={`relative flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                          isActive
                            ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-md'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        <Icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                        <span className="text-lg">{platform.name}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto"
              >
                {Object.entries(platformConfig).map(([platformKey, platform]) => {
                  if (platformKey !== activeTab) return null

                  const Icon = platform.icon
                  const downloads = groupedDownloads[platformKey as keyof typeof groupedDownloads]

                  return (
                    <div key={platformKey} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-10 shadow-2xl"
                  >
                      {/* Platform Header */}
                      <div className="text-center mb-8">
                        <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${platform.color} rounded-2xl shadow-lg mb-4`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          {platform.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">
                          {platform.description}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {platform.requirements}
                        </p>
                      </div>

                      {/* Download Options */}
                      <div className="space-y-4">
                        {downloads.map((download, downloadIndex) => (
                          <div
                            key={downloadIndex}
                            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                              download.recommended
                                ? 'border-primary-300 bg-white dark:bg-gray-800 shadow-xl'
                                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl'
                            }`}
                          >
                            {download.recommended && (
                              <div className="absolute -top-3 -right-3">
                                <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm px-4 py-1.5 rounded-full shadow-lg flex items-center space-x-1">
                                  <Star className="w-4 h-4" />
                                  <span>{t('common.recommended')}</span>
                                </span>
                              </div>
                            )}

                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-4">
                                <div className={`w-12 h-12 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center`}>
                                  <FileDown className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {getDownloadTypeLabel(download)}
                                  </h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {download.size}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex space-x-3">
                              <a
                                href={download.url}
                                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
                                  download.recommended
                                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                                }`}
                              >
                                <Github className="w-5 h-5" />
                                <span>{t('download.downloadSources.github')}</span>
                              </a>

                              {download.r2Url && (
                                <a
                                  href={download.r2Url}
                                  className="flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                  title={t('download.downloadSources.cdnDescription')}
                                >
                                  <Download className="w-5 h-5" />
                                  <span>{t('download.downloadSources.cdnMirror')}</span>
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </div>
          )}
        </div>
      </section>


      {/* Installation Guide */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('download.installation.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('download.installation.subtitle')}
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
                icon: AppWindow,
                steps: (t('download.installation.windows.steps', { returnObjects: true }) as unknown) as string[]
              },
              {
                platform: 'macOS',
                icon: Apple,
                steps: (t('download.installation.macos.steps', { returnObjects: true }) as unknown) as string[]
              },
              {
                platform: 'Linux',
                icon: Monitor,
                steps: (t('download.installation.linux.steps', { returnObjects: true }) as unknown) as string[]
              }
            ].map((guide, index) => {
              const Icon = guide.icon
              return (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-6"
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
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
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
              {t('download.requirements.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('download.requirements.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-700 rounded-2xl p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('download.requirements.minimum')}
                </h3>
                <ul className="space-y-2">
                  {((t('download.requirements.specs', { returnObjects: true }) as unknown) as string[]).map((req, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('download.requirements.supported')}
                </h3>
                <ul className="space-y-2">
                  {((t('download.requirements.databases', { returnObjects: true }) as unknown) as string[]).map((db, index) => (
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
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {t('download.support.title')}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <a
                href="https://github.com/chenqi92/inflowave"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <Github className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 mx-auto mb-3 transition-colors duration-200" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('nav.github')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('download.support.github')}
                </p>
              </a>
              
              <a
                href={release?.htmlUrl || `https://github.com/chenqi92/inflowave/releases`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <FileDown className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 mx-auto mb-3 transition-colors duration-200" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('download.releaseNotes')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('download.support.releases', { version: release?.version || '0.1.5' })}
                </p>
              </a>
              
              <a
                href="https://github.com/chenqi92/inflowave/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <ExternalLink className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 mx-auto mb-3 transition-colors duration-200" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('footer.links.support')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('download.support.issues')}
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