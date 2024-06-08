import React from 'react';

import Sidebar from '../Sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="grow">{children}</div>
    </div>
  );
}

export default Layout;
