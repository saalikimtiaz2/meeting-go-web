import React, { useEffect, useState } from 'react';

const useDarkSide = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  // Get the theme from localStorage if it exists, otherwise default to 'dark'
  const [theme, setTheme] = useState<string>(() => {
    const savedTheme = window.localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'dark';
  });

  const colorTheme: string = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    window.localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
};

export default useDarkSide;
