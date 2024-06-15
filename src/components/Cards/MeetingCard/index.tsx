import Avatar from 'components/MagicUI/Avatar';
import AvatarCircles from 'components/MagicUI/AvatarGroup';
import React, { FC } from 'react';
import { MdMoreVert } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';

type meetingCardProps = {
  title: string;
  time: string;
  tags: string[];
};

const MeetingCard: FC<meetingCardProps> = ({ title, time, tags }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl w-full hover:shadow-xl transition-all ease-in-out duration-300">
        <div className="p-4">
          <div className="flex items-center gap-x-4">
            <Avatar size={12} />
            <div className="grow flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold">{title || <Skeleton />}</h4>
                <p className="text-gray-500 text-xs mt-1">{time || <Skeleton />}</p>
              </div>
              <button className="text-gray-500">
                <MdMoreVert size={24} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
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
                {tag || <Skeleton />}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-800 dark:text-gray-300 mt-2">
            {`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus facilis
            rem tenetur saepe ea beatae?` || <Skeleton count={2} />}
          </p>
        </div>
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-x-2">
          <AvatarCircles numPeople={5} />
          <button className="py-1 px-4 text-sm border rounded-lg text-primary border-primary bg-primary/20 hover:bg-primary hover:text-white transition-all ease-in-out duration-300">
            View Details
          </button>
        </div>
      </div>
    </>
  );
};

export default MeetingCard;
