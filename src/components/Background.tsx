import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data';

const Background = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  let scrollTimeout: NodeJS.Timeout;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute h-full w-full bg-[#050505]"></div>
      <motion.div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        animate={{
          backgroundColor: ['#2563eb', '#7c3aed', '#3b82f6', '#2563eb'],
          scale: [1, 1.1, 1.15, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.div
        className="absolute -left-48 top-1/4 h-96 w-96 rounded-full opacity-15 blur-3xl"
        animate={{
          backgroundColor: ['#14b8a6', '#0891b2', '#0d9488', '#14b8a6'],
          scale: [1.15, 1, 1.1, 1.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full opacity-10 blur-3xl"
        animate={{
          backgroundColor: ['#8b5cf6', '#6366f1', '#a855f7', '#8b5cf6'],
          scale: [1, 1.1, 1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 2,
        }}
      />

      {/* Floating Skill Logos */}
      {skillCategories.flatMap(category =>
        category.logos.map((logo, index) => (
          <motion.img
            key={index}
            src={logo.icon}
            alt={logo.name}
            className="absolute h-12 w-12 opacity-50 transition-opacity hover:opacity-100"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={
              isScrolling
                ? { opacity: 0.2, scale: 0.8 }
                : {
                    y: ['0px', '20px', '0px'],
                    x: ['0px', '10px', '0px'],
                    rotate: [0, 15, -15, 0],
                    opacity: [0.5, 1, 0.5],
                  }
            }
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            style={{
              filter: `drop-shadow(0 0 5px ${logo.color})`,
            }}
          />
        ))
      )}
    </div>
  );
};

export default Background;
