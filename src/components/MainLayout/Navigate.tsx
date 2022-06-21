import React, { useCallback, useEffect } from 'react';
import { userMenuList, adminMenuList, subMenuList, logout } from '@models/menus';
import { Link, useNavigate } from 'react-router-dom';
import Menu from './Menu';
import { useAppDispatch } from '@hooks/useRedux';
import { toast } from 'react-toastify';
import { useGetMyInfoQuery, useLogoutMutation } from '@redux/services/userApi';
import { setHour, setIsWorking, setMinute } from '@redux/features/timer';
import socket from '../../socket.io';
import Avatar from './Avatar';

const Navigate = () => {
  const {
    data: myInfo,
    isLoading: isMyInfoLoading,
    isFetching: isMyInfoFetching,
    isSuccess: isMyInfoSuccess,
  } = useGetMyInfoQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [logoutMutation, { isLoading, data, isSuccess, error, isError }] = useLogoutMutation();
  useGetMyInfoQuery();

  useEffect(() => {
    if (!isMyInfoLoading && !isMyInfoFetching && isMyInfoSuccess && myInfo?.data.recordList) {
      dispatch(setIsWorking(true));

      const temp = myInfo.data.recordList.startTime;
      const startTime = new Date(temp);
      const currentTime = new Date();

      const difference = Math.abs(currentTime.getTime() - startTime.getTime());
      const hour = Math.floor(difference / (1000 * 60 * 60));
      const minute = (difference % ((hour || 1) * 1000 * 60 * 60)) / (1000 * 60);
      dispatch(setHour(hour));
      dispatch(setMinute(Math.round(minute)));
    }
  }, [myInfo, isMyInfoLoading, isMyInfoFetching, isMyInfoSuccess, dispatch]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success('안녕히 가세요.');
      navigate('/login');
    }
  }, [isLoading, isSuccess, navigate, dispatch, isError, error, data]);

  const onLogoutClick = useCallback(() => {
    logoutMutation();
    dispatch(setIsWorking(false));
    socket.emit('logout');
  }, [logoutMutation, dispatch]);

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
