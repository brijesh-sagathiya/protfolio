import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data';

const FloatingLogos = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const floatingVariants = {
    floating: (index: number) => ({
      x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
      y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
      rotate: [0, 360],
      transition: {
        x: { duration: 10 + (index % 5), repeat: Infinity, ease: 'linear' },
        y: { duration: 12 + (index % 5), repeat: Infinity, ease: 'linear' },
        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
      },
    }),
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Floating Background Logos */}
      <div className="absolute inset-0">
        {skillCategories.flatMap((category, catIndex) =>
          category.logos.map((logo, index) => (
            <motion.img
              key={`${logo.name}-${catIndex}-${index}`}
              src={logo.icon}
              alt={logo.name}
              className="absolute opacity-25"
              custom={index}
              variants={floatingVariants}
              animate={isScrolling ? { opacity: 0.1 } : 'floating'}
              style={{
                width: '40px',
                height: '40px',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: `drop-shadow(0 0 5px ${logo.color})`,
              }}
            />
          ))
        )}
      </div>

      {/* Foreground Skill Icons */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 p-6 md:gap-8 md:p-12">
        {skillCategories.flatMap(category =>
          category.logos.map(logo => (
            <motion.div
              key={logo.name}
              className="relative flex h-16 w-16 items-center justify-center rounded-lg border border-gray-600 bg-opacity-50 md:h-20 md:w-20"
              whileHover={{
                scale: 1.1,
                borderColor: logo.color,
                transition: { duration: 0.3 },
              }}
            >
              <motion.img
                src={logo.icon}
                alt={logo.name}
                className="h-10 w-10 grayscale md:h-12 md:w-12"
                whileHover={{
                  filter: 'grayscale(0%)',
                  transition: { duration: 0.3 },
                }}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default FloatingLogos;
