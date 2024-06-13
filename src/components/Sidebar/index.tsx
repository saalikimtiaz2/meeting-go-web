import ProfileDropdown from 'components/HeadlessUI/ProfileDropdown';
import React, { useEffect, useState } from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { GoSidebarCollapse } from 'react-icons/go';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineHelpOutline, MdSupportAgent } from 'react-icons/md';
import { PiUsersThree, PiVideoConferenceThin } from 'react-icons/pi';
import { SiGoogledisplayandvideo360 } from 'react-icons/si';
import { NavLink } from 'react-router-dom';

function SideBar({ disableNav }: { disableNav?: boolean }) {
  const getSidebarOpenedFromLocalStorage = () => {
    const value = localStorage.getItem('sidebarOpened');
    return value === 'true'; // Returns true if value is 'true', otherwise false
  };

  const [isCollapsed, setIsCollapsed] = useState(getSidebarOpenedFromLocalStorage());

  useEffect(() => {
    if (disableNav) {
      setIsCollapsed(true);
    }
  }, []);

  // Use useEffect to ensure localStorage is synced if isCollapsed changes elsewhere
  useEffect(() => {
    localStorage.setItem('sidebarOpened', isCollapsed.toString());
  }, [isCollapsed]);

  const toggleCollapsed = () => {
    setIsCollapsed((prevState) => !prevState);
    localStorage.setItem('sidebarOpened', isCollapsed.toString());
  };

  const menuItem = [
    {
      icon: <IoHomeOutline size={isCollapsed ? 30 : 26} />,
      title: 'Dashboard',
      link: '/',
    },
    {
      icon: <PiVideoConferenceThin size={isCollapsed ? 30 : 26} />,
      title: 'Meeting',
      link: '/meeting',
    },
    {
      icon: <IoIosNotificationsOutline size={isCollapsed ? 30 : 26} />,
      title: 'Notifications',
      link: '/notifications',
    },
    {
      icon: <CiCalendarDate size={isCollapsed ? 30 : 26} />,
      title: 'Schedule',
      link: '/schedule',
    },
    {
      icon: <PiUsersThree size={isCollapsed ? 30 : 26} />,
      title: 'Contacts',
      link: '/contacts',
    },
  ];

  const generalItems = [
    {
      icon: <IoSettingsOutline size={isCollapsed ? 26 : 22} />,
      title: 'Settings',
      link: '/settings',
    },
    {
      icon: <MdSupportAgent size={isCollapsed ? 26 : 22} />,
      title: 'Support',
      link: '/support',
    },
    {
      icon: <MdOutlineHelpOutline size={isCollapsed ? 26 : 22} />,
      title: 'Help',
      link: '/help',
    },
  ];

  return (
    <div className="sticky top-0 h-screen  py-5 transition-all ease-in-out duration-300 bg-secondary dark:bg-gray-950 border-none z-50 flex flex-col justify-between">
      <button
        onClick={toggleCollapsed}
        className={`h-10 w-10 hover:scale-[1.1] rounded-full border border-gray-200 dark:border-gray-700  text-gray-500 text-lg bg-white dark:bg-gray-800 absolute top-4 -right-5 flex items-center justify-center transition-all ease-in-out duration-300 hover:bg-gray-100 ${
          isCollapsed ? 'rotate-0' : 'rotate-180'
        }`}
      >
        <GoSidebarCollapse size={24} />
      </button>
      <div>
        <div className="flex items-center gap-1 font-semibold text-primary relative text-xl mb-10 justify-center pb-4 ">
          <SiGoogledisplayandvideo360 size={32} />
          <span className={`${isCollapsed && 'absolute -left-[250px] '}`}>MeetingGo</span>
        </div>

        <ul className="pt-20">
          <li className="text-gray-400 dark:text-gray-700 text-md font-Oswald ml-8 mb-2">
            Menu
          </li>
          {menuItem.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  (isActive
                    ? 'text-accent dark:text-accent selected bg-gradient-to-l from-[#debcff] dark:from-[#43285f] from-10% to-transparent to-20 '
                    : '') +
                  ` flex items-center gap-x-4 text-lg pl-8 mb-2 py-2 hover:text-accent hover:cursor-pointer trasition-all ease-in-out duration-300 dark:text-white ${
                    isCollapsed ? 'pr-8 ' : 'pr-16'
                  }`
                }
              >
                {item.icon}
                <span
                  className={`${isCollapsed && 'absolute -left-[250px] font-medium'}`}
                >
                  {item.title}
                </span>
              </NavLink>
            </li>
          ))}
          <li className="text-gray-400 dark:text-gray-700 text-md font-Oswald ml-8 mb-2 mt-20">
            General
          </li>
          {generalItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  (isActive
                    ? 'text-accent dark:text-accent selected bg-gradient-to-l from-[#debcff] dark:from-[#43285f] from-10% to-transparent to-20 '
                    : '') +
                  ` flex items-center gap-x-4 text-sm pl-8 mb-2 py-1 hover:text-accent hover:cursor-pointer trasition-all ease-in-out duration-300 dark:text-white ${
                    isCollapsed ? 'pr-8 ' : 'pr-16'
                  }`
                }
              >
                {item.icon}
                <span
                  className={`${isCollapsed && 'absolute -left-[250px] font-medium'}`}
                >
                  {item.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="dark:text-gray-200 px-6">
        <ProfileDropdown isCollapsed={isCollapsed} anchor="bottom start" />
      </div>
    </div>
  );
}

export default SideBar;
