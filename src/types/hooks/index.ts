import { Theme } from '@/types/theme';

import { ToasterToast } from './toast';

/**
 * Mobile detection hook return type
 */
export interface UseMobileReturn {
  isMobile: boolean;
}

/**
 * Toast hook return type
 */
export interface UseToastReturn {
  toasts: ToasterToast[];
  toast: (props: Omit<ToasterToast, 'id'>) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  };
  dismiss: (toastId?: string) => void;
}

/**
 * Theme hook return type
 */
export interface UseThemeReturn {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}
