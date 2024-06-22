import React from 'react';
import { Tooltip } from 'react-tooltip';

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
    <>
      <Tooltip id="my-tooltip" />
      <button
        type="button"
        onClick={onClick}
        className={` flex flex-col items-center justify-center whitespace-nowrap`}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={text}
        data-tooltip-place="top"
      >
        <div
          className={`${iconClassName} h-10 w-10 rounded-full border flex items-center justify-center text-2xl text-white bg-opacity-50 hover:bg-opacity-100 ease-in-out duration-300 transition-all ${
            text && 'mb-1'
          }`}
        >
          {icon}
        </div>
      </button>
    </>
  );
};

export const MeetingButton = ({
  className,
  onClick,
  icon,
  text,
}: {
  className?: string;
  text?: string;
  icon?: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden xs:col-span-6 md:col-span-3 rounded-lg p-6 text-left text-xl ${className}`}
    >
      <div className="h-12 w-12 rounded-xl bg-black/20 backdrop-blur-sm flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="absolute bottom-6 right-6 opacity-10 -rotate-45 scale-[4]">
        {icon}
      </div>
      {text}
    </button>
  );
};
