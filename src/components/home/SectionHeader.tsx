import React, { JSX } from 'react';
import { memo } from 'react';

import { motion } from 'framer-motion';

import { SectionHeaderProps } from '@/types/components';

/**
 * A reusable section header component with animated title and subtitle
 * @param {SectionHeaderProps} props - The component props
 * @returns {JSX.Element} A motion.div containing the header content
 */
const SectionHeader = memo(
  ({ title, subtitle, titleClassName, subtitleClassName }: SectionHeaderProps): JSX.Element => {
    return (
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className={titleClassName || 'text-2xl font-semibold tracking-tight sm:text-3xl'}>
          {title}
        </h2>
        <p className={subtitleClassName || 'mt-4 text-base text-gray-500 sm:text-lg'}>{subtitle}</p>
      </motion.div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
