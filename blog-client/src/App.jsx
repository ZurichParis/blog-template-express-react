import { useState } from 'react'
import Navigation from './components/Navigation'
import BlogList from './components/BlogList'
import Home from './components/Home'
import './App.css'
import './index.css'
import Footer from './components/Footer'
import Contact from './components/Contact'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [pageKey, setPageKey] = useState(0)

  const navigatePage = (page) => {
    setCurrentPage(page)
    setPageKey(pageKey + 1)
    window.scrollTo(0, 0);
  }


  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home setCurrentPage={navigatePage}/>
      case 'courses':
        return <BlogList key={pageKey}/>
      case 'contact':
        return <Contact/>
      default:
        return <Home setCurrentPage={navigatePage}/>
    }
  }
  console.log('Hi Parent component app rendered')

  return (
    <LanguageProvider>
      <div>
        <Navigation setCurrentPage={navigatePage} />
        <main className="min-h-screen">
          {renderPage()}
        </main>
        <Footer currentPage={currentPage} setCurrentPage={navigatePage} />
      </div>
    </LanguageProvider>
  )
}

export default App
