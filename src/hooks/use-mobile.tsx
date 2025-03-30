import * as React from 'react';

import { UseMobileReturn } from '@/types/hooks';

/**
 * Breakpoint for mobile devices in pixels
 */
const MOBILE_BREAKPOINT = 768;

/**
 * Hook to detect if the current device is mobile
 * @returns {UseMobileReturn} Object containing isMobile boolean
 */
export function useIsMobile(): UseMobileReturn {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = (): void => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => mql.removeEventListener('change', onChange);
  }, []);

  return { isMobile: !!isMobile };
}
