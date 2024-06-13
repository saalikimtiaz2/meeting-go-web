import { Transition, TransitionChild } from '@headlessui/react';
import { Heading2 } from 'components/Typography/Heading';
import React, { FC } from 'react';
import { MdOutlineClose } from 'react-icons/md';

type DrawerProps = {
  isOpen: boolean;
  closeDrawer: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
};

const Drawer: FC<DrawerProps> = ({ isOpen, closeDrawer, children, className, title }) => {
  return (
    <Transition appear show={isOpen}>
      <TransitionChild
        enter="ease-out duration-300"
        enterFrom="opacity-0  translate-x-full"
        enterTo="opacity-100  translate-x-0"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-full"
      >
        <div
          className={`absolute -top-4 right-0 ${
            isOpen ? '' : 'hidden'
          } mt-20 h-full w-max bg-white dark:bg-gray-950 shadow-xl  ${className}`}
        >
          <div className="flex items-center justify-between mb-10">
            {title && <Heading2>{title}</Heading2>}
            <button onClick={closeDrawer} type="button">
              <MdOutlineClose size={24} />
            </button>
          </div>
          {children}
        </div>
      </TransitionChild>
    </Transition>
  );
};

export default Drawer;
