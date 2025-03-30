import { useState, useCallback } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/lib/theme-context';

const Contact = () => {
  const { toast } = useToast();
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('submitting');
      setErrorMessage(null);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to send message');

        setFormData({ name: '', email: '', message: '' });
        setStatus('submitted');

        toast({
          title: 'Message Sent Successfully!',
          description: "Thank you for reaching out. I'll get back to you soon.",
          className: `backdrop-blur-md ${
            isDark
              ? 'bg-white/10 border-green-500 text-white/90'
              : 'bg-slate-100 border-green-500 text-slate-900'
          }`,
          duration: 2500,
        });
      } catch (error) {
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');

        toast({
          title: 'Failed to Send Message',
          description: 'There was an error sending your message. Please try again.',
          variant: 'destructive',
          className: `${
            isDark
              ? 'bg-red-500/10 border-red-500/20 text-red-400'
              : 'bg-red-100 border-red-200 text-red-600'
          }`,
          duration: 2500,
        });
      }
    },
    [formData, toast, isDark]
  );

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status !== 'submitted' ? (
          <>
            <motion.div
              className="mx-auto mb-8 max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2
                className={`mb-4 text-3xl font-bold sm:text-4xl ${
                  isDark
                    ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400'
                    : 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600'
                } bg-clip-text text-transparent`}
              >
                Let's Work Together
              </h2>
              <p
                className={`mx-auto mb-6 max-w-2xl text-lg ${isDark ? 'text-gray-400' : 'text-slate-600'}`}
              >
                I'm always open to discussing new projects and opportunities. Let's create something
                amazing together.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="relative z-10 mx-auto max-w-2xl space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  label="Name"
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  isDark={isDark}
                />
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  isDark={isDark}
                />
              </div>

              <FormField
                label="Message"
                id="message"
                type="textarea"
                value={formData.message}
                onChange={handleChange}
                isDark={isDark}
              />

              {status === 'error' && (
                <p
                  className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}
                  aria-live="polite"
                >
                  {errorMessage}
                </p>
              )}

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className={`w-full rounded-md px-12 py-4 font-medium transition-colors md:w-[300px] ${
                    isDark
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>
              </motion.div>
            </motion.form>
          </>
        ) : (
          <SuccessMessage isDark={isDark} />
        )}
      </AnimatePresence>

      {/* Decorative background element */}
      <motion.div
        className={`absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r blur-3xl ${
          isDark ? 'from-blue-500/20 to-blue-400/20' : 'from-blue-600/20 to-blue-500/20'
        }`}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

// Reusable Form Field Component
const FormField = ({
  label,
  id,
  type,
  value,
  onChange,
  isDark,
}: {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isDark: boolean;
}) => (
  <div className="space-y-2">
    <label
      htmlFor={id}
      className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}
    >
      {label}
    </label>
    {type === 'textarea' ? (
      <Textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
        placeholder={`Your ${label.toLowerCase()}...`}
        className={`min-h-[150px] ${
          isDark
            ? 'border-white/20 bg-slate-800/50 text-white placeholder:text-gray-400'
            : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400'
        }`}
      />
    ) : (
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={`Your ${label.toLowerCase()}`}
        className={`${
          isDark
            ? 'border-white/20 bg-slate-800/50 text-white placeholder:text-gray-400'
            : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400'
        }`}
      />
    )}
  </div>
);

// Success Message Component
const SuccessMessage = ({ isDark }: { isDark: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className={`mx-auto max-w-2xl space-y-6 rounded-2xl border p-8 text-center backdrop-blur-sm ${
      isDark ? 'border-white/10 bg-slate-800/50' : 'border-slate-200 bg-white/50'
    }`}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
    >
      <CheckCircle
        className={`mx-auto h-16 w-16 ${isDark ? 'text-green-400' : 'text-green-500'}`}
      />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3
        className={`mb-3 text-2xl font-bold ${
          isDark
            ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400'
            : 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600'
        } bg-clip-text text-transparent`}
      >
        Thank You for Reaching Out!
      </h3>
      <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
        I'll get back to you within 24-48 hours.
      </p>
    </motion.div>
  </motion.div>
);

export default Contact;
