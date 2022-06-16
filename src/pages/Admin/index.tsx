import React from 'react';
import MainLayout from '@components/MainLayout';
import WorkerCard from './WorkerCard';
import Table from '@components/Table';
import { adminRecordTableHeadByUser } from '@models/tables';

const Admin = () => {
  return (
    <MainLayout title="Admin">
      <section>
        <header className="grid grid-cols-3 max-w-[40rem] mx-auto pt-10">
          <WorkerCard
            index={'1'}
            user={{ name: 'pak', email: 'email@naver.com', phone: '010-1234-1234', workTime: '1시간 30분' }}
          />
          <WorkerCard
            index={'2'}
            user={{ name: 'pak', email: 'email@naver.com', phone: '010-1234-1234', workTime: '1시간 30분' }}
          />
          <WorkerCard
            index={'3'}
            user={{ name: 'pak', email: 'email@naver.com', phone: '010-1234-1234', workTime: '1시간 30분' }}
          />
        </header>
        <main>
          <Table thead={adminRecordTableHeadByUser} tbody={Array(7).fill(0)} />
        </main>
      </section>
    </MainLayout>
  );
};

export default Admin;
