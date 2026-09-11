'use client';

import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={isDark ? 'Use light theme' : 'Use dark theme'}
      title={isDark ? 'Use light theme' : 'Use dark theme'}
    >
      {isDark ? (
        <Sun size={19} weight="bold" aria-hidden="true" />
      ) : (
        <Moon size={19} weight="bold" aria-hidden="true" />
      )}
    </button>
  );
}
