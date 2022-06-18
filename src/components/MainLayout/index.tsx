import useLoginSocket from '@hooks/useLoginSocket';
import usePrivate from '@hooks/usePrivate';
import { useAppSelector } from '@hooks/useRedux';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import socket from '../../socket.io';
import Navigate from './Navigate';
import WorkingImage from './WorkingImage';

interface props {
  children: React.ReactNode;
  title: string;
}

const MainLayout: React.FC<props> = ({ children, title }) => {
  const isWorking = useAppSelector((state) => state.timer.isWorking);

  const { isLoading, data } = usePrivate();
  useLoginSocket(data?.data.id, data?.data.role);

  useEffect(() => {
    socket.on('error', (msg) => {
      toast.error(msg);
    });

    socket.on('workingUsers', (workingUsers) => {
      console.log(workingUsers);
    });

    socket.on('notice', (msg) => {
      toast(msg);
    });

    return () => {
      socket.off('error');
      socket.off('notice');
      socket.off('workingUsers');
    };
  }, []);

  if (isLoading) return null;

  return (
    <section className="min-w-[600px] mx-auto max-w-screen-lg">
      <header className="relative">
        <Navigate />
        <div className="absolute right-5 -bottom-10 lg:-bottom-11">
          <WorkingImage isWorking={isWorking} />
        </div>
        <h1 className="text-center pt-10 first-letter:uppercase font-bold text-xl">{title}</h1>
      </header>
      <main>{children}</main>
    </section>
  );
};

export default MainLayout;
