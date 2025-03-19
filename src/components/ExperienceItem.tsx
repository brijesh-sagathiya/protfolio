import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  description: string;
  websiteUrl?: string;
  technologies: string[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    role: string;
    achievements: string[];
  }[];
  delay?: number;
}

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
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    ["0%", "100%", "100%"]
  );
  const dotScale = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.div
      ref={itemRef}
      className="relative pl-8 pb-16 last:pb-0 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Timeline line with animation */}
      <motion.div
        className="absolute left-0 top-0 w-px bg-gradient-to-b from-blue-500 to-blue-500/20 origin-top"
        style={{ height: lineHeight }}
      />

      {/* Animated dot */}
      <motion.div
        className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-blue-500"
        style={{ scale: dotScale }}
      />

      <motion.div className="space-y-6" style={{ opacity: contentOpacity }}>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-medium text-white group-hover:text-gradient transition-colors duration-300">
              {role}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-lg text-gray-400">{company}</p>
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-base text-gray-500 leading-relaxed max-w-2xl mb-4">
              {description}
            </p>
            <time className="text-sm text-gray-500">{period}</time>
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <motion.span
              key={index}
              className="px-3 py-1 text-xs rounded-full neo-blur text-gray-300 hover:text-white transition-colors duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: delay * 0.1 + index * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Projects Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">Key Projects</h4>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-white/5 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
                  onClick={() =>
                    setExpandedProject(
                      expandedProject === project.title ? null : project.title
                    )
                  }
                >
                  <span className="text-white font-medium">
                    {project.title}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      expandedProject === project.title ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedProject === project.title && (
                  <motion.div
                    className="px-4 pb-4 space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-white">
                        Key Achievements:
                      </h5>
                      <ul className="space-y-2">
                        {project.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-400"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                          >
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceItem;
