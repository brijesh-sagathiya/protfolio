import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  delay?: number;
}

const FAQItem = ({ question, answer, delay = 0 }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="mb-4 last:mb-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 sm:p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300 group"
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg sm:text-xl font-medium text-white group-hover:text-gradient transition-colors duration-300">
            {question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-6 pt-0">
              <p className="text-gray-400 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;
