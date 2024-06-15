import DashboardHeader from 'components/Headers/DashboardHeader';
import React from 'react';

import Sidebar from '../Sidebar';

function DashboardLayout({
  children,
  disableNav,
}: {
  children: React.ReactNode;
  disableNav?: boolean;
}) {
  return (
    <div className="flex">
      <Sidebar disableNav={disableNav} />
      <div className="grow bg-gray-100 dark:bg-slate-900 min-h-screen text-gray-900 dark:text-gray-200 overflow-x-hidden">
        <DashboardHeader />
        <div className="p-8 ">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;