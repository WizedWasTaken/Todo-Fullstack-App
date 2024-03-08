'use client';

import { useTheme } from 'next-themes';
import { buttonIcon } from '@/lib/theme/theme-icons';

/**
 * @returns HTML for the theme toggle
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  /**
   *
   */
  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <button
      onClick={toggleTheme}
      data-theme={theme}
      className='dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white text-black bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md'
    >
      {buttonIcon(theme)}
    </button>
  );
}
