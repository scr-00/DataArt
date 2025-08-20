interface HeaderProps {
  onThemeToggle: () => void;
  isDarkTheme: boolean;
}

export default function Header({ onThemeToggle, isDarkTheme }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🎵 Coldplay Live Timeline</h1>
        <button 
          onClick={onThemeToggle}
          className="theme-toggle"
          aria-label="Toggle theme"
        >
          {isDarkTheme ? '☀️' : '🌙'} Toggle Theme
        </button>
      </div>
      <p className="header-subtitle">
        Explore Coldplay's legendary concerts through the years
      </p>
    </header>
  )
}
