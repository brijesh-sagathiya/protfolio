import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 backdrop-blur-sm" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Ready to start your project?
          </h2>

          <p className="text-gray-400 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Let's work together to create something amazing. I'm always open to
            discussing new projects and opportunities.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#contact"
              className="px-8 py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>

            <motion.a
              href="#projects"
              className="px-8 py-4 rounded-full bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium text-sm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
};

export default CallToAction;
