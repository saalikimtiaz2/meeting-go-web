import React, { useEffect, useState } from 'react';

const useDarkSide = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [theme, setTheme] = useState<string>('dark');
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
