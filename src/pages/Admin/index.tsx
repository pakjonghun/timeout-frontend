import React, { useCallback, useState } from 'react';
import MainLayout from '@components/MainLayout';
import WorkerCard from './WorkerCard';
import { adminRecordTableHeadByUser } from '@models/tables';
import NoticeForm from './NoticeForm';
import AdminTable from '@pages/Record/AdminRecord/AdminTable';

const Admin = () => {
  return (
    <MainLayout title="Admin">
      <section className="space-y-5">
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
          <div className="flex flex-col w-fit mx-auto space-y-5">
            <NoticeForm />
            {/* <AdminTable thead={adminRecordTableHeadByUser} tbody={Array(7).fill(0)} /> */}
          </div>
        </main>
      </section>
    </MainLayout>
  );
};

export default Admin;
