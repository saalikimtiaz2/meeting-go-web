import React from 'react';

export const TileButton = ({
  iconClassName,
  onClick,
  icon,
  text,
}: {
  iconClassName?: string;
  text?: string;
  icon?: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={` flex flex-col items-center justify-center whitespace-nowrap`}
    >
      <div
        className={`${iconClassName} h-10 w-10 rounded-full flex items-center justify-center text-2xl text-white bg-opacity-50 hover:bg-opacity-100 ease-in-out duration-300 transition-all ${
          text && 'mb-1'
        }`}
      >
        {icon}
      </div>
      {text}
    </button>
  );
};