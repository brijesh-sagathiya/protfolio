export const THEME_STORAGE_KEY = 'theme';
export const DEFAULT_THEME = 'dark';
export const THEME_OPTIONS = ['light', 'dark'] as const;
export type Theme = (typeof THEME_OPTIONS)[number];
