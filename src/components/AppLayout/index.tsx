import AppHeader from 'components/Headers/AppHeader';
import React from 'react';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-secondary dark:bg-gray-900 dark:text-white">
      <AppHeader />
      {children}
    </div>
  );
}

export default AppLayout;
