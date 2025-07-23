import React, { createContext, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type Language = 'en' | 'zh'

type LanguageProviderProps = {
  children: React.ReactNode
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string, options?: any) => string
}

const LanguageProviderContext = createContext<LanguageProviderState | undefined>(undefined)

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n, t } = useTranslation()

  const setLanguage = (language: Language) => {
    i18n.changeLanguage(language)
    localStorage.setItem('inflowave-website-language', language)
    document.documentElement.lang = language
  }

  useEffect(() => {
    const savedLanguage = localStorage.getItem('inflowave-website-language') as Language
    if (savedLanguage && ['en', 'zh'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const value = {
    language: i18n.language as Language,
    setLanguage,
    t
  }

  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)

  if (context === undefined)
    throw new Error('useLanguage must be used within a LanguageProvider')

  return context
}