import { motion } from 'framer-motion';
import { useState } from 'react';
import BlogPopup from './BlogPopup';

interface BlogCardProps {
  title: string;
  date: string;
  image: string;
  delay?: number;
  content: {
    description: string;
    points: string[];
    references: {
      title: string;
      url: string;
    }[];
  };
  projectDetails?: {
    timeSpent?: string;
    rating?: number;
    efficiency?: number;
    progress?: number;
  };
}

const BlogCard = ({ title, date, image, delay = 0, content, projectDetails }: BlogCardProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <motion.article
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-black/30 backdrop-blur-sm transition-all duration-300 hover:border-white/10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay * 0.1 }}
        viewport={{ once: true, margin: '-100px' }}
        onClick={() => setIsPopupOpen(true)}
      >
        <div className="relative h-48 overflow-hidden sm:h-56">
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="p-4 sm:p-6">
          <time className="mb-2 block text-xs text-gray-400">{date}</time>
          <h3 className="group-hover:text-gradient line-clamp-2 text-lg font-medium text-white transition-colors duration-300 sm:text-xl">
            {title}
          </h3>

          <motion.div
            className="group/link mt-4 inline-flex items-center text-xs text-blue-400 transition-colors hover:text-blue-300"
            whileHover={{ x: 5 }}
          >
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.article>

      <BlogPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={title}
        date={date}
        image={image}
        content={content}
        projectDetails={projectDetails}
      />
    </>
  );
};

export default BlogCard;
