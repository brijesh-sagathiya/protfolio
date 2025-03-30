/**
 * Theme type
 */
export type Theme = 'light' | 'dark';

/**
 * Theme configuration
 */
export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  border: string;
  card: string;
  popover: string;
  ring: string;
  radius: string;
}

/**
 * Theme colors
 */
export interface ThemeColors {
  light: ThemeConfig;
  dark: ThemeConfig;
}

/**
 * Theme provider props
 */
export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

/**
 * Theme context value
 */
export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}
