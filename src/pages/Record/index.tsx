import MainLayout from '@components/MainLayout';
import React from 'react';
import { useGetRecordsQuery } from '@redux/services/record';
import { useGetMyInfoQuery } from '@redux/services/userApi';
import Spinner from '@components/Spinner';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import AdminTable from '@components/AdminTable';
import UserTable from '@components/\bUserTable';
import { record, recordWithUser } from '@models/record';

const Record = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetRecordsQuery({ page: 1, perPage: 1 });
  const { data: myInfo, isLoading: isMyInfoLoading } = useGetMyInfoQuery();
  const userThead = useAppSelector((state) => [...state.record.userRecordTableHeadByRecent.thead]);
  const adminThead = useAppSelector((state) => [...state.record.adminRecordTableHeadByUser.thead]);
  const recordByDateThead = useAppSelector((state) => [...state.record.recordTableHeadByDate.thead]);

  switch (true) {
    case isLoading || isMyInfoLoading: {
      return <Spinner classes="h-5 w-5" />;
    }
    case Boolean(myInfo?.data.role == 'Manager' && data?.data): {
      const adminData = data?.data as unknown as recordWithUser[];
      return (
        <MainLayout title="Record">
          <AdminTable thead={adminThead} tbody={adminData} />
        </MainLayout>
      );
    }
    case Boolean(myInfo?.data.role == 'Client' && data?.data): {
      const userData = data?.data as unknown as record[];
      return (
        <MainLayout title="Record">
          <UserTable thead={userThead} tbody={userData} />
        </MainLayout>
      );
    }

    default:
      throw new Error('Error on record page');
  }
};

export default Record;
