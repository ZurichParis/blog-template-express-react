
import { useLanguage } from '../contexts/LanguageContext'
import { useTranslation } from '../translations/translations'

function Navigation({ setCurrentPage }) {
  const { language, changeLanguage } = useLanguage()
  const { t } = useTranslation(language)
  
  const navItems = [
    { id: 'home', label: t('navigation.home')},
    { id: 'courses', label: t('navigation.courses')},
    { id: 'contact', label: t('navigation.contact')}
  ]

  const languages = [
    { code: 'en', symbol: 'EN', label: 'English' },
    { code: 'ja', symbol: '日', label: 'Japanese' },
    { code: 'zh', symbol: '中', label: 'Chinese' }
  ]

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage)
    setCurrentPage('home')
  }

  return (
    <header className="py-3 fixed w-full top-0 z-[1000] backdrop-blur-md shadow-lg" style={{ background: 'linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)' }}>
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 h-16 text-[#f8f9fa]">
        
        {/* Logo */}
        <div className="font-chinese text-3xl font-bold">
          {t('navigation.logo')}
        </div>
        
        {/* Navigation Items */} 
        <div className="flex items-center gap-5">
          <div className="flex list-none gap-5 hidden sm:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`tracking-wider font-chinese text-lg font-normal px-5 py-1 rounded-3xl transition-all duration-300 ease-in-out flex items-center space-x-2 transition-colors hover:bg-white/20`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          
          {/* Language Switcher */}
          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm hover:bg-white/30 transition-colors">
              {languages.find(lang => lang.code === language)?.symbol || 'EN'}
            </button>
            <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg py-2 min-w-[120px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 ${
                    language === lang.code ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <span className="font-bold">{lang.symbol}</span>
                  <span className="text-sm">{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>

  );
}

export default Navigation