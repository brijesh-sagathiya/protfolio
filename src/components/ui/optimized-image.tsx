import * as React from 'react';

import { cn } from '../../lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  fallback?: React.ReactNode;
  aspectRatio?: string;
  priority?: boolean;
}

const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ className, containerClassName, alt, fallback, aspectRatio, priority, ...props }, ref) => {
    const [error, setError] = React.useState(false);

    if (error && fallback) {
      return <>{fallback}</>;
    }

    return (
      <div
        className={cn('relative overflow-hidden', containerClassName)}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <img
          ref={ref}
          alt={alt || ''}
          className={cn('object-cover', className)}
          onError={() => setError(true)}
          loading={priority ? 'eager' : 'lazy'}
          {...props}
        />
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export { OptimizedImage };
