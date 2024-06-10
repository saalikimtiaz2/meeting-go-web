import DarkModeToggler from 'components/DarkModeToggler';
import React from 'react';

function Header() {
  return (
    <div className="relative py-5 px-8 flex items-center justify-between bg-secondary dark:bg-gray-950 header">
      <h3 className="text-lg text-black dark:text-white">Welcome Salik!</h3>
      <DarkModeToggler />
    </div>
  );
}

export default Header;
