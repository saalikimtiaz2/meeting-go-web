import {
  Description,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Heading2 } from 'components/Typography/Heading';
import React, { FC } from 'react';
import { MdClose } from 'react-icons/md';

type DialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
  title?: string;
  discription?: string;
  children?: React.ReactNode;
};

const DialogBox: FC<DialogProps> = ({
  isOpen,
  closeDialog,
  title,
  discription,
  children,
}) => {
  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog open={isOpen} onClose={closeDialog} className="relative z-50">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/30 dark:bg-white/20 backdrop-blur-sm">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)] translate-y-full"
              enterTo="opacity-100 transform-[scale(100%)] translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)] translate-y-0"
              leaveTo="opacity-0 transform-[scale(95%)] translate-y-full"
            >
              <DialogPanel className="relative max-w-lg w-full space-y-4 rounded-xl xs:p-6 bg-white dark:bg-gray-700 text-black dark:text-gray-200">
                <button
                  onClick={closeDialog}
                  className="absolute xs:top-10 xs:right-8 text-gray-500 hover:text-black dark:hover:text-white"
                >
                  <MdClose size={30} />
                </button>
                {title && <Heading2 className="mb-4">{title}</Heading2>}
                {discription && <Description>{discription}</Description>}
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DialogBox;
