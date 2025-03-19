import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import {
  ChevronDown,
  ExternalLink,
  Star,
  Clock,
  CheckCircle,
  Zap,
  ArrowRight,
} from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  role: string;
  achievements: string[];
  link?: string | null;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
  delay?: number;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const ProjectCard = ({
  project,
  delay = 0,
  isExpanded = false,
  onToggle,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  const handleToggle = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      onToggle?.();
    },
    [onToggle]
  );

  const handleExternalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className={`bg-black/30 backdrop-blur-sm rounded-xl border transition-all duration-300 ${
          isExpanded
            ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
            : "border-white/5 hover:border-white/10"
        }`}
      >
        {/* Header - Always Visible */}
        <div
          className={`p-6 sm:p-8 cursor-pointer transition-colors ${
            isExpanded ? "border-b border-white/5" : ""
          }`}
          onClick={handleToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleToggle(e)}
          aria-expanded={isExpanded}
          aria-controls={`project-content-${project.title}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl sm:text-2xl font-medium text-white group-hover:text-gradient transition-colors duration-300">
                {project.title}
              </h3>
              <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
                {project.role}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                  onClick={handleExternalClick}
                  aria-label={`View ${project.title} project`}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
              <motion.button
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isExpanded
                    ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleToggle}
                aria-label={
                  isExpanded
                    ? "Collapse project details"
                    : "Expand project details"
                }
              >
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              ref={contentRef}
              id={`project-content-${project.title}`}
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: contentHeight, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-6 sm:p-8 pt-0">
                <div className="space-y-6">
                  {/* Description */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <h4 className="text-white font-medium">
                      About the Project
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <h4 className="text-white font-medium">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 text-sm rounded-full bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-300"
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

                  {/* Achievements */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <h4 className="text-white font-medium">Key Achievements</h4>
                    <ul className="space-y-3">
                      {project.achievements.map((achievement, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-3 text-gray-400 group/item hover:text-white transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.5 + index * 0.1,
                          }}
                        >
                          <div className="flex-shrink-0 w-4 h-4 mt-1">
                            <ArrowRight className="w-4 h-4 text-blue-400 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform group-hover/item:translate-x-1" />
                          </div>
                          <span className="leading-relaxed flex-1">
                            {achievement}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Project Stats */}
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <motion.div
                      className="p-3 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs">Timeline</span>
                      </div>
                      <p className="text-sm font-medium text-white">3 months</p>
                    </motion.div>
                    <motion.div
                      className="p-3 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <Star className="w-4 h-4" />
                        <span className="text-xs">Impact</span>
                      </div>
                      <p className="text-sm font-medium text-white">High</p>
                    </motion.div>
                    <motion.div
                      className="p-3 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs">Status</span>
                      </div>
                      <p className="text-sm font-medium text-white">
                        Completed
                      </p>
                    </motion.div>
                    <motion.div
                      className="p-3 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <Zap className="w-4 h-4" />
                        <span className="text-xs">Performance</span>
                      </div>
                      <p className="text-sm font-medium text-white">
                        Optimized
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
