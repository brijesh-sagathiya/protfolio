import { useState, useRef, useEffect } from 'react';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

import BlogPortal from '@/components/features/blog/BlogPortal';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useTheme } from '@/lib/theme-context';
import { BlogCardProps } from '@/types/components';

const BlogCard = ({ post, delay = 0 }: BlogCardProps) => {
  const [isInView, setIsInView] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <motion.article
        ref={cardRef}
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl sm:hover:scale-[1.02] ${
          isDark
            ? 'bg-gradient-to-b from-slate-800/50 to-transparent'
            : 'bg-gradient-to-b from-white/50 to-transparent'
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: delay * 0.1,
        }}
        viewport={{
          once: true,
          margin: '-50px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* Image Container */}
        <div className={`relative w-full overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
          {/* Background blur effect */}
          <motion.div
            className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat blur-2xl"
            style={{
              backgroundImage: `url(${post.image})`,
            }}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: isHovered ? 0.5 : 0.3 }}
            transition={{ duration: 0.3 }}
          />

          {/* Main image */}
          {isInView && (
            <div className="relative w-full">
              <OptimizedImage
                src={post.image}
                alt={post.title}
                aspectRatio="16/9"
                className="w-full"
                priority={true}
              />
            </div>
          )}

          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t opacity-60 transition-opacity duration-300 group-hover:opacity-80 ${
              isDark
                ? 'from-slate-900 via-slate-800/20 to-transparent'
                : 'from-white via-white/20 to-transparent'
            }`}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-between gap-4 p-6">
          {/* Date */}
          <div
            className={`flex items-center gap-2 text-sm font-medium ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <time>{post.date}</time>
          </div>

          {/* Title and Description */}
          <div className="space-y-3">
            <motion.h3
              className={`text-xl font-semibold transition-colors duration-300 sm:text-2xl ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              initial={{ opacity: 0.9 }}
              animate={{ opacity: isHovered ? 1 : 0.9 }}
            >
              {post.title}
            </motion.h3>
            <p
              className={`line-clamp-2 text-sm leading-relaxed sm:text-base ${
                isDark ? 'text-gray-400' : 'text-slate-600'
              }`}
            >
              {post.content.description}
            </p>
          </div>

          {/* Read More Button */}
          <motion.div
            className={`mt-4 inline-flex items-center gap-2 text-sm font-medium ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}
            initial={{ x: 0 }}
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            Read More
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </div>

        {/* Interactive hover effect */}
        <motion.div
          className={`absolute inset-0 rounded-2xl border-2 transition-colors duration-300 ${
            isDark
              ? 'border-blue-500/0 group-hover:border-blue-500/20'
              : 'border-blue-600/0 group-hover:border-blue-600/20'
          }`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.article>

      <BlogPortal
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title={post.title}
        date={post.date}
        image={post.image}
        content={post.content}
      />
    </>
  );
};

export default BlogCard;
