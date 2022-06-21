import React from 'react';
import { joinStyle } from '@utils/styleUtils';
import WelcomeMessages from './WelcomeMessages';

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
          <WelcomeMessages />
        </div>
        <img src={image} alt="clock" className="h-full" />
      </section>

      <article className="pt-[15vh] lg:pt-[17vh] mx-auto max-w-[33rem] lg:max-w-[34rem] w-full h-screen px-16 space-y-10">
        <header className="lg:hidden flex flex-col justify-center items-center font-bold text-xl text-gray-800">
          <WelcomeMessages />
        </header>
        <main>{children}</main>
      </article>
    </section>
  );
};

export default AuthLayout;
