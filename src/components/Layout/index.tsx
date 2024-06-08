import Header from 'components/Header';
import React from 'react';

import Sidebar from '../Sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="grow ">
        <Header />
        <div className="p-8 bg-white">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
