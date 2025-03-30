import { useState, useEffect, useCallback } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import ThemeToggle from '@/components/layout/ThemeToggle';
import { useTheme } from '@/lib/theme-context';
import { NavbarProps } from '@/types/components';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Blog', href: '#blog' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ transparent = false }: NavbarProps) => {
  const { isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navVisible, setNavVisible] = useState(true);

  const handleScroll = useCallback(() => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollingDown = currentScrollTop > lastScrollTop;
    const scrollingUp = currentScrollTop < lastScrollTop;
    const isBottom = currentScrollTop + windowHeight >= documentHeight - 100;

    setScrolled(currentScrollTop > 50);

    if (scrollingDown && currentScrollTop > 100 && !isBottom) {
      setNavVisible(false);
    } else if (scrollingUp || isBottom || currentScrollTop < 100) {
      setNavVisible(true);
    }

    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  }, [lastScrollTop]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <motion.nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        transparent && !scrolled
          ? 'bg-transparent'
          : isDark
            ? 'border-b border-white/10 bg-black/80 backdrop-blur-md'
            : 'border-b border-slate-200/80 bg-white/80 backdrop-blur-md'
      } ${!navVisible ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#home"
            className={`bg-gradient-to-r ${
              isDark ? 'from-purple-400 to-blue-400' : 'from-blue-600 to-indigo-600'
            } bg-clip-text text-xl font-bold text-transparent transition-all duration-300`}
          >
            Portfolio
          </a>

          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isDark
                    ? 'text-white/80 hover:text-white'
                    : 'text-slate-600/80 hover:text-slate-900'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              className={`transition-colors ${
                isDark ? 'text-white/80 hover:text-white' : 'text-slate-600/80 hover:text-slate-900'
              }`}
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`border-t ${isDark ? 'border-white/10' : 'border-slate-200/80'} md:hidden`}
            >
              <div className="space-y-4 py-4">
                {navLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`block text-sm font-medium transition-colors duration-200 ${
                      isDark
                        ? 'text-white/80 hover:text-white'
                        : 'text-slate-600/80 hover:text-slate-900'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
