import Header from 'components/Header';
import React from 'react';

import Sidebar from '../Sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="grow bg-gray-100 dark:bg-slate-800 min-h-screen">
        <Header />
        <div className="p-8 ">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
