import DarkModeToggler from 'components/DarkModeToggler';
import Logo from 'components/Logo';
import React from 'react';
import { RxInfoCircled } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';
function DashboardHeader({ disableNav = false }: { disableNav: boolean }) {
  return (
    <div className="fixed top-0 left-0 w-screen z-50 py-5 px-8 flex items-center justify-between bg-secondary dark:bg-gray-950 header transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-x-4">
        <NavLink
          to="/"
          className="flex items-center gap-x-2 text-primary font-medium text-2xl"
        >
          <Logo primaryOnly />
          InterAct
        </NavLink>
        {!disableNav && (
          <h3 className="text-lg text-gray-500 flex gap-x-2 items-center">
            <RxInfoCircled size={30} />
            No meeting is scheduled today!
          </h3>
        )}
      </div>
      <DarkModeToggler />
    </div>
  );
}

export default DashboardHeader;
