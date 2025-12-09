import { motion } from 'framer-motion'
import { Shield, Lock, Database, Eye, FileText, CheckCircle } from 'lucide-react'
import { useLanguage } from '../providers/LanguageProvider'

const Privacy = () => {
  const { t } = useLanguage()

  const sections = [
    {
      icon: Eye,
      title: t('privacy.dataCollection.title'),
      content: t('privacy.dataCollection.content'),
      items: t('privacy.dataCollection.items', {returnObjects: true}) as unknown as string[]
    },
    {
      icon: Database,
      title: t('privacy.localStorage.title'),
      content: t('privacy.localStorage.content'),
      items: t('privacy.localStorage.items', {returnObjects: true}) as unknown as string[]
    },
    {
      icon: Lock,
      title: t('privacy.dataSecurity.title'),
      content: t('privacy.dataSecurity.content'),
      items: t('privacy.dataSecurity.items', {returnObjects: true}) as unknown as string[]
    },
    {
      icon: Shield,
      title: t('privacy.thirdParty.title'),
      content: t('privacy.thirdParty.content'),
      items: t('privacy.thirdParty.items', {returnObjects: true}) as unknown as string[]
    },
    {
      icon: FileText,
      title: t('privacy.openSource.title'),
      content: t('privacy.openSource.content'),
      items: t('privacy.openSource.items', {returnObjects: true}) as unknown as string[]
    }
  ]

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('privacy.title')}
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              {t('privacy.subtitle')}
            </p>
            <p className="text-sm text-primary-200 mt-4">
              {t('privacy.lastUpdated', { date: '2024-12-09' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {section.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        {section.content}
                      </p>
                      {section.items && section.items.length > 0 && (
                        <ul className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('privacy.contact.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('privacy.contact.content')}
            </p>
            <a
              href="https://github.com/chenqi92/inflowave/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>{t('privacy.contact.button')}</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Privacy

