import React from 'react';

interface AvatarCirclesProps {
  className?: string;
  size?: number;
}

export default function AvatarCircles({ size = 10, className }: AvatarCirclesProps) {
  return (
    <img
      className={`h-${size} w-${size} rounded-full shadow-lg ${className}`}
      src="https://avatars.githubusercontent.com/u/16860528"
      alt=""
    />
  );
}
