import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

type historyCardProps = {
  title: string;
  time: string;
  day: number;
  month: string;
  tags: string[];
};

const HistoryCard: FC<historyCardProps> = ({ title, time, tags, day, month }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl w-full hover:shadow-xl transition-all ease-in-out duration-300">
        <div className="flex p-4 gap-x-4">
          <div className="font-Montserrat text-center text-black dark-text-white text-xs font-semibold bg-gray-200 border-gray-200 dark:bg-gray-600 border-2 dark:border-gray-600 rounded-md uppercase dark:text-white">
            {month}
            <div className="font-Montserrat bg-white dark:bg-gray-800 dark:bg-800 text-center text-2xl font-bold w-12 rounded-b-md pt-1">
              {day}
            </div>
          </div>
          <div className="grow">
            <h4 className="text-lg font-semibold">{title || <Skeleton />}</h4>
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-xs mt-1">{time || <Skeleton />}</p>
              <div className="flex items-center gap-2 mt-2">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className={`inline-block text-xs px-2 rounded-md font-medium bg-opacity-10 border ${
                      tag.toLowerCase() === 'project' &&
                      'border-green-500 bg-green-500 text-green-500'
                    } ${
                      tag.toLowerCase() === 'meeting' &&
                      'border-blue-500 bg-blue-500 text-blue-500'
                    } ${
                      tag.toLowerCase() === 'design' &&
                      'border-purple-500 bg-purple-500 text-purple-500'
                    } ${
                      tag.toLowerCase() === 'daily' &&
                      'border-orange-500 bg-orange-500 text-orange-500'
                    }
                  `}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryCard;
