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
    <section className="h-screen min-w-[650px] lg:grid lg:grid-cols-[514px_minmax(10rem,_1fr)]">
      <section className="h-full hidden lg:block lg:w-[514px] opacity-90 backdrop-blur-sm">
        <div
          className={joinStyle(
            'absolute w-full flex flex-col justify-center items-center font-bold text-xl text-orange-300',
            classes ? classes : '',
          )}
        >
          <WelcomeMessages />
        </div>
        <img src={image} alt="clock" className="h-full" />
      </section>

      <article className="py-10 lg:py-16 mx-auto max-w-[33rem] lg:max-w-[34rem] w-full px-16 space-y-10">
        <header className="lg:hidden flex flex-col justify-center items-center font-bold text-xl text-gray-800">
          <WelcomeMessages />
        </header>
        <main>{children}</main>
      </article>
    </section>
  );
};

export default AuthLayout;
