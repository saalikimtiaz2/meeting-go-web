import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import DialogBox from 'components/HeadlessUI/DialogBox';
import { useAuth } from 'context/AuthContext';
import React, { useState } from 'react';
import { IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5';
import {
  MdKeyboardArrowRight,
  MdOutlineHelpOutline,
  MdSupportAgent,
} from 'react-icons/md';
import { PiUserLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    icon: <PiUserLight size={24} className="fill-gray-600 dark:fill-white/50" />,
    title: 'Profile',
    link: '/profile',
    shortcut: '⌘U',
  },
  {
    icon: <IoSettingsOutline size={24} className="fill-gray-600 dark:fill-white/50" />,
    title: 'Setting',
    link: '/setting',
    shortcut: '⌘M',
  },
  {
    icon: <MdSupportAgent size={24} className="fill-gray-600 dark:fill-white/50" />,
    title: 'Support',
    link: '/support',
    shortcut: '⌘L',
  },
  {
    icon: <MdOutlineHelpOutline size={24} className="fill-gray-600 dark:fill-white/50" />,
    title: 'Help',
    link: '/help',
    shortcut: '⌘H',
  },
];

function ProfileDropdown({
  isCollapsed,
  anchor,
}: {
  isCollapsed?: boolean;
  anchor: any;
}) {
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);

  const { user } = useAuth();

  const { signOut } = useAuth();

  const toggleDialogOpen = () => {
    setIsDialogOpened((prevState) => !prevState);
  };

  return (
    <div>
      <DialogBox isOpen={isDialogOpened} closeDialog={toggleDialogOpen}>
        <h2 className="text-2xl text-red-500 font-semibold">Logout?</h2>
        Are you sure you want to logout?
        <div className="flex items-center justify-end gap-x-6">
          <button
            onClick={toggleDialogOpen}
            className="w-32 py-2 rounded-md hover:bg-opacity-100 bg-opacity-70 bg-gray-500 text-white"
          >
            No
          </button>
          <button
            onClick={toggleDialogOpen}
            className="w-32 py-2 rounded-md hover:bg-opacity-100 bg-opacity-70 bg-red-500 text-white"
          >
            Yes
          </button>
        </div>
      </DialogBox>
      <Menu>
        <MenuButton className=" border border-gray-500 w-full py-1 px-1 rounded-full flex items-center justify-between gap-x-4 text-medium hover:border-primary hover:bg-primary hover:text-white transition-all ease-in-out duration-300 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          <div className="flex items-center gap-x-2">
            <img
              src={user?.user_metadata?.avatar_url}
              className="h-10 w-10 rounded-full object-cover object-center"
              alt="avatar"
            />
            <p
              className={`${
                isCollapsed && 'absolute -left-[250px] font-medium  capitalize'
              }`}
            >
              {user?.user_metadata?.name}
            </p>
          </div>
          <span className={`${isCollapsed && 'absolute -left-[250px] font-medium'}`}>
            <MdKeyboardArrowRight
              size={30}
              className="text-gray-600 dark:text-white/50"
            />
          </span>
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor={anchor}
            className="w-52 z-50 origin-top-right rounded-xl border border-white/5 bg-white shadow-2xl dark:bg-gray-700 text-sm/6 text-black dark:text-white  [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            <div className="p-2 mb-2  bg-gray-100 dark:bg-gray-600">
              <div className="flex items-center gap-x-2">
                <img
                  src={user?.user_metadata?.avatar_url}
                  className="h-10 w-10 rounded-full object-cover object-center"
                  alt="avatar"
                />
                <p className={`text-gray-800 dark:text-gray-200 leading-none capitalize`}>
                  {user?.user_metadata?.name}
                  <span className="block text-sm font-light text-gray-400 lowercase">
                    {user?.email}
                  </span>
                </p>
              </div>
            </div>
            {menuItems.map((item) => (
              <MenuItem key={item.title}>
                <Link
                  to={item.link}
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-primary/50"
                >
                  {item.icon}
                  {item.title}
                  <kbd className="ml-auto hidden font-sans text-xs text-gray-600 dark:text-white/50 group-data-[focus]:inline">
                    {item.shortcut}
                  </kbd>
                </Link>
              </MenuItem>
            ))}

            <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-600">
              <MenuItem>
                <button
                  onClick={signOut}
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-red-500 text-red-500 hover:text-white"
                >
                  <IoLogOutOutline size={24} />
                  Logout
                  <kbd className="ml-auto hidden font-sans text-xs group-data-[focus]:inline">
                    ⌘L
                  </kbd>
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}

export default ProfileDropdown;
