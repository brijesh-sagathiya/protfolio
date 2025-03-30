/**
 * Welcome message configuration
 */
export interface WelcomeMessage {
  message: string;
  time: string;
}

/**
 * Visitor tracking configuration
 */
export interface VisitorConfig {
  storageKey: string;
  expiryDays: number;
}

/**
 * Visitor data
 */
export interface VisitorData {
  count: number;
  lastVisit: string;
}

/**
 * IP cache data
 */
export interface IpCache {
  [key: string]: {
    count: number;
    lastVisit: number;
  };
}

/**
 * Color configuration
 */
export interface ColorConfig {
  name: string;
  value: string;
  description?: string;
}

/**
 * Color scale
 */
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

/**
 * Color system
 */
export interface ColorSystem {
  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;
  neutral: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
}

/**
 * Theme utility functions
 */
export interface ThemeUtils {
  getThemeColors: (theme: 'light' | 'dark') => Record<string, string>;
  getColorScale: (color: keyof ColorSystem) => ColorScale;
  getColorValue: (color: keyof ColorSystem, shade: keyof ColorScale) => string;
}

export * from './welcome';
export * from './visitor';
export * from './colors';
