import { memo, useEffect, useState, useCallback } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { useTheme } from '@/lib/theme-context';
import { getWelcomeMessage, createIPTracker, WelcomeMessage } from '@/utils/welcomeMessages';

// Enhanced Loading Fallback Component
const LoadingFallback = memo(() => {
  const [message, setMessage] = useState<WelcomeMessage | null>(null);
  const [ip, setIp] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // Use theme context
  const { isDark } = useTheme();

  // Theme-based color classes
  const themeColors = {
    background: isDark ? 'bg-[#0B0F1A]' : 'bg-white',
    primaryText: isDark ? 'text-white/90' : 'text-slate-900',
    subtitleText: isDark ? 'text-white/60' : 'text-slate-700',
    descriptionText: isDark ? 'text-white/40' : 'text-slate-500',
  };

  // Fetch IP address with error handling and timeout
  const fetchIP = useCallback(async () => {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('IP fetch timeout')), 5000)
      );
      const fetchPromise = fetch('https://api.ipify.org?format=json');

      const response = (await Promise.race([fetchPromise, timeoutPromise])) as Response;
      if (!response.ok) {
        throw new Error('Failed to fetch IP');
      }
      const data = (await response.json()) as { ip: string };
      setIp(data.ip);
    } catch (error) {
      console.error('Failed to fetch IP:', error);
      // Fallback to a generic identifier if IP fetch fails
      setIp(navigator.userAgent);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIP();

    // Ensure component is mounted for a minimum time
    const minDisplayTimer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(minDisplayTimer);
  }, [fetchIP]);

  useEffect(() => {
    if (!isLoading && ip) {
      const ipTracker = createIPTracker();
      const visitCount = ipTracker.incrementVisits(ip);
      setMessage(getWelcomeMessage(visitCount));
    }
  }, [ip, isLoading]);

  // Show nothing until minimum display time has passed
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 ${themeColors.background}`}
    >
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message.greeting}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
            className="w-full max-w-md text-center"
          >
            <motion.div
              className="mb-4 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <span className="text-5xl">{message.emoji}</span>
            </motion.div>

            <motion.h2
              className={`mb-3 text-3xl font-semibold ${themeColors.primaryText}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {message.greeting}
            </motion.h2>

            <motion.p
              className={`mb-2 text-lg ${themeColors.subtitleText}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {message.subtitle}
            </motion.p>

            <motion.p
              className={`text-base ${themeColors.descriptionText}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {message.description}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

LoadingFallback.displayName = 'LoadingFallback';

export default LoadingFallback;
