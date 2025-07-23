import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Pages
import Home from './pages/Home'
import Features from './pages/Features'
import Download from './pages/Download'
import NotFound from './pages/NotFound'

// Providers
import { ThemeProvider } from './providers/ThemeProvider'
import { LanguageProvider } from './providers/LanguageProvider'

function App() {
  useTranslation()

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/download" element={<Download />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.main>
          
          <Footer />
          <ScrollToTop />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App