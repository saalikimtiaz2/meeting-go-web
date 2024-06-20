import React from 'react';

interface AvatarCirclesProps {
  className?: string;
  size?: number;
  url?: string;
}

export default function AvatarCircles({
  size = 10,
  className,
  url = 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg',
}: AvatarCirclesProps) {
  return (
    <img
      className={`h-${size} w-${size} rounded-full shadow-lg ${className}`}
      src={
        url === ''
          ? 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg'
          : url
      }
      alt=""
    />
  );
}
