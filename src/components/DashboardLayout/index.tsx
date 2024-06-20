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
    <div className="dashboard-layout-wrapper">
      <DashboardHeader disableNav={disableNav} />
      <div className="dashboard-container">
        <Sidebar disableNav={disableNav} />
        <div className="relative w-full h-screen grow px-0 bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-gray-200  pt-[70px] overflow-y-scroll">
          <div className="p-8 h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
