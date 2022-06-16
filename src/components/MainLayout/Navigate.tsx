import React from 'react';
import { userMenuList, adminMenuList, subMenuList } from '@models/menus';
import { Link } from 'react-router-dom';
import Menu from './Menu';

const Navigate = () => {
  const isAdmin = true;

  return (
    <div className="flex justify-between py-2 px-4 sm:px-10 border-b-2">
      <ul className="flex items-center space-x-5 sm:space-x-10">
        <li>
          <Link to="/">
            <img
              className="h-10 w-10 rounded-full transition-all hover:scale-105 active:scale-100 duration-75"
              src="https://imagedelivery.net/0ZP-N9B45ji28JoChYUvWw/e50d5927-ca72-4e3f-29b5-48044ff73800/avatar"
              alt="home"
            />
          </Link>
        </li>
        {(isAdmin ? adminMenuList : userMenuList).map(({ id, ...props }) => {
          return <Menu key={id} {...props} />;
        })}
      </ul>
      <ul className="flex items-center space-x-10">
        {subMenuList.map(({ id, ...props }) => (
          <Menu key={id} {...props} />
        ))}
      </ul>
    </div>
  );
};

export default Navigate;
