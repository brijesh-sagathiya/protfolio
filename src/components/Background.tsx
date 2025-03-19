import { motion } from "framer-motion";

const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute w-full h-full bg-[#050505]"></div>
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
        animate={{
          backgroundColor: ["#2563eb", "#7c3aed", "#3b82f6", "#2563eb"],
          scale: [1, 1.1, 1.15, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full opacity-15 blur-3xl"
        animate={{
          backgroundColor: ["#14b8a6", "#0891b2", "#0d9488", "#14b8a6"],
          scale: [1.15, 1, 1.1, 1.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full opacity-10 blur-3xl"
        animate={{
          backgroundColor: ["#8b5cf6", "#6366f1", "#a855f7", "#8b5cf6"],
          scale: [1, 1.1, 1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />
    </div>
  );
};

export default Background;
