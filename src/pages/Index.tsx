import { useState, useEffect, lazy, Suspense, useCallback } from 'react';

/* Framer Motion */
import { motion } from 'framer-motion';
/* Helmet */
import { Helmet as ReactHelmet } from 'react-helmet-async';

/* Components */
import AnimatedBackground from '@/components/common/AnimatedBackground';
import Contact from '@/components/features/contact/Contact';
import DownloadCV from '@/components/features/DownloadCV';
import { fadeInUp, staggerContainer } from '@/components/home/animations';
import FullWidthSection from '@/components/home/FullWidthSection';
import LoadingFallback from '@/components/home/LoadingFallback';
import Section from '@/components/home/Section';
import SectionHeader from '@/components/home/SectionHeader';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
/* Data */
import { projects, skillCategories, experienceItems, blogPosts, faqs } from '@/data';
/* Theme */
import { useTheme } from '@/lib/theme-context';
/* Types */
import { Project } from '@/types';

// Lazy load components for better performance
const ProjectCard = lazy(() => import('../components/features/projects/ProjectCard'));
const SkillCategory = lazy(() => import('../components/features/skills/SkillCategory'));
const ExperienceItem = lazy(() => import('../components/features/experience/ExperienceItem'));
const BlogCard = lazy(() => import('../components/features/blog/BlogCard'));
const FAQItem = lazy(() => import('../components/features/faq/FAQItem'));

const Index = () => {
  const { isDark } = useTheme();
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [renderSettings, setRenderSettings] = useState({
    isReducedMotion: false,
    isMobile: false,
    isLoaded: false,
  });
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Enhanced theme-aware styles
  const themeStyles = {
    background: isDark
      ? 'bg-slate-900 text-white bg-gradient-to-br from-slate-900 to-slate-800'
      : 'bg-white text-slate-900 bg-gradient-to-br from-gray-50 to-white',
    text: {
      primary: isDark ? 'text-white hover:text-blue-300' : 'text-slate-900 hover:text-blue-600',
      secondary: isDark
        ? 'text-gray-400 hover:text-gray-300'
        : 'text-slate-600 hover:text-slate-700',
      gradient: isDark
        ? 'from-blue-400 via-blue-300 to-blue-400 hover:from-blue-300 hover:via-blue-200 hover:to-blue-300'
        : 'from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-400 hover:to-blue-500',
    },
    section: {
      header: isDark ? 'text-white' : 'text-slate-900',
      subtitle: isDark ? 'text-gray-400' : 'text-slate-600',
      title: {
        h1: 'text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl',
        h2: 'text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl',
        h3: 'text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl',
        subtitle: 'text-base font-medium tracking-tight sm:text-lg md:text-xl',
      },
    },
  };

  // Project toggle handler
  const handleProjectToggle = useCallback((projectTitle: string) => {
    setExpandedProjectId(prev => (prev === projectTitle ? null : projectTitle));
  }, []);

  // Performance and device detection
  const detectPerformancePreferences = useCallback(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    const updateSettings = () => {
      setRenderSettings(prev => ({
        ...prev,
        isReducedMotion: reducedMotionQuery.matches,
        isMobile: mobileQuery.matches,
      }));
    };

    updateSettings();
    reducedMotionQuery.addEventListener('change', updateSettings, { passive: true });
    mobileQuery.addEventListener('change', updateSettings, { passive: true });

    return () => {
      reducedMotionQuery.removeEventListener('change', updateSettings);
      mobileQuery.removeEventListener('change', updateSettings);
    };
  }, []);

  // Loading effect
  useEffect(() => {
    const cleanup = detectPerformancePreferences();

    // Add a minimum loading time to ensure the loading screen is visible
    const loadingTimer = setTimeout(() => {
      setIsInitialLoading(false);
      setRenderSettings(prev => ({ ...prev, isLoaded: true }));
    }, 2000);

    return () => {
      cleanup();
      clearTimeout(loadingTimer);
    };
  }, [detectPerformancePreferences]);

  // Initial loading state
  if (isInitialLoading || !renderSettings.isLoaded) {
    return <LoadingFallback />;
  }

  return (
    <>
      <ReactHelmet>
        <title>Brijesh Sagathiya | Portfolio</title>
        <meta name="description" content="Portfolio of Brijesh Sagathiya - Software Developer" />
      </ReactHelmet>
      <div
        className={`
          relative min-h-screen overflow-x-hidden 
          transition-colors duration-300 
          ${themeStyles.background}
        `}
        style={{
          contain: 'layout',
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
        }}
      >
        <AnimatedBackground />

        <Navbar transparent />

        <Suspense fallback={<LoadingFallback />}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
            style={{ willChange: 'transform' }}
          >
            <main className="relative z-10">
              {/* Hero Section */}
              <section
                id="home"
                className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-20 will-change-transform sm:pt-24 md:pt-28"
              >
                {/* Main Hero Content */}
                <div className="flex flex-1 flex-col items-center justify-center space-y-20 md:space-y-24">
                  <div className="mx-auto max-w-4xl space-y-8 text-center md:space-y-10">
                    <motion.h1
                      className={`
                        text-3xl font-medium tracking-tight 
                        transition-all duration-300 
                        sm:text-4xl md:text-5xl lg:text-6xl 
                        ${themeStyles.text.primary}
                      `}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      style={{ willChange: 'transform' }}
                    >
                      Crafting Digital Experiences
                      <br className="hidden sm:block" />
                      with Purpose
                    </motion.h1>

                    <motion.p
                      className={`
                        mx-auto max-w-2xl text-xs font-light italic 
                        transition-colors duration-300 
                        ${themeStyles.text.secondary} 
                        sm:text-sm md:text-base
                      `}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                      style={{ willChange: 'transform' }}
                    >
                      Full-stack developer • UI/UX enthusiast • Open source contributor
                    </motion.p>
                  </div>
                </div>

                {/* Download Resume Bar - Enhanced Version */}
                <motion.div
                  className="mt-8 w-full md:mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                  style={{ willChange: 'transform' }}
                >
                  <div className="px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-5xl transition-all duration-300 md:w-[75%] lg:w-[60%] xl:w-[50%]">
                      <DownloadCV />
                    </div>
                  </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 transform"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                  style={{ willChange: 'transform' }}
                >
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      times: [0, 0.5, 1],
                    }}
                  >
                    <svg
                      className={`
                        h-6 w-6
                        transition-colors duration-300 
                        ${
                          isDark
                            ? 'text-gray-400/40 hover:text-gray-400/60'
                            : 'text-slate-400/40 hover:text-slate-400/60'
                        }
                      `}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </section>

              {/* Skills Section - Added more vertical spacing */}
              <FullWidthSection id="skills">
                <div className="container mx-auto mb-10 px-4">
                  <SectionHeader
                    title="Technologies & Tools"
                    subtitle="Key technologies I work with"
                    titleClassName={`
              ${themeStyles.section.title.h3}
              transition-colors duration-300 
              ${themeStyles.section.header}
            `}
                    subtitleClassName={`
              ${themeStyles.section.title.subtitle}
              transition-colors duration-300 
              ${themeStyles.section.subtitle}
            `}
                  />
                </div>
                <div className="space-y-8 sm:space-y-10 md:space-y-12">
                  {skillCategories.map((category, index) => (
                    <SkillCategory key={index} {...category} />
                  ))}
                </div>
              </FullWidthSection>

              {/* Projects Section - Improved spacing */}
              <Section id="projects" className="py-16 sm:py-20 md:py-24">
                <div className="mb-10 px-4">
                  <SectionHeader
                    title="Featured Projects"
                    subtitle="Explore some of my recent work"
                    titleClassName={`
              ${themeStyles.section.title.h3}
              transition-colors duration-300 
              ${themeStyles.section.header}
            `}
                    subtitleClassName={`
              ${themeStyles.section.title.subtitle}
              transition-colors duration-300 
              ${themeStyles.section.subtitle}
            `}
                  />
                </div>
                <motion.div
                  className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{
                    once: true,
                    margin: '-50px',
                    amount: 0.1,
                  }}
                  style={{ willChange: 'transform' }}
                >
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={project.title}
                      project={project as Project}
                      delay={index}
                      isExpanded={expandedProjectId === project.title}
                      onToggle={() => handleProjectToggle(project.title)}
                    />
                  ))}
                </motion.div>
              </Section>

              {/* Experience Section - Enhanced spacing */}
              <Section id="experience" className="py-16 sm:py-20 md:py-24">
                <div className="mb-10 px-4">
                  <SectionHeader
                    title="Professional Experience"
                    subtitle="My journey and contributions in the tech industry"
                    titleClassName={`
              ${themeStyles.section.title.h3}
              transition-colors duration-300 
              ${themeStyles.section.header}
            `}
                    subtitleClassName={`
              ${themeStyles.section.title.subtitle}
              transition-colors duration-300 
              ${themeStyles.section.subtitle}
            `}
                  />
                </div>
                <motion.div
                  className="mx-auto max-w-5xl space-y-6 sm:space-y-8 md:space-y-10"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{
                    once: true,
                    margin: '-50px',
                    amount: 0.1,
                  }}
                  style={{ willChange: 'transform' }}
                >
                  {experienceItems.map((item, index) => (
                    <ExperienceItem key={index} {...item} delay={index} />
                  ))}
                </motion.div>
              </Section>

              {/* Blog Section - Improved spacing */}
              <Section id="blog" className="py-16 sm:py-20 md:py-24">
                <div className="mb-10 px-4">
                  <SectionHeader
                    title="Blog"
                    subtitle="Latest articles and insights"
                    titleClassName={`
              ${themeStyles.section.title.h3}
              transition-colors duration-300 
              ${themeStyles.section.header}
            `}
                    subtitleClassName={`
              ${themeStyles.section.title.subtitle}
              transition-colors duration-300 
              ${themeStyles.section.subtitle}
            `}
                  />
                </div>
                <motion.div
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  style={{ willChange: 'transform' }}
                >
                  {blogPosts.map((post, index) => (
                    <motion.div key={index} variants={fadeInUp} custom={index}>
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </motion.div>
              </Section>

              {/* FAQ Section - Consistent spacing */}
              <Section id="faq" className="py-16 sm:py-20 md:py-24">
                <div className="mb-10 px-4">
                  <SectionHeader
                    title="FAQ"
                    subtitle="Common questions answered"
                    titleClassName={`
              ${themeStyles.section.title.h3}
              transition-colors duration-300 
              ${themeStyles.section.header}
            `}
                    subtitleClassName={`
              ${themeStyles.section.title.subtitle}
              transition-colors duration-300 
              ${themeStyles.section.subtitle}
            `}
                  />
                </div>
                <motion.div
                  className="mx-auto max-w-3xl space-y-6 sm:space-y-8"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  style={{ willChange: 'transform' }}
                >
                  {faqs.map((faq, index) => (
                    <motion.div key={index} variants={fadeInUp} custom={index}>
                      <FAQItem {...faq} />
                    </motion.div>
                  ))}
                </motion.div>
              </Section>

              {/* Contact & Download CV Section */}
              <Section id="contact">
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="container mx-auto max-w-4xl"
                  style={{ willChange: 'transform' }}
                >
                  <div className="space-y-8">
                    {/* Contact Form */}
                    <div
                      className={`rounded-2xl p-6 backdrop-blur-sm transition-colors duration-300 ${
                        isDark
                          ? 'bg-white/5 hover:bg-white/10'
                          : 'bg-slate-100/50 hover:bg-slate-100/70'
                      }`}
                    >
                      <Contact />
                    </div>

                    {/* Download CV */}
                    <div className="px-4">
                      <DownloadCV />
                    </div>
                  </div>
                </motion.div>
              </Section>
            </main>

            <motion.footer
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              style={{ willChange: 'transform' }}
            >
              <Footer />
            </motion.footer>
          </motion.div>
        </Suspense>
      </div>
    </>
  );
};

export default Index;
