function ThemeFilter({ themes, selectedTheme, onThemeChange }) {
  return (
    <div className="bg-[#f8f9fa] rounded-lg shadow-md">
      
      <div className="space-y-2">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => onThemeChange(theme)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedTheme === theme
                ? 'bg-[#667eea] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {theme === 'all' ? 'All Themes' : theme}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThemeFilter