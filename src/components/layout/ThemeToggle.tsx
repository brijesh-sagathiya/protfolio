import React, { useEffect, useState, JSX } from 'react';

import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/theme-context';

/**
 * A theme toggle button component that switches between light and dark modes
 * @returns {JSX.Element} A button component with sun/moon icons
 */
const ThemeToggle = (): JSX.Element => {
  const { setTheme, isDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 rounded-full bg-background/5 p-0"
        aria-label="Loading theme toggle"
      >
        <div className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-9 w-9 rounded-full bg-background/5 p-0 transition-all duration-300 hover:bg-background/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={!isDark}
    >
      <div className="relative h-4 w-4">
        <Sun
          className={`absolute h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 ${
            !isDark ? 'text-yellow-500' : 'text-foreground/40'
          }`}
          aria-hidden="true"
        />
        <Moon
          className={`absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 ${
            isDark ? 'text-blue-400' : 'text-foreground/40'
          }`}
          aria-hidden="true"
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
