import React from 'react';

export const Heading2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={`text-gray-400 dark:text-gray-500 text-xl font-Oswald ${className}`}>
      {children}
    </h2>
  );
};
