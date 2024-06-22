import React from 'react';

export const Lead = ({
  children,
  className,
  size = 'xl',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}) => {
  return (
    <h2
      className={`text-gray-400 dark:text-gray-500 text-${size} font-Montserrat ${className}`}
    >
      {children}
    </h2>
  );
};

export const Heading2 = ({
  children,
  className,
  size = 'xl',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}) => {
  return (
    <h2
      className={`text-gray-600 dark:text-gray-400 text-${size} font-Oswald ${className}`}
    >
      {children}
    </h2>
  );
};
