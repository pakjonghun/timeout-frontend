import { joinStyle } from '@utils/styleUtils';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface props {
  link: string;
  title?: string;
  icon: React.ReactNode;
}

const Menu: React.FC<props> = ({ link, title, icon }) => {
  const { pathname } = useLocation();

  return (
    <li className="">
      <Link
        className={joinStyle(
          'focus:fill-gray-600 group fill-gray-400 flex flex-col items-center space-y-1 hover:fill-gray-800',
          pathname === link || (pathname === '/avatar' && link === '/profile') ? 'fill-gray-800' : '',
        )}
        to={link}
      >
        {icon}
        {title && (
          <span
            className={joinStyle(
              'group-focus:text-gray-600 group-hover:text-gray-800 first-letter:uppercase font-medium text-xs ',
              pathname === link || (pathname === '/avatar' && link === '/profile') ? ' text-gray-800' : 'text-gray-400',
            )}
          >
            {title}
          </span>
        )}
      </Link>
    </li>
  );
};

export default Menu;
