import useDarkSide from 'hooks/Theme';
import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ThemeSwitcher = ({ className }: { className?: string }) => {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState<boolean>(
    colorTheme === 'light' ? true : false,
  );

  const toggleDarkMode = () => {};

  const toogleMode = () => {
    setTheme(!darkSide ? 'dark' : 'light');
    setDarkSide((prevState) => !prevState);
  };

  return (
    <button
      className={`flex items-center gap-x-2 font-medium font-Oswald text-gray-700 dark:text-gray-300 ${className}`}
      onClick={toogleMode}
    >
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={20} />
      {darkSide ? 'Dark' : 'Light'}
    </button>
  );
};

export default ThemeSwitcher;
