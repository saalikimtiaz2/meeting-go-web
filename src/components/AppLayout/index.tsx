import AppHeader from 'components/Headers/AppHeader';
import React from 'react';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white">
      <AppHeader />
      {children}
    </div>
  );
}

export default AppLayout;
