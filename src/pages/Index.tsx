import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import SkillCategory from "../components/SkillCategory";
import ExperienceItem from "../components/ExperienceItem";
import BlogCard from "../components/BlogCard";
import FAQItem from "../components/FAQItem";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Background from "../components/Background";
import {
  projects,
  skillCategories,
  experienceItems,
  blogPosts,
  faqs,
} from "../data";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProjectToggle = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Background />
      <Navbar transparent />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center relative pt-20"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-3xl md:text-5xl font-bold mb-6 text-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Creating beautiful digital experiences with precision and care
            </motion.h1>

            <motion.p
              className="text-gray-400 text-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Passionate designer and developer focused on crafting modern,
              responsive, and user-friendly digital solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.a
                href="#projects"
                className="px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>

              <motion.a
                href="#contact"
                className="px-6 py-3 rounded-full bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium text-sm transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M12 5v14"></path>
                <path d="M19 12l-7 7-7-7"></path>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl font-semibold mb-2">
              Technologies & Tools
            </h2>
            <p className="text-gray-400">Key technologies I work with</p>
          </motion.div>

          {skillCategories.map((category, index) => (
            <SkillCategory key={index} logos={category.logos} />
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl font-semibold mb-2">Featured Projects</h2>
            <p className="text-gray-400">Explore some of my recent work</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                delay={index}
                isExpanded={expandedProject === index}
                onToggle={() => handleProjectToggle(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl font-semibold mb-2">Experience</h2>
            <p className="text-gray-400">My professional journey</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {experienceItems.map((item, index) => (
              <ExperienceItem key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl font-semibold mb-2">Blog</h2>
            <p className="text-gray-400">Latest articles and insights</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl font-semibold mb-2">
              Frequently asked questions
            </h2>
            <p className="text-gray-400">Common questions about my work</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="contact">
        <CallToAction />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
