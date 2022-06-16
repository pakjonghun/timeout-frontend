import MainLayout from '@components/MainLayout';
import React from 'react';
import Table from '@components/Table';
import { userRecordTableHeadByRecent } from '@models/tables';

const Record = () => {
  return (
    <MainLayout title="Record">
      <Table thead={userRecordTableHeadByRecent} tbody={Array(6).fill(0)} />
    </MainLayout>
  );
};

export default Record;
