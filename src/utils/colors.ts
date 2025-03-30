// Theme Colors
export const colors = {
  // Light Mode Colors
  light: {
    background: '#FFFFFF',
    text: '#1A1A1A',
    accent: '#1E88E5',
    highlight: '#F4A261',
    primary: {
      DEFAULT: '#1E88E5',
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#1E88E5',
      600: '#1976D2',
      700: '#1565C0',
      800: '#0D47A1',
      900: '#0A3D91',
    },
    secondary: {
      DEFAULT: '#F4A261',
      50: '#FFF3E0',
      100: '#FFE0B2',
      200: '#FFCC80',
      300: '#FFB74D',
      400: '#FFA726',
      500: '#F4A261',
      600: '#FB8C00',
      700: '#F57C00',
      800: '#EF6C00',
      900: '#E65100',
    },
    neutral: {
      DEFAULT: '#1A1A1A',
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  // Dark Mode Colors
  dark: {
    background: '#121212',
    text: '#E0E0E0',
    accent: '#1E88E5',
    highlight: '#F4A261',
    primary: {
      DEFAULT: '#1E88E5',
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#1E88E5',
      600: '#1976D2',
      700: '#1565C0',
      800: '#0D47A1',
      900: '#0A3D91',
    },
    secondary: {
      DEFAULT: '#F4A261',
      50: '#FFF3E0',
      100: '#FFE0B2',
      200: '#FFCC80',
      300: '#FFB74D',
      400: '#FFA726',
      500: '#F4A261',
      600: '#FB8C00',
      700: '#F57C00',
      800: '#EF6C00',
      900: '#E65100',
    },
    neutral: {
      DEFAULT: '#E0E0E0',
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  // Common Colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',

  // HSL Values for Tailwind
  hsl: {
    light: {
      background: '0 0% 100%',
      foreground: '0 0% 10%',
      card: '0 0% 100%',
      'card-foreground': '0 0% 10%',
      popover: '0 0% 100%',
      'popover-foreground': '0 0% 10%',
      primary: '207 89% 50%',
      'primary-foreground': '0 0% 100%',
      secondary: '207 89% 50%',
      'secondary-foreground': '0 0% 100%',
      muted: '0 0% 96%',
      'muted-foreground': '0 0% 45%',
      accent: '207 89% 50%',
      'accent-foreground': '0 0% 100%',
      destructive: '0 84% 60%',
      'destructive-foreground': '0 0% 100%',
      border: '0 0% 90%',
      input: '0 0% 90%',
      ring: '207 89% 50%',
    },
    dark: {
      background: '0 0% 7%',
      foreground: '0 0% 88%',
      card: '0 0% 7%',
      'card-foreground': '0 0% 88%',
      popover: '0 0% 7%',
      'popover-foreground': '0 0% 88%',
      primary: '207 89% 50%',
      'primary-foreground': '0 0% 88%',
      secondary: '207 89% 50%',
      'secondary-foreground': '0 0% 88%',
      muted: '0 0% 7%',
      'muted-foreground': '0 0% 88%',
      accent: '207 89% 50%',
      'accent-foreground': '0 0% 88%',
      destructive: '0 62.8% 30.6%',
      'destructive-foreground': '0 0% 88%',
      border: '0 0% 7%',
      input: '0 0% 7%',
      ring: '207 89% 50%',
    },
  },
} as const;

// Type definitions for color system
export type ColorScale = {
  DEFAULT: string;
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
};

export type ColorSystem = {
  background: string;
  text: string;
  accent: string;
  highlight: string;
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
  success: string;
  warning: string;
  error: string;
  info: string;
  hsl: Record<string, string>;
};

// Utility function to convert hex to HSL
export function hexToHSL(hex: string): string {
  // Remove the hash if present
  hex = hex.replace(/^#/, '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  // Convert to HSL string format
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// Utility function to generate opacity variants
export function withOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Utility function to get color from scale
export function getColorFromScale(
  scale: ColorScale,
  shade: keyof ColorScale | 'DEFAULT' = 'DEFAULT'
): string {
  return scale[shade];
}
