import DarkModeToggler from 'components/DarkModeToggler';
import React from 'react';
import { RxInfoCircled } from 'react-icons/rx';

function DashboardHeader() {
  return (
    <div className="relative z-10 py-5 pl-16 pr-8 flex items-center justify-between bg-secondary dark:bg-gray-950 header transition-all duration-300 ease-in-out">
      <h3 className="text-lg text-gray-500 flex gap-x-2 items-center">
        <RxInfoCircled size={30} />
        No meeting is scheduled today!
      </h3>
      <DarkModeToggler />
    </div>
  );
}

export default DashboardHeader;
