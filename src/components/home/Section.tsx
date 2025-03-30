import React, { JSX } from 'react';
import { memo } from 'react';

import { SectionProps } from '@/types/components';

/**
 * A reusable section component that provides consistent padding and container styling
 * @param {SectionProps} props - The component props
 * @returns {JSX.Element} A section element with consistent styling
 */
const Section = memo(
  ({ id, children, className = '' }: SectionProps): JSX.Element => (
    <section
      id={id}
      className={`py-16 will-change-transform sm:py-20 ${className}`}
      style={{
        willChange: 'transform, opacity',
        contain: 'layout',
      }}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  )
);

Section.displayName = 'Section';

export default Section;
