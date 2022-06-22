import React, { useEffect, useState } from 'react';
import usePrivate from '@hooks/usePrivate';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { setDoneUserList, setWorkingUserList } from '@redux/features/admin';
import { toast } from 'react-toastify';
import socket from '../../socket.io';
import Navigate from './Navigate';
import WorkingImage from './WorkingImage';

interface props {
  children: React.ReactNode;
  title: string | React.ReactNode;
}

const MainLayout: React.FC<props> = ({ children, title }) => {
  const isWorking = useAppSelector((state) => state.timer.isWorking);
  const dispatch = useAppDispatch();
  const [isLogout, setIsLogout] = useState(false);

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
      toast(msg);
    });

    return () => {
      socket.off('error');
      socket.off('notice');
      socket.off('workingUsers');
    };
  }, [dispatch]);

  if (isMyInfoLoading || isMyInfoFetching) return null;

  return (
    <section className="min-w-[650px] mx-auto max-w-screen-lg">
      <header className="relative">
        <Navigate
          setIsLogout={setIsLogout}
          myInfo={myInfo}
          isMyInfoLoading={isMyInfoLoading}
          isMyInfoFetching={isMyInfoFetching}
          isMyInfoSuccess={isMyInfoSuccess}
        />
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
