import React from 'react';
import Sticker from '@components/Sticker';
import gravatar from 'gravatar';
import { joinStyle } from '@utils/styleUtils';
import { WorkerCards, workerCards } from '@models/admin';

interface props {
  index: WorkerCards;
  user: {
    name: string;
    email: string;
    phone: string;
    workTime: string;
  };
}

const WorkerCard: React.FC<props> = ({ index, user: { name, email, phone, workTime } }) => {
  return (
    <article
      className={joinStyle(
        'relative flex flex-col justify-center items-center max-w-[12rem] py-3 px-2 space-y-3 rounded-md shadow-md',
        workerCards[index].bgColor,
      )}
    >
      <header className="w-full flex justify-between">
        <h1 className="font-bold text-2xl text-gray-800 opacity-50">{`${index}등`}</h1>
        <Sticker index={index} classes="flex items-center bg-green-400 px-2 text-xs" title="working" />
      </header>
      <main className="space-y-3">
        <img className="rounded-full w-14 h-14" src={gravatar.url('avatar', { s: '30px', d: 'retro' })} />
        <p className="text-lg text-gray-800">{workTime}</p>
        <div className="text-gray-500 font-medium text-sm">
          <p>{name}</p>
          <p>{email}</p>
          <p>{phone}</p>
        </div>
      </main>
    </article>
  );
};

export default WorkerCard;
