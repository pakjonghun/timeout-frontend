import React, { useCallback, useEffect, useState } from 'react';
import usePrivate from '@hooks/usePrivate';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { setDoneUserList, setWorkingUserList } from '@redux/features/admin';
import { toast } from 'react-toastify';
import socket from '../../socket.io';
import Navigate from './Navigate';
import WorkingImage from './WorkingImage';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@redux/services/userApi';
import { setHour, setIsWorking, setMinute } from '@redux/features/timer';
import { setIsRefetch } from '@redux/features/record';

interface props {
  children: React.ReactNode;
  title: string | React.ReactNode;
}

const MainLayout: React.FC<props> = ({ children, title }) => {
  const navigate = useNavigate();
  const isWorking = useAppSelector((state) => state.timer.isWorking);
  const isRefetch = useAppSelector((state) => state.record.isRefetch);
  const dispatch = useAppDispatch();
  const [isLogout, setIsLogout] = useState(false);
  const [logoutMutation, { isLoading, error, data }] = useLogoutMutation();

  const {
    data: myInfo,
    isLoading: isMyInfoLoading,
    isFetching: isMyInfoFetching,
    isSuccess: isMyInfoSuccess,
  } = usePrivate(isLogout);

  useEffect(() => {
    socket.on('error', (msg) => {
      toast.error(msg);
    });

    socket.on('workingUsers', (list) => {
      dispatch(setWorkingUserList(list.workingUserList));
      dispatch(setDoneUserList(list.doneUserList));
    });

    socket.on('notice', (msg) => {
      dispatch(setIsRefetch(isRefetch + 1));
      toast(msg);
    });

    return () => {
      socket.off('error');
      socket.off('notice');
      socket.off('workingUsers');
    };
  }, [isRefetch, dispatch]);

  useEffect(() => {
    if (!isMyInfoLoading && !isMyInfoFetching && isMyInfoSuccess && myInfo?.data.recordList) {
      dispatch(setIsWorking(true));

      const temp = myInfo.data.recordList.startTime;
      const startTime = new Date(temp);

      const difference = Math.abs(Date.now() - startTime.getTime());
      const hour = Math.floor(difference / (1000 * 60 * 60));
      const minute = (difference % ((hour || 1) * 1000 * 60 * 60)) / (1000 * 60);
      dispatch(setHour(hour));
      dispatch(setMinute(Math.round(minute)));
    }
  }, [myInfo, isMyInfoLoading, isMyInfoFetching, isMyInfoSuccess, dispatch]);

  useEffect(() => {
    if (!isLoading && error) {
      toast.error('로그아웃이 실패했습니다.');
    }
  }, [isLoading, error]);

  useEffect(() => {
    if (!isLoading && data) {
      toast.success('안녕히 가세요.');
      dispatch(setIsWorking(false));
      socket.emit('logout');
      navigate('/login');
    }
  }, [isLoading, navigate, dispatch, error, data]);

  const onLogoutClick = useCallback(() => {
    setIsLogout(true);
    logoutMutation();
  }, [logoutMutation, setIsLogout]);

  if (isMyInfoLoading || !isMyInfoSuccess) return null;

  return (
    <section className="min-w-[650px] mx-auto max-w-screen-lg">
      <header className="relative">
        <Navigate onLogoutClick={onLogoutClick} myInfo={myInfo} isMyInfoLoading={isMyInfoLoading} />
        <div className="absolute right-5 -bottom-10 lg:-bottom-11">
          <WorkingImage isWorking={isWorking} />
        </div>
        {myInfo?.data.role && (
          <small className="pl-3 font-medium text-gray-800">{`당신의 직책은 ${myInfo?.data.role} 입니다.`}</small>
        )}
        <h1 className="text-center pt-10 first-letter:uppercase font-bold text-xl">{title}</h1>
      </header>

      <main className="relative min-h-[80vh]">{children}</main>
    </section>
  );
};

export default MainLayout;
