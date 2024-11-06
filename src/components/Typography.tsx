// components/Typography.tsx

import React from 'react';
import clsx from 'clsx';

interface TypographyProps {
  variant?: string;
  gutterBottom?: boolean;
  className?: string; // Make className optional
  children: React.ReactNode;
  [x: string]: any; // Allow additional props
}

// Mapping between variant prop and HTML elements
const variantMapping: { [key: string]: keyof JSX.IntrinsicElements } = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
};

// Tailwind CSS classes corresponding to each variant
const variantClasses: { [key: string]: string } = {
  h1: 'text-5xl font-bold',
  h2: 'text-4xl font-bold',
  h3: 'text-3xl font-bold',
  h4: 'text-2xl font-bold',
  h5: 'text-xl font-semibold',
  h6: 'text-lg font-semibold',
  subtitle1: 'text-base font-medium',
  subtitle2: 'text-sm font-medium',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs',
  overline: 'text-xs uppercase',
};

const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  gutterBottom = false,
  className = '',
  children,
  ...props
}) => {
  const Component = variantMapping[variant] || 'p';

  return (
    <Component
      className={clsx(
        variantClasses[variant],
        gutterBottom && 'mb-4',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;