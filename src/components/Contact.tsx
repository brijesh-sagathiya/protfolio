import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();

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

        toast({ title: 'Success', description: 'Message sent successfully!' });
      } catch (error) {
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');

        toast({
          title: 'Error',
          description: 'Failed to send message. Please try again.',
          variant: 'destructive',
        });
      }
    },
    [formData, toast]
  );

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 backdrop-blur-sm" />

      <div className="container relative mx-auto px-6">
        <AnimatePresence mode="wait">
          {status !== 'submitted' ? (
            <>
              <motion.div
                className="mx-auto mb-12 max-w-3xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-gradient mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
                  Let's Work Together
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 sm:text-xl">
                  I'm always open to discussing new projects and opportunities. Let's create
                  something amazing together.
                </p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="relative z-10 mx-auto max-w-2xl space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    label="Name"
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <FormField
                    label="Email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <FormField
                  label="Message"
                  id="message"
                  type="textarea"
                  value={formData.message}
                  onChange={handleChange}
                />

                {status === 'error' && (
                  <p className="text-sm text-red-500" aria-live="polite">
                    {errorMessage}
                  </p>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full rounded-full bg-white px-8 py-4 font-medium text-black transition-colors hover:bg-gray-200 md:w-auto"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </Button>
                </motion.div>
              </motion.form>
            </>
          ) : (
            <SuccessMessage />
          )}
        </AnimatePresence>

        {/* Decorative background element */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
};

// Reusable Form Field Component
const FormField = ({
  label,
  id,
  type,
  value,
  onChange,
}: {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-white">
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
        className="min-h-[150px] border-white/20 bg-white/10"
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
        className="border-white/20 bg-white/10"
      />
    )}
  </div>
);

// Success Message Component
const SuccessMessage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="mx-auto max-w-2xl space-y-8 rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm"
  >
    <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
    <h3 className="text-2xl font-semibold text-white">Thank You for Reaching Out!</h3>
    <p className="text-gray-300">I'll get back to you within 24-48 hours.</p>
  </motion.div>
);

export default Contact;
