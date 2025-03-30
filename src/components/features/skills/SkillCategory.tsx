import React, { useState, useEffect, useRef, useMemo } from 'react';

import { motion } from 'framer-motion';

import { OptimizedImage } from '@/components/ui/optimized-image';
import { useTheme } from '@/lib/theme-context';
import { SkillCategoryProps } from '@/types/components';
const SkillCategory: React.FC<SkillCategoryProps> = ({ logos }) => {
  const { isDark } = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [isNameHovered, setIsNameHovered] = useState(false);

  const responsiveConfig = useMemo(() => {
    return {
      scrollSpeed: 0.3,
      duplicateCount: 3,
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    let animationFrameId: number;
    let lastTimestamp = 0;

    const animateScroll = (timestamp: number) => {
      if (!isIconHovered && !isNameHovered) {
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        scrollAmount += (responsiveConfig.scrollSpeed * deltaTime) / 16;
        if (scrollAmount >= container.scrollWidth / responsiveConfig.duplicateCount) {
          scrollAmount = 0;
        }
        container.scrollLeft = scrollAmount;
      }
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isIconHovered, isNameHovered, responsiveConfig]);

  return (
    <div className="w-full overflow-hidden py-8">
      <div ref={scrollContainerRef} className="flex w-full overflow-hidden whitespace-nowrap">
        {[...Array(responsiveConfig.duplicateCount)].flatMap(() =>
          logos.map((logo, index) => (
            <motion.div
              key={`${index}-${logo.name}`}
              className="mx-4 flex flex-col items-center justify-center sm:mx-6 md:mx-8"
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className={`flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12`}
                onMouseEnter={() => setIsIconHovered(true)}
                onMouseLeave={() => setIsIconHovered(false)}
                whileHover={{ scale: 1.1 }}
              >
                <OptimizedImage
                  src={logo.icon}
                  alt={logo.name}
                  className="h-full w-full object-contain"
                  style={{ filter: `drop-shadow(0 0 8px ${logo.color}${isDark ? '40' : '20'})` }}
                />
              </motion.div>
              <motion.p
                className={`mt-2 text-center text-xs font-medium transition-colors duration-300 sm:text-sm md:text-base ${
                  isDark ? 'text-white/80' : 'text-slate-700/80'
                }`}
                onMouseEnter={() => setIsNameHovered(true)}
                onMouseLeave={() => setIsNameHovered(false)}
                whileHover={{ scale: 1.05 }}
              >
                {logo.name}
              </motion.p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(SkillCategory);
