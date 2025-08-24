interface HeaderProps {
  onThemeToggle: () => void;
  isDarkTheme: boolean;
}

export default function Header({ onThemeToggle, isDarkTheme }: HeaderProps) {
  const handleThemeToggle = () => {
    onThemeToggle()
    
    // Announce theme change to screen readers
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.className = 'sr-only'
    announcement.textContent = `Theme switched to ${isDarkTheme ? 'light' : 'dark'} mode`
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement)
      }
    }, 1000)
  }

  return (
    <header className="header" role="banner">
      <div className="header-content">
        <h1 className="logo">
          <span role="img" aria-label="Music note">🎵</span>
          <span className="logo-text">Coldplay Live Timeline</span>
        </h1>
        
        <button 
          onClick={handleThemeToggle}
          className="theme-toggle"
          aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
          aria-pressed={isDarkTheme ? 'true' : 'false'}
          type="button"
        >
          <span 
            className="theme-icon" 
            role="img" 
            aria-label={isDarkTheme ? 'Sun' : 'Moon'}
          >
            {isDarkTheme ? '☀️' : '🌙'}
          </span>
          <span className="theme-text">
            {isDarkTheme ? 'Light' : 'Dark'} Mode
          </span>
        </button>
      </div>
      
      <p className="header-subtitle">
        <span className="subtitle-text">
          Explore Coldplay's legendary concerts through the years
        </span>
      </p>

      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
    </header>
  )
}
