import { useRef, useState, useCallback, useEffect } from 'react';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, Star, Clock, CheckCircle, Zap, ArrowRight } from 'lucide-react';

import { useTheme } from '@/lib/theme-context';
import { ProjectCardProps } from '@/types/components';

const ProjectCard = ({ project, delay = 0, isExpanded = false, onToggle }: ProjectCardProps) => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [_contentHeight, setContentHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // This is used in JSX so keep it
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  const handleToggle = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      if (onToggle) {
        onToggle();
      }
    },
    [onToggle]
  );

  const handleExternalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="group relative z-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className={`relative z-20 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
          isDark
            ? isExpanded
              ? 'border-blue-500/50 bg-slate-900/50 shadow-lg shadow-blue-500/10'
              : 'border-slate-800/50 bg-slate-900/30 hover:border-slate-700/50'
            : isExpanded
              ? 'border-blue-500/50 bg-white/80 shadow-lg shadow-blue-500/10'
              : 'border-slate-200/50 bg-white/50 hover:border-slate-300/50'
        }`}
      >
        {/* Header - Always Visible */}
        <div
          className={`cursor-pointer p-6 transition-colors sm:p-8 ${
            isExpanded
              ? isDark
                ? 'border-b border-slate-800/50'
                : 'border-b border-slate-200/50'
              : ''
          }`}
          onClick={handleToggle}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handleToggle(e)}
          aria-expanded={isExpanded}
          aria-controls={`project-content-${project.title}`}
        >
          <div className="flex flex-col gap-4">
            {/* Title row with external link and role */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center justify-between gap-4">
                <h3
                  className={`text-xl font-medium transition-colors duration-300 sm:text-2xl ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {project.title}
                </h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-lg p-2 transition-colors ${
                      isDark
                        ? 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                        : 'bg-slate-100/50 text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                    }`}
                    onClick={handleExternalClick}
                    aria-label={`View ${project.title} project`}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`w-fit rounded-full px-3 py-1.5 text-sm ${
                    isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'
                  }`}
                >
                  {project.role}
                </span>
                <motion.button
                  className={`rounded-lg p-2 transition-all duration-300 ${
                    isDark
                      ? isExpanded
                        ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                      : isExpanded
                        ? 'bg-blue-500/20 text-blue-600 hover:bg-blue-500/30'
                        : 'bg-slate-100/50 text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                  }`}
                  animate={{
                    rotate: isExpanded ? 180 : 0,
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={handleToggle}
                  aria-label={isExpanded ? 'Collapse project details' : 'Expand project details'}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              ref={contentRef}
              id={`project-content-${project.title}`}
              className="relative z-30 overflow-hidden"
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{ maxHeight: 2000, opacity: 1 }}
              exit={{ maxHeight: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
                opacity: { duration: 0.2 },
              }}
              style={{ opacity: contentOpacity }}
            >
              <div className="space-y-6 p-6 pt-0 sm:p-8 sm:pt-0">
                {/* Content sections */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <h4 className={`font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    About the Project
                  </h4>
                  <p
                    className={`whitespace-pre-wrap leading-relaxed ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {project.description}
                  </p>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <h4 className={`font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        className={`rounded-full px-3 py-1 text-sm transition-colors duration-300 ${
                          isDark
                            ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-slate-100'
                            : 'bg-slate-100/50 text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.3 + index * 0.05,
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <h4 className={`font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    Key Achievements
                  </h4>
                  <ul className="space-y-3">
                    {project.achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        className={`group/item flex items-start gap-3 transition-colors ${
                          isDark
                            ? 'text-slate-400 hover:text-slate-200'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.5 + index * 0.1,
                        }}
                      >
                        <div className="mt-1 h-4 w-4 flex-shrink-0">
                          <ArrowRight
                            className={`h-4 w-4 transform opacity-0 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:opacity-100 ${
                              isDark ? 'text-blue-400' : 'text-blue-500'
                            }`}
                          />
                        </div>
                        <span className="flex-1 leading-relaxed">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Project Stats */}
                <motion.div
                  className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  {[
                    { icon: Clock, label: 'Timeline', value: '3 months' },
                    { icon: Star, label: 'Impact', value: 'High' },
                    { icon: CheckCircle, label: 'Status', value: 'Completed' },
                    { icon: Zap, label: 'Performance', value: 'Optimized' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className={`rounded-lg p-3 backdrop-blur-sm transition-colors ${
                        isDark
                          ? 'bg-slate-800/50 hover:bg-slate-700/50'
                          : 'bg-slate-100/50 hover:bg-slate-200/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div
                        className={`mb-1 flex items-center gap-2 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        <stat.icon className="h-4 w-4" />
                        <span className="text-xs">{stat.label}</span>
                      </div>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? 'text-slate-100' : 'text-slate-900'
                        }`}
                      >
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
