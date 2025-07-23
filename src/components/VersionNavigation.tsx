import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronDown, 
  ChevronRight, 
  Tag, 
  Clock,
  Star,
  AlertTriangle
} from 'lucide-react'
import { useLanguage } from '../providers/LanguageProvider'
import type { GitHubRelease } from '../services/githubApi'

interface VersionNavigationProps {
  releases: GitHubRelease[]
  currentVersionId?: string
  onVersionSelect: (versionId: string) => void
  className?: string
}

const VersionNavigation = ({ 
  releases, 
  currentVersionId, 
  onVersionSelect, 
  className = '' 
}: VersionNavigationProps) => {
  const { t } = useLanguage()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['latest']))
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Group releases by year
  const groupedReleases = releases.reduce((groups, release) => {
    const year = new Date(release.published_at).getFullYear().toString()
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(release)
    return groups
  }, {} as Record<string, GitHubRelease[]>)

  // Get latest releases (first 5)
  const latestReleases = releases.slice(0, 5)

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    })
  }

  const scrollToVersion = (versionId: string) => {
    const element = document.getElementById(`version-${versionId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      onVersionSelect(versionId)
    }
  }

  const renderVersionItem = (release: GitHubRelease, index: number) => {
    const isActive = currentVersionId === release.id.toString()
    const isLatest = index === 0

    return (
      <motion.button
        key={release.id}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={() => scrollToVersion(release.id.toString())}
        className={`w-full text-left p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
          isActive 
            ? 'bg-primary-100 dark:bg-primary-900/30 border-l-4 border-primary-500' 
            : 'hover:border-l-4 hover:border-gray-300 dark:hover:border-gray-600'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            {isLatest ? (
              <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
            ) : release.prerelease ? (
              <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
            ) : (
              <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <div className="font-medium text-gray-900 dark:text-white truncate">
                {release.tag_name.replace(/^v/, '')}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatDate(release.published_at)}</span>
              </div>
            </div>
          </div>
          {isLatest && (
            <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full">
              {t('changelog.latestVersion')}
            </span>
          )}
          {release.prerelease && !isLatest && (
            <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">
              {t('changelog.prerelease')}
            </span>
          )}
        </div>
      </motion.button>
    )
  }

  if (isCollapsed) {
    return (
      <motion.div 
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}
        initial={{ width: 280 }}
        animate={{ width: 60 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-full flex items-center justify-center p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}
      initial={{ width: 60 }}
      animate={{ width: 280 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {t('changelog.versionNavigation.title')}
          </h3>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Latest Releases */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('latest')}
            className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            {expandedSections.has('latest') ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <span>{t('changelog.latestVersion')}</span>
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {Math.min(latestReleases.length, 5)}
            </span>
          </button>
          
          {expandedSections.has('latest') && (
            <div className="space-y-1 ml-2">
              {latestReleases.map((release, index) => renderVersionItem(release, index))}
            </div>
          )}
        </div>

        {/* Releases by Year */}
        <div className="space-y-4">
          {Object.entries(groupedReleases)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .map(([year, yearReleases]) => (
              <div key={year}>
                <button
                  onClick={() => toggleSection(year)}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  {expandedSections.has(year) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <span>{year}</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {yearReleases.length}
                  </span>
                </button>
                
                {expandedSections.has(year) && (
                  <div className="space-y-1 ml-2">
                    {yearReleases.map((release, index) => renderVersionItem(release, index))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  )
}

export default VersionNavigation