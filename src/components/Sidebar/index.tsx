import React, { useState } from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { GoSidebarCollapse } from 'react-icons/go';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { PiVideoConferenceThin } from 'react-icons/pi';
import { SiGoogledisplayandvideo360 } from 'react-icons/si';
import { NavLink } from 'react-router-dom';

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const menuItem = [
    { icon: <IoHomeOutline size={isCollapsed ? 30 : 26} />, title: 'Home', link: '/' },
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
      icon: <IoSettingsOutline size={isCollapsed ? 30 : 26} />,
      title: 'Settings',
      link: '/settings',
    },
  ];

  return (
    <div
      className={`relative h-screen  py-5 border-r border-gray-200 transition-all ease-in-out duration-300`}
    >
      <div className="flex items-center gap-1 font-semibold text-primary relative text-xl mb-10 justify-center border-b border-gray-100 pb-4">
        <SiGoogledisplayandvideo360 size={32} />
        <span className={`${isCollapsed && 'absolute -left-[250px] '}`}>MeetingGo</span>
      </div>
      <button
        onClick={toggleCollapsed}
        className={`h-10 w-10 hover:scale-[1.1] rounded-full border border-gray-200 rotate-180 text-gray-500 text-lg bg-white absolute top-4 -right-5 flex items-center justify-center transition-all ease-in-out duration-300 hover:bg-gray-100 ${
          isCollapsed && 'rotate-0'
        }`}
      >
        <GoSidebarCollapse size={24} />
      </button>

      <ul className="pt-20">
        {menuItem.map((item) => (
          <li key={item.title}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                (isActive ? 'text-accent selected bg-accent bg-opacity-10' : '') +
                ` flex items-center gap-x-4 text-lg pl-8 mb-8 py-2 hover:text-accent hover:cursor-pointer trasition-all ease-in-out duration-300 ${
                  isCollapsed ? 'pr-8 ' : 'pr-16'
                }`
              }
            >
              {item.icon}
              <span className={`${isCollapsed && 'absolute -left-[250px] font-medium'}`}>
                {item.title}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
