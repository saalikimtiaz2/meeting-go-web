import DarkModeToggler from 'components/DarkModeToggler';
import Logo from 'components/Logo';
import { useAuth } from 'context/AuthContext';
import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Login',
    link: '/login',
  },
  {
    title: 'Sign Up',
    link: '/signup',
  },
];

function AppHeader() {
  const { isAuth } = useAuth();

  return (
    <div className="fixed top-0 left-0 right-0 z-10  px-8 flex items-center justify-between bg-black/20 backdrop-blur-sm transition-all duration-300 ease-in-out">
      <NavLink
        to="/"
        className="flex items-center gap-x-2 text-primary font-medium text-2xl"
      >
        <Logo primaryOnly />
        InterAct
      </NavLink>
      <ul className="flex items-center gap-x-6 text-white  text-lg">
        {isAuth && (
          <li className="relative">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'active-nav-app text-accent font-semibold'
                  : ' ' + '  relative py-4 inline-block font-normal'
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        )}
        {!isAuth &&
          links.map((item) => (
            <li key={item.title} className="relative">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'active-nav-app text-accent font-semibold'
                    : ' ' + '  relative py-4 inline-block font-normal'
                }
                to={item.link}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        <li>
          <DarkModeToggler />
        </li>
      </ul>
    </div>
  );
}

export default AppHeader;
