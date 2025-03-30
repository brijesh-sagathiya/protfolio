import { motion } from 'framer-motion';

import { footerLinks } from '@/data';
import { useTheme } from '@/lib/theme-context';

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer
      className={`border-t pb-8 pt-16 ${
        isDark ? 'border-white/10 bg-slate-900/50' : 'border-slate-200 bg-white/50'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerLinks.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3
                className={`mb-6 text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}
              >
                {column.title}
              </h3>
              <ul className="space-y-4">
                {column.links.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-xs transition-colors hover:underline ${
                        isDark
                          ? 'text-gray-400 hover:text-blue-400'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div
          className={`flex flex-col items-center justify-between border-t pt-8 md:flex-row ${
            isDark ? 'border-white/10' : 'border-slate-200'
          }`}
        >
          <motion.p
            className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-500'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            © {new Date().getFullYear()} Portfolio. Built with ❤️ by Brijesh Sagathiya.
          </motion.p>

          <motion.div
            className="mt-4 flex space-x-4 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {footerLinks[2].links.map(({ href, name }, _index) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {name}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
