import { useEffect, useState, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { Cursor } from './components/fx.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import FloatingActions from './components/FloatingActions.jsx'
import QuoteModal from './components/QuoteModal.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const location = useLocation()
  const [quote, setQuote] = useState({ open: false, product: '' })
  const openQuote = useCallback((product = '') => setQuote({ open: true, product }), [])
  const closeQuote = useCallback(() => setQuote((q) => ({ ...q, open: false })), [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Header onQuote={() => openQuote()} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home onQuote={openQuote} />} />
            <Route path="/about" element={<About onQuote={openQuote} />} />
            <Route path="/products" element={<Products onQuote={openQuote} />} />
            <Route path="/products/:slug" element={<ProductDetail onQuote={openQuote} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingActions />
      <QuoteModal open={quote.open} product={quote.product} onClose={closeQuote} />
    </>
  )
}
