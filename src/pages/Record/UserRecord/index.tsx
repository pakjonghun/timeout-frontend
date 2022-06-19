import MainLayout from '@components/MainLayout';
import React from 'react';
import { useGetRecordsQuery } from '@redux/services/record';
import Spinner from '@components/Spinner';
import { useAppSelector } from '@hooks/useRedux';
import UserTable from './UserTable';
import { record } from '@models/record';

const Record = () => {
  const page = useAppSelector((state) => state.record.userRecordTableHeadByRecent.page);
  const perPage = useAppSelector((state) => state.record.userRecordTableHeadByRecent.perPage);
  const sortKey = useAppSelector((state) => state.record.userRecordTableHeadByRecent.sort.sortKey);
  const sortValue = useAppSelector((state) => state.record.userRecordTableHeadByRecent.sort.sortValue);
  const { data, isLoading } = useGetRecordsQuery({ page, perPage, sortKey, sortValue });
  const userThead = useAppSelector((state) => [...state.record.userRecordTableHeadByRecent.thead]);
  const userData = data?.data as unknown as record[];

  if (isLoading) return <Spinner classes="h-5 w-5" />;

  return (
    <MainLayout title="Record">
      <UserTable thead={userThead} tbody={userData} />
    </MainLayout>
  );
};

export default Record;
