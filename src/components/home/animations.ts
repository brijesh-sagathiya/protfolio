import { Variants } from 'framer-motion';

/**
 * Fade in and slide up animation variant
 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: { opacity: 0, y: -20 },
};

/**
 * Stagger container animation for child elements
 */
export const staggerContainer: Variants = {
  animate: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

/**
 * Scale and fade animation variant
 */
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
  exit: { opacity: 0, scale: 0.95 },
};

/**
 * Slide in from left animation variant
 */
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
  exit: { opacity: 0, x: -20 },
};
