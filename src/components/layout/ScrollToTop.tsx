import { useEffect, useRef, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Throttled scroll handler to improve performance
    const handleScroll = () => {
      // Show button only when scrolled past threshold
      setShowScrollTop(window.scrollY > 300);

      // Clear any existing timeout to prevent multiple calls
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set a timeout to handle scroll end
      scrollTimeoutRef.current = setTimeout(() => {
        // Optional: Additional actions when scrolling stops
      }, 200);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 768);
    };

    // Initial checks
    handleScroll();
    handleResize();

    // Use passive event listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToTop = () => {
    // Ensure we're actually scrolling to the top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Dynamic sizing based on viewport
  const getButtonSize = () => {
    if (isMobile) return '2.5rem';
    if (isTablet) return '3rem';
    return '3.5rem';
  };

  const getIconSize = () => {
    if (isMobile) return 16;
    if (isTablet) return 18;
    return 20;
  };

  return (
    <AnimatePresence>
      {showScrollTop && (
        <motion.div
          className="fixed z-50"
          style={{
            bottom: isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem',
            right: isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem',
            // Adding pointer-events to ensure it's always clickable
            pointerEvents: 'auto',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={scrollToTop}
            className="flex items-center justify-center rounded-full border border-white/20 bg-slate-800/80 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/90 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            style={{
              height: getButtonSize(),
              width: getButtonSize(),
              willChange: 'transform',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={getIconSize()} strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
