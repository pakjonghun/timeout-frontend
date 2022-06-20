import React from 'react';
import MainLayout from '@components/MainLayout';
import WorkerCard from './WorkerCard';
import NoticeForm from './NoticeForm';
import WorkingUserList from './WorkingUserList';
import TodayRecordList from './TodayRecordList';
import { useAppSelector } from '@hooks/useRedux';
import { getTime } from '@utils/commonUtils';

const Admin = () => {
  const doneList = useAppSelector((state) => state.admin.doneUserList);
  const workingList = useAppSelector((state) => state.admin.workingUserList);
  const tempDone = doneList.map(({ id, name, phone, role, email, sumDuration }) => ({
    id,
    phone,
    email,
    name,
    role,
    sumDuration,
  }));
  const tempWorking = workingList.map(({ id, name, role, phone, email }) => ({
    id,
    phone,
    email,
    name,
    role,
    sumDuration: 0,
  }));
  const idList: number[] = [];
  const userList = tempDone
    .concat(tempWorking)
    .filter((item) => {
      const isIdExist = idList.includes(item.id);
      if (isIdExist) return false;
      idList.push(item.id);
      return true;
    })
    .sort((a, b) => b.sumDuration - a.sumDuration);

  return (
    <MainLayout title="오늘 근무 현황">
      <section className="space-y-5">
        <header className="grid grid-cols-3 max-w-[40rem] mx-auto pt-10">
          {userList.slice(0, 3).map(({ id, name, phone, role, email, sumDuration }, index) => (
            <WorkerCard
              key={id}
              index={index + 1}
              user={{ role, name, email, phone, workTime: getTime(sumDuration) }}
            />
          ))}
        </header>
        <main className="p-3">
          <div className="flex flex-col mx-auto space-y-5">
            <NoticeForm />
            <div className="grid grid-cols-[1fr_3fr] gap-x-[2px] bg-gray-200 rounded-md shadow-md border-[1px] ">
              <WorkingUserList userList={userList} />
              <TodayRecordList />
            </div>
          </div>
        </main>
      </section>
    </MainLayout>
  );
};

export default Admin;
