import React from 'react';
import MainLayout from '@components/MainLayout';
import { useGetRecordsQuery } from '@redux/services/record';
import Spinner from '@components/Spinner';
import { useAppSelector } from '@hooks/useRedux';
import AdminTable from './AdminTable';
import { recordWithUser } from '@models/record';

const Record = () => {
  const page = useAppSelector((state) => state.record.adminRecordTableHeadByUser.page);
  const perPage = useAppSelector((state) => state.record.adminRecordTableHeadByUser.perPage);
  const sortKey = useAppSelector((state) => state.record.adminRecordTableHeadByUser.sort.sortKey);
  const sortValue = useAppSelector((state) => state.record.adminRecordTableHeadByUser.sort.sortValue);
  const { data, isLoading } = useGetRecordsQuery({ page, perPage, sortKey, sortValue });
  const adminThead = useAppSelector((state) => [...state.record.adminRecordTableHeadByUser.thead]);
  const adminData = data?.data as unknown as recordWithUser[];

  if (isLoading) return <Spinner classes="h-5 w-5" />;

  return (
    <MainLayout title="Record">
      <AdminTable thead={adminThead} tbody={adminData} />
    </MainLayout>
  );
};

export default Record;
