import { motion } from "framer-motion";
import { useState } from "react";
import BlogPopup from "./BlogPopup";

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

const BlogCard = ({
  title,
  date,
  image,
  delay = 0,
  content,
  projectDetails,
}: BlogCardProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <motion.article
        className="group relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay * 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
        onClick={() => setIsPopupOpen(true)}
      >
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4 sm:p-6">
          <time className="text-xs text-gray-400 mb-2 block">{date}</time>
          <h3 className="text-lg sm:text-xl font-medium text-white group-hover:text-gradient transition-colors duration-300 line-clamp-2">
            {title}
          </h3>

          <motion.div
            className="mt-4 text-xs text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center group/link"
            whileHover={{ x: 5 }}
          >
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 ml-1 transition-transform duration-300 group-hover/link:translate-x-1"
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
