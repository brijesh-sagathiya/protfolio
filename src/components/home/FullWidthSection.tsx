import { memo } from 'react';

import { FullWidthSectionProps } from '@/types/components';

const FullWidthSection = memo(({ id, children }: FullWidthSectionProps) => (
  <section
    id={id}
    className="py-16 will-change-transform sm:py-20"
    style={{
      willChange: 'transform, opacity',
      contain: 'layout',
    }}
  >
    {children}
  </section>
));

export default FullWidthSection;
