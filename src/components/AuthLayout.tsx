import { joinStyle } from '@utils/styleUtils';
import React from 'react';

interface props {
  image: string;
  children: React.ReactNode;
  classes?: string;
}

const AuthLayout: React.FC<props> = ({ children, image, classes }) => {
  return (
    <section className="lg:grid lg:grid-cols-[514px_minmax(10rem,_1fr)]">
      <section className="hidden lg:block lg:w-[514px] opacity-70 backdrop-blur-sm">
        <div
          className={joinStyle(
            'absolute inset-x-0 flex flex-col justify-center items-center font-bold text-xl text-gray-200',
            classes ? classes : '',
          )}
        >
          <h1>초과근무 관리</h1>
          <p>방문을 환영합니다!</p>
        </div>
        <img src={image} alt="clock" className="h-full" />
      </section>

      <article className="pt-[15vh] lg:pt-[17vh] mx-auto max-w-[33rem] lg:max-w-[34rem] w-full h-screen px-16 space-y-10">
        <header className="lg:hidden flex flex-col justify-center items-center font-bold text-xl text-gray-800">
          <h1>초과근무 관리</h1>
          <p>방문을 환영합니다!</p>
        </header>
        <main>{children}</main>
      </article>
    </section>
  );
};

export default AuthLayout;
