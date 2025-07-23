import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  History,
  Search,
  Calendar,
  Download,
  ExternalLink,
  Github,
  Tag,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { useLanguage } from '../providers/LanguageProvider'
import { useChangelog, useFilteredReleases } from '../hooks/useChangelog'
import MarkdownRenderer from '../components/MarkdownRenderer'

const Changelog = () => {
  const { t } = useLanguage()
  const { releases, loading, error, refetch } = useChangelog()
  const [searchTerm, setSearchTerm] = useState('')
  const [showPreReleases, setShowPreReleases] = useState(false)
  
  const filteredReleases = useFilteredReleases(releases, searchTerm, showPreReleases)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTotalDownloads = (release: any) => {
    return release.assets.reduce((sum: number, asset: any) => sum + asset.download_count, 0)
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
          <p className="text-gray-600 dark:text-gray-300">{t('changelog.loading')}</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error && releases.length === 0) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('changelog.error')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <History className="w-4 h-4" />
            <span>{t('common.retry')}</span>
          </button>
        </div>
      </div>
    )
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
            <History className="w-16 h-16 text-primary-600 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('changelog.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t('changelog.subtitle')}
            </p>

            {/* Stats */}
            {releases.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4" />
                  <span>{filteredReleases.length} {t('changelog.allVersions')}</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{t('changelog.released', { date: formatDate(releases[0]?.published_at || '') })}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('changelog.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={showPreReleases}
                  onChange={(e) => setShowPreReleases(e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                />
                <span>{t('changelog.showPreReleases')}</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Releases */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredReleases.length === 0 ? (
            <div className="text-center py-12">
              <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('changelog.noChangelog')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {searchTerm ? 'No releases match your search criteria.' : 'No releases available.'}
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <AnimatePresence>
                {filteredReleases.map((release, index) => (
                  <motion.article
                    key={release.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Release Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {t('changelog.version', { version: release.tag_name.replace(/^v/, '') })}
                            </h2>
                            {index === 0 && (
                              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm font-medium rounded-full">
                                {t('changelog.latestVersion')}
                              </span>
                            )}
                            {release.prerelease && (
                              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-medium rounded-full">
                                {t('changelog.prerelease')}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{t('changelog.released', { date: formatDate(release.published_at) })}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Download className="w-4 h-4" />
                              <span>{t('changelog.downloads', { count: getTotalDownloads(release).toLocaleString() })}</span>
                            </div>
                            <a
                              href={release.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                            >
                              <Github className="w-4 h-4" />
                              <span>{t('changelog.viewOnGithub')}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Release Content */}
                    <div className="p-6">
                      {release.body ? (
                        <MarkdownRenderer content={release.body} />
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300 italic">
                          No release notes available for this version.
                        </p>
                      )}
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Changelog