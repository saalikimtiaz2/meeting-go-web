import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import React, { FC } from 'react';

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
              <DialogPanel className="max-w-lg w-full space-y-4 rounded-xl xs:p-6 lg:p-12  bg-secondary dark:bg-gray-700 text-black dark:text-gray-200">
                {title && <DialogTitle className="font-bold">{title}</DialogTitle>}
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
