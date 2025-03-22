import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Star, Zap, Activity } from 'lucide-react';
import React from 'react';

interface BlogPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  date: string;
  image: string;
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

const BlogPopup = ({
  isOpen,
  onClose,
  title,
  date,
  image,
  content,
  projectDetails,
}: BlogPopupProps) => {
  // Prevent body scroll when popup is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with centering container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Popup */}
            <motion.div
              className="my-8 flex max-h-[90vh] w-[95%] max-w-7xl overflow-hidden rounded-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Sidebar */}
              <motion.div
                className="flex w-80 flex-col overflow-y-auto border-r border-white/10 bg-black/80 p-6 backdrop-blur-xl"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-8">
                  <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                    <img src={image} alt={title} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="mr-2 h-4 w-4" />
                    <time>{date}</time>
                  </div>
                </div>

                {projectDetails && (
                  <div className="space-y-6">
                    {projectDetails.timeSpent && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-300">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>Time Spent</span>
                        </div>
                        <span className="text-blue-400">{projectDetails.timeSpent}</span>
                      </div>
                    )}

                    {projectDetails.rating && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-300">
                          <Star className="mr-2 h-4 w-4" />
                          <span>Rating</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < projectDetails.rating!
                                  ? 'fill-current text-yellow-400'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {projectDetails.efficiency && (
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-300">
                          <Zap className="mr-2 h-4 w-4" />
                          <span>Efficiency</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-800">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width: `${projectDetails.efficiency}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {projectDetails.progress && (
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-300">
                          <Activity className="mr-2 h-4 w-4" />
                          <span>Progress</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-800">
                          <div
                            className="h-full rounded-full bg-green-500"
                            style={{ width: `${projectDetails.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto">
                <div
                  className="relative min-h-full bg-black/95 p-8 backdrop-blur-xl sm:p-10"
                  onClick={e => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute right-6 top-6 rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white/20"
                  >
                    <X className="h-6 w-6 text-gray-300" />
                  </button>

                  {/* Content */}
                  <div className="prose prose-invert prose-lg max-w-none">
                    <p className="mb-8 text-lg leading-relaxed text-gray-200">
                      {content.description}
                    </p>

                    <ul className="mb-10 space-y-6">
                      {content.points.map((point, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-4 text-lg text-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="mt-1.5 text-2xl text-blue-400">•</span>
                          <span
                            dangerouslySetInnerHTML={{ __html: point }}
                            className="leading-relaxed"
                          />
                        </motion.li>
                      ))}
                    </ul>

                    {/* References */}
                    <div className="border-t border-white/10 pt-8">
                      <h3 className="mb-6 text-2xl font-semibold text-white">Further Reading</h3>
                      <ul className="space-y-4">
                        {content.references.map((ref, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <a
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center text-lg text-blue-400 transition-colors hover:text-blue-300"
                            >
                              {ref.title}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BlogPopup;
