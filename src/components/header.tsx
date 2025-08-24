/**
 * Accessible Header Component
 * Displays logo, title, and theme toggle with full accessibility support
 */

import React from 'react';
import type { HeaderProps } from '@/types';

const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle }) => {
  const themeIcon = theme === 'light' ? '🌙' : '☀️';
  const themeLabel = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>): void => {
    const img = event.currentTarget;
    img.style.display = 'none';
  };

  const handleThemeClick = (): void => {
    onThemeToggle();
  };

  const handleThemeKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onThemeToggle();
    }
  };

  return (
    <header className="site-header" role="banner">
      <div className="logo-container">
        <img 
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Extinction_Symbol.svg"
          alt="Extinction Timeline Logo - A symbol representing extinct species"
          className="logo"
          onError={handleImageError}
          role="img"
        />
        <h1 id="main-title">
          Animal Extinction Timeline
        </h1>
      </div>
      
      <button
        id="theme-toggle"
        className="theme-toggle"
        onClick={handleThemeClick}
        onKeyDown={handleThemeKeyDown}
        aria-label={themeLabel}
        aria-describedby="theme-description"
        aria-pressed={theme === 'dark'}
        type="button"
      >
        <span aria-hidden="true">{themeIcon}</span>
        <span className="sr-only">{themeLabel}</span>
      </button>
      
      {/* Hidden description for screen readers */}
      <div id="theme-description" className="sr-only">
        Toggles between light and dark color themes for better visibility
      </div>
    </header>
  );
};

export default Header;
