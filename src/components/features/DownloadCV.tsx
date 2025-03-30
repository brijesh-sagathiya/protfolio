import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { useTheme } from '@/lib/theme-context';

const DownloadCV = () => {
  const { isDark } = useTheme();
  const [showCard, setShowCard] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setDownloadComplete(false);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) clearInterval(progressInterval);
          return Math.min(prev + 10, 90);
        });
      }, 100);

      // Fetch the resume file
      const response = await fetch('/resume/resume_dev_latest.pdf');
      if (!response.ok) throw new Error('Resume file not found');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      const currentYear = new Date().getFullYear();
      link.download = `brijesh-sagathiya_resume_${currentYear}.pdf`;

      // Complete the progress bar
      setDownloadProgress(100);

      // Trigger download after a small delay for smooth animation
      setTimeout(() => {
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // Show success state
        setDownloadComplete(true);

        // Reset states after showing success
        setTimeout(() => {
          setIsDownloading(false);
          setDownloadProgress(0);
          setDownloadComplete(false);
        }, 2000);
      }, 200);

      clearInterval(progressInterval);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
      setDownloadProgress(0);
      setDownloadComplete(false);
    }
  };

  // Animation variants with reduced motion support
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="relative min-h-[120px] w-full">
      <AnimatePresence mode="wait">
        {showCard ? (
          <motion.div
            className={`overflow-hidden rounded-2xl border ${
              isDark
                ? 'border-white/10 bg-gradient-to-r from-white/[0.07] to-white/[0.05]'
                : 'border-slate-200/80 bg-gradient-to-r from-slate-50 to-white'
            } shadow-xl shadow-black/5 backdrop-blur-md`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ willChange: 'transform' }}
          >
            <div className="flex flex-col items-center justify-between gap-4 p-4 sm:flex-row sm:gap-6 sm:p-6 md:p-8">
              <div className="flex w-full items-center text-center sm:w-auto sm:text-left">
                <div className="w-full sm:w-auto">
                  <motion.h3
                    variants={contentVariants}
                    className={`bg-gradient-to-r ${
                      isDark ? 'from-white to-white/80' : 'from-slate-900 to-slate-700'
                    } bg-clip-text text-lg font-semibold leading-tight text-transparent sm:text-xl md:text-2xl`}
                  >
                    View My Resume
                  </motion.h3>
                  <motion.p
                    variants={contentVariants}
                    className={`mt-1 max-w-md text-sm font-light ${
                      isDark ? 'text-white/60' : 'text-slate-600'
                    } sm:text-base`}
                  >
                    Get a detailed overview of my experience & skills
                  </motion.p>
                </div>
              </div>

              <motion.button
                variants={buttonVariants}
                className={`relative flex items-center justify-center space-x-3 ${
                  isDark
                    ? downloadComplete
                      ? 'from-green-500/20 to-green-400/10 hover:from-green-500/25 hover:to-green-400/15'
                      : 'from-white/10 to-white/5 hover:from-white/15 hover:to-white/10'
                    : downloadComplete
                      ? 'from-green-500/20 to-green-400/10 hover:from-green-500/25 hover:to-green-400/15'
                      : 'from-blue-500/10 to-indigo-500/5 hover:from-blue-500/15 hover:to-indigo-500/10'
                } group w-full min-w-[160px] rounded-xl border ${
                  isDark
                    ? 'border-white/5 hover:border-white/10'
                    : 'border-slate-200/80 hover:border-slate-300/80'
                } px-6 py-3.5 text-sm transition-all duration-300 sm:w-auto sm:text-base ${
                  isDownloading ? 'cursor-wait' : ''
                }`}
                onClick={handleDownload}
                whileHover={{ scale: isDownloading ? 1 : 1.02 }}
                whileTap={{ scale: isDownloading ? 1 : 0.98 }}
                disabled={isDownloading}
                style={{ willChange: 'transform' }}
              >
                {isDownloading && !downloadComplete && (
                  <motion.div
                    className={`absolute inset-0 origin-left rounded-xl ${
                      isDark ? 'bg-white/10' : 'bg-blue-500/10'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: downloadProgress / 100 }}
                    transition={{ duration: 0.2 }}
                  />
                )}

                <span
                  className={`relative z-10 font-medium tracking-wide ${
                    isDark ? 'text-white/90' : 'text-slate-900'
                  }`}
                >
                  {downloadComplete
                    ? 'Downloaded!'
                    : isDownloading
                      ? 'Downloading...'
                      : 'Download CV'}
                </span>

                <motion.div
                  className="relative z-10 h-5 w-5 flex-shrink-0"
                  initial={false}
                  animate={
                    downloadComplete
                      ? { scale: [1.2, 1], rotate: [90, 0] }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.3, ease: 'backOut' }}
                >
                  <AnimatePresence mode="wait">
                    {downloadComplete ? (
                      <motion.svg
                        key="check"
                        className={`h-5 w-5 ${isDark ? 'text-green-400' : 'text-green-500'}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    ) : isDownloading ? (
                      <motion.svg
                        key="spinner"
                        className={`h-5 w-5 ${isDark ? 'text-white/70' : 'text-slate-600'}`}
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </motion.svg>
                    ) : (
                      <motion.svg
                        key="download"
                        className={`h-5 w-5 ${isDark ? 'text-white/70' : 'text-slate-600'}`}
                        animate={{ y: [0, 2, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: 'easeInOut',
                          delay: 0.8,
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="h-[120px] w-full" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DownloadCV;
