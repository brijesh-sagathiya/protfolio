import { useRef, useState, useEffect } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';

import { useTheme } from '@/lib/theme-context';
import { ExperienceItemProps } from '@/types/components';
const ExperienceItem = ({
  role,
  company,
  period,
  description,
  websiteUrl,
  technologies,
  projects,
  delay = 0,
}: ExperienceItemProps) => {
  const { isDark } = useTheme();
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [_contentHeights, setContentHeights] = useState<Record<string, number>>({});

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.3, 1], ['0%', '100%', '100%']);
  const dotScale = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  useEffect(() => {
    // Update content heights when projects change or when expanded state changes
    const updateContentHeights = () => {
      const newHeights: Record<string, number> = {};
      projects.forEach(project => {
        const element = document.getElementById(`project-content-${project.title}`);
        if (element) {
          newHeights[project.title] = element.scrollHeight;
        }
      });
      setContentHeights(newHeights);
    };

    updateContentHeights();
    // Add a small delay to ensure content is rendered
    const timeoutId = setTimeout(updateContentHeights, 50);
    return () => clearTimeout(timeoutId);
  }, [projects, expandedProject]);

  const handleProjectToggle = (projectTitle: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedProject(expandedProject === projectTitle ? null : projectTitle);
  };

  return (
    <motion.div
      ref={itemRef}
      className="group relative pb-16 pl-8 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Timeline line with animation */}
      <motion.div
        className={`absolute left-0 top-0 w-px origin-top ${
          isDark
            ? 'bg-gradient-to-b from-blue-500 to-blue-500/20'
            : 'bg-gradient-to-b from-blue-500 to-blue-500/10'
        }`}
        style={{ height: lineHeight }}
      />

      {/* Animated dot */}
      <motion.div
        className={`absolute left-[-4px] top-0 h-2 w-2 rounded-full ${
          isDark ? 'bg-blue-500' : 'bg-blue-500'
        }`}
        style={{ scale: dotScale }}
      />

      <motion.div className="space-y-6" style={{ opacity: opacity }}>
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              {/* Added min-w-0 to prevent text overflow */}
              <h3
                className={`group-hover:text-gradient break-words text-xl font-medium transition-colors duration-300 sm:text-2xl ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {role}
              </h3>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  {company}
                </p>
                {websiteUrl && (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-colors ${
                      isDark
                        ? 'text-blue-400 hover:text-blue-300'
                        : 'text-blue-600 hover:text-blue-500'
                    }`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
              <p
                className={`mb-4 max-w-2xl text-base leading-relaxed ${
                  isDark ? 'text-gray-500' : 'text-slate-600'
                }`}
              >
                {description}
              </p>
              <time className={`text-sm ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                {period}
              </time>
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                className={`neo-blur rounded-full px-3 py-1 text-xs transition-colors duration-300 ${
                  isDark ? 'text-gray-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: delay * 0.1 + index * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="space-y-4">
          <h4 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Key Projects
          </h4>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className={`relative z-20 overflow-hidden rounded-lg ${
                  isDark ? 'bg-white/5' : 'bg-slate-100/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className={`flex w-full touch-manipulation items-center justify-between px-4 py-3 transition-colors ${
                    isDark
                      ? 'hover:bg-white/5 active:bg-white/10'
                      : 'hover:bg-slate-200/50 active:bg-slate-300/50'
                  }`}
                  onClick={handleProjectToggle(project.title)}
                  aria-expanded={expandedProject === project.title}
                  aria-controls={`project-content-${project.title}`}
                >
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {project.title}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isDark ? 'text-gray-400' : 'text-slate-500'
                    } ${expandedProject === project.title ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {expandedProject === project.title && (
                    <motion.div
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
                    >
                      <div className="space-y-4 p-4 pt-0">
                        <div className="space-y-2">
                          <h5 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Description
                          </h5>
                          <p
                            className={`whitespace-pre-wrap leading-relaxed ${
                              isDark ? 'text-gray-400' : 'text-slate-600'
                            }`}
                          >
                            {project.description}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h5
                            className={`text-sm font-medium ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            Key Achievements:
                          </h5>
                          <ul className="space-y-2">
                            {project.achievements.map((achievement, i) => (
                              <motion.li
                                key={i}
                                className={`flex items-start gap-2 text-sm ${
                                  isDark ? 'text-gray-400' : 'text-slate-600'
                                }`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                              >
                                <span
                                  className={`mt-1 ${isDark ? 'text-blue-400' : 'text-blue-500'}`}
                                >
                                  •
                                </span>
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className={`rounded-full px-2 py-1 text-xs ${
                                isDark
                                  ? 'bg-white/10 text-gray-300'
                                  : 'bg-slate-200/50 text-slate-600'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceItem;
