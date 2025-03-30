import React, { useEffect, useState } from 'react';

import { DEFAULT_THEME, THEME_OPTIONS, THEME_STORAGE_KEY, type Theme } from '@/lib/theme-constants';
import { ThemeContext } from '@/lib/theme-context';
import { injectThemeVariables } from '@/utils/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
      return THEME_OPTIONS.includes(savedTheme) ? savedTheme : DEFAULT_THEME;
    }
    return DEFAULT_THEME;
  });

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    injectThemeVariables(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
    isDark: theme === 'dark',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
