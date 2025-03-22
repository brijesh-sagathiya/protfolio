import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillLogo {
  name: string;
  icon: string;
  color: string;
}

interface SkillCategoryProps {
  logos: SkillLogo[];
}

const SkillCategory = ({ logos }: SkillCategoryProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showArrows, setShowArrows] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Responsive items per page
  const getItemsPerPage = () => {
    if (isMobile) return 3;
    if (isTablet) return 4;
    return logos.length;
  };

  const itemsPerPage = getItemsPerPage();

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobile && !isHovered) {
      const timer = setTimeout(() => {
        setShowArrows(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isMobile, currentPage, isHovered]);

  const totalPages = Math.ceil(logos.length / itemsPerPage);

  const handleNext = () => {
    setShowArrows(true);
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setShowArrows(true);
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  const visibleLogos =
    isMobile || isTablet
      ? logos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      : logos;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Desktop Layout */}
      <div className="hidden justify-center space-x-4 py-6 md:flex">
        {logos.map((logo, index) => (
          <motion.div
            key={logo.name}
            className="group relative cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onHoverStart={() => setActiveIndex(index)}
            onHoverEnd={() => setActiveIndex(null)}
          >
            <div
              className="glass-morphism flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
              style={{
                boxShadow: activeIndex === index ? `0 0 15px ${logo.color}` : 'none',
                borderColor: activeIndex === index ? logo.color : 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <img
                src={logo.icon}
                alt={logo.name}
                className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 sm:h-7 sm:w-7"
              />
            </div>

            {activeIndex === index && (
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded border border-white/10 bg-black/80 px-2 py-1 text-xs backdrop-blur-sm"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                {logo.name}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="relative md:hidden">
        <div className="flex items-center justify-center space-x-4 py-6">
          <AnimatePresence>
            {showArrows && (
              <motion.button
                onClick={handlePrev}
                className="absolute left-0 z-10 rounded-full bg-black/50 p-2 backdrop-blur-sm transition-colors hover:bg-black/70"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                aria-label="Previous slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              {visibleLogos.map((logo, index) => (
                <motion.div
                  key={logo.name}
                  className="group relative cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onHoverStart={() => setActiveIndex(index)}
                  onHoverEnd={() => setActiveIndex(null)}
                >
                  <div
                    className="glass-morphism flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
                    style={{
                      boxShadow: activeIndex === index ? `0 0 15px ${logo.color}` : 'none',
                      borderColor: activeIndex === index ? logo.color : 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <img
                      src={logo.icon}
                      alt={logo.name}
                      className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 sm:h-7 sm:w-7"
                    />
                  </div>

                  {activeIndex === index && (
                    <motion.div
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded border border-white/10 bg-black/80 px-2 py-1 text-xs backdrop-blur-sm"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      {logo.name}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {showArrows && (
              <motion.button
                onClick={handleNext}
                className="absolute right-0 z-10 rounded-full bg-black/50 p-2 backdrop-blur-sm transition-colors hover:bg-black/70"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Page Indicators */}
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentPage === index ? 'bg-white' : 'bg-white/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillCategory;
