import { colors, type ColorScale } from './colors';

export function injectThemeVariables(theme: 'light' | 'dark' = 'dark') {
  const root = document.documentElement;
  const themeColors = colors[theme];

  // Inject main colors
  Object.entries(themeColors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      root.style.setProperty(`--color-${key}`, value);
    }
  });

  // Inject color scales
  Object.entries(themeColors).forEach(([key, value]) => {
    if (typeof value === 'object' && 'DEFAULT' in value) {
      const scale = value as ColorScale;
      Object.entries(scale).forEach(([shade, color]) => {
        root.style.setProperty(`--color-${key}-${shade}`, color);
      });
    }
  });

  // Inject HSL values
  Object.entries(colors.hsl[theme]).forEach(([key, value]) => {
    root.style.setProperty(`--color-hsl-${key}`, value);
  });

  // Generate and inject opacity variants for main colors
  Object.entries(themeColors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      for (let opacity = 0; opacity <= 100; opacity += 10) {
        const opacityValue = opacity / 100;
        root.style.setProperty(
          `--color-${key}-${opacity}`,
          `rgba(${getRGBValues(value)}, ${opacityValue})`
        );
      }
    }
  });
}

// Helper function to get RGB values from hex color
function getRGBValues(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

// Theme type for TypeScript support
export type Theme = typeof colors;

export const theme = {
  colors: {
    light: {
      background: {
        primary: '#FFFFFF',
        secondary: '#F8FAFC',
        tertiary: '#F1F5F9',
        card: 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: '#1E293B',
        secondary: '#475569',
        tertiary: '#64748B',
        inverse: '#FFFFFF',
      },
      border: {
        light: 'rgba(0, 0, 0, 0.1)',
        medium: 'rgba(0, 0, 0, 0.15)',
        strong: 'rgba(0, 0, 0, 0.2)',
      },
      primary: {
        main: '#3B82F6',
        light: '#60A5FA',
        dark: '#2563EB',
        contrast: '#FFFFFF',
      },
      shadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
    },
    dark: {
      background: {
        primary: '#0F172A',
        secondary: '#1E293B',
        tertiary: '#334155',
        card: 'rgba(30, 41, 59, 0.8)',
      },
      text: {
        primary: '#F8FAFC',
        secondary: '#CBD5E1',
        tertiary: '#94A3B8',
        inverse: '#0F172A',
      },
      border: {
        light: 'rgba(255, 255, 255, 0.1)',
        medium: 'rgba(255, 255, 255, 0.15)',
        strong: 'rgba(255, 255, 255, 0.2)',
      },
      primary: {
        main: '#60A5FA',
        light: '#93C5FD',
        dark: '#3B82F6',
        contrast: '#0F172A',
      },
      shadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  transitions: {
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
    },
    timing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
  blur: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
} as const;

// Type definitions
export type ThemeColors = typeof theme.colors.light;
export type ThemeMode = 'light' | 'dark';

// Utility function to get theme-aware color
export function getThemeColor(mode: ThemeMode, path: string, opacity: number = 1): string {
  const color = path.split('.').reduce((obj, key) => obj[key], theme.colors[mode]);
  return opacity === 1
    ? color
    : `${color}${Math.round(opacity * 255)
        .toString(16)
        .padStart(2, '0')}`;
}

// Utility function to get theme-aware transition
export function getThemeTransition(
  property: string,
  duration: keyof typeof theme.transitions.duration = 'normal',
  timing: keyof typeof theme.transitions.timing = 'ease'
): string {
  return `${property} ${theme.transitions.duration[duration]} ${theme.transitions.timing[timing]}`;
}
