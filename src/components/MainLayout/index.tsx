import useLoginSocket from '@hooks/useLoginSocket';
import usePrivate from '@hooks/usePrivate';
import { useAppSelector } from '@hooks/useRedux';
import React from 'react';
import Navigate from './Navigate';

interface props {
  children: React.ReactNode;
  title: string;
}

const MainLayout: React.FC<props> = ({ children, title }) => {
  const isWorking = useAppSelector((state) => state.timer.isWorking);

  const { isLoading, data } = usePrivate();
  useLoginSocket(data?.data.id, data?.data.role);

  if (isLoading) return null;

  return (
    <section className="mx-auto max-w-screen-lg">
      <header className="relative">
        <Navigate />
        <div className="absolute right-5 -bottom-10 md:-bottom-28">
          {isWorking && (
            <img
              className="animate-bounce w-32 md:w-52 "
              src="https://imagedelivery.net/0ZP-N9B45ji28JoChYUvWw/de2a2e47-4d52-479e-7e58-e2a1ee267900/medium"
              alt="working"
            />
          )}
        </div>
        <h1 className="text-center pt-10 first-letter:uppercase font-bold text-xl">{title}</h1>
      </header>
      <main>{children}</main>
    </section>
  );
};

export default MainLayout;
