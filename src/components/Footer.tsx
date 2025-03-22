import { motion } from 'framer-motion';

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { name: 'Home', href: '#home' },
      { name: 'Projects', href: '#projects' },
      { name: 'Skills', href: '#skills' },
      { name: 'Experience', href: '#experience' },
      { name: 'Blog', href: '#blog' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Projects',
    links: [
      { name: 'Portfolio Website', href: '#' },
      { name: 'E-Commerce Platform', href: '#' },
      { name: 'AI-Powered App', href: '#' },
      { name: 'Business Dashboard', href: '#' },
    ],
  },
  {
    title: 'Social Media',
    links: [
      { name: 'GitHub', href: 'https://github.com' },
      { name: 'LinkedIn', href: 'https://linkedin.com' },
      { name: 'Twitter', href: 'https://twitter.com' },
      { name: 'Instagram', href: 'https://instagram.com' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/10 pb-8 pt-16">
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
              <h3 className="mb-6 text-sm font-semibold text-white">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs text-gray-400 transition-colors hover:text-white hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row">
          <motion.p
            className="text-xs text-gray-500"
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
            {[
              { name: 'GitHub', href: 'https://github.com' },
              { name: 'LinkedIn', href: 'https://linkedin.com' },
              { name: 'Twitter', href: 'https://twitter.com' },
            ].map((social, index) => (
              <a
                key={social.name}
                href={social.href}
                className="text-gray-400 transition-colors hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
