import React, { useCallback, useEffect } from 'react';
import { userMenuList, adminMenuList, subMenuList, logout } from '@models/menus';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import { useAppDispatch } from '@hooks/useRedux';
import { logoutFetch } from '@redux/features/user';
import { toast } from 'react-toastify';
import usePrivate from '@hooks/usePrivate';

const Navigate = () => {
  const isAdmin = true;
  const dispatch = useAppDispatch();

  const { isLoading: isMeLoading } = usePrivate();

  const onLogoutClick = useCallback(() => {
    dispatch(logoutFetch());
  }, [dispatch]);

  if (isMeLoading) return null;

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
        <Menu icon={logout.icon} link={logout.link} title={logout.title} onClick={onLogoutClick} />
      </ul>
    </div>
  );
};

export default Navigate;
