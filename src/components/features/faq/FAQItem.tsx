import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { useTheme } from '@/lib/theme-context';
import { FAQItemProps } from '@/types/components';

const FAQItem = ({ question, answer, delay = 0 }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <motion.div
      className="mb-4 last:mb-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group w-full rounded-xl border p-4 text-left backdrop-blur-sm transition-all duration-300 sm:p-6 ${
          isDark
            ? 'border-white/5 bg-black/30 hover:border-white/10'
            : 'border-slate-200 bg-white/50 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <h3
            className={`text-lg font-medium transition-colors duration-300 sm:text-xl ${
              isDark
                ? 'text-white group-hover:text-blue-400'
                : 'text-slate-900 group-hover:text-blue-600'
            }`}
          >
            {question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <ChevronDown
              className={`h-5 w-5 transition-colors duration-300 ${
                isDark
                  ? 'text-gray-400 group-hover:text-white'
                  : 'text-slate-400 group-hover:text-slate-900'
              }`}
            />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 1000 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 sm:p-6">
              <p
                className={`whitespace-pre-wrap leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-slate-600'
                }`}
              >
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;
