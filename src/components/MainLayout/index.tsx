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

  const { isLoading } = usePrivate();

  if (isLoading) return null;

  return (
    <section className="mx-auto max-w-screen-lg">
      <header className="relative">
        <Navigate />
        <div className="absolute right-5 bottom-0">
          {isWorking && (
            <img
              src="https://imagedelivery.net/0ZP-N9B45ji28JoChYUvWw/96caefc2-bc3b-4e66-8446-1127bd593d00/medium"
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
