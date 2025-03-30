import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink } from 'lucide-react';
import { createPortal } from 'react-dom';

import { OptimizedImage } from '@/components/ui/optimized-image';
import { useTheme } from '@/lib/theme-context';
import { BlogPortalProps } from '@/types/components';

const BlogPortal = ({ isOpen, onClose, title, date, image, content }: BlogPortalProps) => {
  const [mounted, setMounted] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Scroll to top of the popup when opened
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Enhanced color and theme management
  const themeColors = {
    backdrop: isDark ? 'bg-slate-900/70 text-gray-200' : 'bg-white/70 text-slate-900',
    container: isDark
      ? 'border-slate-800 bg-slate-900 text-gray-300'
      : 'border-slate-200 bg-white text-slate-700',
    closeButton: isDark
      ? 'bg-slate-800/80 text-gray-400 hover:bg-slate-700 hover:text-white'
      : 'bg-white/80 text-slate-500 hover:bg-slate-100 hover:text-slate-900',
    gradient: isDark
      ? 'from-slate-900 via-slate-900/50 to-transparent'
      : 'from-white via-white/50 to-transparent',
    heading: isDark ? 'text-white' : 'text-slate-900',
    subHeading: isDark ? 'text-blue-400' : 'text-blue-600',
    description: isDark ? 'text-gray-300' : 'text-slate-600',
    actionButton: 'bg-blue-600 hover:bg-blue-500 text-white',
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 backdrop-blur-sm sm:p-6 ${themeColors.backdrop}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="flex min-h-screen w-full items-center justify-center py-8">
            <motion.div
              className={`relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl border shadow-2xl ${themeColors.container}`}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                maxHeight: 'calc(100vh - 4rem)',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Close button - Improved positioning and accessibility */}
              <button
                onClick={onClose}
                className={`absolute right-4 top-4 z-10 rounded-full p-2 transition-all duration-200 ease-in-out ${themeColors.closeButton}`}
                aria-label="Close blog post"
                title="Close"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>

              {/* Featured image - Improved gradient and overlay */}
              <div className="relative h-64 w-full sm:h-80">
                <div
                  className={`absolute inset-0 bg-gradient-to-t opacity-70 ${themeColors.gradient}`}
                />
                <OptimizedImage
                  src={image}
                  alt={title}
                  priority={true}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div
                    className={`mb-1 flex items-center gap-2 text-sm font-medium ${themeColors.subHeading}`}
                  >
                    <Calendar className="h-4 w-4" />
                    <time>{date}</time>
                  </div>
                  <h2
                    className={`text-2xl font-bold leading-tight sm:text-3xl ${themeColors.heading}`}
                  >
                    {title}
                  </h2>
                </div>
              </div>

              {/* Content - Improved readability and spacing */}
              <div className="space-y-6 p-6">
                <p className={`text-base leading-relaxed sm:text-lg ${themeColors.description}`}>
                  {content.description}
                </p>

                {content.points && content.points.length > 0 && (
                  <div className="space-y-4">
                    <h3 className={`text-xl font-semibold ${themeColors.heading}`}>Key Points</h3>
                    <ul className="space-y-2 pl-5">
                      {content.points.map((point, idx) => (
                        <li key={idx} className={`list-disc ${themeColors.description}`}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {content.references && content.references.length > 0 && (
                  <div className="space-y-4">
                    <h3 className={`text-xl font-semibold ${themeColors.heading}`}>References</h3>
                    <ul className="space-y-3">
                      {content.references.map((ref, idx) => (
                        <li key={idx}>
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 transition-colors ${
                              isDark
                                ? 'text-blue-400 hover:text-blue-300'
                                : 'text-blue-600 hover:text-blue-500'
                            }`}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>{ref.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer - Consistent styling */}
              <div
                className={`sticky bottom-0 flex justify-end border-t p-4 ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}
              >
                <button
                  onClick={onClose}
                  className={`rounded-md px-4 py-2 font-medium transition-colors ${themeColors.actionButton}`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default BlogPortal;
