'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui-library/button';

// Const instead of function for none hydration error. This works for some reason 💀
/**
 * @returns HTML for the theme toggle button
 */
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      onClick={toggleTheme}
    >
      {theme === 'light' ? '🌙' : '🌞'}
    </Button>
  );
  
};

export default ThemeToggle;
