import React from 'react';
import { userMenuList, adminMenuList, subMenuList, logout } from '@models/menus';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Avatar from './Avatar';
import { me } from '@models/user';

interface props {
  isMyInfoLoading: boolean;
  myInfo?: me;
  onLogoutClick: () => void;
}

const Navigate: React.FC<props> = ({ onLogoutClick, isMyInfoLoading, myInfo }) => {
  return (
    <div className="flex justify-between py-2 px-4 sm:px-5 border-b-2">
      <ul className="flex items-center space-x-5 sm:space-x-7">
        <li>
          <Link to="/">
            <img
              className="h-10 w-10 rounded-md shadow-sm transition-all hover:scale-105 active:scale-100 duration-75"
              src="https://imagedelivery.net/0ZP-N9B45ji28JoChYUvWw/945985a0-a262-42ad-4250-da716e3cdb00/avatar"
              alt="home"
            />
          </Link>
        </li>
        {(myInfo && myInfo.data.role === 'Manager' ? adminMenuList : userMenuList).map(({ id, ...props }) => {
          return <Menu key={id} {...props} />;
        })}
      </ul>
      <ul className="flex items-center space-x-5 sm:space-x-7">
        {subMenuList.map(({ id, icon, ...props }) => {
          if (id === 5) {
            return (
              <Menu
                key={id}
                icon={<Avatar isLoading={isMyInfoLoading} src2={myInfo?.data.avatar} src={myInfo?.data.avatar2} />}
                {...props}
              />
            );
          }

          return <Menu icon={icon} key={id} {...props} />;
        })}
        <Menu icon={logout.icon} link={logout.link} title={logout.title} onClick={onLogoutClick} />
      </ul>
    </div>
  );
};

export default Navigate;
