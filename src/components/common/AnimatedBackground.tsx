import React, { JSX } from 'react';

import { useTheme } from '@/lib/theme-context';
import { AnimatedBackgroundProps, AnimatedLine } from '@/types/components';

/**
 * Animated background component with stars, lines, and gradient effects
 * @param {AnimatedBackgroundProps} props - The component props
 * @returns {JSX.Element} A div containing animated background elements
 */
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className = '' }): JSX.Element => {
  const { isDark } = useTheme();

  // Primary animated lines configuration
  const primaryLines: AnimatedLine[] = [
    { top: '5%', delay: '0s', width: '250%', speed: '8s' },
    { top: '20%', delay: '1s', width: '280%', speed: '10s' },
    { top: '35%', delay: '2s', width: '260%', speed: '12s' },
    { top: '50%', delay: '3s', width: '290%', speed: '9s' },
    { top: '65%', delay: '4s', width: '270%', speed: '11s' },
    { top: '80%', delay: '5s', width: '300%', speed: '13s' },
    { top: '95%', delay: '6s', width: '280%', speed: '10s' },
  ];

  // Secondary animated lines configuration
  const secondaryLines: AnimatedLine[] = [
    { top: '10%', delay: '0.5s', width: '260%', speed: '9s' },
    { top: '25%', delay: '1.5s', width: '290%', speed: '11s' },
    { top: '40%', delay: '2.5s', width: '270%', speed: '13s' },
    { top: '55%', delay: '3.5s', width: '300%', speed: '10s' },
    { top: '70%', delay: '4.5s', width: '280%', speed: '12s' },
    { top: '85%', delay: '5.5s', width: '310%', speed: '14s' },
    { top: '100%', delay: '6.5s', width: '290%', speed: '9s' },
  ];

  // Diagonal lines configuration
  const diagonalLines: AnimatedLine[] = [
    { top: '15%', delay: '0.3s', width: '320%', speed: '15s', angle: '45deg' },
    { top: '45%', delay: '1.3s', width: '340%', speed: '17s', angle: '-45deg' },
    { top: '75%', delay: '2.3s', width: '330%', speed: '16s', angle: '45deg' },
  ];

  return (
    <div
      className={`fixed inset-0 -z-10 overflow-hidden ${isDark ? 'bg-[#0b0f1a]' : 'bg-white'} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        {/* Stars effect */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className={`animate-twinkle absolute h-[1px] w-[1px] ${isDark ? 'bg-white/30' : 'bg-slate-400/10'}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Primary animated lines */}
        {primaryLines.map((line, index) => (
          <div
            key={`primary-${index}`}
            className={`
              animate-line absolute 
              h-[1.5px] bg-gradient-to-r from-transparent 
              ${isDark ? 'via-purple-500/50' : 'via-blue-500/20'} 
              to-transparent animate-line-${index + 1}
            `}
            style={{
              top: line.top,
              animationDelay: line.delay,
              width: line.width,
              animationDuration: line.speed,
            }}
          />
        ))}

        {/* Secondary animated lines */}
        {secondaryLines.map((line, index) => (
          <div
            key={`secondary-${index}`}
            className={`
              animate-line-reverse absolute 
              h-[1.5px] bg-gradient-to-r from-transparent 
              ${isDark ? 'via-blue-500/40' : 'via-indigo-500/15'} 
              to-transparent animate-line-${index + 1}
            `}
            style={{
              top: line.top,
              animationDelay: line.delay,
              width: line.width,
              animationDuration: line.speed,
            }}
          />
        ))}

        {/* Diagonal lines */}
        {diagonalLines.map((line, index) => (
          <div
            key={`diagonal-${index}`}
            className={`
              animate-line absolute 
              h-[1.5px] bg-gradient-to-r from-transparent 
              ${isDark ? 'via-indigo-500/35' : 'via-slate-400/10'} 
              to-transparent animate-line-${index + 1}
            `}
            style={{
              top: line.top,
              animationDelay: line.delay,
              width: line.width,
              animationDuration: line.speed,
              transform: `rotate(${line.angle})`,
              transformOrigin: 'left center',
            }}
          />
        ))}

        {/* Gradient overlays */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            isDark
              ? 'from-[rgba(86,24,128,0.25)] to-[rgba(32,17,90,0.25)]'
              : 'from-blue-500/5 to-indigo-500/5'
          } opacity-50 mix-blend-overlay`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-tl ${
            isDark
              ? 'from-[rgba(59,130,246,0.2)] to-[rgba(147,51,234,0.2)]'
              : 'from-slate-400/5 to-slate-600/5'
          } opacity-40 mix-blend-overlay`}
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;
